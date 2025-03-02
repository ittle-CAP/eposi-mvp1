import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_IMAGEGEN_KEY')
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_IMAGEGEN_KEY is not set')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    });

    const body = await req.json()

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId)
      const prediction = await replicate.predictions.get(body.predictionId)
      console.log("Status check response:", prediction)
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If it's a generation request
    if (!body.prompt) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required field: prompt is required" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Default to SDXL if no specific model is specified
    const modelVersion = body.modelVersion || "stability-ai/sdxl";
    const loraUrl = body.loraUrl || null;
    
    console.log(`Generating image with model: ${modelVersion}, prompt: ${body.prompt}, LoRA: ${loraUrl || 'none'}`);
    
    // Setup the base input
    const input = {
      prompt: body.prompt,
      negative_prompt: body.negativePrompt || "",
      width: body.width || 512,
      height: body.height || 512,
      num_outputs: body.numOutputs || 1,
      scheduler: body.scheduler || "K_EULER",
      num_inference_steps: body.steps || 30,
      guidance_scale: body.guidanceScale || 7.5,
    };
    
    // Create a prediction using either the standard model or with LoRA
    let prediction;
    
    if (loraUrl) {
      // If we have a LoRA URL, use the cloneofsimo/lora model
      console.log("Using cloneofsimo/lora model with LoRA:", loraUrl);
      
      prediction = await replicate.predictions.create({
        version: "cloneofsimo/lora:d074a7cd2291bc3bbd599a6b9b1236f56d71baba07e38136b2385b720969dee2",
        input: {
          ...input,
          lora_urls: loraUrl,
          lora_scales: body.loraStrength || 0.7,
        }
      });
    } else {
      // Otherwise use the standard diffusion model
      prediction = await replicate.predictions.create({
        version: modelVersion,
        input: input
      });
    }

    console.log("Prediction created:", prediction);
    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in replicate function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
