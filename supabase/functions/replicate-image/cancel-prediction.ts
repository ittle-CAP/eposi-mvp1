
import { corsHeaders, REPLICATE_API_TOKEN } from "./constants.ts";
import { createErrorResponse, createSuccessResponse } from "./utils.ts";

export async function cancelPrediction(predictionId: string) {
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
      return createErrorResponse(`Error cancelling prediction: ${error.detail || JSON.stringify(error)}`, response.status);
    }

    return createSuccessResponse({
      id: predictionId,
      status: "canceled",
    });
  } catch (error) {
    console.error('Error cancelling prediction:', error);
    return createErrorResponse(`Error cancelling prediction: ${error.message}`, 500);
  }
}
