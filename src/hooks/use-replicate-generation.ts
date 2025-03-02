
import { useState } from "react";
import { 
  startImageGeneration, 
  checkGenerationStatus, 
  cancelReplicatePrediction 
} from "@/services/replicate-service";
import { ReplicateGenerationOptions } from "@/types/replicate";
import { useErrorHandler } from "@/utils/error-handling";
import { useToast } from "@/hooks/use-toast";

export const useReplicateGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [predictionId, setPredictionId] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");
  const { toast } = useToast();
  const { handleApiError, handleGenerationError } = useErrorHandler();

  const pollGenerationStatus = async (id: string) => {
    // If we don't have a prediction ID, we can't check status
    if (!id) return;
    
    try {
      const prediction = await checkGenerationStatus(id);
      
      console.log("Prediction status:", prediction.status, prediction);
      setGenerationStatus(prediction.status);
      
      // If it's still processing, poll again in a moment
      if (prediction.status === "processing") {
        setTimeout(() => pollGenerationStatus(id), 1500);
        return;
      }
      
      // If it succeeded, set the image URL
      if (prediction.status === "succeeded" && prediction.output && prediction.output.length > 0) {
        console.log("Generated image URL:", prediction.output[0]);
        setGeneratedImageUrl(prediction.output[0]);
        toast({
          title: "Success!",
          description: "Your image has been generated",
        });
      }
      
      // If it failed, show an error
      if (prediction.status === "failed" || prediction.error) {
        const errorMsg = prediction.error || "Unknown generation error";
        setGenerationError(errorMsg);
        handleGenerationError(errorMsg, "Image");
      }
      
      // Regardless of outcome, we're no longer generating
      setIsGenerating(false);
    } catch (error) {
      console.error("Error in pollGenerationStatus:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleApiError(error, "checking generation status");
      setIsGenerating(false);
      setGenerationStatus("failed");
    }
  };

  const generateImage = async (options: ReplicateGenerationOptions): Promise<boolean> => {
    setIsGenerating(true);
    setGenerationStatus("starting");
    setGeneratedImageUrl("");
    setGenerationError("");
    
    try {
      console.log("Starting image generation with options:", options);
      const response = await startImageGeneration(options);

      console.log("Received generation response:", response);
      
      // Store the prediction ID for status checks
      setPredictionId(response.id);
      setGenerationStatus("processing");
      
      // Poll for results
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
    if (!predictionId) return;
    
    try {
      await cancelReplicatePrediction(predictionId);
      
      setIsGenerating(false);
      setGenerationStatus("canceled");
      toast({
        title: "Canceled",
        description: "Image generation was canceled",
      });
    } catch (error) {
      console.error("Error canceling generation:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      // Even if the cancellation fails, update the UI
      setIsGenerating(false);
      setGenerationStatus("canceled");
    }
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
