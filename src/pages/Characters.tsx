
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CharacterCard } from "@/components/character-card";
import { CharacterDialog } from "@/components/character-dialog";

interface Character {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  isLocked: boolean;
  description: string;
  popularity: number;
}

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Example characters data (in a real app, this would come from your backend)
  const characters: Character[] = [
    {
      id: "1",
      name: "Luna",
      genre: "Fantasy",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      isLocked: true,
      description: "A mystical character with the power to control dreams and nightmares.",
      popularity: 95,
    },
    {
      id: "2",
      name: "Neo",
      genre: "Sci-fi",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      isLocked: false,
      description: "A digital warrior fighting against the machine world.",
      popularity: 98,
    },
    // Add more characters as needed
  ];

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || character.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ["Fantasy", "Sci-fi", "Historical", "Contemporary"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Characters</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))}
      </div>

      {/* Character Detail Dialog */}
      <CharacterDialog
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
};

export default Characters;
