
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCharacterManagement } from "./use-character-management";

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

  const handleImageGenerate = async () => {
    setIsGenerating(true);
    try {
      const character = unlockedCharacters.find(char => char.id === selectedCharacter);
      
      if (!character) {
        throw new Error("Character not found");
      }
      
      // In a real implementation, we would call our backend API with the LoRA file information
      console.log(`Generating image with LoRA: ${character.loraFileId}, strength: ${loraStrength}`);
      
      // For now, just show a placeholder
      setTimeout(() => {
        setGeneratedImageUrl("https://picsum.photos/512/512");
        setIsGenerating(false);
        
        // Update the last used timestamp for the character
        if (character) {
          updateCharacterLastUsed(character.id);
        }
      }, 2000);
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedImageUrl,
    handleImageGenerate,
    setGeneratedImageUrl
  };
};
