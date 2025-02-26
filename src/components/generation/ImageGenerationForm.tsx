
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Image } from "lucide-react";

interface ImageGenerationFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedImageUrl: string;
}

export const ImageGenerationForm = ({
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  generatedImageUrl,
}: ImageGenerationFormProps) => {
  return (
    <div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Image Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
          rows={4}
        />
      </div>

      <CustomButton
        onClick={handleGenerate}
        isLoading={isGenerating}
        disabled={!prompt || isGenerating}
        className="mb-6 w-full flex items-center justify-center gap-2"
      >
        <Image className="h-4 w-4" />
        Generate Image
      </CustomButton>

      {generatedImageUrl && (
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={generatedImageUrl}
              alt="Generated content"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <CustomButton variant="outline" className="flex-1 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </CustomButton>
            <CustomButton variant="outline" className="flex-1 flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};
