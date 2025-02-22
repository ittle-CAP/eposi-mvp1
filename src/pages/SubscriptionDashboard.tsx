
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, User, Settings, Plus, ShoppingCart } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/navigation/header";

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

        {/* Currencies Section */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {/* Credits Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#553D8A]/10 p-3">
                <CreditCard className="h-6 w-6 text-[#553D8A]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Credits</h2>
                <p className="text-3xl font-bold text-[#553D8A]">
                  {subscription?.credits_available ?? 0}
                </p>
              </div>
            </div>
          </div>

          {/* Unlocks Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#553D8A]/10 p-3">
                <User className="h-6 w-6 text-[#553D8A]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Unlocks</h2>
                <p className="text-3xl font-bold text-[#553D8A]">
                  {subscription?.unlocks_available ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Unlocked Characters Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-[#553D8A]/10 p-3">
              <User className="h-6 w-6 text-[#553D8A]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Unlocked Characters</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {unlockedCharacters.map((character) => (
              <div key={character.id} className="flex items-center gap-4 rounded-lg border p-4">
                <img
                  src={`/placeholder.svg`}
                  alt={character.character_name}
                  className="h-16 w-16 rounded-lg object-cover bg-gray-100"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{character.character_name}</h3>
                  <p className="text-sm text-gray-500">
                    Last used: {character.last_used_at ? new Date(character.last_used_at).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
            ))}
            {unlockedCharacters.length === 0 && (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No characters unlocked yet. Use your unlocks to get new characters!
              </div>
            )}
          </div>
        </div>

        {/* Subscription Details Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-[#553D8A]/10 p-3">
              <Settings className="h-6 w-6 text-[#553D8A]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">
              Current Plan: <span className="font-medium capitalize">{subscription?.plan_type ?? 'Loading...'}</span>
            </p>
            <p className="text-sm text-gray-500">
              Renews on {subscription?.plan_ends_at ? new Date(subscription.plan_ends_at).toLocaleDateString() : 'Loading...'}
            </p>
          </div>
          <CustomButton className="w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            Upgrade Plan
          </CustomButton>
        </div>

        {/* Purchase Section */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[#553D8A]/10 p-3">
                <ShoppingCart className="h-6 w-6 text-[#553D8A]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Purchase More</h2>
            </div>
            <div className="flex gap-2">
              <CustomButton variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Buy Credits
              </CustomButton>
              <CustomButton variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Buy Unlocks
              </CustomButton>
            </div>
          </div>
          <p className="text-gray-600">Need more credits or unlocks? Purchase additional currency to enhance your experience.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
