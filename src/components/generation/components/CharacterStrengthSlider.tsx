
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
    
    // Validate the strength is within expected range
    if (newStrength < 0.1 || newStrength > 1.0) {
      console.warn(`LoRA strength outside valid range: ${newStrength}, clamping to valid range`);
      const clampedValue = Math.max(0.1, Math.min(1.0, newStrength));
      setSliderValue([clampedValue]);
      setLoraStrength(clampedValue);
      console.log(`LoRA strength clamped to: ${clampedValue}`);
      return;
    }
    
    setSliderValue(value);
    setLoraStrength(newStrength);
    console.log(`LoRA strength updated to: ${newStrength}`);
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
