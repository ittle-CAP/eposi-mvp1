
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
        "3": {
          name: "Whiskers",
          genre: "Anime",
          imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          description: "A magical cat with nine lives and the ability to speak to humans.",
        },
        "4": {
          name: "BuzzBot",
          genre: "Gaming",
          imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
          description: "A quirky robot character from the hit game 'Digital Dreams'.",
        },
        "5": {
          name: "Detective Smith",
          genre: "Television",
          imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
          description: "A brilliant detective with an uncanny ability to solve impossible cases.",
        },
        "6": {
          name: "Savanna",
          genre: "Film",
          imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
          description: "A wildlife conservationist who can communicate with animals.",
        },
        "7": {
          name: "Mountain King",
          genre: "Fantasy",
          imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
          description: "The legendary ruler of the mountain realms, wielding ancient magic.",
        }
      };

      const characters: Character[] = unlockedData.map(char => {
        const presetData = characterData[char.character_id as keyof typeof characterData];
        
        // Extract LoRA file info if available
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
