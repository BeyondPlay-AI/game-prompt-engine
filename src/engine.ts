import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { generateGame } from "./providers/index.js";
import { Config, GenerateResult } from "./types.js";

function extractTitle(raw: string): string {
  const match = raw.match(/^TITLE:\s*(.+)$/m);
  return match ? match[1].trim() : "Untitled Game";
}

function extractHtml(raw: string): string {
  const match = raw.match(/```html\s*\n([\s\S]*?)```/);
  if (match) return match[1].trim();

  // Fallback: try to find raw HTML
  const htmlMatch = raw.match(/<(!DOCTYPE|html)[\s\S]*<\/html>/i);
  if (htmlMatch) return htmlMatch[0];

  throw new Error("Could not extract HTML from AI response. The model may have returned an unexpected format.");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

export async function generate(prompt: string, config: Config): Promise<GenerateResult> {
  const raw = await generateGame(prompt, config);
  const title = extractTitle(raw);
  const html = extractHtml(raw);

  const outputDir = config.outputDir || "./games";
  mkdirSync(outputDir, { recursive: true });

  const filename = `${slugify(title)}.html`;
  const outputPath = join(outputDir, filename);
  writeFileSync(outputPath, html, "utf-8");

  return { html, title, outputPath };
}
