
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
    
    // Enhanced validation for LoRA information
    if (characterInfo) {
      // For test data (Fall Guys), handle special case
      const isFallGuysTest = characterInfo.id === "12" && characterInfo.loraFileId === "test-lora-id";
      
      // Check if there's valid LoRA data available
      const hasValidLoraData = 
        (characterInfo.loraFileId && characterInfo.loraFileId.length > 0 && 
         characterInfo.loraFileUrl && characterInfo.loraFileUrl.length > 0) || 
        isFallGuysTest;
      
      if (hasValidLoraData) {
        console.log(`Adding LoRA URL: ${characterInfo.loraFileUrl} with strength: ${loraStrength}`);
        
        // Ensure we use the explicit URL field name expected by the API
        generationOptions.loraUrl = characterInfo.loraFileUrl;
        
        // Force loraStrength to be a number within valid range (0.1 to 1.0)
        const numericStrength = parseFloat(String(loraStrength));
        
        if (isNaN(numericStrength) || numericStrength < 0.1 || numericStrength > 1.0) {
          console.warn(`Invalid LoRA strength: ${loraStrength}. Setting to default 0.7`);
          generationOptions.loraStrength = 0.7;
        } else {
          generationOptions.loraStrength = numericStrength;
        }
        
        // For Fall Guys test, ensure maximum strength
        if (isFallGuysTest) {
          generationOptions.loraStrength = 1.0;
          console.log("Using test LoRA for Fall Guys with maximum strength of 1.0");
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
    }
    
    return generationOptions;
  };

  return {
    createGenerationOptions
  };
};
