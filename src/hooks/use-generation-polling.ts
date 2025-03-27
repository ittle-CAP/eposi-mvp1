
import { useState } from "react";
import { checkGenerationStatus } from "@/services/replicate-service";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/utils/error-handling";

/**
 * Hook for handling the polling of generation status
 */
export const useGenerationPolling = (
  setGenerationStatus: (status: string) => void,
  setGeneratedImageUrl: (url: string) => void,
  setGenerationError: (error: string) => void,
  setIsGenerating: (isGenerating: boolean) => void
) => {
  const { toast } = useToast();
  const { handleApiError, handleGenerationError } = useErrorHandler();

  const pollGenerationStatus = async (id: string) => {
    if (!id) return;
    
    try {
      const prediction = await checkGenerationStatus(id);
      
      console.log("Prediction status:", prediction.status, prediction);
      setGenerationStatus(prediction.status);
      
      if (prediction.status === "processing") {
        setTimeout(() => pollGenerationStatus(id), 1500);
        return;
      }
      
      if (prediction.status === "succeeded" && prediction.output && prediction.output.length > 0) {
        console.log("Generated image URL:", prediction.output[0]);
        setGeneratedImageUrl(prediction.output[0]);
        toast({
          title: "Success!",
          description: "Your image has been generated",
        });
      }
      
      if (prediction.status === "failed" || prediction.error) {
        const errorMsg = prediction.error || "Unknown generation error";
        setGenerationError(errorMsg);
        handleGenerationError(errorMsg, "Image");
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error("Error in pollGenerationStatus:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleApiError(error, "checking generation status");
      setIsGenerating(false);
      setGenerationStatus("failed");
    }
  };

  return { pollGenerationStatus };
};
