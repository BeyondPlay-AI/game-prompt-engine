import { Config, Provider } from "../types.js";
import { generateWithOpenAI } from "./openai.js";
import { generateWithAnthropic } from "./anthropic.js";
import { generateWithGemini } from "./gemini.js";

const providers: Record<Provider, (prompt: string, config: Config) => Promise<string>> = {
  openai: generateWithOpenAI,
  anthropic: generateWithAnthropic,
  gemini: generateWithGemini,
};

export async function generateGame(prompt: string, config: Config): Promise<string> {
  const generate = providers[config.provider];
  if (!generate) {
    throw new Error(`Unknown provider: ${config.provider}. Use: openai, anthropic, or gemini`);
  }
  return generate(prompt, config);
}
