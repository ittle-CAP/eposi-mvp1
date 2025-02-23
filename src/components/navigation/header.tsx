
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";
import { useAuth } from "@/components/AuthProvider";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Saga
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/characters" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Browse Characters
            </Link>
            <Link to="/community" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Community
            </Link>
          </nav>
        </div>
        <UserNav />
      </div>
    </header>
  );
};
