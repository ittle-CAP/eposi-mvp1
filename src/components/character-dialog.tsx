
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";

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
}

export const CharacterDialog = ({ character, onClose }: CharacterDialogProps) => {
  if (!character) return null;

  return (
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
            >
              {character.isLocked ? "Unlock with Credits" : "Generate Video"}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
