
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  genres: string[];
}

export const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  genres
}: SearchFilterProps) => {
  return (
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
                <SelectItem key={genre} value={genre === "All" ? "all" : genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
