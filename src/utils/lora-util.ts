
import { Character } from "@/types/character";

/**
 * Determines if a character has a valid embedded LoRA.
 * Must have a non-empty loraFileId and loraFileUrl.
 */
export function hasLora(character?: Character): boolean {
  return !!(
    character &&
    character.loraFileId &&
    character.loraFileUrl &&
    character.loraFileId.length > 0 &&
    character.loraFileUrl.length > 0
  );
}

/**
 * Gets the default LoRA strength for a character.
 * If LoRA is enabled, returns 1.0; otherwise, fallback to existing or 0.7.
 */
export function getDefaultLoraStrength(character?: Character): number {
  if (hasLora(character)) return 1.0;
  if (character && typeof character.loraStrength === "number") return character.loraStrength;
  return 0.7;
}
