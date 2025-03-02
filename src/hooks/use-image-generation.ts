
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCharacterManagement } from "./use-character-management";
import { useReplicateGeneration } from "./use-replicate-generation";

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const { toast } = useToast();
  const {
    selectedCharacter,
    unlockedCharacters,
    loraStrength,
    updateCharacterLastUsed
  } = useCharacterManagement();
  
  const { 
    generateImage: replicateGenerateImage,
    isGenerating: replicateIsGenerating,
    generatedImageUrl: replicateGeneratedImageUrl,
    generationStatus,
    cancelGeneration,
  } = useReplicateGeneration();

  const handleImageGenerate = async () => {
    try {
      const character = unlockedCharacters.find(char => char.id === selectedCharacter);
      
      if (!character) {
        throw new Error("Character not found");
      }
      
      console.log(`Generating image with LoRA: ${character.loraFileId}, strength: ${loraStrength}`);
      
      // Start the generation process with Replicate
      const success = await replicateGenerateImage({
        prompt: prompt,
        loraUrl: character.loraFileUrl,
        loraStrength: loraStrength,
        width: 512,
        height: 512,
        steps: 30
      });
      
      if (success) {
        // The image URL will be updated by the useReplicateGeneration hook
        if (character) {
          updateCharacterLastUsed(character.id);
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    }
  };

  // Sync the isGenerating state with the Replicate generation status
  if (!isGenerating && replicateIsGenerating) {
    setIsGenerating(true);
  } else if (isGenerating && !replicateIsGenerating && generationStatus !== "processing") {
    setIsGenerating(false);
  }

  // Use the generated image URL from the Replicate hook
  if (replicateGeneratedImageUrl && replicateGeneratedImageUrl !== generatedImageUrl) {
    setGeneratedImageUrl(replicateGeneratedImageUrl);
  }

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedImageUrl,
    handleImageGenerate,
    setGeneratedImageUrl,
    generationStatus,
    cancelGeneration
  };
};
