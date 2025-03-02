
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReplicateGenerationOptions {
  prompt: string;
  loraUrl?: string;
  loraStrength?: number;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numOutputs?: number;
  steps?: number;
  guidanceScale?: number;
  modelVersion?: string;
}

interface ReplicateResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string[] | null;
  error?: string | null;
}

export const useReplicateGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [predictionId, setPredictionId] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const { toast } = useToast();

  const generateImage = async (options: ReplicateGenerationOptions): Promise<boolean> => {
    setIsGenerating(true);
    setGenerationStatus("starting");
    setGeneratedImageUrl("");
    
    try {
      console.log("Starting image generation with Replicate:", options);
      
      // For demonstration without a LoRA, we can still generate a basic image
      const body: Record<string, any> = {
        prompt: options.prompt,
        width: options.width,
        height: options.height,
        numOutputs: options.numOutputs,
        steps: options.steps,
        guidanceScale: options.guidanceScale,
        modelVersion: options.modelVersion
      };
      
      // Only include LoRA options if a LoRA URL is provided
      if (options.loraUrl) {
        body.loraUrl = options.loraUrl;
        body.loraStrength = options.loraStrength || 0.7;
      }
      
      if (options.negativePrompt) {
        body.negativePrompt = options.negativePrompt;
      }
      
      // Start image generation
      const { data, error } = await supabase.functions.invoke("replicate-image", {
        body: body
      });

      if (error) {
        console.error("Error from Supabase function:", error);
        throw new Error(`Error starting generation: ${error.message}`);
      }

      console.log("Response from replicate-image function:", data);

      if (!data || !data.id) {
        throw new Error("No prediction ID returned from the API");
      }

      // Store the prediction ID for status checks
      setPredictionId(data.id);
      setGenerationStatus("processing");
      
      // Poll for results
      await checkGenerationStatus(data.id);
      return true;
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
      setIsGenerating(false);
      setGenerationStatus("failed");
      return false;
    }
  };

  const checkGenerationStatus = async (id: string) => {
    // If we don't have a prediction ID, we can't check status
    if (!id) return;
    
    try {
      console.log("Checking status for prediction:", id);
      
      // Check the status of the generation
      const { data, error } = await supabase.functions.invoke("replicate-image", {
        body: { predictionId: id }
      });
      
      if (error) {
        console.error("Error checking status:", error);
        throw new Error(`Error checking status: ${error.message}`);
      }
      
      if (!data) {
        throw new Error("No data returned from status check");
      }
      
      const prediction = data as ReplicateResponse;
      console.log("Prediction status:", prediction.status, prediction);
      setGenerationStatus(prediction.status);
      
      // If it's still processing, poll again in a moment
      if (prediction.status === "processing") {
        setTimeout(() => checkGenerationStatus(id), 1500);
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
        toast({
          title: "Generation Failed",
          description: prediction.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
      
      // Regardless of outcome, we're no longer generating
      setIsGenerating(false);
    } catch (error) {
      console.error("Error checking generation status:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to check generation status",
        variant: "destructive",
      });
      setIsGenerating(false);
      setGenerationStatus("failed");
    }
  };

  const cancelGeneration = async () => {
    if (!predictionId) return;
    
    try {
      console.log("Attempting to cancel prediction:", predictionId);
      
      // Call the cancel endpoint in Replicate via the edge function
      const { error } = await supabase.functions.invoke("replicate-image", {
        body: { 
          predictionId,
          cancel: true 
        }
      });
      
      if (error) {
        console.error("Error canceling prediction:", error);
        throw new Error(`Error canceling generation: ${error.message}`);
      }
      
      setIsGenerating(false);
      setGenerationStatus("canceled");
      toast({
        title: "Canceled",
        description: "Image generation was canceled",
      });
    } catch (error) {
      console.error("Error canceling generation:", error);
      // Even if the cancellation fails, update the UI
      setIsGenerating(false);
      setGenerationStatus("canceled");
    }
  };

  return {
    isGenerating,
    generatedImageUrl,
    generationStatus,
    generateImage,
    cancelGeneration
  };
};
