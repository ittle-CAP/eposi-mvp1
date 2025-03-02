
export interface ReplicateGenerationOptions {
  prompt: string;
  loraUrl?: string;
  loraStrength?: number;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numOutputs?: number;
  steps?: number;
  guidanceScale?: number;
  modelVersion?: string;
}

export interface ReplicateResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string[] | null;
  error?: string | null;
}
