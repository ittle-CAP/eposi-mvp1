
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserRound, CreditCard } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

interface UserCredits {
  credits_available: number;
  unlocks_available: number;
}

export const UserNav = () => {
  const { user, signOut } = useAuth();
  const [credits, setCredits] = useState<UserCredits | null>(null);

  useEffect(() => {
    const fetchUserCredits = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('credits_available, unlocks_available')
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        return;
      }

      setCredits(data);
    };

    fetchUserCredits();
  }, [user]);

  return (
    <nav className="flex items-center gap-4">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {credits?.credits_available || 0} credits
            </span>
          </div>
          <CustomButton variant="ghost" size="sm" onClick={() => signOut()}>
            Sign Out
          </CustomButton>
        </>
      ) : (
        <>
          <CustomButton variant="ghost" size="sm" onClick={() => window.location.href = "/auth"}>
            Log In
          </CustomButton>
          <CustomButton size="sm" onClick={() => window.location.href = "/auth"}>
            Sign Up
          </CustomButton>
        </>
      )}
    </nav>
  );
};
