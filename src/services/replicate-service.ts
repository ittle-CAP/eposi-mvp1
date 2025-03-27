
import { supabase } from "@/integrations/supabase/client";
import { ReplicateGenerationOptions, ReplicateResponse } from "@/types/replicate";

export const startImageGeneration = async (options: ReplicateGenerationOptions): Promise<ReplicateResponse> => {
  console.log("Starting image generation with Replicate:", JSON.stringify(options, null, 2));
  
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
  
  // Add random seed if not provided - IMPORTANT: Generate a new seed each time for variety
  if (options.seed) {
    body.seed = options.seed;
  } else {
    body.seed = Math.floor(Math.random() * 2147483647);
    console.log(`Generated random seed: ${body.seed}`);
  }
  
  // Only include LoRA options if a LoRA URL is provided and is valid
  if (options.loraUrl && typeof options.loraUrl === 'string' && options.loraUrl.trim() !== "") {
    // Ensure the URL is valid-looking
    if (!options.loraUrl.startsWith('http') && options.loraUrl !== 'test-lora-url') {
      console.warn(`Invalid LoRA URL: ${options.loraUrl}. URLs should start with http/https.`);
    } else {
      // For test LoRA on Fall Guys, use a special case with max strength
      const isFallGuysTest = options.loraUrl === 'test-lora-url';
      
      // Ensure we use the exact parameter names expected by the API
      body.loraUrl = options.loraUrl;
      
      // Parse and validate loraStrength
      let strength = parseFloat(String(options.loraStrength));
      if (isNaN(strength) || strength < 0.1 || strength > 1.0) {
        console.warn(`Invalid LoRA strength: ${options.loraStrength}. Setting to default 0.7`);
        strength = 0.7;
      }
      
      // Use maximum strength for test LoRA and round to ensure consistency
      if (isFallGuysTest) {
        strength = 1.0;
        console.log("Using test LoRA for Fall Guys with maximum strength of 1.0");
      } else {
        // Round to 1 decimal place for consistency
        strength = Math.round(strength * 10) / 10;
      }
      
      body.loraStrength = strength;
      
      console.log(`Using LoRA with URL: ${body.loraUrl} and strength: ${body.loraStrength}`);
    }
  } else {
    console.log("No LoRA specified, using base model");
    // Explicitly set empty LoRA parameters to ensure clean generation
    body.loraUrl = "";
    body.loraStrength = 0;
  }
  
  try {
    console.log("Invoking replicate-image function with body:", JSON.stringify(body, null, 2));
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
