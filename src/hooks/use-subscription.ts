
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSubscription = () => {
  const { toast } = useToast();

  const unlockCharacter = async (characterId: string, characterName: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      console.log('Fetching subscription data...');
      // First, check if user has available unlocks
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('unlocks_available')
        .eq('user_id', userData.user.id)
        .single();

      if (subscriptionError) throw subscriptionError;

      console.log('Current unlocks available:', subscription?.unlocks_available);

      if (!subscription || subscription.unlocks_available <= 0) {
        toast({
          title: "No unlocks available",
          description: "Please purchase more unlocks to continue",
          variant: "destructive",
        });
        return false;
      }

      console.log('Updating subscription...');
      // Begin transaction by deducting an unlock
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ unlocks_available: subscription.unlocks_available - 1 })
        .eq('user_id', userData.user.id);

      if (updateError) throw updateError;

      console.log('Adding to unlocked characters...');
      // Add character to unlocked_characters
      const { error: unlockError } = await supabase
        .from('unlocked_characters')
        .insert({
          character_id: characterId,
          character_name: characterName,
          user_id: userData.user.id
        });

      if (unlockError) {
        // If this fails, we should roll back the unlock deduction
        console.error('Failed to add to unlocked_characters, rolling back...');
        await supabase
          .from('subscriptions')
          .update({ unlocks_available: subscription.unlocks_available })
          .eq('user_id', userData.user.id);
        throw unlockError;
      }

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
