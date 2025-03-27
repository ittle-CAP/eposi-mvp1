
import { corsHeaders } from "./constants.ts";

export function createErrorResponse(error: unknown, status: number = 500) {
  console.error('Error creating response:', error);
  return new Response(JSON.stringify({ 
    error: error instanceof Error ? error.message : String(error) 
  }), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    status,
  });
}

export function createSuccessResponse(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    status,
  });
}
