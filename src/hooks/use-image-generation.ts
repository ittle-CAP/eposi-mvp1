
import { useState, useEffect } from "react";
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
    updateCharacterLastUsed,
    fetchUnlockedCharacters
  } = useCharacterManagement();
  
  const { 
    generateImage: replicateGenerateImage,
    isGenerating: replicateIsGenerating,
    generatedImageUrl: replicateGeneratedImageUrl,
    generationStatus,
    cancelGeneration,
  } = useReplicateGeneration();

  // Ensure the characters are loaded
  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  const handleImageGenerate = async () => {
    try {
      // Check if we have any unlocked characters first
      if (unlockedCharacters.length === 0) {
        console.log("No unlocked characters available");
        throw new Error("No characters available. Please unlock a character first.");
      }

      // Check if a character is selected
      if (!selectedCharacter) {
        console.log("No character selected");
        throw new Error("Please select a character first");
      }
      
      const character = unlockedCharacters.find(char => char.id === selectedCharacter);
      
      if (!character) {
        console.log(`Character not found: ${selectedCharacter}. Available characters:`, unlockedCharacters.map(c => c.id));
        throw new Error("Character not found. Please select a different character.");
      }
      
      console.log(`Generating image with character: ${character.name}, LoRA: ${character.loraFileId || 'none'}, strength: ${loraStrength}`);
      
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
        updateCharacterLastUsed(character.id);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    }
  };

  // Sync the isGenerating state with the Replicate generation status
  useEffect(() => {
    if (!isGenerating && replicateIsGenerating) {
      setIsGenerating(true);
    } else if (isGenerating && !replicateIsGenerating && generationStatus !== "processing") {
      setIsGenerating(false);
    }
  }, [replicateIsGenerating, generationStatus]);

  // Use the generated image URL from the Replicate hook
  useEffect(() => {
    if (replicateGeneratedImageUrl && replicateGeneratedImageUrl !== generatedImageUrl) {
      setGeneratedImageUrl(replicateGeneratedImageUrl);
    }
  }, [replicateGeneratedImageUrl]);

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
