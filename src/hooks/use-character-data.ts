
import { useMemo } from "react";

/**
 * Hook for accessing character data
 */
export const useCharacterData = () => {
  const allCharactersData = useMemo(() => ({
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
  }), []);
  
  const getCharacterInfoById = (
    characterId: string, 
    availableCharacters: Array<any>
  ) => {
    return availableCharacters.find(char => char.id === characterId);
  };
  
  const getCharacterNameById = (characterId: string | null) => {
    if (!characterId) return "Unknown Character";
    
    return allCharactersData[characterId as keyof typeof allCharactersData]?.name || "Unknown Character";
  };
  
  return {
    allCharactersData,
    getCharacterInfoById,
    getCharacterNameById
  };
};
