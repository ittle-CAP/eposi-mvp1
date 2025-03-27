
import { useState } from "react";
import { startImageGeneration } from "@/services/replicate-service";
import { ReplicateGenerationOptions } from "@/types/replicate";
import { useErrorHandler } from "@/utils/error-handling";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useGenerationState } from "./use-generation-state";
import { useCreditManagement } from "./use-credit-management";
import { useGenerationPolling } from "./use-generation-polling";
import { useGenerationCancellation } from "./use-generation-cancellation";

export const useReplicateGeneration = () => {
  const { 
    isGenerating, setIsGenerating,
    generatedImageUrl, setGeneratedImageUrl,
    predictionId, setPredictionId,
    generationStatus, setGenerationStatus,
    generationError, setGenerationError,
    resetGenerationState
  } = useGenerationState();
  
  const { toast } = useToast();
  const { handleApiError, handleGenerationError } = useErrorHandler();
  const { checkAndDeductCredits } = useCreditManagement();
  const { pollGenerationStatus } = useGenerationPolling(
    setGenerationStatus,
    setGeneratedImageUrl,
    setGenerationError,
    setIsGenerating
  );
  const { cancelGeneration: cancelGenerationProcess } = useGenerationCancellation(
    setIsGenerating,
    setGenerationStatus,
    setGenerationError
  );

  const generateImage = async (options: ReplicateGenerationOptions, isAdmin: boolean = false) => {
    if (isGenerating) {
      console.log("Generation already in progress");
      return false;
    }

    try {
      setIsGenerating(true);
      resetGenerationState();
      
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user) {
        setGenerationError("User not authenticated");
        setIsGenerating(false);
        return false;
      }

      // Check and deduct credits
      const creditCheckPassed = await checkAndDeductCredits(user.user.id, isAdmin);
      if (!creditCheckPassed) {
        setGenerationError("Not enough credits");
        setIsGenerating(false);
        return false;
      }

      // Set default options if not provided
      if (!options.negativePrompt) {
        options.negativePrompt = "ugly, blurry, low quality, distorted, disfigured";
      }
      
      if (!options.steps || options.steps < 20) {
        options.steps = 30;
      }
      
      if (!options.seed) {
        options.seed = Math.floor(Math.random() * 2147483647);
      }
      
      console.log("Starting image generation with options:", options);
      const response = await startImageGeneration(options);

      console.log("Received generation response:", response);
      
      setPredictionId(response.id);
      setGenerationStatus("processing");
      
      await pollGenerationStatus(response.id);
      return true;
    } catch (error) {
      console.error("Error in generateImage:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleGenerationError(error, "Image");
      setIsGenerating(false);
      setGenerationStatus("failed");
      return false;
    }
  };

  const cancelGeneration = async () => {
    await cancelGenerationProcess(predictionId);
  };

  return {
    isGenerating,
    generatedImageUrl,
    generationStatus,
    generationError,
    generateImage,
    cancelGeneration
  };
};
