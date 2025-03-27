
import React from "react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
}

export const PromptInput = ({ prompt, setPrompt }: PromptInputProps) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Image Description
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want to generate..."
        className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#553D8A] focus:outline-none focus:ring-1 focus:ring-[#553D8A]"
        rows={4}
      />
    </div>
  );
};
