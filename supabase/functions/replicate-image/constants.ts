
// CORS headers for preflight requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'apikey, Authorization, X-Client-Info, Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
};

// Replicate API token
export const REPLICATE_API_TOKEN = Deno.env.get('REPLICATE_IMAGEGEN_KEY');

// Default model to use
export const DEFAULT_MODEL = "black-forest-labs/flux-dev-lora";
