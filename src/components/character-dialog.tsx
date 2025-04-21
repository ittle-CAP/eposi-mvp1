import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomButton } from "@/components/ui/custom-button";
import { UnlockConfirmationDialog } from "@/components/characters/unlock-confirmation-dialog";
import { LoraUploadDialog } from "@/components/characters/lora-upload-dialog"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Character } from "@/types/character";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { isAdmin } from "@/utils/permissions";
import { hasLora } from "@/utils/lora-util";

interface CharacterDialogProps {
  character: Character | null;
  onClose: () => void;
  onUnlock?: (character: Character) => void;
  onLoraUploadComplete?: () => void;
}

export const CharacterDialog = ({ character, onClose, onUnlock, onLoraUploadComplete }: CharacterDialogProps) => {
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);
  const [showLoraUpload, setShowLoraUpload] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setUserIsAdmin(adminStatus);
      } else {
        setUserIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

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

  const effectivelyUnlocked = !character.isLocked || userIsAdmin;

  return (
    <>
      <Dialog open={!!character} onOpenChange={onClose}>
        <DialogContent className="max-h-[85vh] w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {character.name}
              {userIsAdmin && character.isLocked && (
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                  Admin Access
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-full max-h-[calc(85vh-8rem)] pr-4">
            <div className="space-y-6">
              <img
                src={character.imageUrl}
                alt={character.name}
                className={`w-full rounded-lg object-cover ${character.isLocked && !userIsAdmin ? 'opacity-50' : ''}`}
              />

              <div className="space-y-4">
                <p className="text-gray-600">{character.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Genre: {character.genre}</span>
                  <span className="text-sm text-gray-500">
                    Unlocks: {character.unlocks.toLocaleString()}
                  </span>
                </div>

                {character.isLocked && !userIsAdmin ? (
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
                    
                    {(!character.loraFileId && userIsAdmin) && (
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
