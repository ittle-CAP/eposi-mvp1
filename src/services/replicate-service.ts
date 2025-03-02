
import { supabase } from "@/integrations/supabase/client";
import { ReplicateGenerationOptions, ReplicateResponse } from "@/types/replicate";

export const startImageGeneration = async (options: ReplicateGenerationOptions): Promise<ReplicateResponse> => {
  console.log("Starting image generation with Replicate:", options);
  
  // Use sensible defaults for any missing options
  const body: Record<string, any> = {
    prompt: options.prompt,
    width: options.width || 512,
    height: options.height || 512,
    numOutputs: options.numOutputs || 1,
    steps: options.steps || 30,
    guidanceScale: options.guidanceScale || 7.5,
    scheduler: options.scheduler || "K_EULER_ANCESTRAL", // Better for detailed images
    modelVersion: "black-forest-labs/flux-dev-lora", // Using the LoRA-enabled model
    negative_prompt: options.negativePrompt || "ugly, blurry, low quality, distorted, disfigured"
  };
  
  // Add random seed if not provided
  if (options.seed) {
    body.seed = options.seed;
  } else {
    body.seed = Math.floor(Math.random() * 2147483647);
  }
  
  // Only include LoRA options if a LoRA URL is provided
  if (options.loraUrl) {
    body.loraUrl = options.loraUrl;
    body.loraStrength = options.loraStrength || 0.7;
    console.log(`Using LoRA with URL: ${options.loraUrl} and strength: ${options.loraStrength || 0.7}`);
  } else {
    console.log("No LoRA specified, using base model");
    // Explicitly set empty LoRA parameters to ensure clean generation
    body.loraUrl = "";
    body.loraStrength = 0;
  }
  
  try {
    console.log("Invoking replicate-image function with body:", body);
    const { data, error } = await supabase.functions.invoke("replicate-image", {
      body: body
    });

    if (error) {
      console.error("Error from Supabase function:", error);
      // Extract more detailed error information if available
      let errorMessage = `Error starting generation: ${error.message}`;
      console.log("Full error object:", JSON.stringify(error));
      
      throw new Error(errorMessage);
    }

    if (!data) {
      console.error("Empty response from Supabase function");
      throw new Error("No response received from the image generation API");
    }

    console.log("Response from replicate-image function:", data);

    if (!data.id) {
      console.error("Invalid response:", data);
      
      // If there's an error message in the response, use it
      if (data.error) {
        throw new Error(data.error);
      }
      
      throw new Error("No prediction ID returned from the API");
    }

    return data as ReplicateResponse;
  } catch (error) {
    console.error("Caught error in startImageGeneration:", error);
    throw error;
  }
};

export const checkGenerationStatus = async (predictionId: string): Promise<ReplicateResponse> => {
  console.log("Checking status for prediction:", predictionId);
  
  try {
    const { data, error } = await supabase.functions.invoke("replicate-image", {
      body: { predictionId: predictionId }
    });
    
    if (error) {
      console.error("Error checking status:", error);
      throw new Error(`Error checking status: ${error.message}`);
    }
    
    if (!data) {
      console.error("Empty response from status check");
      throw new Error("No data returned from status check");
    }
    
    console.log("Status check response:", data);
    return data as ReplicateResponse;
  } catch (error) {
    console.error("Caught error in checkGenerationStatus:", error);
    throw error;
  }
};

export const cancelReplicatePrediction = async (predictionId: string): Promise<void> => {
  console.log("Attempting to cancel prediction:", predictionId);
  
  try {
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
  } catch (error) {
    console.error("Caught error in cancelReplicatePrediction:", error);
    throw error;
  }
};
