import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'apikey, Authorization, X-Client-Info, Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
};

// Replicate API calls
const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_IMAGEGEN_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...corsHeaders,
      },
    });
  }

  try {
    const reqJson = await req.json();

    // Check if this is a request to get the status of a prediction
    if (reqJson.predictionId) {
      // Check if we're cancelling the prediction
      if (reqJson.cancel) {
        return await cancelPrediction(reqJson.predictionId);
      }
      // Otherwise check the status
      return await checkPredictionStatus(reqJson.predictionId);
    }

    // If not fetching status, this is a new prediction request
    return await createPrediction(reqJson);
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
});

async function createPrediction(options: any) {
  console.log('Starting prediction with options:', JSON.stringify(options));

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

  // Base model to use
  const model = "black-forest-labs/flux-dev-lora";
  
  // Build API request body
  const replicateBody: Record<string, any> = {
    version: model,
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

  // Add LoRA settings if provided
  if (options.loraUrl && options.loraUrl.trim() !== "") {
    console.log(`Using LoRA URL: ${options.loraUrl}`);
    replicateBody.input.lora_url = options.loraUrl;
    replicateBody.input.lora_scale = options.loraStrength || 0.7;
  }

  console.log('Final Replicate API request:', JSON.stringify(replicateBody));

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
    
    return new Response(JSON.stringify({
      id: prediction.id,
      status: prediction.status,
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    return new Response(JSON.stringify({ error: `Error calling Replicate API: ${error.message}` }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

async function checkPredictionStatus(predictionId: string) {
  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ error: `Error checking prediction status: ${error.detail || JSON.stringify(error)}` }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: response.status,
      });
    }

    const prediction = await response.json();
    console.log(`Status for prediction ${predictionId}:`, prediction.status);
    
    // Map Replicate status to our custom format
    let status = prediction.status;
    if (status === "succeeded") {
      status = "succeeded";
    } else if (status === "failed") {
      status = "failed";
    } else {
      status = "processing";
    }

    return new Response(JSON.stringify({
      id: prediction.id,
      status: status,
      output: prediction.output,
      error: prediction.error,
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error checking prediction status:', error);
    return new Response(JSON.stringify({ error: `Error checking prediction status: ${error.message}` }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}

async function cancelPrediction(predictionId: string) {
  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ error: `Error cancelling prediction: ${error.detail || JSON.stringify(error)}` }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: response.status,
      });
    }

    return new Response(JSON.stringify({
      id: predictionId,
      status: "canceled",
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error cancelling prediction:', error);
    return new Response(JSON.stringify({ error: `Error cancelling prediction: ${error.message}` }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
