
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
    generationStatus,
    cancelGeneration,
  } = useReplicateGeneration();

  const handleImageGenerate = async () => {
    setIsGenerating(true);
    try {
      const character = unlockedCharacters.find(char => char.id === selectedCharacter);
      
      if (!character) {
        throw new Error("Character not found");
      }
      
      console.log(`Generating image with LoRA: ${character.loraFileId}, strength: ${loraStrength}`);
      
      // Use the Replicate generation if we have a LoRA file URL
      if (character.loraFileUrl) {
        // Start the generation process
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
          // and reflected in the UI automatically
          if (character) {
            updateCharacterLastUsed(character.id);
          }
        }
      } else {
        // Fallback to placeholder for demo purposes
        setTimeout(() => {
          setGeneratedImageUrl("https://picsum.photos/512/512");
          setIsGenerating(false);
          
          // Update the last used timestamp for the character
          if (character) {
            updateCharacterLastUsed(character.id);
          }
        }, 2000);
      }
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

  // Sync the isGenerating state with the Replicate generation status
  if (!isGenerating && replicateIsGenerating) {
    setIsGenerating(true);
  } else if (isGenerating && !replicateIsGenerating && generationStatus !== "processing") {
    setIsGenerating(false);
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
