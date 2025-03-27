
import { AlertTriangle, Image, X } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GenerationControlsProps {
  error: string | null;
  isGenerating: boolean;
  generationStatus?: string;
  handleGenerate: () => void;
  disableGenerateButton: boolean;
}

export const GenerationControls = ({
  error,
  isGenerating,
  generationStatus,
  handleGenerate,
  disableGenerateButton,
}: GenerationControlsProps) => {
  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="ml-2">
            Error: {error}
          </AlertDescription>
        </Alert>
      )}

      {generationStatus === "processing" && (
        <div className="mb-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#553D8A]"></div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">Generating your image...</p>
        </div>
      )}

      <CustomButton
        onClick={handleGenerate}
        isLoading={isGenerating && generationStatus !== "processing"}
        disabled={disableGenerateButton}
        className="mb-6 w-full flex items-center justify-center gap-2"
      >
        {isGenerating && generationStatus === "processing" ? (
          <>
            <X className="h-4 w-4" />
            Cancel Generation
          </>
        ) : (
          <>
            <Image className="h-4 w-4" />
            Generate Image
          </>
        )}
      </CustomButton>
    </>
  );
};
