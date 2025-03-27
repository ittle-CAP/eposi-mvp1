
import { useState } from "react";

/**
 * Hook for managing generation state
 * Handles common state needed for AI generation processes
 */
export const useGenerationState = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [predictionId, setPredictionId] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");

  const resetGenerationState = () => {
    setGenerationStatus("starting");
    setGeneratedImageUrl("");
    setGenerationError("");
  };

  return {
    isGenerating,
    setIsGenerating,
    generatedImageUrl,
    setGeneratedImageUrl,
    predictionId,
    setPredictionId,
    generationStatus,
    setGenerationStatus,
    generationError,
    setGenerationError,
    resetGenerationState
  };
};
