
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
    
    // Enhanced error handling for API key
    if (!REPLICATE_API_KEY) {
      console.error("ERROR: REPLICATE_IMAGEGEN_KEY environment variable is not set");
      return new Response(JSON.stringify({ 
        error: "REPLICATE_IMAGEGEN_KEY is not configured",
        details: "The API key for Replicate is missing in the environment variables."
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    console.log("Using REPLICATE_IMAGEGEN_KEY: " + REPLICATE_API_KEY.substring(0, 4) + "..." + REPLICATE_API_KEY.substring(REPLICATE_API_KEY.length - 4));
    
    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    });

    const body = await req.json()
    console.log("Request body:", JSON.stringify(body))

    // If it's a cancel request
    if (body.predictionId && body.cancel) {
      console.log("Canceling prediction:", body.predictionId)
      try {
        await replicate.predictions.cancel(body.predictionId)
        return new Response(JSON.stringify({ status: "canceled" }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (cancelError) {
        console.error("Error canceling prediction:", cancelError)
        return new Response(JSON.stringify({ 
          error: "Failed to cancel prediction",
          details: cancelError.message 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        })
      }
    }

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId)
      try {
        const prediction = await replicate.predictions.get(body.predictionId)
        console.log("Status check response:", prediction)
        return new Response(JSON.stringify(prediction), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (statusError) {
        console.error("Error checking prediction status:", statusError)
        return new Response(JSON.stringify({ 
          error: "Failed to check prediction status",
          details: statusError.message 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        })
      }
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

    // Setup the base input
    const input: Record<string, any> = {
      prompt: body.prompt,
      negative_prompt: body.negativePrompt || "",
      width: body.width || 512,
      height: body.height || 512,
      num_outputs: body.numOutputs || 1,
      scheduler: body.scheduler || "K_EULER",
      num_inference_steps: body.steps || 30,
      guidance_scale: body.guidanceScale || 7.5,
    };
    
    let prediction;
    
    // If there's a LoRA URL, use the cloneofsimo/lora model
    if (body.loraUrl) {
      console.log("Using cloneofsimo/lora model with LoRA:", body.loraUrl, "strength:", body.loraStrength || 0.7);
      
      try {
        // Updated to a currently valid model version for LoRA
        prediction = await replicate.predictions.create({
          version: "6677de4c1108133a4c1837da1da9c8bbaea6b2c2836970f0fb7c83443869eda5", // Updated LoRA model version
          input: {
            ...input,
            lora_urls: body.loraUrl,
            lora_scales: body.loraStrength || 0.7,
          }
        });
      } catch (loraError) {
        console.error("Error creating LoRA prediction:", loraError);
        return new Response(JSON.stringify({ 
          error: "Failed to create LoRA prediction",
          details: loraError.message 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }
    } else {
      // Fallback to standard Stability AI model
      console.log("Using standard Stability AI model");
      try {
        // Updated to a currently valid model version for SDXL
        prediction = await replicate.predictions.create({
          version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b", // Updated SDXL model version
          input: input
        });
      } catch (sdxlError) {
        console.error("Error creating SDXL prediction:", sdxlError);
        return new Response(JSON.stringify({ 
          error: "Failed to create SDXL prediction",
          details: sdxlError.message 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }
    }

    console.log("Prediction created:", prediction);
    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in replicate function:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "This might be related to API key issues, model versions, or configuration problems with Replicate."
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
