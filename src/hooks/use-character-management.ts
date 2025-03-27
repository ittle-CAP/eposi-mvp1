
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";

export const useCharacterManagement = () => {
  const [unlockedCharacters, setUnlockedCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [loraStrength, setLoraStrength] = useState<number>(0.7);
  const { toast } = useToast();

  const fetchUnlockedCharacters = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      console.log('Fetching unlocked characters...');
      const { data: unlockedData, error: unlockedError } = await supabase
        .from('unlocked_characters')
        .select('*, character_loras(*)')
        .eq('user_id', user.user.id);

      if (unlockedError) {
        console.error('Error fetching unlocked characters:', unlockedError);
        toast({
          title: "Error",
          description: "Failed to fetch unlocked characters",
          variant: "destructive",
        });
        return;
      }

      console.log('Raw unlocked characters data:', unlockedData);

      const characterData = {
        "1": {
          name: "Luna",
          genre: "Fantasy",
          imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          description: "A mystical character with the power to control dreams and nightmares.",
        },
        "2": {
          name: "Neo",
          genre: "Sci-fi",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
          description: "A digital warrior fighting against the machine world.",
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

      const characters: Character[] = unlockedData.map(char => {
        const presetData = characterData[char.character_id as keyof typeof characterData];
        
        let loraFileId = null;
        let loraFileUrl = null;
        let loraStrength = char.lora_strength || 0.7;
        
        if (char.lora_file_id && char.character_loras) {
          loraFileId = char.lora_file_id;
          loraFileUrl = char.character_loras.file_url;
        }
        
        return {
          id: char.character_id,
          name: char.character_name,
          genre: presetData?.genre || "AI Character",
          imageUrl: presetData?.imageUrl || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          isLocked: false,
          description: presetData?.description || `An AI character named ${char.character_name}`,
          unlocks: 0,
          loraFileId,
          loraFileUrl,
          loraStrength
        };
      });

      console.log('Transformed characters with LoRA info:', characters);
      setUnlockedCharacters(characters);
    } catch (error) {
      console.error('Error in fetchUnlockedCharacters:', error);
      toast({
        title: "Error",
        description: "Failed to fetch unlocked characters",
        variant: "destructive",
      });
    }
  };

  const updateCharacterLastUsed = async (characterId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      
      const { error } = await supabase
        .from('unlocked_characters')
        .update({ 
          last_used_at: new Date().toISOString(),
          lora_strength: loraStrength
        })
        .eq('user_id', user.user.id)
        .eq('character_id', characterId);
        
      if (error) {
        console.error("Error updating character last used:", error);
      }
    } catch (error) {
      console.error("Error in updateCharacterLastUsed:", error);
    }
  };

  return {
    selectedCharacter,
    setSelectedCharacter,
    loraStrength,
    setLoraStrength,
    unlockedCharacters,
    fetchUnlockedCharacters,
    updateCharacterLastUsed
  };
};
