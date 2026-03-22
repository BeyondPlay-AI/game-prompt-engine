import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import open from "open";
import { config as loadEnv } from "dotenv";
import { generate } from "./engine.js";
import { serve } from "./server.js";
import { Config, Provider, DEFAULT_MODELS } from "./types.js";

loadEnv();

const program = new Command();

program
  .name("game-prompt-engine")
  .description("Prompt → Playable HTML5 Game. Powered by AI.")
  .version("0.1.0")
  .argument("<prompt>", "Describe the game you want to build")
  .option("-p, --provider <provider>", "AI provider: openai, anthropic, gemini", "openai")
  .option("-k, --api-key <key>", "API key (or set via env: OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY)")
  .option("-m, --model <model>", "Model to use (defaults to best available per provider)")
  .option("-o, --output <dir>", "Output directory", "./games")
  .option("--port <port>", "Dev server port", "3000")
  .option("--no-open", "Don't auto-open in browser")
  .option("--no-serve", "Don't start dev server, just output the file")
  .action(async (prompt: string, opts) => {
    const provider = opts.provider as Provider;
    const apiKey = resolveApiKey(provider, opts.apiKey);

    if (!apiKey) {
      console.error(
        chalk.red(`\n✗ No API key found for ${provider}.\n`)
      );
      console.error(
        chalk.dim(
          `Set it via:\n` +
            `  --api-key <key>\n` +
            `  ${envVarName(provider)}=<key>\n` +
            `  .env file with ${envVarName(provider)}=<key>\n`
        )
      );
      process.exit(1);
    }

    const config: Config = {
      provider,
      apiKey,
      model: opts.model || DEFAULT_MODELS[provider],
      outputDir: opts.output,
      port: parseInt(opts.port, 10),
    };

    console.log(
      chalk.bold(`\n🎮 Game Prompt Engine`) +
        chalk.dim(` by BeyondPlay\n`)
    );
    console.log(chalk.dim(`Provider: ${provider} (${config.model})`));
    console.log(chalk.dim(`Prompt: "${prompt}"\n`));

    const spinner = ora("Generating your game...").start();

    try {
      const result = await generate(prompt, config);
      spinner.succeed(
        chalk.green(`Game created: ${chalk.bold(result.title)}`)
      );
      console.log(chalk.dim(`File: ${result.outputPath}\n`));

      if (opts.serve !== false) {
        const url = await serve(result.outputPath, config.port || 3000);
        console.log(
          chalk.cyan(`▶ Playing at ${chalk.bold(url)}`)
        );
        console.log(chalk.dim("Press Ctrl+C to stop\n"));

        if (opts.open !== false) {
          await open(url);
        }
      }
    } catch (err: any) {
      spinner.fail(chalk.red("Generation failed"));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  });

function resolveApiKey(provider: Provider, cliKey?: string): string | undefined {
  if (cliKey) return cliKey;

  const envVar = envVarName(provider);
  return process.env[envVar];
}

function envVarName(provider: Provider): string {
  const vars: Record<Provider, string> = {
    openai: "OPENAI_API_KEY",
    anthropic: "ANTHROPIC_API_KEY",
    gemini: "GEMINI_API_KEY",
  };
  return vars[provider];
}

program.parse();
