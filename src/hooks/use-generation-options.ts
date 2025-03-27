
import { ReplicateGenerationOptions } from "@/types/replicate";

/**
 * Hook for creating and managing generation options
 */
export const useGenerationOptions = () => {
  const createGenerationOptions = (
    prompt: string, 
    characterInfo: any, 
    loraStrength: number
  ): ReplicateGenerationOptions => {
    const generationOptions: ReplicateGenerationOptions = {
      prompt,
      width: 512,
      height: 512,
      steps: 30
    };
    
    if (characterInfo && 'loraFileId' in characterInfo && characterInfo.loraFileId) {
      if ('loraFileUrl' in characterInfo && characterInfo.loraFileUrl) {
        generationOptions.loraUrl = characterInfo.loraFileUrl;
        generationOptions.loraStrength = loraStrength;
      }
    }
    
    return generationOptions;
  };

  return {
    createGenerationOptions
  };
};
