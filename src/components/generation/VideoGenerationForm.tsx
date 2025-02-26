
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Video } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoGenerationFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedVideoUrl: string;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
}

const SAMPLE_IMAGES = [
  {
    id: "photo-1649972904349-6e44c42644a7",
    description: "Woman with laptop",
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "photo-1488590528505-98d2b5aba04b",
    description: "Gray laptop",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: "photo-1518770660439-4636190af475",
    description: "Circuit board",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "photo-1485827404703-89b55fcc595e",
    description: "White robot",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: "photo-1526374965328-7f61d4dc18c5",
    description: "Matrix style",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  }
];

export const VideoGenerationForm = ({
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  generatedVideoUrl,
  selectedImage,
  setSelectedImage,
}: VideoGenerationFormProps) => {
  return (
    <div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select Base Image
        </label>
        <Select value={selectedImage} onValueChange={setSelectedImage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose an image" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SAMPLE_IMAGES.map((image) => (
                <SelectItem key={image.id} value={image.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="h-6 w-6 rounded object-cover"
                    />
                    {image.description}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedImage && (
          <div className="mt-4">
            <img
              src={SAMPLE_IMAGES.find(img => img.id === selectedImage)?.url}
              alt="Selected base image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Describe Your Scene
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate from this image..."
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
          rows={4}
        />
      </div>

      <CustomButton
        onClick={handleGenerate}
        isLoading={isGenerating}
        disabled={!selectedImage || !prompt || isGenerating}
        className="mb-6 w-full flex items-center justify-center gap-2"
      >
        <Video className="h-4 w-4" />
        Generate Video
      </CustomButton>

      {generatedVideoUrl && (
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-lg bg-gray-100">
            <video
              src={generatedVideoUrl}
              controls
              className="h-full w-full rounded-lg"
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
