
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Image } from "lucide-react";
import { Character } from "@/types/character";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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
}

export const ImageGenerationForm = ({
  selectedCharacter,
  setSelectedCharacter,
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  generatedImageUrl,
  unlockedCharacters,
  loraStrength = 0.7,
  setLoraStrength,
}: ImageGenerationFormProps) => {
  const [sliderValue, setSliderValue] = useState([loraStrength]);
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (setLoraStrength) {
      setLoraStrength(value[0]);
    }
  };

  const selectedCharacterData = unlockedCharacters.find(char => char.id === selectedCharacter);

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
              {unlockedCharacters.map((character) => (
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

      <CustomButton
        onClick={handleGenerate}
        isLoading={isGenerating}
        disabled={!selectedCharacter || !prompt || isGenerating}
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
