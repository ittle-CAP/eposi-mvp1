
import { useState } from "react";
import { Lock } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useNavigate } from "react-router-dom";
import { UnlockConfirmationDialog } from "@/components/characters/unlock-confirmation-dialog";
import { useSubscription } from "@/hooks/use-subscription";
import { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  onUnlock?: (character: Character) => void;
}

export const CharacterCard = ({ character, onClick, onUnlock }: CharacterCardProps) => {
  const navigate = useNavigate();
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);
  const { unlockCharacter } = useSubscription();

  const handleUnlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUnlockConfirmation(true);
  };

  const handleConfirmUnlock = async () => {
    console.log('Unlocking character with image URL:', character.imageUrl);
    const success = await unlockCharacter(character.id, character.name, character.imageUrl);
    if (success && onUnlock) {
      onUnlock(character);
    }
    setShowUnlockConfirmation(false);
  };

  const handleGenerateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!character.isLocked) {
      navigate(`/generate?character=${character.id}`);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
      >
        <div className="relative aspect-square">
          <img
            src={character.imageUrl}
            alt={character.name}
            className={`h-full w-full object-cover transition-opacity ${
              character.isLocked ? "opacity-50" : ""
            }`}
          />
          {character.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}
          {!character.isLocked && character.loraFileId && (
            <div className="absolute top-2 right-2 bg-[#553D8A]/80 text-white text-xs px-2 py-1 rounded-full">
              LoRA
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{character.name}</h3>
          <p className="text-sm text-gray-500">{character.genre}</p>
          
          <CustomButton
            className="mt-2 w-full"
            variant={character.isLocked ? "outline" : "default"}
            onClick={character.isLocked ? handleUnlock : handleGenerateClick}
          >
            {character.isLocked ? "Unlock" : "Generate Video"}
          </CustomButton>
        </div>
      </div>

      <UnlockConfirmationDialog
        isOpen={showUnlockConfirmation}
        onClose={() => setShowUnlockConfirmation(false)}
        onConfirm={handleConfirmUnlock}
        characterName={character.name}
      />
    </>
  );
};
