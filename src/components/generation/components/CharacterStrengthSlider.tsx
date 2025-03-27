
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface CharacterStrengthSliderProps {
  loraStrength: number;
  setLoraStrength: (value: number) => void;
}

export const CharacterStrengthSlider = ({
  loraStrength,
  setLoraStrength,
}: CharacterStrengthSliderProps) => {
  const [sliderValue, setSliderValue] = useState([loraStrength]);

  console.log("Rendering CharacterStrengthSlider with strength:", loraStrength);

  // Update slider when loraStrength changes from parent
  useEffect(() => {
    console.log("LoRA strength changed from parent:", loraStrength);
    setSliderValue([loraStrength]);
  }, [loraStrength]);

  const handleSliderChange = (value: number[]) => {
    if (!value || value.length === 0) return;
    
    const newStrength = value[0];
    
    // Ensure the strength is within the valid range and round to 1 decimal place
    // This prevents floating point precision issues
    if (newStrength < 0.1 || newStrength > 1.0) {
      console.warn(`LoRA strength outside valid range: ${newStrength}, clamping to valid range`);
      const clampedValue = Math.max(0.1, Math.min(1.0, newStrength));
      const roundedValue = Math.round(clampedValue * 10) / 10; // Round to 1 decimal place
      setSliderValue([roundedValue]);
      setLoraStrength(roundedValue);
      console.log(`LoRA strength clamped and rounded to: ${roundedValue}`);
      return;
    }
    
    // Round to 1 decimal place for consistency
    const roundedStrength = Math.round(newStrength * 10) / 10;
    setSliderValue([roundedStrength]);
    setLoraStrength(roundedStrength);
    console.log(`LoRA strength updated to: ${roundedStrength}`);
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Character Strength: {sliderValue[0].toFixed(1)}
      </label>
      <Slider
        value={sliderValue}
        onValueChange={handleSliderChange}
        max={1}
        step={0.1}
        min={0.1}
        className="py-2"
      />
      <p className="mt-1 text-sm text-gray-500">
        Adjust how strongly the character style appears in the generated image
      </p>
    </div>
  );
};
