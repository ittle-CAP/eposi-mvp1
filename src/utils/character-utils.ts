
import { Character } from "@/types/character";

/**
 * Applies LoRA data to character objects
 */
export const applyLoraDataToCharacters = (
  characters: Character[], 
  characterLoras: Record<string, any>
): Character[] => {
  return characters.map(character => {
    if (characterLoras[character.id]) {
      console.log(`Merging LoRA data for ${character.name}:`, characterLoras[character.id]);
      return {
        ...character,
        ...characterLoras[character.id]
      };
    }
    
    // Special case for testing Fall Guys character
    if (character.id === "12") {
      console.log("Adding test LoRA data for Fall Guys for admin testing");
      return {
        ...character,
        loraFileId: character.loraFileId || "test-lora-id",
        loraFileUrl: character.loraFileUrl || "test-lora-url"
      };
    }
    
    return character;
  });
};

/**
 * Updates character lock status based on unlocked IDs
 */
export const updateCharacterLockStatus = (
  characters: Character[], 
  unlockedCharacterIds: string[]
): Character[] => {
  return characters.map(character => ({
    ...character,
    isLocked: !unlockedCharacterIds.includes(character.id)
  }));
};
