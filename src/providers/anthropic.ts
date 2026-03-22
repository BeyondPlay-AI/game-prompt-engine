import Anthropic from "@anthropic-ai/sdk";
import { Config } from "../types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt.js";

export async function generateWithAnthropic(
  prompt: string,
  config: Config
): Promise<string> {
  const client = new Anthropic({ apiKey: config.apiKey });

  const response = await client.messages.create({
    model: config.model || "claude-sonnet-4-20250514",
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(prompt) }],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}
