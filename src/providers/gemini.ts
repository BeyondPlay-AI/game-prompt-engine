import { GoogleGenerativeAI } from "@google/generative-ai";
import { Config } from "../types.js";
import { SYSTEM_PROMPT, buildUserPrompt } from "../prompt.js";

export async function generateWithGemini(
  prompt: string,
  config: Config
): Promise<string> {
  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({
    model: config.model || "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await model.generateContent(buildUserPrompt(prompt));
  return result.response.text();
}
