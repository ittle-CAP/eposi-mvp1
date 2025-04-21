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
import { useCharacterData } from "@/hooks/use-character-data";
import { getDefaultLoraStrength, hasLora } from "@/utils/lora-util";

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
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setIsUserAdmin(adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  useEffect(() => {
    if (generationError) {
      setError(generationError);
    } else {
      setError(null);
    }
  }, [generationError]);

  const displayCharacters = isUserAdmin ? characters : unlockedCharacters;
  const selectedCharacterData = displayCharacters.find((char: any) => char.id === selectedCharacter);

  const hasLoraEnabled = hasLora(selectedCharacterData);
  const effectiveLoraStrength = hasLoraEnabled ? getDefaultLoraStrength(selectedCharacterData) : loraStrength;

  useEffect(() => {
    if (hasLoraEnabled && setLoraStrength && loraStrength !== 1.0) {
      setLoraStrength(1.0);
    }
  }, [hasLoraEnabled, setLoraStrength]);

  const handleReplicateGenerate = () => {
    setError(null);
    
    if (parentIsGenerating && cancelGeneration) {
      cancelGeneration();
      return;
    }
    
    parentHandleGenerate();
  };

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

      {hasLoraEnabled && setLoraStrength && (
        <CharacterStrengthSlider 
          loraStrength={effectiveLoraStrength}
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
