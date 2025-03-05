
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CharacterEngagement } from "@/hooks/use-analytics";
import { formatDistance } from "date-fns";

interface CharacterEngagementTableProps {
  data: CharacterEngagement[];
  isLoading: boolean;
  error: string | null;
}

export const CharacterEngagementTable = ({ 
  data, 
  isLoading, 
  error 
}: CharacterEngagementTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        Error loading table data
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Character</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Generations</TableHead>
              <TableHead className="text-right">Unlocks</TableHead>
              <TableHead className="text-right">Last Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No characters found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((character) => (
                <TableRow key={character.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {character.imageUrl && (
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    {character.name}
                  </TableCell>
                  <TableCell>{character.genre}</TableCell>
                  <TableCell className="text-right">{character.totalGenerations}</TableCell>
                  <TableCell className="text-right">{character.totalUnlocks}</TableCell>
                  <TableCell className="text-right">
                    {character.lastUsed 
                      ? formatDistance(new Date(character.lastUsed), new Date(), { addSuffix: true }) 
                      : 'Never'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
