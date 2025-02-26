import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomButton } from "@/components/ui/custom-button";
import { Download, Share2, Video, Image } from "lucide-react";
import { Header } from "@/components/navigation/header";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const VideoGeneration = () => {
  const [searchParams] = useSearchParams();
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [unlockedCharacters, setUnlockedCharacters] = useState<Character[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUnlockedCharacters = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) return;

        console.log('Fetching unlocked characters...');
        const { data: unlockedData, error: unlockedError } = await supabase
          .from('unlocked_characters')
          .select('*')
          .eq('user_id', user.user.id);

        if (unlockedError) {
          console.error('Error fetching unlocked characters:', unlockedError);
          toast({
            title: "Error",
            description: "Failed to fetch unlocked characters",
            variant: "destructive",
          });
          return;
        }

        console.log('Raw unlocked characters data:', unlockedData);

        const characterData = {
          "1": {
            name: "Luna",
            genre: "Fantasy",
            imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
            description: "A mystical character with the power to control dreams and nightmares.",
          },
          "2": {
            name: "Neo",
            genre: "Sci-fi",
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
            description: "A digital warrior fighting against the machine world.",
          },
          "3": {
            name: "Whiskers",
            genre: "Anime",
            imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            description: "A magical cat with nine lives and the ability to speak to humans.",
          },
          "4": {
            name: "BuzzBot",
            genre: "Gaming",
            imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
            description: "A quirky robot character from the hit game 'Digital Dreams'.",
          },
          "5": {
            name: "Detective Smith",
            genre: "Television",
            imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
            description: "A brilliant detective with an uncanny ability to solve impossible cases.",
          },
          "6": {
            name: "Savanna",
            genre: "Film",
            imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
            description: "A wildlife conservationist who can communicate with animals.",
          },
          "7": {
            name: "Mountain King",
            genre: "Fantasy",
            imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
            description: "The legendary ruler of the mountain realms, wielding ancient magic.",
          }
        };

        const characters: Character[] = unlockedData.map(char => {
          const presetData = characterData[char.character_id as keyof typeof characterData];
          return {
            id: char.character_id,
            name: char.character_name,
            genre: presetData?.genre || "AI Character",
            imageUrl: presetData?.imageUrl || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
            isLocked: false,
            description: presetData?.description || `An AI character named ${char.character_name}`,
            unlocks: 0
          };
        });

        console.log('Transformed characters with images:', characters);
        setUnlockedCharacters(characters);
      } catch (error) {
        console.error('Error in fetchUnlockedCharacters:', error);
        toast({
          title: "Error",
          description: "Failed to fetch unlocked characters",
          variant: "destructive",
        });
      }
    };

    fetchUnlockedCharacters();
  }, [toast]);

  useEffect(() => {
    const characterId = searchParams.get("character");
    if (characterId) {
      setSelectedCharacter(characterId);
    }
  }, [searchParams]);

  const handleVideoGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVideoUrl("https://example.com/sample-video.mp4");
      setIsGenerating(false);
    }, 2000);
  };

  const handleImageGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImageUrl("https://picsum.photos/512/512");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 pt-24">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">AI Content Generator</h1>

        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Generation
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image Generation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="rounded-lg bg-white p-6 shadow-lg">
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
              onClick={handleVideoGenerate}
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
          </TabsContent>

          <TabsContent value="image" className="rounded-lg bg-white p-6 shadow-lg">
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
              onClick={handleImageGenerate}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoGeneration;
