
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/types/character";
import { characterData } from "@/data/character-data";
import { applyLoraDataToCharacters, updateCharacterLockStatus } from "@/utils/character-utils";
import { useCharacterLoraData } from "@/hooks/use-character-lora-data";

export const useCharacters = () => {
  const [unlockedCharacterIds, setUnlockedCharacterIds] = useState<string[]>([]);
  const { characterLoras, setCharacterLoras } = useCharacterLoraData();

  const fetchUnlockedCharacters = async () => {
    const { data, error } = await supabase
      .from('unlocked_characters')
      .select('character_id, lora_file_id, lora_strength');
    
    if (error) {
      console.error('Error fetching unlocked characters:', error);
      return;
    }

    console.log('Unlocked characters data:', data);
    setUnlockedCharacterIds(data.map(char => char.character_id));
    
    const loraMap: Record<string, any> = {};
    data.forEach(char => {
      if (char.lora_file_id) {
        loraMap[char.character_id] = {
          loraFileId: char.lora_file_id,
          loraStrength: char.lora_strength || 0.7
        };
      }
    });
    setCharacterLoras(loraMap);
    console.log('Character LoRAs after mapping:', loraMap);
  };

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  // Apply lock status and LoRA data to characters
  const characters: Character[] = applyLoraDataToCharacters(
    updateCharacterLockStatus(characterData, unlockedCharacterIds),
    characterLoras
  );

  return {
    characters,
    unlockedCharacterIds,
    fetchUnlockedCharacters
  };
};
