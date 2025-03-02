
export interface Character {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  isLocked: boolean;
  description: string;
  unlocks: number;
  loraFileId?: string;
  loraFileUrl?: string;
  loraStrength?: number;
}
