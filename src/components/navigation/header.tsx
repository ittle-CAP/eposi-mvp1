
import { Link } from "react-router-dom";
import { UserNav } from "./user-nav";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Saga
        </Link>
        <UserNav />
      </div>
    </header>
  );
};
