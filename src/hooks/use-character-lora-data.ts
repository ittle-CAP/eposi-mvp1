
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCharacterLoraData = () => {
  const [characterLoras, setCharacterLoras] = useState<Record<string, any>>({});
  
  const fetchLoraDetails = async () => {
    const loraFileIds = Object.values(characterLoras).map(lora => lora.loraFileId).filter(Boolean);
    
    if (loraFileIds.length === 0) return;
    
    console.log('Fetching LoRA details for IDs:', loraFileIds);
    
    const { data, error } = await supabase
      .from('character_loras')
      .select('*')
      .in('id', loraFileIds);
      
    if (error) {
      console.error('Error fetching LoRA details:', error);
      return;
    }
    
    console.log('LoRA details from database:', data);
    
    const updatedLoras = { ...characterLoras };
    data.forEach(lora => {
      Object.keys(characterLoras).forEach(charId => {
        if (characterLoras[charId].loraFileId === lora.id) {
          updatedLoras[charId].loraFileUrl = lora.file_url;
          console.log(`Set LoRA URL for character ${charId}:`, lora.file_url);
        }
      });
    });
    
    setCharacterLoras(updatedLoras);
    console.log('Updated character LoRAs with URLs:', updatedLoras);
  };

  useEffect(() => {
    if (Object.keys(characterLoras).length > 0) {
      fetchLoraDetails();
    }
  }, [characterLoras]);

  return {
    characterLoras,
    setCharacterLoras
  };
};
