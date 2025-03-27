
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
    
    // Properly check for LoRA information
    if (characterInfo) {
      // Log character info to help with debugging
      console.log("Character info for generation:", characterInfo);
      
      if ('loraFileId' in characterInfo && characterInfo.loraFileId && 
          'loraFileUrl' in characterInfo && characterInfo.loraFileUrl) {
        console.log(`Setting LoRA URL: ${characterInfo.loraFileUrl} with strength: ${loraStrength}`);
        generationOptions.loraUrl = characterInfo.loraFileUrl;
        generationOptions.loraStrength = loraStrength;
      } else {
        console.log("Character does not have valid LoRA information");
      }
    }
    
    return generationOptions;
  };

  return {
    createGenerationOptions
  };
};
