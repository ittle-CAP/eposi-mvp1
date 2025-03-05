
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type CharacterEngagement = {
  id: string;
  name: string;
  totalGenerations: number;
  totalUnlocks: number;
  lastUsed: string | null;
  createdAt: string;
  imageUrl: string | null;
  genre: string;
};

export const useAnalytics = () => {
  const [characterEngagementData, setCharacterEngagementData] = useState<CharacterEngagement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCharacterEngagementData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Here we would typically fetch real data from Supabase
      // For now, we'll use mock data that mimics what we might get from the database
      const mockData: CharacterEngagement[] = [
        {
          id: "8",
          name: "The Headless Horseman",
          totalGenerations: 248,
          totalUnlocks: 42,
          lastUsed: new Date().toISOString(),
          createdAt: "2023-10-01T00:00:00Z",
          imageUrl: "/lovable-uploads/a1a65596-c4c6-47fe-9908-2664f60bfa8b.png",
          genre: "Horror"
        },
        {
          id: "1",
          name: "Luna",
          totalGenerations: 189,
          totalUnlocks: 37,
          lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: "2023-09-15T00:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          genre: "Fantasy"
        },
        {
          id: "2",
          name: "Neo",
          totalGenerations: 154,
          totalUnlocks: 29,
          lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: "2023-09-20T00:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
          genre: "Sci-fi"
        },
        {
          id: "3",
          name: "Whiskers",
          totalGenerations: 132,
          totalUnlocks: 25,
          lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: "2023-10-05T00:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          genre: "Anime"
        },
        {
          id: "4",
          name: "BuzzBot",
          totalGenerations: 98,
          totalUnlocks: 19,
          lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: "2023-10-10T00:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
          genre: "Gaming"
        }
      ];

      // In the future, this would be replaced with a Supabase query
      // const { data, error } = await supabase
      //   .from('character_analytics')
      //   .select('*');

      // if (error) throw error;

      setCharacterEngagementData(mockData);
    } catch (err: any) {
      console.error("Error fetching analytics data:", err);
      setError(err.message || "Failed to load analytics data");
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    characterEngagementData,
    isLoading,
    error,
    fetchCharacterEngagementData
  };
};
