
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterEngagement } from "@/hooks/use-analytics";

interface TopCharactersCardProps {
  title: string;
  metric: "generations" | "unlocks" | "newest";
}

export const TopCharactersCard = ({ title, metric }: TopCharactersCardProps) => {
  // This is a stub component that would be connected to real data
  // For now, we're using sample data
  
  const getTopCharacters = () => {
    const characters = [
      {
        id: "8",
        name: "The Headless Horseman",
        generations: 248,
        unlocks: 42,
        createdAt: "2023-10-01T00:00:00Z",
        imageUrl: "/lovable-uploads/a1a65596-c4c6-47fe-9908-2664f60bfa8b.png",
      },
      {
        id: "1",
        name: "Luna",
        generations: 189,
        unlocks: 37,
        createdAt: "2023-09-15T00:00:00Z",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      },
      {
        id: "2",
        name: "Neo",
        generations: 154,
        unlocks: 29,
        createdAt: "2023-09-20T00:00:00Z",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      }
    ];
    
    if (metric === "generations") {
      return [...characters].sort((a, b) => b.generations - a.generations);
    } else if (metric === "unlocks") {
      return [...characters].sort((a, b) => b.unlocks - a.unlocks);
    } else {
      return [...characters].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  };

  const topCharacters = getTopCharacters();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>
          Top 3 characters by {metric === "newest" ? "creation date" : metric}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topCharacters.map((character, index) => (
            <div key={character.id} className="flex items-center">
              <div className="mr-2 rounded-full bg-gray-100 p-1 text-xs">
                {index + 1}
              </div>
              <div className="h-8 w-8 rounded-full mr-2 overflow-hidden">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">{character.name}</p>
              </div>
              <div className="text-sm font-medium">
                {metric === "generations" ? character.generations : 
                 metric === "unlocks" ? character.unlocks : 
                 new Date(character.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
