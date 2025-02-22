import { useState, useEffect } from "react";
import { CharacterDialog } from "@/components/character-dialog";
import { SearchFilter } from "@/components/characters/search-filter";
import { CharacterGrid } from "@/components/characters/character-grid";
import { Header } from "@/components/navigation/header";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/use-subscription";
import { Character } from "@/types/character";

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [unlockedCharacterIds, setUnlockedCharacterIds] = useState<string[]>([]);
  const { unlockCharacter } = useSubscription();

  useEffect(() => {
    const fetchUnlockedCharacters = async () => {
      const { data, error } = await supabase
        .from('unlocked_characters')
        .select('character_id');
      
      if (error) {
        console.error('Error fetching unlocked characters:', error);
        return;
      }

      setUnlockedCharacterIds(data.map(char => char.character_id));
    };

    fetchUnlockedCharacters();
  }, []);

  const characters: Character[] = [
    {
      id: "1",
      name: "Luna",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      isLocked: !unlockedCharacterIds.includes("1"),
      description: "A mystical character with the power to control dreams and nightmares.",
      unlocks: 1523,
    },
    {
      id: "2",
      name: "Neo",
      genre: "Sci-fi",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      isLocked: false,
      description: "A digital warrior fighting against the machine world.",
      unlocks: 2891,
    },
    {
      id: "3",
      name: "Whiskers",
      genre: "Anime",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      isLocked: true,
      description: "A magical cat with nine lives and the ability to speak to humans.",
      unlocks: 943,
    },
    {
      id: "4",
      name: "BuzzBot",
      genre: "Gaming",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      isLocked: false,
      description: "A quirky robot character from the hit game 'Digital Dreams'.",
      unlocks: 3156,
    },
    {
      id: "5",
      name: "Detective Smith",
      genre: "Television",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      isLocked: true,
      description: "A brilliant detective with an uncanny ability to solve impossible cases.",
      unlocks: 756,
    },
    {
      id: "6",
      name: "Savanna",
      genre: "Film",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      isLocked: false,
      description: "A wildlife conservationist who can communicate with animals.",
      unlocks: 1892,
    },
    {
      id: "7",
      name: "Mountain King",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
      isLocked: true,
      description: "The legendary ruler of the mountain realms, wielding ancient magic.",
      unlocks: 2341,
    }
  ];

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === "all" || character.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ["All", "Fantasy", "Sci-fi", "Anime", "Gaming", "Television", "Film"];

  const handleUnlockCharacter = async (character: Character) => {
    if (!character.isLocked) return;
    
    const success = await unlockCharacter(character.id, character.name);
    if (success) {
      setUnlockedCharacterIds([...unlockedCharacterIds, character.id]);
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
