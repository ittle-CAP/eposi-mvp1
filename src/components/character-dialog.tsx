
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
import { UnlockConfirmationDialog } from "@/components/characters/unlock-confirmation-dialog";
import { LoraUploadDialog } from "@/components/characters/lora-upload-dialog"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Character } from "@/types/character";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface CharacterDialogProps {
  character: Character | null;
  onClose: () => void;
  onUnlock?: (character: Character) => void;
  onLoraUploadComplete?: () => void;
}

export const CharacterDialog = ({ character, onClose, onUnlock, onLoraUploadComplete }: CharacterDialogProps) => {
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);
  const [showLoraUpload, setShowLoraUpload] = useState(false);
  const navigate = useNavigate();

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

  const handleGenerateClick = () => {
    onClose();
    navigate(`/generate?character=${character.id}`);
  };

  const handleLoraUploadClick = () => {
    setShowLoraUpload(true);
  };

  const handleLoraUploadComplete = () => {
    if (onLoraUploadComplete) {
      onLoraUploadComplete();
    }
  };

  return (
    <>
      <Dialog open={!!character} onOpenChange={onClose}>
        <DialogContent className="max-h-[85vh] w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {character.name}
              {!character.isLocked && character.loraFileId && (
                <Badge variant="outline" className="ml-2 bg-[#553D8A]/10 text-[#553D8A] border-[#553D8A]/20">
                  LoRA Enabled
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-full max-h-[calc(85vh-8rem)] pr-4">
            <div className="space-y-6">
              <img
                src={character.imageUrl}
                alt={character.name}
                className={`w-full rounded-lg object-cover ${character.isLocked ? 'opacity-50' : ''}`}
              />

              <div className="space-y-4">
                <p className="text-gray-600">{character.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Genre: {character.genre}</span>
                  <span className="text-sm text-gray-500">
                    Unlocks: {character.unlocks.toLocaleString()}
                  </span>
                </div>

                {!character.isLocked && character.loraFileId && (
                  <div className="rounded-lg bg-[#553D8A]/5 p-3 border border-[#553D8A]/10">
                    <h4 className="font-medium text-[#553D8A]">AI Enhancement Information</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      This character uses advanced AI technology to create unique images in the character's style.
                      {character.loraStrength !== undefined && (
                        <span> Default strength: {character.loraStrength.toFixed(1)}</span>
                      )}
                    </p>
                  </div>
                )}

                {character.isLocked ? (
                  <CustomButton
                    className="w-full"
                    variant="outline"
                    onClick={handleUnlock}
                  >
                    Unlock Character
                  </CustomButton>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <CustomButton
                      className="w-full"
                      variant="default"
                      onClick={handleGenerateClick}
                    >
                      Generate
                    </CustomButton>
                    
                    {!character.loraFileId && (
                      <CustomButton
                        className="w-full"
                        variant="outline"
                        onClick={handleLoraUploadClick}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Add LoRA Enhancement
                      </CustomButton>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Community Creations</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Placeholder for community videos */}
                    <div className="aspect-video rounded bg-gray-100"></div>
                    <div className="aspect-video rounded bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <UnlockConfirmationDialog
        isOpen={showUnlockConfirmation}
        onClose={() => setShowUnlockConfirmation(false)}
        onConfirm={handleConfirmUnlock}
        characterName={character.name}
      />
      
      {character && (
        <LoraUploadDialog
          isOpen={showLoraUpload}
          onClose={() => setShowLoraUpload(false)}
          character={character}
          onUploadComplete={handleLoraUploadComplete}
        />
      )}
    </>
  );
};
