import OpenAI from "openai";
import { Config } from "../types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt.js";

export async function generateWithOpenAI(
  prompt: string,
  config: Config
): Promise<string> {
  const client = new OpenAI({ apiKey: config.apiKey });

  const response = await client.chat.completions.create({
    model: config.model || "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(prompt) },
    ],
    max_tokens: 16000,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}
