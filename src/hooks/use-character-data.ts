
import { useCharacters } from "./use-characters";

/**
 * Hook for retrieving and managing character data
 */
export const useCharacterData = () => {
  const { characters } = useCharacters();
  
  /**
   * Get character info by ID from either unlocked or all characters
   */
  const getCharacterInfoById = (
    characterId: string, 
    characterList: any[]
  ) => {
    if (!characterId || !characterList || characterList.length === 0) {
      console.log("No character ID or character list provided");
      return null;
    }
    
    const characterInfo = characterList.find(char => char.id === characterId);
    
    if (!characterInfo) {
      console.log(`Character with ID ${characterId} not found in the provided list`);
      return null;
    }
    
    console.log(`Found character info for ID ${characterId}:`, characterInfo);
    return characterInfo;
  };

  /**
   * Check if character has a LoRA file associated with it
   */
  const hasCharacterLora = (characterId: string) => {
    const character = characters.find(char => char.id === characterId);
    const hasLora = character && character.loraFileId && character.loraFileUrl;
    console.log(`Character ${characterId} has LoRA: ${hasLora}`);
    return hasLora;
  };

  return {
    getCharacterInfoById,
    hasCharacterLora
  };
};
