
import { useState } from "react";
import { Lock } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useNavigate } from "react-router-dom";
import { UnlockConfirmationDialog } from "@/components/characters/unlock-confirmation-dialog";

interface Character {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  isLocked: boolean;
  description: string;
  unlocks: number;
}

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const navigate = useNavigate();
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);

  const handleGenerateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!character.isLocked) {
      navigate(`/generate?character=${character.id}`);
    } else {
      setShowUnlockConfirmation(true);
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
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{character.name}</h3>
          <p className="text-sm text-gray-500">{character.genre}</p>
          
          <CustomButton
            className="mt-2 w-full"
            variant={character.isLocked ? "outline" : "default"}
            onClick={handleGenerateClick}
          >
            {character.isLocked ? "Unlock" : "Generate Video"}
          </CustomButton>
        </div>
      </div>

      <UnlockConfirmationDialog
        isOpen={showUnlockConfirmation}
        onClose={() => setShowUnlockConfirmation(false)}
        onConfirm={() => {
          onClick();
          setShowUnlockConfirmation(false);
        }}
        characterName={character.name}
      />
    </>
  );
};
