
import { supabase } from "@/integrations/supabase/client";
import { ReplicateGenerationOptions, ReplicateResponse } from "@/types/replicate";

export const startImageGeneration = async (options: ReplicateGenerationOptions): Promise<ReplicateResponse> => {
  console.log("Starting image generation with Replicate:", options);
  
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

  return data as ReplicateResponse;
};

export const checkGenerationStatus = async (predictionId: string): Promise<ReplicateResponse> => {
  console.log("Checking status for prediction:", predictionId);
  
  const { data, error } = await supabase.functions.invoke("replicate-image", {
    body: { predictionId: predictionId }
  });
  
  if (error) {
    console.error("Error checking status:", error);
    throw new Error(`Error checking status: ${error.message}`);
  }
  
  if (!data) {
    throw new Error("No data returned from status check");
  }
  
  return data as ReplicateResponse;
};

export const cancelReplicatePrediction = async (predictionId: string): Promise<void> => {
  console.log("Attempting to cancel prediction:", predictionId);
  
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
};
