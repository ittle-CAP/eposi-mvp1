
import { Character } from "@/types/character";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Video } from "lucide-react";

interface VideoGenerationFormProps {
  selectedCharacter: string;
  setSelectedCharacter: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  generatedVideoUrl: string;
  unlockedCharacters: Character[];
}

export const VideoGenerationForm = ({
  selectedCharacter,
  setSelectedCharacter,
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  generatedVideoUrl,
  unlockedCharacters,
}: VideoGenerationFormProps) => {
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
          Describe Your Scene
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want your character to do..."
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
          rows={4}
        />
      </div>

      <CustomButton
        onClick={handleGenerate}
        isLoading={isGenerating}
        disabled={!selectedCharacter || !prompt || isGenerating}
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
