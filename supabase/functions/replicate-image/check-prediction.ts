
import { corsHeaders, REPLICATE_API_TOKEN } from "./constants.ts";
import { createErrorResponse, createSuccessResponse } from "./utils.ts";

export async function checkPredictionStatus(predictionId: string) {
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
      return createErrorResponse(`Error checking prediction status: ${error.detail || JSON.stringify(error)}`, response.status);
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

    return createSuccessResponse({
      id: prediction.id,
      status: status,
      output: prediction.output,
      error: prediction.error,
    });
  } catch (error) {
    console.error('Error checking prediction status:', error);
    return createErrorResponse(`Error checking prediction status: ${error.message}`, 500);
  }
}
