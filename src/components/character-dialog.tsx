
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
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

interface CharacterDialogProps {
  character: Character | null;
  onClose: () => void;
  onUnlock?: (character: Character) => void;
}

export const CharacterDialog = ({ character, onClose, onUnlock }: CharacterDialogProps) => {
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);

  if (!character) return null;

  const handleUnlock = () => {
    setShowUnlockConfirmation(true);
  };

  const handleConfirmUnlock = () => {
    if (onUnlock && character.isLocked) {
      onUnlock(character);
    }
    setShowUnlockConfirmation(false);
  };

  return (
    <>
      <Dialog open={!!character} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{character.name}</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-full rounded-lg object-cover"
            />

            <div className="mt-4 space-y-4">
              <p className="text-gray-600">{character.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Genre: {character.genre}</span>
                <span className="text-sm text-gray-500">
                  Unlocks: {character.unlocks.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Community Creations</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Placeholder for community videos */}
                  <div className="aspect-video rounded bg-gray-100"></div>
                  <div className="aspect-video rounded bg-gray-100"></div>
                </div>
              </div>

              <CustomButton
                className="w-full"
                variant={character.isLocked ? "outline" : "default"}
                onClick={character.isLocked ? handleUnlock : undefined}
              >
                {character.isLocked ? "Unlock Character" : "Generate Video"}
              </CustomButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <UnlockConfirmationDialog
        isOpen={showUnlockConfirmation}
        onClose={() => setShowUnlockConfirmation(false)}
        onConfirm={handleConfirmUnlock}
        characterName={character.name}
      />
    </>
  );
};
