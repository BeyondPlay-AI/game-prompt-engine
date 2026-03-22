export type Provider = "openai" | "anthropic" | "gemini";

export interface Config {
  provider: Provider;
  apiKey: string;
  model?: string;
  port?: number;
  outputDir?: string;
}

export interface GenerateOptions {
  prompt: string;
  config: Config;
}

export interface GenerateResult {
  html: string;
  title: string;
  outputPath: string;
}

export const DEFAULT_MODELS: Record<Provider, string> = {
  openai: "gpt-4o",
  anthropic: "claude-sonnet-4-20250514",
  gemini: "gemini-2.5-flash",
};
