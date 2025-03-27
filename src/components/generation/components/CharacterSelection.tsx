
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Character } from "@/types/character";

interface CharacterSelectionProps {
  selectedCharacter: string;
  setSelectedCharacter: (value: string) => void;
  displayCharacters: Character[];
}

export const CharacterSelection = ({
  selectedCharacter,
  setSelectedCharacter,
  displayCharacters,
}: CharacterSelectionProps) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Select Character
      </label>
      <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a character" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {displayCharacters.map((character) => (
              <SelectItem key={character.id} value={character.id}>
                <div className="flex items-center gap-2">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  {character.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
