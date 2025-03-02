
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Video, Upload, Image } from "lucide-react";
import { useState } from "react";

interface VideoGenerationFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedVideoUrl: string;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
}

export const VideoGenerationForm = ({
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  generatedVideoUrl,
  selectedImage,
  setSelectedImage,
}: VideoGenerationFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // In a real implementation, we would upload this file to the server
      // and get back an ID to use for video generation
      setSelectedImage(url);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Upload Base Image
        </label>
        
        <div className="grid grid-cols-5 gap-4">
          <div 
            className="col-span-3 relative h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected base image"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-6">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload an image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          <CustomButton 
            variant="outline"
            className="col-span-2 h-48 flex flex-col items-center justify-center"
          >
            <Image className="h-8 w-8 mb-2" />
            <span className="text-center">Choose From Creations</span>
          </CustomButton>
        </div>
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
