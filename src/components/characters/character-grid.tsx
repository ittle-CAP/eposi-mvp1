
import { CharacterCard } from "@/components/character-card";
import { Character } from "@/types/character";

interface CharacterGridProps {
  characters: Character[];
  unlockedCharacterIds: string[];
  onSelectCharacter: (character: Character) => void;
  onUnlock?: (character: Character) => void;
}

export const CharacterGrid = ({
  characters,
  unlockedCharacterIds,
  onSelectCharacter,
  onUnlock,
}: CharacterGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={{
            ...character,
            isLocked: !unlockedCharacterIds.includes(character.id)
          }}
          onClick={() => onSelectCharacter(character)}
          onUnlock={onUnlock}
        />
      ))}
    </div>
  );
};
