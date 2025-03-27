
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for handling credit checks and deductions
 */
export const useCreditManagement = () => {
  const { toast } = useToast();

  const checkAndDeductCredits = async (userId: string, isAdmin: boolean = false) => {
    if (isAdmin) {
      console.log("Admin user - bypassing credit check for image generation");
      return true;
    }

    try {
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('credits_available')
        .eq('user_id', userId)
        .single();

      if (subscriptionError) {
        console.error("Error fetching subscription:", subscriptionError);
        return false;
      }

      if (!subscription || subscription.credits_available < 1) {
        toast({
          title: "Not enough credits",
          description: "Please purchase more credits to generate images",
          variant: "destructive",
        });
        return false;
      }

      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          credits_available: subscription.credits_available - 1
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error("Error updating credits:", updateError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in credit management:", error);
      return false;
    }
  };

  return { checkAndDeductCredits };
};
