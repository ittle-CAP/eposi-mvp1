
import { useState, useEffect } from "react";
import { Character } from "@/types/character";
import { useReplicateGeneration } from "@/hooks/use-replicate-generation";
import { useAuth } from "@/components/AuthProvider";
import { isAdmin } from "@/utils/permissions";
import { useCharacters } from "@/hooks/use-characters";
import { CharacterSelection } from "./components/CharacterSelection";
import { PromptInput } from "./components/PromptInput";
import { CharacterStrengthSlider } from "./components/CharacterStrengthSlider";
import { GenerationControls } from "./components/GenerationControls";
import { ImagePreview } from "./components/ImagePreview";

interface ImageGenerationFormProps {
  selectedCharacter: string;
  setSelectedCharacter: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedImageUrl: string;
  unlockedCharacters: Character[];
  loraStrength?: number;
  setLoraStrength?: (value: number) => void;
  generationStatus?: string;
  cancelGeneration?: () => void;
}

export const ImageGenerationForm = ({
  selectedCharacter,
  setSelectedCharacter,
  prompt,
  setPrompt,
  isGenerating: parentIsGenerating,
  handleGenerate: parentHandleGenerate,
  generatedImageUrl: parentGeneratedImageUrl,
  unlockedCharacters,
  loraStrength = 0.7,
  setLoraStrength,
  generationStatus,
  cancelGeneration
}: ImageGenerationFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useAuth();
  const { characters } = useCharacters();
  
  const { 
    generationError,
  } = useReplicateGeneration();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setIsUserAdmin(adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  // Track errors from the Replicate generation hook
  useEffect(() => {
    if (generationError) {
      setError(generationError);
    } else {
      setError(null);
    }
  }, [generationError]);

  // Determine which characters to display in the dropdown
  const displayCharacters = isUserAdmin ? characters : unlockedCharacters;
  const selectedCharacterData = displayCharacters.find(char => char.id === selectedCharacter);

  const handleReplicateGenerate = () => {
    setError(null);
    
    if (parentIsGenerating && cancelGeneration) {
      cancelGeneration();
      return;
    }
    
    // Use the parent generation method which is connected to useImageGeneration
    parentHandleGenerate();
  };

  // Determine which loading state to use
  const activeIsGenerating = parentIsGenerating;

  return (
    <div>
      <CharacterSelection 
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
        displayCharacters={displayCharacters}
      />

      <PromptInput 
        prompt={prompt}
        setPrompt={setPrompt}
      />

      {selectedCharacterData?.loraFileId && setLoraStrength && (
        <CharacterStrengthSlider 
          loraStrength={loraStrength}
          setLoraStrength={setLoraStrength}
        />
      )}

      <GenerationControls 
        error={error}
        isGenerating={activeIsGenerating}
        generationStatus={generationStatus}
        handleGenerate={handleReplicateGenerate}
        disableGenerateButton={!selectedCharacter || !prompt || (activeIsGenerating && generationStatus !== "processing")}
      />

      <ImagePreview imageUrl={parentGeneratedImageUrl} />
    </div>
  );
};
