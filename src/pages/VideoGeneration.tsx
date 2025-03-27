
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { VideoGenerationForm } from "@/components/generation/VideoGenerationForm";
import { ImageGenerationForm } from "@/components/generation/ImageGenerationForm";
import { GenerationLayout } from "@/components/generation/GenerationLayout";
import { useVideoGeneration } from "@/hooks/use-video-generation";
import { useImageGeneration } from "@/hooks/use-image-generation";
import { useCharacters } from "@/hooks/use-characters";
import { useAuth } from "@/components/AuthProvider";
import { isAdmin } from "@/utils/permissions";

const VideoGeneration = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { characters } = useCharacters();
  
  const {
    selectedCharacter: videoSelectedCharacter,
    setSelectedCharacter: setVideoSelectedCharacter,
    selectedImage,
    setSelectedImage,
    prompt: videoPrompt,
    setPrompt: setVideoPrompt,
    loraStrength,
    setLoraStrength,
    isGenerating: videoIsGenerating,
    generatedVideoUrl,
    generatedImageUrl: videoGeneratedImageUrl,
    unlockedCharacters,
    fetchUnlockedCharacters,
    handleVideoGenerate,
    handleImageGenerate: handleVideoImageGenerate
  } = useVideoGeneration();

  const {
    prompt: imagePrompt,
    setPrompt: setImagePrompt,
    isGenerating: imageIsGenerating,
    generatedImageUrl: imageGeneratedImageUrl,
    handleImageGenerate,
    selectedCharacter: imageSelectedCharacter,
    setSelectedCharacter: setImageSelectedCharacter,
    generationStatus,
    cancelGeneration
  } = useImageGeneration();

  useEffect(() => {
    fetchUnlockedCharacters();
  }, []);

  useEffect(() => {
    const characterId = searchParams.get("character");
    if (characterId) {
      setVideoSelectedCharacter(characterId);
      setImageSelectedCharacter(characterId);
    }
  }, [searchParams, setVideoSelectedCharacter, setImageSelectedCharacter]);

  return (
    <GenerationLayout
      imageContent={
        <ImageGenerationForm
          selectedCharacter={imageSelectedCharacter}
          setSelectedCharacter={setImageSelectedCharacter}
          prompt={imagePrompt}
          setPrompt={setImagePrompt}
          isGenerating={imageIsGenerating}
          handleGenerate={handleImageGenerate}
          generatedImageUrl={imageGeneratedImageUrl}
          unlockedCharacters={unlockedCharacters}
          loraStrength={loraStrength}
          setLoraStrength={setLoraStrength}
          generationStatus={generationStatus}
          cancelGeneration={cancelGeneration}
        />
      }
      videoContent={
        <VideoGenerationForm
          prompt={videoPrompt}
          setPrompt={setVideoPrompt}
          isGenerating={videoIsGenerating}
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
