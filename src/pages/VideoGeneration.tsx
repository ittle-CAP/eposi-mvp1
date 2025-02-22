
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Video } from "lucide-react";

interface Character {
  id: string;
  name: string;
  imageUrl: string;
}

const VideoGeneration = () => {
  const [searchParams] = useSearchParams();
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>("");

  // Example data (in a real app, this would come from your backend)
  const unlockedCharacters: Character[] = [
    {
      id: "1",
      name: "Neo",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    },
    {
      id: "2",
      name: "BuzzBot",
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    },
  ];

  useEffect(() => {
    const characterId = searchParams.get("character");
    if (characterId) {
      setSelectedCharacter(characterId);
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated API call delay
    setTimeout(() => {
      setGeneratedVideoUrl("https://example.com/sample-video.mp4");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      {/* Logo */}
      <Link to="/" className="fixed left-4 top-4 text-xl font-semibold text-gray-900">
        Saga
      </Link>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Generate AI Video</h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* Character Selection */}
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

          {/* Prompt Input */}
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

          {/* Generate Button */}
          <CustomButton
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!selectedCharacter || !prompt || isGenerating}
            className="mb-6 w-full flex items-center justify-center gap-2"
          >
            <Video className="h-4 w-4" />
            Generate Video
          </CustomButton>

          {/* Video Preview */}
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
      </div>
    </div>
  );
};

export default VideoGeneration;
