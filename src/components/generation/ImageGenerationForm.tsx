
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Image, X, AlertTriangle } from "lucide-react";
import { Character } from "@/types/character";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { useReplicateGeneration } from "@/hooks/use-replicate-generation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/AuthProvider";
import { isAdmin } from "@/utils/permissions";
import { useCharacters } from "@/hooks/use-characters";

interface ImageGenerationFormProps {
  selectedCharacter: string;
  setSelectedCharacter: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedImageUrl: string;
  unlockedCharacters: Character[];
  loraStrength?: number;
  setLoraStrength?: (value: number) => void;
  generationStatus?: string;
  cancelGeneration?: () => void;
}

export const ImageGenerationForm = ({
  selectedCharacter,
  setSelectedCharacter,
  prompt,
  setPrompt,
  isGenerating: parentIsGenerating,
  handleGenerate: parentHandleGenerate,
  generatedImageUrl: parentGeneratedImageUrl,
  unlockedCharacters,
  loraStrength = 0.7,
  setLoraStrength,
  generationStatus,
  cancelGeneration
}: ImageGenerationFormProps) => {
  const [sliderValue, setSliderValue] = useState([loraStrength]);
  const [error, setError] = useState<string | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user } = useAuth();
  const { characters } = useCharacters();
  
  const { 
    isGenerating: localIsGenerating, 
    generatedImageUrl: localGeneratedImageUrl,
    generateImage,
    generationError,
  } = useReplicateGeneration();
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.id);
        setIsUserAdmin(adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  // Track errors from the Replicate generation hook
  useEffect(() => {
    if (generationError) {
      setError(generationError);
    } else {
      setError(null);
    }
  }, [generationError]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (setLoraStrength) {
      setLoraStrength(value[0]);
    }
  };

  // Determine which characters to display in the dropdown
  const displayCharacters = isUserAdmin ? characters : unlockedCharacters;
  const selectedCharacterData = displayCharacters.find(char => char.id === selectedCharacter);

  const handleReplicateGenerate = () => {
    setError(null);
    
    if (parentIsGenerating && cancelGeneration) {
      cancelGeneration();
      return;
    }
    
    // Use the parent generation method which is connected to useImageGeneration
    parentHandleGenerate();
  };

  // Determine which image URL to display
  const displayImageUrl = parentGeneratedImageUrl;
  
  // Determine which loading state to use
  const activeIsGenerating = parentIsGenerating;

  return (
    <div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select Character
        </label>
        <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a character" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {displayCharacters.map((character) => (
                <SelectItem key={character.id} value={character.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    {character.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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

      {selectedCharacterData?.loraFileId && setLoraStrength && (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Character Strength: {sliderValue[0].toFixed(1)}
          </label>
          <Slider
            value={sliderValue}
            onValueChange={handleSliderChange}
            max={1}
            step={0.1}
            min={0.1}
            className="py-2"
          />
          <p className="mt-1 text-sm text-gray-500">
            Adjust how strongly the character style appears in the generated image
          </p>
        </div>
      )}

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
        onClick={handleReplicateGenerate}
        isLoading={activeIsGenerating && generationStatus !== "processing"}
        disabled={!selectedCharacter || !prompt || (activeIsGenerating && generationStatus !== "processing")}
        className="mb-6 w-full flex items-center justify-center gap-2"
      >
        {activeIsGenerating && generationStatus === "processing" ? (
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

      {displayImageUrl && (
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={displayImageUrl}
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
