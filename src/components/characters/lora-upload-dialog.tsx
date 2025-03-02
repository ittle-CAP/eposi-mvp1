
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { CustomButton } from "@/components/ui/custom-button";
import { useLoraUpload } from "@/hooks/use-lora-upload";
import { Character } from "@/types/character";

interface LoraUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onUploadComplete: () => void;
}

export const LoraUploadDialog = ({
  isOpen,
  onClose,
  character,
  onUploadComplete,
}: LoraUploadDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loraStrength, setLoraStrength] = useState<number>(0.7);
  const { uploadLoraFile, isUploading, uploadProgress } = useLoraUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadLoraFile(selectedFile, character.id, loraStrength);
    if (result) {
      onUploadComplete();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload LoRA for {character.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lora-file">LoRA File (.safetensors)</Label>
            <Input
              id="lora-file"
              type="file"
              accept=".safetensors"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {selectedFile && (
              <p className="text-sm text-gray-500">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="lora-strength">Default LoRA Strength: {loraStrength.toFixed(1)}</Label>
            </div>
            <Slider
              id="lora-strength"
              min={0}
              max={1}
              step={0.1}
              value={[loraStrength]}
              onValueChange={(values) => setLoraStrength(values[0])}
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500">
              Determines how strongly the LoRA affects image generation. Can be adjusted later.
            </p>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} />
              <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <CustomButton
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload LoRA"}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
