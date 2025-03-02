
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { VideoGenerationForm } from "@/components/generation/VideoGenerationForm";
import { ImageGenerationForm } from "@/components/generation/ImageGenerationForm";
import { GenerationLayout } from "@/components/generation/GenerationLayout";
import { useVideoGeneration } from "@/hooks/use-video-generation";

const VideoGeneration = () => {
  const [searchParams] = useSearchParams();
  const {
    selectedCharacter,
    setSelectedCharacter,
    selectedImage,
    setSelectedImage,
    prompt,
    setPrompt,
    loraStrength,
    setLoraStrength,
    isGenerating,
    generatedVideoUrl,
    generatedImageUrl,
    unlockedCharacters,
    fetchUnlockedCharacters,
    handleVideoGenerate,
    handleImageGenerate
  } = useVideoGeneration();

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  useEffect(() => {
    const characterId = searchParams.get("character");
    if (characterId) {
      setSelectedCharacter(characterId);
    }
  }, [searchParams, setSelectedCharacter]);

  return (
    <GenerationLayout
      imageContent={
        <ImageGenerationForm
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          handleGenerate={handleImageGenerate}
          generatedImageUrl={generatedImageUrl}
          unlockedCharacters={unlockedCharacters}
          loraStrength={loraStrength}
          setLoraStrength={setLoraStrength}
        />
      }
      videoContent={
        <VideoGenerationForm
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          handleGenerate={handleVideoGenerate}
          generatedVideoUrl={generatedVideoUrl}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      }
    />
  );
};

export default VideoGeneration;
