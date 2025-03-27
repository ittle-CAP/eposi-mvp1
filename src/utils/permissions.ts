
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "admin" | "user";

export const checkUserRole = async (userId?: string): Promise<UserRole> => {
  if (!userId) return "user";
  
  try {
    // First check if the user is an admin in the profiles table
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    
    if (error) {
      console.error("Error checking user role:", error);
      return "user";
    }
    
    return data?.role === "admin" ? "admin" : "user";
  } catch (error) {
    console.error("Unexpected error checking user role:", error);
    return "user";
  }
};

export const isAdmin = async (userId?: string): Promise<boolean> => {
  const role = await checkUserRole(userId);
  return role === "admin";
};
