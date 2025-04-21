
import { Link, useNavigate } from "react-router-dom";
import { UserNav } from "./user-nav";
import { useAuth } from "@/components/AuthProvider";
import { CustomButton } from "@/components/ui/custom-button";

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-transparent bg-black/95 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8 max-w-[1400px]">
        <Link to="/" className="text-xl font-bold text-[#9b87f5] tracking-tight">
          Eposi
        </Link>
        <div className="flex items-center gap-6 pr-4">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/characters"
              className="text-sm font-semibold text-gray-200 hover:text-[#9b87f5] transition-colors"
            >
              Browse Characters
            </Link>
            {user && (
              <Link
                to="/subscription"
                className="text-sm font-semibold text-gray-200 hover:text-[#9b87f5] transition-colors"
              >
                Dashboard
              </Link>
            )}
            {user && (
              <Link
                to="/analytics"
                className="text-sm font-semibold text-gray-200 hover:text-[#9b87f5] transition-colors"
              >
                Analytics
              </Link>
            )}
            <Link
              to="/community"
              className="text-sm font-semibold text-gray-200 hover:text-[#9b87f5] transition-colors"
            >
              Community
            </Link>
            {user && (
              <CustomButton
                onClick={() => navigate("/generate")}
                size="sm"
                className="bg-[#9b87f5] text-black font-bold hover:bg-[#7E69AB]/90"
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
