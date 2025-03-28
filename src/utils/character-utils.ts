
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

/**
 * Predefined characters with metadata
 */
export const predefinedCharacters = {
  "1": {
    name: "Skeletor",
    genre: "Fantasy",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "A mystical character with the power to control dreams and nightmares.",
  },
  "2": {
    name: "Ciri",
    genre: "Fantasy",
    imageUrl: "/lovable-uploads/ae567c08-0654-4dfa-977b-eeb6a85ec1e4.png",
    description: "A powerful witcher with ashen hair and emerald eyes, capable of traveling between worlds. With her exceptional sword skills and mysterious Elder Blood powers, she navigates a world filled with danger and political intrigue.",
  },
  "7": {
    name: "Mountain King",
    genre: "Fantasy",
    imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    description: "The legendary ruler of the mountain realms, wielding ancient magic.",
  },
  "8": {
    name: "The Headless Horseman",
    genre: "Horror",
    imageUrl: "/lovable-uploads/a1a65596-c4c6-47fe-9908-2664f60bfa8b.png",
    description: "A terrifying spectral figure from Sleepy Hollow who rides through the night on his demonic steed. With a flaming jack-o'-lantern in place of his head, he strikes fear into the hearts of all who cross his path, doomed to eternally search for his missing head.",
  },
  "9": {
    name: "Watercolor Dreams",
    genre: "Style",
    imageUrl: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3",
    description: "A dreamy watercolor art style that transforms your characters into fluid, vibrant paintings with soft edges and translucent color blending.",
  },
  "10": {
    name: "Neon Future",
    genre: "Style",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    description: "A vibrant cyberpunk-inspired visual style featuring electric neon colors, dramatic lighting, and futuristic urban environments.",
  },
  "11": {
    name: "Among Us",
    genre: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "A colorful, suspicious crewmate from the popular social deduction game. Distinguishable by its bean-like shape and visor, this character navigates tasks and evades impostors in space.",
  },
  "12": {
    name: "Fall Guys",
    genre: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "An adorable, wobbly bean contestant from the hit battle royale game. With a jelly-like body and customizable outfits, this character tumbles and bumbles through chaotic obstacle courses.",
  },
  "13": {
    name: "Minecraft",
    genre: "Style",
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    description: "Transform any image into the iconic blocky aesthetic of Minecraft. This style features pixelated textures, distinctive cubic shapes, and the charming low-resolution look of the world's most popular sandbox game.",
  }
};
