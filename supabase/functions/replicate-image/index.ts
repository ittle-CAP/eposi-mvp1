import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./constants.ts";
import { createPrediction } from "./create-prediction.ts";
import { checkPredictionStatus } from "./check-prediction.ts";
import { cancelPrediction } from "./cancel-prediction.ts";
import { createErrorResponse } from "./utils.ts";

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
    return createErrorResponse(error.message);
  }
});
