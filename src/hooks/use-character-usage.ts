
import { supabase } from "@/integrations/supabase/client";

export const useCharacterUsage = () => {
  const updateCharacterLastUsed = async (characterId: string, loraStrength: number) => {
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
    updateCharacterLastUsed
  };
};
