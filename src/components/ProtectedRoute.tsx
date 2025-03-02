
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsChecking(true);
      
      if (!session) {
        navigate("/auth");
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
  }, [session, navigate]);

  if (isChecking) {
    // You could return a loading spinner here
    return null;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
