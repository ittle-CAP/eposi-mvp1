
import { Download, Share2 } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

interface ImagePreviewProps {
  imageUrl: string;
}

export const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  if (!imageUrl) return null;
  
  return (
    <div className="space-y-4">
      <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
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
  );
};
