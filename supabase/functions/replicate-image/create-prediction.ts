
import { corsHeaders, REPLICATE_API_TOKEN, DEFAULT_MODEL } from "./constants.ts";
import { createErrorResponse, createSuccessResponse } from "./utils.ts";

export async function createPrediction(options: any) {
  console.log('Starting prediction with options:', JSON.stringify(options, null, 2));

  // Set defaults and validate inputs
  const prompt = options.prompt;
  if (!prompt) {
    return new Response(JSON.stringify({ error: 'A prompt is required' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }

  // Build API request body
  const replicateBody: Record<string, any> = {
    version: DEFAULT_MODEL,
    input: {
      prompt: prompt,
      width: options.width || 512,
      height: options.height || 512,
      num_outputs: options.numOutputs || 1,
      scheduler: options.scheduler || "K_EULER_ANCESTRAL",
      guidance_scale: options.guidanceScale || 7.5,
      num_inference_steps: options.steps || 30,
      negative_prompt: options.negativePrompt || "ugly, blurry, low quality, distorted, disfigured",
    },
  };

  // Add seed if provided
  if (options.seed !== undefined) {
    replicateBody.input.seed = options.seed;
  }

  // Add LoRA settings if provided - ensure case matches exactly what the API expects
  if (options.loraUrl && options.loraUrl.trim() !== "") {
    console.log(`Using LoRA with URL: ${options.loraUrl} and strength: ${options.loraStrength || 0.7}`);
    
    // CRITICAL: Correctly map the parameter names used by the client to the exact names expected by the model
    // The model expects "lora_url" and "lora_scale" instead of our client's camelCase names
    replicateBody.input.lora_url = options.loraUrl;
    
    // Force explicit LoRA scale value for Fall Guys test character
    if (options.loraUrl === 'test-lora-url') {
      replicateBody.input.lora_scale = 1.0;
      console.log("Using maximum LoRA scale (1.0) for test LoRA");
    } else {
      // For other LoRAs, ensure strength is a valid number between 0.1 and 1.0
      const strength = parseFloat(options.loraStrength);
      replicateBody.input.lora_scale = !isNaN(strength) ? 
        Math.max(0.1, Math.min(1.0, strength)) : // Clamp between 0.1 and 1.0
        0.7; // Default if invalid
    }
    
    // Round to 1 decimal place for consistency
    if (typeof replicateBody.input.lora_scale === 'number') {
      replicateBody.input.lora_scale = Math.round(replicateBody.input.lora_scale * 10) / 10;
    }
    
    console.log("Added LoRA parameters:", {
      lora_url: replicateBody.input.lora_url,
      lora_scale: replicateBody.input.lora_scale
    });
  } else {
    console.log("No LoRA specified, using base model");
  }

  console.log('Final Replicate API request:', JSON.stringify(replicateBody, null, 2));

  // Call the Replicate API
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replicateBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Replicate API error:', error);
      return new Response(JSON.stringify({ error: `Replicate API error: ${error.detail || JSON.stringify(error)}` }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: response.status,
      });
    }

    const prediction = await response.json();
    console.log('Prediction created:', prediction);
    
    return createSuccessResponse({
      id: prediction.id,
      status: prediction.status,
    });
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    return createErrorResponse(`Error calling Replicate API: ${error.message}`, 500);
  }
}
