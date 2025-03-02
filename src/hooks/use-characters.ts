
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/types/character";

export const useCharacters = () => {
  const [unlockedCharacterIds, setUnlockedCharacterIds] = useState<string[]>([]);
  const [characterLoras, setCharacterLoras] = useState<Record<string, any>>({});

  const fetchUnlockedCharacters = async () => {
    const { data, error } = await supabase
      .from('unlocked_characters')
      .select('character_id, lora_file_id, lora_strength');
    
    if (error) {
      console.error('Error fetching unlocked characters:', error);
      return;
    }

    setUnlockedCharacterIds(data.map(char => char.character_id));
    
    // Create a map of character IDs to LoRA file IDs and strengths
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
  };

  const fetchLoraDetails = async () => {
    const loraFileIds = Object.values(characterLoras).map(lora => lora.loraFileId).filter(Boolean);
    
    if (loraFileIds.length === 0) return;
    
    const { data, error } = await supabase
      .from('character_loras')
      .select('*')
      .in('id', loraFileIds);
      
    if (error) {
      console.error('Error fetching LoRA details:', error);
      return;
    }
    
    // Update the characterLoras map with file URLs
    const updatedLoras = { ...characterLoras };
    data.forEach(lora => {
      // Find all characters using this LoRA file
      Object.keys(characterLoras).forEach(charId => {
        if (characterLoras[charId].loraFileId === lora.id) {
          updatedLoras[charId].loraFileUrl = lora.file_url;
        }
      });
    });
    
    setCharacterLoras(updatedLoras);
  };

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);
  
  useEffect(() => {
    if (Object.keys(characterLoras).length > 0) {
      fetchLoraDetails();
    }
  }, [characterLoras]);

  const characters: Character[] = [
    {
      id: "1",
      name: "Luna",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      isLocked: !unlockedCharacterIds.includes("1"),
      description: "A mystical character with the power to control dreams and nightmares.",
      unlocks: 1523,
      ...(characterLoras["1"] || {})
    },
    {
      id: "2",
      name: "Neo",
      genre: "Sci-fi",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      isLocked: !unlockedCharacterIds.includes("2"),
      description: "A digital warrior fighting against the machine world.",
      unlocks: 2891,
      ...(characterLoras["2"] || {})
    },
    {
      id: "3",
      name: "Whiskers",
      genre: "Anime",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      isLocked: !unlockedCharacterIds.includes("3"),
      description: "A magical cat with nine lives and the ability to speak to humans.",
      unlocks: 943,
      ...(characterLoras["3"] || {})
    },
    {
      id: "4",
      name: "BuzzBot",
      genre: "Gaming",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      isLocked: !unlockedCharacterIds.includes("4"),
      description: "A quirky robot character from the hit game 'Digital Dreams'.",
      unlocks: 3156,
      ...(characterLoras["4"] || {})
    },
    {
      id: "5",
      name: "Detective Smith",
      genre: "Television",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      isLocked: !unlockedCharacterIds.includes("5"),
      description: "A brilliant detective with an uncanny ability to solve impossible cases.",
      unlocks: 756,
      ...(characterLoras["5"] || {})
    },
    {
      id: "6",
      name: "Savanna",
      genre: "Film",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      isLocked: !unlockedCharacterIds.includes("6"),
      description: "A wildlife conservationist who can communicate with animals.",
      unlocks: 1892,
      ...(characterLoras["6"] || {})
    },
    {
      id: "7",
      name: "Mountain King",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
      isLocked: !unlockedCharacterIds.includes("7"),
      description: "The legendary ruler of the mountain realms, wielding ancient magic.",
      unlocks: 2341,
      ...(characterLoras["7"] || {})
    }
  ];

  return {
    characters,
    unlockedCharacterIds,
    fetchUnlockedCharacters
  };
};
