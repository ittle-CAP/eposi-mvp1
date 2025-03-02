
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CharacterLora {
  id: string;
  character_id: string;
  file_name: string;
  file_url: string;
  file_format: string;
  strength: number;
  created_at: string;
}

export const useCharacterLoras = (characterId?: string) => {
  const [loraFile, setLoraFile] = useState<CharacterLora | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLoraFile = async () => {
      if (!characterId) {
        setLoraFile(null);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('character_loras')
          .select('*')
          .eq('character_id', characterId)
          .single();

        if (error) {
          console.error('Error fetching LoRA file:', error);
          setLoraFile(null);
        } else {
          setLoraFile(data);
        }
      } catch (error) {
        console.error('Exception fetching LoRA file:', error);
        toast({
          title: "Error",
          description: "Failed to load character LoRA file information",
          variant: "destructive",
        });
        setLoraFile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoraFile();
  }, [characterId, toast]);

  return { loraFile, isLoading };
};
