
import { useState } from "react";
import { CharacterDialog } from "@/components/character-dialog";
import { SearchFilter } from "@/components/characters/search-filter";
import { CharacterGrid } from "@/components/characters/character-grid";
import { Header } from "@/components/navigation/header";
import { useSubscription } from "@/hooks/use-subscription";
import { useCharacters } from "@/hooks/use-characters";
import { useCharacterFilter } from "@/hooks/use-character-filter";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";

const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { characters, unlockedCharacterIds, fetchUnlockedCharacters } = useCharacters();
  const { unlockCharacter } = useSubscription();
  const { toast } = useToast();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    filteredCharacters,
    genres
  } = useCharacterFilter(characters);

  const handleUnlockCharacter = async (character: Character) => {
    if (!character.isLocked) return;
    
    const success = await unlockCharacter(character.id, character.name);
    if (success) {
      await fetchUnlockedCharacters(); // Refresh the unlocked characters list
      toast({
        title: "Character Unlocked",
        description: `${character.name} has been successfully unlocked!`,
      });
      setSelectedCharacter(null); // Close the dialog after successful unlock
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <Header />

      <h1 className="mb-8 pt-20 text-center text-4xl font-bold text-gray-900">Characters</h1>

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />

      <CharacterGrid
        characters={filteredCharacters}
        unlockedCharacterIds={unlockedCharacterIds}
        onSelectCharacter={setSelectedCharacter}
      />

      <CharacterDialog
        character={selectedCharacter ? {
          ...selectedCharacter,
          isLocked: !unlockedCharacterIds.includes(selectedCharacter.id)
        } : null}
        onClose={() => setSelectedCharacter(null)}
        onUnlock={handleUnlockCharacter}
      />
    </div>
  );
};

export default Characters;
