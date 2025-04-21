import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCharacterManagement } from "./use-character-management";
import { useReplicateGeneration } from "./use-replicate-generation";
import { useErrorHandler } from "@/utils/error-handling";
import { useAuth } from "@/components/AuthProvider";
import { useCharacters } from "./use-characters";
import { useAdminCheck } from "./use-admin-check";
import { useCharacterTriggerWords } from "./use-character-trigger-words";
import { useCharacterData } from "./use-character-data";
import { useGenerationOptions } from "./use-generation-options";
import { getDefaultLoraStrength } from "@/utils/lora-util";

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");
  
  const { toast } = useToast();
  const { handleGenerationError } = useErrorHandler();
  const { user } = useAuth();
  const { characters } = useCharacters();
  const { userIsAdmin } = useAdminCheck();
  const { enhancePromptWithTriggerWords } = useCharacterTriggerWords();
  const { getCharacterInfoById } = useCharacterData();
  const { createGenerationOptions } = useGenerationOptions();
  
  const {
    selectedCharacter,
    setSelectedCharacter,
    unlockedCharacters,
    loraStrength,
    setLoraStrength,
    updateCharacterLastUsed,
    fetchUnlockedCharacters
  } = useCharacterManagement();
  
  const { 
    generateImage: replicateGenerateImage,
    isGenerating: replicateIsGenerating,
    generatedImageUrl: replicateGeneratedImageUrl,
    generationStatus,
    generationError: replicateGenerationError,
    cancelGeneration,
  } = useReplicateGeneration();

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  useEffect(() => {
    const autoSelectCharacter = async () => {
      // If admin, we keep the current selection
      if (user && userIsAdmin) {
        return;
      }
      
      // For regular users, auto-select the first unlocked character
      if (!selectedCharacter && unlockedCharacters.length > 0) {
        console.log("Auto-selecting first character:", unlockedCharacters[0].id);
        setSelectedCharacter(unlockedCharacters[0].id);
      }
    };
    
    autoSelectCharacter();
  }, [selectedCharacter, unlockedCharacters, setSelectedCharacter, user, userIsAdmin]);

  useEffect(() => {
    if (replicateGenerationError) {
      setGenerationError(replicateGenerationError);
    } else {
      setGenerationError("");
    }
  }, [replicateGenerationError]);

  useEffect(() => {
    if (selectedCharacter && unlockedCharacters.length > 0) {
      const char = unlockedCharacters.find(c => c.id === selectedCharacter);
      const effective = getDefaultLoraStrength(char);
      if (loraStrength !== effective) setLoraStrength(effective);
    }
  }, [selectedCharacter, unlockedCharacters]);

  const handleImageGenerate = async () => {
    setGenerationError("");
    try {
      if (!userIsAdmin) {
        if (unlockedCharacters.length === 0) {
          console.log("No unlocked characters available");
          throw new Error("No characters available. Please unlock a character first.");
        }

        if (!selectedCharacter) {
          console.log("No character selected");
          throw new Error("Please select a character first");
        }
        
        const character = unlockedCharacters.find(char => char.id === selectedCharacter);
        
        if (!character) {
          console.log(`Character not found: ${selectedCharacter}. Available characters:`, 
            unlockedCharacters.map(c => c.id));
          throw new Error("Character not found. Please select a different character.");
        }
      }

      // For admins, find the character in the full list of characters
      const selectedCharInfo = userIsAdmin && selectedCharacter 
        ? getCharacterInfoById(selectedCharacter, characters)
        : getCharacterInfoById(selectedCharacter, unlockedCharacters);
      
      console.log(`Generating image with character: ${selectedCharInfo?.name}, strength: ${loraStrength}`);
      
      const enhancedPrompt = enhancePromptWithTriggerWords(prompt, selectedCharacter);
      
      const generationOptions = createGenerationOptions(
        enhancedPrompt, 
        selectedCharInfo, 
        loraStrength
      );
      
      const success = await replicateGenerateImage(generationOptions, userIsAdmin);
      
      if (success && selectedCharacter) {
        updateCharacterLastUsed(selectedCharacter);
      }
    } catch (error) {
      console.error("Error in handleImageGenerate:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleGenerationError(error, "Image");
    }
  };

  useEffect(() => {
    if (!isGenerating && replicateIsGenerating) {
      setIsGenerating(true);
    } else if (isGenerating && !replicateIsGenerating && generationStatus !== "processing") {
      setIsGenerating(false);
    }
  }, [replicateIsGenerating, generationStatus, isGenerating]);

  useEffect(() => {
    if (replicateGeneratedImageUrl && replicateGeneratedImageUrl !== generatedImageUrl) {
      setGeneratedImageUrl(replicateGeneratedImageUrl);
    }
  }, [replicateGeneratedImageUrl, generatedImageUrl]);

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedImageUrl,
    generationError,
    handleImageGenerate,
    setGeneratedImageUrl,
    generationStatus,
    cancelGeneration,
    selectedCharacter,
    setSelectedCharacter,
    loraStrength,
    setLoraStrength
  };
};
