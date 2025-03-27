
import { useState } from "react";
import { Character } from "@/types/character";

export const useCharacterFilter = (characters: Character[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === "all" || character.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ["All", "Fantasy", "Sci-fi", "Anime", "Gaming", "Television", "Film", "Horror", "Style"];

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    filteredCharacters,
    genres
  };
};
