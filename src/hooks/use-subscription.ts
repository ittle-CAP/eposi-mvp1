
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isAdmin } from "@/utils/permissions";

export const useSubscription = () => {
  const { toast } = useToast();

  const unlockCharacter = async (characterId: string, characterName: string, imageUrl?: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      console.log('Unlocking character with details:', { characterId, characterName, imageUrl });

      // Check if user is admin - admins don't need to use credits
      const adminStatus = await isAdmin(userData.user.id);
      if (adminStatus) {
        console.log('Admin user detected - bypassing unlock credit check');
        
        // Add character to unlocked_characters without checking/consuming credits
        const { data: insertedChar, error: unlockError } = await supabase
          .from('unlocked_characters')
          .insert({
            character_id: characterId,
            character_name: characterName,
            user_id: userData.user.id,
            image_url: imageUrl
          })
          .select()
          .single();

        if (unlockError) throw unlockError;

        console.log('Successfully inserted character for admin with data:', insertedChar);

        toast({
          title: "Success",
          description: `Successfully unlocked ${characterName}`,
        });

        return true;
      }

      // For non-admin users, proceed with normal credit check
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('unlocks_available')
        .eq('user_id', userData.user.id)
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
        .eq('user_id', userData.user.id);

      if (updateError) throw updateError;

      console.log('Adding character to unlocked_characters with image:', imageUrl);
      
      // Add character to unlocked_characters with image_url
      const { data: insertedChar, error: unlockError } = await supabase
        .from('unlocked_characters')
        .insert({
          character_id: characterId,
          character_name: characterName,
          user_id: userData.user.id,
          image_url: imageUrl
        })
        .select()
        .single();

      if (unlockError) {
        // If this fails, we should roll back the unlock deduction
        console.error('Failed to add to unlocked_characters, rolling back...', unlockError);
        await supabase
          .from('subscriptions')
          .update({ unlocks_available: subscription.unlocks_available })
          .eq('user_id', userData.user.id);
        throw unlockError;
      }

      console.log('Successfully inserted character with data:', insertedChar);

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

  const addUnlocksToUser = async (userId: string, unlockCount: number) => {
    try {
      // Get current unlocks_available count
      const { data: subscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('unlocks_available')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;
      
      if (!subscription) {
        toast({
          title: "Error",
          description: "User subscription not found",
          variant: "destructive",
        });
        return false;
      }

      // Update with new total
      const newTotal = subscription.unlocks_available + unlockCount;
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ unlocks_available: newTotal })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `Added ${unlockCount} unlocks to user`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error adding unlocks:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add unlocks",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    unlockCharacter,
    updateLastUsed,
    addUnlocksToUser,
  };
};
