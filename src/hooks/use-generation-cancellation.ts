
import { cancelReplicatePrediction } from "@/services/replicate-service";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for handling the cancellation of ongoing generations
 */
export const useGenerationCancellation = (
  setIsGenerating: (isGenerating: boolean) => void,
  setGenerationStatus: (status: string) => void,
  setGenerationError: (error: string) => void
) => {
  const { toast } = useToast();

  const cancelGeneration = async (predictionId: string) => {
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

  return { cancelGeneration };
};
