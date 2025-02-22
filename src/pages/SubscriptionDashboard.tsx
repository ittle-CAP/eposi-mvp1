
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/navigation/header";
import { CurrenciesSection } from "@/components/subscription/currencies-section";
import { UnlockedCharactersSection } from "@/components/subscription/unlocked-characters-section";
import { SubscriptionDetailsSection } from "@/components/subscription/subscription-details-section";
import { PurchaseSection } from "@/components/subscription/purchase-section";

interface UnlockedCharacter {
  id: string;
  character_id: string;
  character_name: string;
  last_used_at: string;
}

interface Subscription {
  plan_type: string;
  credits_available: number;
  unlocks_available: number;
  plan_ends_at: string;
}

const SubscriptionDashboard = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [unlockedCharacters, setUnlockedCharacters] = useState<UnlockedCharacter[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: subscriptionData, error } = await supabase
          .from('subscriptions')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          toast({
            title: "Error",
            description: "Failed to load subscription data",
            variant: "destructive",
          });
          return;
        }

        setSubscription(subscriptionData);
      } catch (err) {
        console.error('Error:', err);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    };

    const fetchUnlockedCharacters = async () => {
      try {
        const { data, error } = await supabase
          .from('unlocked_characters')
          .select('*')
          .order('last_used_at', { ascending: false });

        if (error) {
          console.error('Error fetching unlocked characters:', error);
          toast({
            title: "Error",
            description: "Failed to load unlocked characters",
            variant: "destructive",
          });
          return;
        }

        setUnlockedCharacters(data || []);
      } catch (err) {
        console.error('Error:', err);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    };

    fetchSubscription();
    fetchUnlockedCharacters();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 pt-24">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Subscription Dashboard</h1>
        
        <CurrenciesSection 
          credits={subscription?.credits_available ?? 0}
          unlocks={subscription?.unlocks_available ?? 0}
        />
        
        <UnlockedCharactersSection 
          characters={unlockedCharacters}
        />
        
        <SubscriptionDetailsSection 
          planType={subscription?.plan_type ?? 'Loading...'}
          planEndsAt={subscription?.plan_ends_at ?? ''}
        />
        
        <PurchaseSection />
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
