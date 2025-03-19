
import { Link } from "react-router-dom";
import { CreditCard, LayoutDashboard, Users, UserRound, Home, Users2, Video, BarChart } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

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
            <CreditCard className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {credits?.credits_available || 0} credits
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                <UserRound className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/" className="flex w-full cursor-pointer items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/generate" className="flex w-full cursor-pointer items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <span>Create</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/characters" className="flex w-full cursor-pointer items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Browse Characters</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/community" className="flex w-full cursor-pointer items-center">
                  <Users2 className="mr-2 h-4 w-4" />
                  <span>Community</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/subscription" className="flex w-full cursor-pointer items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/analytics" className="flex w-full cursor-pointer items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600" 
                onClick={() => signOut()}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
