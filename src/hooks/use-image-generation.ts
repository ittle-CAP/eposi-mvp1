import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCharacterManagement } from "./use-character-management";
import { useReplicateGeneration } from "./use-replicate-generation";
import { ReplicateGenerationOptions } from "@/types/replicate";
import { useErrorHandler } from "@/utils/error-handling";
import { isAdmin } from "@/utils/permissions";
import { useAuth } from "@/components/AuthProvider";
import { useCharacters } from "./use-characters";

const CHARACTER_TRIGGER_WORDS: Record<string, string[]> = {
  "8": ["zavy-hdlsshrsmn"],
  "1": [],
  "2": [],
  "7": [],
  "11": ["mikus-style"],
  "12": ["fallguys character"],
  "13": ["minecraft filter"]
};

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");
  const { toast } = useToast();
  const { handleGenerationError } = useErrorHandler();
  const { user } = useAuth();
  const { characters } = useCharacters();
  
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
      if (user) {
        const userIsAdmin = await isAdmin(user.id);
        if (userIsAdmin) return;
      }
      
      // For regular users, auto-select the first unlocked character
      if (!selectedCharacter && unlockedCharacters.length > 0) {
        console.log("Auto-selecting first character:", unlockedCharacters[0].id);
        setSelectedCharacter(unlockedCharacters[0].id);
      }
    };
    
    autoSelectCharacter();
  }, [selectedCharacter, unlockedCharacters, setSelectedCharacter, user]);

  useEffect(() => {
    if (replicateGenerationError) {
      setGenerationError(replicateGenerationError);
    } else {
      setGenerationError("");
    }
  }, [replicateGenerationError]);

  const handleImageGenerate = async () => {
    setGenerationError("");
    try {
      let userIsAdmin = false;
      if (user) {
        userIsAdmin = await isAdmin(user.id);
      }

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
          console.log(`Character not found: ${selectedCharacter}. Available characters:`, unlockedCharacters.map(c => c.id));
          throw new Error("Character not found. Please select a different character.");
        }
      }

      const allCharactersData = {
        "8": {
          name: "The Headless Horseman",
          genre: "Horror"
        },
        "1": {
          name: "Luna",
          genre: "Fantasy"
        },
        "2": {
          name: "Neo",
          genre: "Sci-fi"
        },
        "7": {
          name: "Mountain King",
          genre: "Fantasy"
        },
        "11": {
          name: "Among Us",
          genre: "Gaming"
        },
        "12": {
          name: "Fall Guys",
          genre: "Gaming"
        },
        "13": {
          name: "Minecraft",
          genre: "Style"
        }
      };

      // For admins, find the character in the full list of characters
      let selectedCharInfo;
      if (userIsAdmin && selectedCharacter) {
        selectedCharInfo = characters.find(char => char.id === selectedCharacter);
      } else {
        selectedCharInfo = unlockedCharacters.find(char => char.id === selectedCharacter) || 
          { id: selectedCharacter, name: allCharactersData[selectedCharacter as keyof typeof allCharactersData]?.name || "Unknown Character" };
      }
      
      console.log(`Generating image with character: ${selectedCharInfo?.name}, strength: ${loraStrength}`);
      
      const triggerWords = CHARACTER_TRIGGER_WORDS[selectedCharacter] || [];
      
      let enhancedPrompt = prompt;
      if (triggerWords.length > 0) {
        enhancedPrompt = `${prompt}, ${triggerWords.join(', ')}`.trim();
        console.log(`Applied hidden trigger words for ${selectedCharInfo?.name}: ${triggerWords.join(', ')}`);
      }
      
      const generationOptions: ReplicateGenerationOptions = {
        prompt: enhancedPrompt,
        width: 512,
        height: 512,
        steps: 30
      };
      
      if (selectedCharInfo && 'loraFileId' in selectedCharInfo && selectedCharInfo.loraFileId) {
        if ('loraFileUrl' in selectedCharInfo && selectedCharInfo.loraFileUrl) {
          generationOptions.loraUrl = selectedCharInfo.loraFileUrl;
          generationOptions.loraStrength = loraStrength;
        }
      }
      
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
