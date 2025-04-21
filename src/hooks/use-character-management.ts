
import { useState, useEffect } from "react";
import { useUnlockedCharacters } from "@/hooks/use-unlocked-characters";
import { useCharacterUsage } from "@/hooks/use-character-usage";
import { Character } from "@/types/character";
import { getDefaultLoraStrength } from "@/utils/lora-util";

export const useCharacterManagement = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [loraStrength, setLoraStrength] = useState<number>(0.7);
  const { unlockedCharacters, fetchUnlockedCharacters } = useUnlockedCharacters();
  const { updateCharacterLastUsed } = useCharacterUsage();

  // Update LoRA strength whenever the selected character changes
  useEffect(() => {
    if (selectedCharacter && unlockedCharacters.length > 0) {
      const current = unlockedCharacters.find((c: Character) => c.id === selectedCharacter);
      setLoraStrength(getDefaultLoraStrength(current));
    }
  }, [selectedCharacter, unlockedCharacters]);

  const updateLastUsed = async (characterId: string) => {
    await updateCharacterLastUsed(characterId, loraStrength);
  };

  return {
    selectedCharacter,
    setSelectedCharacter,
    loraStrength,
    setLoraStrength,
    unlockedCharacters,
    fetchUnlockedCharacters,
    updateCharacterLastUsed: updateLastUsed
  };
};
