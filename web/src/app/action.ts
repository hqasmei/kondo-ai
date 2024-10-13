"use server";

import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(base64Image: string): Promise<string> {
  try {
    // Ensure base64 string starts with the appropriate metadata
    const base64WithPrefix = base64Image.startsWith("data:image/")
      ? base64Image
      : `data:image/jpeg;base64,${base64Image}`; // Assuming JPEG, adjust as necessary

    const response = await cloudinary.uploader.upload(base64WithPrefix, {
      upload_preset: "ml_default",
    });
    console.log("Cloudinary upload response:", response);
    return response.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
}

function decodeBase64(base64: string): Uint8Array {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  try {
    const binaryString = Buffer.from(base64Data, "base64").toString("binary");
    return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    throw new Error("Invalid base64 image data");
  }
}

// Updated generateImage function to accept base64Image and use it in the input
async function generateImage(
  imagePrompt: string,
  imageUrl: string
): Promise<string> {
  try {
    // Start the prediction by including both the prompt and the image in the input
    const startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version:
            "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          input: {
            width: 1024,
            height: 1024,
            prompt: `Create a detailed, realistic image of an organized space based on this description: "${imagePrompt}".`,
            refine: "expert_ensemble_refiner",
            apply_watermark: false,
            num_inference_steps: 25,
            image: imageUrl, // Adding the base64 image here
          },
        }),
      }
    );

    if (!startResponse.ok) {
      throw new Error(`HTTP error! status: ${startResponse.status}`);
    }

    const prediction = await startResponse.json();

    // Poll for the result
    let result;
    while (true) {
      const pollResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!pollResponse.ok) {
        throw new Error(`HTTP error! status: ${pollResponse.status}`);
      }

      result = await pollResponse.json();

      if (result.status === "succeeded") {
        break;
      } else if (result.status === "failed") {
        throw new Error("Image generation failed");
      }

      // Wait for 2 seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (result.output && result.output.length > 0) {
      return result.output[0];
    } else {
      throw new Error("Unexpected output format from Replicate");
    }
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}

export const analyzeAndOrganizeSpace = async (base64Image: string) => {
  try {
    const imageBytes = decodeBase64(base64Image);

    // Step 1: Analyze the image and identify items
    const { object: itemsResult } = await generateObject({
      model: anthropic("claude-3-5-sonnet-20240620"),
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image: imageBytes },
            {
              type: "text",
              text: "Analyze this image of a cluttered space (drawer, shelf, or cabinet) and provide a list of items you can identify.",
            },
          ],
        },
      ],
      schema: z.object({
        items: z
          .array(z.string())
          .describe("list of items identified in the image"),
        spaceType: z
          .enum(["drawer", "shelf", "cabinet", "other"])
          .describe("type of space in the image"),
      }),
    });

    // Step 2: Generate actionable organization advice
    const { object: adviceResult } = await generateObject({
      model: anthropic("claude-3-5-sonnet-20240620"),
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a Marie Kondo-inspired organization expert. Given the following items in a ${
                itemsResult.spaceType
              }: ${itemsResult.items.join(", ")}. 
              Provide actionable, step-by-step advice on how to organize them efficiently and beautifully. 
              Include general organizational principles and specific suggestions for arranging the items.
              If the space has multiple shelves or sections, suggest how to distribute items across them.
              Limit your response to 4-6 concise, practical steps.`,
            },
          ],
        },
      ],
      schema: z.object({
        organizationSteps: z
          .array(
            z.object({
              step: z.number(),
              action: z.string(),
            })
          )
          .describe("Step-by-step organization instructions"),
        suggestedArrangement: z
          .string()
          .describe(
            "A brief suggestion on how to arrange items across the space"
          ),
      }),
    });

    // Step 3: Generate a prompt for creating an image of the organized space
    const { object: imagePromptResult } = await generateObject({
      model: anthropic("claude-3-5-sonnet-20240620"),
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Based on these organization steps and suggested arrangement for a ${
                itemsResult.spaceType
              }: "${adviceResult.organizationSteps
                .map((step) => step.action)
                .join(". ")}" and "${
                adviceResult.suggestedArrangement
              }", create a detailed, concise, not wordy prompt for an AI image generator to visualize this organized space.`,
            },
          ],
        },
      ],
      schema: z.object({
        imagePrompt: z
          .string()
          .describe("Detailed prompt for AI image generator"),
      }),
    });

    const imageUrl = await uploadToCloudinary(base64Image);

    // Step 4: Generate the image using the prompt
    const generatedImageUrl = await generateImage(
      imagePromptResult.imagePrompt,
      imageUrl
    );

    return {
      originalItems: itemsResult.items,
      spaceType: itemsResult.spaceType,
      organizationSteps: adviceResult.organizationSteps,
      suggestedArrangement: adviceResult.suggestedArrangement,
      imageGenerationPrompt: imagePromptResult.imagePrompt,
      generatedImageUrl: generatedImageUrl,
    };
  } catch (error) {
    console.error("Error in analyzeAndOrganizeSpace:", error);
    throw error;
  }
};
