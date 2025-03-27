
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
      
      // More robust check for LoRA data - must have both an ID and URL
      if (characterInfo.loraFileId && characterInfo.loraFileId.length > 0 && 
          characterInfo.loraFileUrl && characterInfo.loraFileUrl.length > 0) {
        console.log(`Setting LoRA URL: ${characterInfo.loraFileUrl} with strength: ${loraStrength}`);
        generationOptions.loraUrl = characterInfo.loraFileUrl;
        generationOptions.loraStrength = loraStrength;
      } else {
        console.log("Character does not have valid LoRA information:", 
                    `LoRA ID: ${characterInfo.loraFileId || 'none'}`, 
                    `LoRA URL: ${characterInfo.loraFileUrl || 'none'}`);
      }
    }
    
    return generationOptions;
  };

  return {
    createGenerationOptions
  };
};
