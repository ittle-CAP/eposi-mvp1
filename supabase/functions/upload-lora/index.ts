
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is authenticated and has admin permissions
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: authError?.message }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Check if user has admin role
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profileData?.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin permission required to upload LoRA files" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        }
      );
    }

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file");
    const characterId = formData.get("characterId");
    const fileName = formData.get("fileName");
    const strength = formData.get("strength") || "0.7";

    if (!file || !characterId) {
      return new Response(
        JSON.stringify({ error: "File and characterId are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Sanitize file name and create a unique path
    const sanitizedFileName = (fileName as string).replace(/[^\x00-\x7F]/g, "");
    const fileExt = sanitizedFileName.split(".").pop() || "safetensors";
    const filePath = `${characterId}/${crypto.randomUUID()}.${fileExt}`;

    // Upload the file to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("character_loras")
      .upload(filePath, file, {
        contentType: "application/octet-stream",
        upsert: true,
      });

    if (storageError) {
      console.error("Storage error:", storageError);
      return new Response(
        JSON.stringify({ error: "Failed to upload file", details: storageError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Get the public URL for the file
    const { data: publicUrlData } = supabase.storage
      .from("character_loras")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Insert record into character_loras table
    const { data: loraData, error: loraError } = await supabase
      .from("character_loras")
      .insert({
        character_id: characterId,
        file_name: sanitizedFileName,
        file_url: publicUrl,
        strength: parseFloat(strength as string),
      })
      .select()
      .single();

    if (loraError) {
      console.error("Database error:", loraError);
      return new Response(
        JSON.stringify({ error: "Failed to save LoRA metadata", details: loraError }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "LoRA uploaded successfully",
        lora: loraData,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
