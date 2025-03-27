
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLoraUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedLoraId, setUploadedLoraId] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadLoraFile = async (file: File, characterId: string, strength: number = 0.7) => {
    if (!file || !characterId) {
      toast({
        title: "Error",
        description: "File and character ID are required",
        variant: "destructive",
      });
      return null;
    }

    // Check file extension
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (fileExt !== "safetensors") {
      toast({
        title: "Invalid file type",
        description: "Only .safetensors files are supported for LoRA uploads",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Get the current session for authentication
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to upload LoRA files",
          variant: "destructive",
        });
        return null;
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("characterId", characterId);
      formData.append("fileName", file.name);
      formData.append("strength", strength.toString());

      // Initialize progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 5;
          return newProgress < 90 ? newProgress : prev;
        });
      }, 500);

      // Call the edge function to upload the file with auth token
      const { data, error } = await supabase.functions.invoke("upload-lora", {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        console.error("Error uploading LoRA:", error);
        toast({
          title: "Upload Failed",
          description: error.message || "Failed to upload LoRA file",
          variant: "destructive",
        });
        return null;
      }

      // Update the unlocked_characters table with the new LoRA file ID
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const { error: updateError } = await supabase
          .from("unlocked_characters")
          .update({
            lora_file_id: data.lora.id,
            lora_strength: strength,
          })
          .eq("user_id", user.user.id)
          .eq("character_id", characterId);

        if (updateError) {
          console.error("Error updating character with LoRA:", updateError);
          toast({
            title: "Update Failed",
            description: "Failed to associate LoRA with character",
            variant: "destructive",
          });
          return null;
        }
      }

      setUploadedLoraId(data.lora.id);
      toast({
        title: "Upload Successful",
        description: "LoRA file has been uploaded and associated with the character",
      });

      return data.lora;
    } catch (err) {
      console.error("Unexpected error during LoRA upload:", err);
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadLoraFile,
    isUploading,
    uploadProgress,
    uploadedLoraId,
  };
};
