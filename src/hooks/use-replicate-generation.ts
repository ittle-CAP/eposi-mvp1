import { useState } from "react";
import { 
  startImageGeneration, 
  checkGenerationStatus, 
  cancelReplicatePrediction 
} from "@/services/replicate-service";
import { ReplicateGenerationOptions } from "@/types/replicate";
import { useErrorHandler } from "@/utils/error-handling";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabase";

export const useReplicateGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [predictionId, setPredictionId] = useState<string>("");
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");
  const { toast } = useToast();
  const { handleApiError, handleGenerationError } = useErrorHandler();

  const pollGenerationStatus = async (id: string) => {
    if (!id) return;
    
    try {
      const prediction = await checkGenerationStatus(id);
      
      console.log("Prediction status:", prediction.status, prediction);
      setGenerationStatus(prediction.status);
      
      if (prediction.status === "processing") {
        setTimeout(() => pollGenerationStatus(id), 1500);
        return;
      }
      
      if (prediction.status === "succeeded" && prediction.output && prediction.output.length > 0) {
        console.log("Generated image URL:", prediction.output[0]);
        setGeneratedImageUrl(prediction.output[0]);
        toast({
          title: "Success!",
          description: "Your image has been generated",
        });
      }
      
      if (prediction.status === "failed" || prediction.error) {
        const errorMsg = prediction.error || "Unknown generation error";
        setGenerationError(errorMsg);
        handleGenerationError(errorMsg, "Image");
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error("Error in pollGenerationStatus:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleApiError(error, "checking generation status");
      setIsGenerating(false);
      setGenerationStatus("failed");
    }
  };

  const generateImage = async (options: ReplicateGenerationOptions, isAdmin: boolean = false) => {
    if (isGenerating) {
      console.log("Generation already in progress");
      return false;
    }

    try {
      setIsGenerating(true);
      setGenerationStatus("starting");
      setGeneratedImageUrl("");
      setGenerationError("");
      
      const { data: user } = await supabase.auth.getUser();
      if (!user || !user.user) {
        setGenerationError("User not authenticated");
        setIsGenerating(false);
        return false;
      }

      if (!isAdmin) {
        const { data: subscription, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('credits_available')
          .eq('user_id', user.user.id)
          .single();

        if (subscriptionError) {
          console.error("Error fetching subscription:", subscriptionError);
          setGenerationError("Error checking credits");
          setIsGenerating(false);
          return false;
        }

        if (!subscription || subscription.credits_available < 1) {
          setGenerationError("Not enough credits");
          setIsGenerating(false);
          toast({
            title: "Not enough credits",
            description: "Please purchase more credits to generate images",
            variant: "destructive",
          });
          return false;
        }

        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            credits_available: subscription.credits_available - 1
          })
          .eq('user_id', user.user.id);

        if (updateError) {
          console.error("Error updating credits:", updateError);
          setGenerationError("Error updating credits");
          setIsGenerating(false);
          return false;
        }
      } else {
        console.log("Admin user - bypassing credit check for image generation");
      }

      if (!options.negativePrompt) {
        options.negativePrompt = "ugly, blurry, low quality, distorted, disfigured";
      }
      
      if (!options.steps || options.steps < 20) {
        options.steps = 30;
      }
      
      if (!options.seed) {
        options.seed = Math.floor(Math.random() * 2147483647);
      }
      
      console.log("Starting image generation with options:", options);
      const response = await startImageGeneration(options);

      console.log("Received generation response:", response);
      
      setPredictionId(response.id);
      setGenerationStatus("processing");
      
      await pollGenerationStatus(response.id);
      return true;
    } catch (error) {
      console.error("Error in generateImage:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleGenerationError(error, "Image");
      setIsGenerating(false);
      setGenerationStatus("failed");
      return false;
    }
  };

  const cancelGeneration = async () => {
    if (!predictionId) return;
    
    try {
      await cancelReplicatePrediction(predictionId);
      
      setIsGenerating(false);
      setGenerationStatus("canceled");
      toast({
        title: "Canceled",
        description: "Image generation was canceled",
      });
    } catch (error) {
      console.error("Error canceling generation:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      setIsGenerating(false);
      setGenerationStatus("canceled");
    }
  };

  return {
    isGenerating,
    generatedImageUrl,
    generationStatus,
    generationError,
    generateImage,
    cancelGeneration
  };
};
