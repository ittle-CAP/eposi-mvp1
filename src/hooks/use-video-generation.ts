
import { useState, useEffect } from "react";
import { useCharacterManagement } from "./use-character-management";
import { useImageGeneration } from "./use-image-generation"; 
import { useVideoProcessing } from "./use-video-processing";

export const useVideoGeneration = () => {
  // State for sharing the prompt between image and video generation
  const [sharedPrompt, setSharedPrompt] = useState<string>("");

  // Get character management functionality
  const {
    selectedCharacter,
    setSelectedCharacter,
    loraStrength,
    setLoraStrength,
    unlockedCharacters,
    fetchUnlockedCharacters,
  } = useCharacterManagement();

  // Get video processing functionality
  const {
    selectedImage,
    setSelectedImage,
    isGenerating: isVideoGenerating,
    generatedVideoUrl,
    handleVideoGenerate,
    setPrompt: setVideoPrompt
  } = useVideoProcessing();

  // Get image generation functionality
  const {
    isGenerating: isImageGenerating,
    generatedImageUrl,
    handleImageGenerate,
    setPrompt: setImagePrompt
  } = useImageGeneration();

  // Combine and override the state and handlers as needed
  const isGenerating = isVideoGenerating || isImageGenerating;
  
  // Effect to sync the shared prompt with individual hook prompts
  useEffect(() => {
    setVideoPrompt(sharedPrompt);
    setImagePrompt(sharedPrompt);
  }, [sharedPrompt, setVideoPrompt, setImagePrompt]);

  // Override the prompt setter to update both the shared prompt and the specific hooks
  const setPrompt = (value: string) => {
    setSharedPrompt(value);
  };

  return {
    selectedCharacter,
    setSelectedCharacter,
    selectedImage,
    setSelectedImage,
    prompt: sharedPrompt,
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
  };
};
