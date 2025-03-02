
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
      // Start image generation
      const { data, error } = await supabase.functions.invoke("replicate-image", {
        body: {
          prompt: options.prompt,
          loraUrl: options.loraUrl,
          loraStrength: options.loraStrength || 0.7,
          negativePrompt: options.negativePrompt,
          width: options.width,
          height: options.height,
          numOutputs: options.numOutputs,
          steps: options.steps,
          guidanceScale: options.guidanceScale,
          modelVersion: options.modelVersion
        }
      });

      if (error) {
        throw new Error(`Error starting generation: ${error.message}`);
      }

      if (!data.id) {
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
      // Check the status of the generation
      const { data, error } = await supabase.functions.invoke("replicate-image", {
        body: { predictionId: id }
      });
      
      if (error) {
        throw new Error(`Error checking status: ${error.message}`);
      }
      
      const prediction = data as ReplicateResponse;
      console.log("Prediction status:", prediction.status, prediction);
      setGenerationStatus(prediction.status);
      
      // If it's still processing, poll again in a moment
      if (prediction.status === "processing") {
        setTimeout(() => checkGenerationStatus(id), 1000);
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
    
    setIsGenerating(false);
    setGenerationStatus("canceled");
    // In a real implementation, you would call an API to cancel the generation
    // This would require an additional endpoint in your edge function
  };

  return {
    isGenerating,
    generatedImageUrl,
    generationStatus,
    generateImage,
    cancelGeneration
  };
};
