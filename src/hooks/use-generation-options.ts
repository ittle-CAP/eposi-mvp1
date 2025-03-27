
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
    
    // More comprehensive logging for debugging
    console.log("Creating generation options with:");
    console.log("- Prompt:", prompt);
    console.log("- Character info:", characterInfo ? {
      id: characterInfo.id,
      name: characterInfo.name,
      loraFileId: characterInfo.loraFileId,
      loraFileUrl: characterInfo.loraFileUrl,
      loraStrength: loraStrength
    } : "No character info");
    
    // Check for LoRA information with strict validation
    if (characterInfo && 
        characterInfo.loraFileId && characterInfo.loraFileId.length > 0 && 
        characterInfo.loraFileUrl && characterInfo.loraFileUrl.length > 0) {
      
      console.log(`Adding LoRA URL: ${characterInfo.loraFileUrl} with strength: ${loraStrength}`);
      
      // Ensure we use the explicit URL field name expected by the API
      generationOptions.loraUrl = characterInfo.loraFileUrl;
      
      // Make sure strength is properly set as a number
      generationOptions.loraStrength = Number(loraStrength);
      
      if (isNaN(generationOptions.loraStrength)) {
        console.warn("LoRA strength was NaN, setting to default 0.7");
        generationOptions.loraStrength = 0.7;
      }
      
      console.log("Final LoRA settings:", {
        url: generationOptions.loraUrl,
        strength: generationOptions.loraStrength
      });
    } else {
      console.log("Character does not have valid LoRA information");
      if (characterInfo) {
        console.log(`LoRA ID: ${characterInfo.loraFileId || 'missing'}`);
        console.log(`LoRA URL: ${characterInfo.loraFileUrl || 'missing'}`);
      }
    }
    
    return generationOptions;
  };

  return {
    createGenerationOptions
  };
};
