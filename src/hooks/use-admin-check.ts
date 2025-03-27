
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { isAdmin } from "@/utils/permissions";

/**
 * Hook for checking if current user is an admin
 */
export const useAdminCheck = () => {
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setUserIsAdmin(adminStatus);
      } else {
        setUserIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  return {
    userIsAdmin
  };
};
