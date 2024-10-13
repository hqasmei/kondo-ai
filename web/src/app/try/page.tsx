"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { analyzeAndOrganizeSpace } from "../action";

interface FileWithPreview extends File {
  preview: string;
}

interface OrganizationStep {
  step: number;
  action: string;
}

interface AnalysisResult {
  originalItems: string[];
  spaceType: string;
  organizationSteps: OrganizationStep[];
  suggestedArrangement: string;
  imageGenerationPrompt: string;
  generatedImageUrl: string;
}

export default function TryPage() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      setFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
      setError(null);
      setAnalysisResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        const base64Data = base64Image.split(",")[1];
        const result = await analyzeAndOrganizeSpace(base64Data);
        setAnalysisResult(result);
      };
      reader.onerror = () => {
        setError("Error reading the file. Please try again.");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error analyzing and organizing space:", error);
      setError(
        "An error occurred while analyzing the image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setFile(null);
    setAnalysisResult(null);
    setError(null);
  };

  useEffect(() => {
    console.log("Loading state changed:", isLoading);
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-off-white font-comfortaa text-lapis-lazuli">
      <h1 className="text-4xl font-bold mb-6 text-calm-waters">
        KondoAI✨ - Organization Assistant
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {file ? (
          <div className="mt-4 text-center">
            <p className="text-sm text-sky-blue mb-2">
              File selected: {file.name}
            </p>
            <Image
              src={file.preview}
              alt="Preview"
              width={300}
              height={300}
              className="mx-auto max-w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-sky-blue bg-sky-blue/10"
                : "border-calm-waters hover:border-sky-blue"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-calm-waters" />
            <p className="mt-2 text-sm text-lapis-lazuli">
              {isDragActive
                ? "Drop the image here..."
                : "Drag 'n' drop an image here, or click to select a file"}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full py-2 px-4 rounded-full font-bold transition-colors ${
            file && !isLoading
              ? "bg-mustard text-lapis-lazuli hover:bg-sky-blue"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 inline" />
              Analyzing...
            </>
          ) : (
            "Analyze and Organize"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-destructive text-center bg-destructive/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-calm-waters">
            Analysis Results:
          </h2>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold text-lapis-lazuli mb-2">
                Original Space:
              </h3>
              <Image
                src={file?.preview || ""}
                alt="Original space"
                width={512}
                height={512}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold text-lapis-lazuli mb-2">
                Organized Space:
              </h3>
              <Image
                src={analysisResult.generatedImageUrl}
                alt="Generated organized space"
                width={512}
                height={512}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lapis-lazuli">Space Type:</h3>
            <p className="text-indigo-dye">{analysisResult.spaceType}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lapis-lazuli">
              Items Identified:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysisResult.originalItems.map((item, index) => (
                <li key={index} className="text-indigo-dye">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lapis-lazuli">
              Organization Steps:
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              {analysisResult.organizationSteps.map((step, index) => (
                <li key={index} className="text-indigo-dye">
                  {step.action}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lapis-lazuli">
              Suggested Arrangement:
            </h3>
            <p className="text-indigo-dye">
              {analysisResult.suggestedArrangement}
            </p>
          </div>
        </div>
      )}

      {analysisResult && (
        <button
          onClick={handleRestart}
          className="mt-6 py-2 px-4 bg-sky-blue text-white rounded-full hover:bg-calm-waters transition-colors font-bold"
        >
          Analyze Another Image
        </button>
      )}
    </div>
  );
}
