
/**
 * Hook for managing character trigger words used in image generation
 */
export const useCharacterTriggerWords = () => {
  // Map of character IDs to their trigger words
  const CHARACTER_TRIGGER_WORDS: Record<string, string[]> = {
    "8": ["zavy-hdlsshrsmn"],
    "1": ["skeletor", "skull face and blue skin"],
    "2": ["Ciri", "ciri_w3", "ciri_w3_outfit"],
    "7": [],
    "11": ["mikus-style"],
    "12": ["fallguys character"],
    "13": ["minecraft filter"]
  };

  /**
   * Enhances prompt with character-specific trigger words
   */
  const enhancePromptWithTriggerWords = (prompt: string, characterId: string): string => {
    const triggerWords = CHARACTER_TRIGGER_WORDS[characterId] || [];
    
    if (triggerWords.length === 0) {
      return prompt;
    }
    
    return `${prompt}, ${triggerWords.join(', ')}`.trim();
  };

  return {
    enhancePromptWithTriggerWords
  };
};
