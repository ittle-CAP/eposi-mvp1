
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";
import { predefinedCharacters } from "@/utils/character-utils";

export const useUnlockedCharacters = () => {
  const [unlockedCharacters, setUnlockedCharacters] = useState<Character[]>([]);
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

      const characters: Character[] = unlockedData.map(char => {
        const presetData = predefinedCharacters[char.character_id as keyof typeof predefinedCharacters];
        
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

  return {
    unlockedCharacters,
    fetchUnlockedCharacters
  };
};
