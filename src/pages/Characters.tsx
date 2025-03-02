
import { useState, useEffect } from "react";
import { useCharacters } from "@/hooks/use-characters";
import { CharacterGrid } from "@/components/characters/character-grid";
import { CharacterDialog } from "@/components/character-dialog";
import { Character } from "@/types/character";
import { useSubscription } from "@/hooks/use-subscription";
import { SearchFilter } from "@/components/characters/search-filter";
import { useCharacterFilter } from "@/hooks/use-character-filter";
import { Header } from "@/components/navigation/header";

const Characters = () => {
  const { characters, unlockedCharacterIds, fetchUnlockedCharacters } = useCharacters();
  const { unlockCharacter } = useSubscription();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedGenre, 
    setSelectedGenre, 
    filteredCharacters,
    genres 
  } = useCharacterFilter(characters);

  useEffect(() => {
    document.title = "Characters | AI Video Generator";
  }, []);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleUnlockCharacter = async (character: Character) => {
    const success = await unlockCharacter(character.id, character.name, character.imageUrl);
    if (success) {
      // Refresh the character data after unlock
      fetchUnlockedCharacters();
    }
  };

  const handleLoraUploadComplete = () => {
    // Refresh the character data after LoRA upload
    fetchUnlockedCharacters();
  };

  const handleCloseDialog = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Characters</h1>
          <p className="text-gray-600">
            Choose from our collection of AI characters to create unique videos and images.
            Unlock characters using your subscription unlocks.
          </p>
        </div>

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
          onSelectCharacter={handleSelectCharacter}
          onUnlock={handleUnlockCharacter}
        />

        <CharacterDialog
          character={selectedCharacter}
          onClose={handleCloseDialog}
          onUnlock={handleUnlockCharacter}
          onLoraUploadComplete={handleLoraUploadComplete}
        />
      </div>
    </div>
  );
};

export default Characters;
