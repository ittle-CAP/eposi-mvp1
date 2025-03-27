
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCharacterManagement } from "./use-character-management";
import { useReplicateGeneration } from "./use-replicate-generation";
import { ReplicateGenerationOptions } from "@/types/replicate";
import { useErrorHandler } from "@/utils/error-handling";
import { isAdmin } from "@/utils/permissions";
import { useAuth } from "@/components/AuthProvider";

// Define trigger words for characters
const CHARACTER_TRIGGER_WORDS: Record<string, string[]> = {
  "8": ["zavy-hdlsshrsmn"], // The Headless Horseman
  "1": [], // Luna
  "2": [], // Neo
  "7": [], // Mountain King
  "11": ["mikus-style"], // Among Us
  "12": ["fallguys character"], // Fall Guys
  "13": ["minecraft filter"] // Minecraft Style
};

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");
  const { toast } = useToast();
  const { handleGenerationError } = useErrorHandler();
  const { user } = useAuth();
  
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

  // Ensure the characters are loaded
  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  // Automatically select the first character if none is selected and characters are available
  useEffect(() => {
    if (!selectedCharacter && unlockedCharacters.length > 0) {
      console.log("Auto-selecting first character:", unlockedCharacters[0].id);
      setSelectedCharacter(unlockedCharacters[0].id);
    }
  }, [selectedCharacter, unlockedCharacters, setSelectedCharacter]);

  // Track error state from Replicate
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
      // Check if the user is admin
      let userIsAdmin = false;
      if (user) {
        userIsAdmin = await isAdmin(user.id);
      }

      // For admin users, we'll bypass character unlock checks
      if (!userIsAdmin) {
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
      }
      
      // Get the selected character - for admins, this might be a character they haven't unlocked yet
      const allCharactersData = {
        "8": {
          name: "The Headless Horseman",
          genre: "Horror",
        },
        "1": {
          name: "Luna",
          genre: "Fantasy",
        },
        "2": {
          name: "Neo",
          genre: "Sci-fi",
        },
        "7": {
          name: "Mountain King",
          genre: "Fantasy",
        },
        "11": {
          name: "Among Us",
          genre: "Gaming",
        },
        "12": {
          name: "Fall Guys",
          genre: "Gaming",
        },
        "13": {
          name: "Minecraft",
          genre: "Style",
        }
      };
      
      const selectedCharInfo = unlockedCharacters.find(char => char.id === selectedCharacter) || 
        { id: selectedCharacter, name: allCharactersData[selectedCharacter as keyof typeof allCharactersData]?.name || "Unknown Character" };
      
      console.log(`Generating image with character: ${selectedCharInfo.name}, strength: ${loraStrength}`);
      
      // Get character-specific trigger words
      const triggerWords = CHARACTER_TRIGGER_WORDS[selectedCharacter] || [];
      
      // Append trigger words to the user's prompt if they exist
      let enhancedPrompt = prompt;
      if (triggerWords.length > 0) {
        enhancedPrompt = `${prompt}, ${triggerWords.join(', ')}`.trim();
        console.log(`Applied hidden trigger words for ${selectedCharInfo.name}: ${triggerWords.join(', ')}`);
      }
      
      // Prepare generation options
      const generationOptions: ReplicateGenerationOptions = {
        prompt: enhancedPrompt,
        width: 512,
        height: 512,
        steps: 30
      };
      
      // Only add LoRA options if the character has a LoRA file
      if (selectedCharInfo.loraFileUrl) {
        generationOptions.loraUrl = selectedCharInfo.loraFileUrl;
        generationOptions.loraStrength = loraStrength;
      }
      
      // Start the generation process with Replicate
      // Admin users will bypass credit checks in the Replicate hook
      const success = await replicateGenerateImage(generationOptions, userIsAdmin);
      
      if (success && selectedCharacter) {
        // The image URL will be updated by the useReplicateGeneration hook
        updateCharacterLastUsed(selectedCharacter);
      }
    } catch (error) {
      console.error("Error in handleImageGenerate:", error);
      setGenerationError(error instanceof Error ? error.message : String(error));
      handleGenerationError(error, "Image");
    }
  };

  // Sync the isGenerating state with the Replicate generation status
  useEffect(() => {
    if (!isGenerating && replicateIsGenerating) {
      setIsGenerating(true);
    } else if (isGenerating && !replicateIsGenerating && generationStatus !== "processing") {
      setIsGenerating(false);
    }
  }, [replicateIsGenerating, generationStatus, isGenerating]);

  // Use the generated image URL from the Replicate hook
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
