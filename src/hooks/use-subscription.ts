
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSubscription = () => {
  const { toast } = useToast();

  const unlockCharacter = async (characterId: string, characterName: string) => {
    try {
      // First, check if user has available unlocks
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('unlocks_available')
        .single();

      if (subscriptionError) throw subscriptionError;

      if (!subscription || subscription.unlocks_available <= 0) {
        toast({
          title: "No unlocks available",
          description: "Please purchase more unlocks to continue",
          variant: "destructive",
        });
        return false;
      }

      // Begin transaction by deducting an unlock
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ unlocks_available: subscription.unlocks_available - 1 })
        .neq('unlocks_available', 0);

      if (updateError) throw updateError;

      // Add character to unlocked_characters
      const { error: unlockError } = await supabase
        .from('unlocked_characters')
        .insert({
          character_id: characterId,
          character_name: characterName,
        });

      if (unlockError) throw unlockError;

      toast({
        title: "Success",
        description: `Successfully unlocked ${characterName}`,
      });

      return true;
    } catch (error: any) {
      console.error('Error unlocking character:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to unlock character",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateLastUsed = async (characterId: string) => {
    try {
      const { error } = await supabase
        .from('unlocked_characters')
        .update({ last_used_at: new Date().toISOString() })
        .eq('character_id', characterId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating last used:', error);
    }
  };

  return {
    unlockCharacter,
    updateLastUsed,
  };
};
