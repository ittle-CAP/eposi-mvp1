
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

  const fetchLoraDetails = async () => {
    const loraFileIds = Object.values(characterLoras).map(lora => lora.loraFileId).filter(Boolean);
    
    if (loraFileIds.length === 0) return;
    
    console.log('Fetching LoRA details for IDs:', loraFileIds);
    
    const { data, error } = await supabase
      .from('character_loras')
      .select('*')
      .in('id', loraFileIds);
      
    if (error) {
      console.error('Error fetching LoRA details:', error);
      return;
    }
    
    console.log('LoRA details from database:', data);
    
    const updatedLoras = { ...characterLoras };
    data.forEach(lora => {
      Object.keys(characterLoras).forEach(charId => {
        if (characterLoras[charId].loraFileId === lora.id) {
          updatedLoras[charId].loraFileUrl = lora.file_url;
          console.log(`Set LoRA URL for character ${charId}:`, lora.file_url);
        }
      });
    });
    
    setCharacterLoras(updatedLoras);
    console.log('Updated character LoRAs with URLs:', updatedLoras);
  };

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);
  
  useEffect(() => {
    if (Object.keys(characterLoras).length > 0) {
      fetchLoraDetails();
    }
  }, [characterLoras]);

  // Define all characters with their properties
  const allCharacters: Character[] = [
    {
      id: "8",
      name: "The Headless Horseman",
      genre: "Horror",
      imageUrl: "/lovable-uploads/a1a65596-c4c6-47fe-9908-2664f60bfa8b.png",
      isLocked: !unlockedCharacterIds.includes("8"),
      description: "A terrifying spectral figure from Sleepy Hollow who rides through the night on his demonic steed. With a flaming jack-o'-lantern in place of his head, he strikes fear into the hearts of all who cross his path, doomed to eternally search for his missing head.",
      unlocks: 666,
      ...(characterLoras["8"] || {})
    },
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
      id: "7",
      name: "Mountain King",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
      isLocked: !unlockedCharacterIds.includes("7"),
      description: "The legendary ruler of the mountain realms, wielding ancient magic.",
      unlocks: 2341,
      ...(characterLoras["7"] || {})
    },
    {
      id: "11",
      name: "Among Us",
      genre: "Gaming",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937", // Placeholder
      isLocked: !unlockedCharacterIds.includes("11"),
      description: "A colorful, suspicious crewmate from the popular social deduction game. Distinguishable by its bean-like shape and visor, this character navigates tasks and evades impostors in space.",
      unlocks: 1287,
      ...(characterLoras["11"] || {})
    },
    {
      id: "12",
      name: "Fall Guys",
      genre: "Gaming",
      imageUrl: "/lovable-uploads/6f604d07-68c5-475c-9f6a-516962cb65b4.png", // Updated to use the uploaded Fall Guys image
      isLocked: !unlockedCharacterIds.includes("12"),
      description: "An adorable, wobbly bean contestant from the hit battle royale game. With a jelly-like body and customizable outfits, this character tumbles and bumbles through chaotic obstacle courses.",
      unlocks: 1426,
      ...(characterLoras["12"] || {})
    },
    {
      id: "9",
      name: "Watercolor Dreams",
      genre: "Style",
      imageUrl: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3",
      isLocked: !unlockedCharacterIds.includes("9"),
      description: "A dreamy watercolor art style that transforms your characters into fluid, vibrant paintings with soft edges and translucent color blending.",
      unlocks: 1275,
      ...(characterLoras["9"] || {})
    },
    {
      id: "10",
      name: "Neon Future",
      genre: "Style",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      isLocked: !unlockedCharacterIds.includes("10"),
      description: "A vibrant cyberpunk-inspired visual style featuring electric neon colors, dramatic lighting, and futuristic urban environments.",
      unlocks: 1842,
      ...(characterLoras["10"] || {})
    },
    {
      id: "13",
      name: "Minecraft",
      genre: "Style",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937", // Placeholder
      isLocked: !unlockedCharacterIds.includes("13"),
      description: "Transform any image into the iconic blocky aesthetic of Minecraft. This style features pixelated textures, distinctive cubic shapes, and the charming low-resolution look of the world's most popular sandbox game.",
      unlocks: 1654,
      ...(characterLoras["13"] || {})
    }
  ];
  
  // Process all characters, adding LoRA data from characterLoras if available
  const characters: Character[] = allCharacters.map(character => {
    if (characterLoras[character.id]) {
      console.log(`Merging LoRA data for ${character.name}:`, characterLoras[character.id]);
      return {
        ...character,
        ...characterLoras[character.id]
      };
    }
    
    // IMPORTANT: For admin-only testing, ensure the Fall Guys character has valid LoRA values
    // This will be overridden if real data is available from the database, but ensures testing works
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

  return {
    characters,
    unlockedCharacterIds,
    fetchUnlockedCharacters
  };
};
