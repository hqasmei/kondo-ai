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
    // You can add more logic here if needed
  }, [isLoading]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-6">
        KondoAI✨ - Organization Assistant
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {file ? (
          <div className="mt-4 text-center">
            <p className="text-sm text-green-500 mb-2">
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
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isDragActive
                ? "Drop the image here..."
                : "Drag 'n' drop an image here, or click to select a file"}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full py-2 px-4 rounded flex items-center justify-center transition-colors ${
            file && !isLoading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Analyze and Organize"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-center bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Analysis Results:</h2>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold text-gray-700 mb-2">
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
              <h3 className="font-semibold text-gray-700 mb-2">
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
            <h3 className="font-semibold text-gray-700">Space Type:</h3>
            <p className="text-gray-600">{analysisResult.spaceType}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Items Identified:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysisResult.originalItems.map((item, index) => (
                <li key={index} className="text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Organization Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {analysisResult.organizationSteps.map((step, index) => (
                <li key={index} className="text-gray-600">
                  {step.action}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Suggested Arrangement:
            </h3>
            <p className="text-gray-600">
              {analysisResult.suggestedArrangement}
            </p>
          </div>
        </div>
      )}

      {analysisResult && (
        <button
          onClick={handleRestart}
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Analyze Another Image
        </button>
      )}
    </div>
  );
}
