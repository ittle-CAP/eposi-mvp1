
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { useAuth } from "@/components/AuthProvider";
import { CustomButton } from "@/components/ui/custom-button";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8 max-w-[1400px]">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Saga
        </Link>
        <div className="flex items-center gap-6 pr-4">
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/characters" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Browse Characters
            </Link>
            {user && (
              <Link to="/subscription" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            )}
            <Link to="/community" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Community
            </Link>
            {user && (
              <CustomButton 
                onClick={() => window.location.href = "/generate"}
                size="sm"
                className="bg-[#553D8A] text-white hover:bg-[#553D8A]/90"
              >
                Create
              </CustomButton>
            )}
          </nav>
          <UserNav />
        </div>
      </div>
    </header>
  );
};
