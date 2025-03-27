
import { useState, useEffect } from "react";
import { useCharacters } from "@/hooks/use-characters";
import { CharacterGrid } from "@/components/characters/character-grid";
import { CharacterDialog } from "@/components/character-dialog";
import { Character } from "@/types/character";
import { useSubscription } from "@/hooks/use-subscription";
import { SearchFilter } from "@/components/characters/search-filter";
import { useCharacterFilter } from "@/hooks/use-character-filter";
import { Header } from "@/components/navigation/header";
import { isAdmin } from "@/utils/permissions";
import { useAuth } from "@/components/AuthProvider";

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
  const { user } = useAuth();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [processedCharacters, setProcessedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    document.title = "Characters & Styles | AI Video Generator";
  }, []);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setUserIsAdmin(adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  // Process characters based on admin status
  useEffect(() => {
    let processed = [...filteredCharacters];
    
    // If user is admin, mark all characters as unlocked in the UI
    if (userIsAdmin) {
      processed = processed.map(character => ({
        ...character,
        isLocked: false
      }));
    }
    
    setProcessedCharacters(processed);
  }, [filteredCharacters, userIsAdmin]);

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
          <h1 className="mb-4 text-3xl font-bold">Characters & Styles</h1>
          <p className="text-gray-600">
            Choose from our curated collection of AI characters and visual styles to create unique images and videos.
            {!userIsAdmin && "Unlock your favorites using your subscription credits."}
            {userIsAdmin && "As an admin, you have access to all characters."}
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
          characters={processedCharacters}
          unlockedCharacterIds={userIsAdmin ? processedCharacters.map(c => c.id) : unlockedCharacterIds}
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
