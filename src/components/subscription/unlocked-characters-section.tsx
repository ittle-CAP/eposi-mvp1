
import { User } from "lucide-react";

interface UnlockedCharacter {
  id: string;
  character_id: string;
  character_name: string;
  last_used_at: string;
}

interface UnlockedCharactersSectionProps {
  characters: UnlockedCharacter[];
}

export const UnlockedCharactersSection = ({ characters }: UnlockedCharactersSectionProps) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-4">
        <div className="rounded-full bg-[#553D8A]/10 p-3">
          <User className="h-6 w-6 text-[#553D8A]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Unlocked Characters</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {characters.map((character) => (
          <div key={character.id} className="flex items-center gap-4 rounded-lg border p-4">
            <img
              src={`/placeholder.svg`}
              alt={character.character_name}
              className="h-16 w-16 rounded-lg object-cover bg-gray-100"
            />
            <div>
              <h3 className="font-medium text-gray-900">{character.character_name}</h3>
              <p className="text-sm text-gray-500">
                Last used: {character.last_used_at ? new Date(character.last_used_at).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>
        ))}
        {characters.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No characters unlocked yet. Use your unlocks to get new characters!
          </div>
        )}
      </div>
    </div>
  );
};
