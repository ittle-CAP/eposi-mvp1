
import { useState } from "react";
import { useUnlockedCharacters } from "@/hooks/use-unlocked-characters";
import { useCharacterUsage } from "@/hooks/use-character-usage";

export const useCharacterManagement = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [loraStrength, setLoraStrength] = useState<number>(0.7);
  const { unlockedCharacters, fetchUnlockedCharacters } = useUnlockedCharacters();
  const { updateCharacterLastUsed } = useCharacterUsage();

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
