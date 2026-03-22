# 🎮 Game Prompt Engine

**Prompt → Playable HTML5 Game in seconds.**

Describe any game idea and get a fully playable, self-contained HTML5 game. No build steps, no frameworks, no game dev experience needed.

Built by [BeyondPlay](https://beyondplay.xyz) — the AI game creation platform.

## Quick Start

```bash
npm install -g @beyondplay/game-prompt-engine

# Set your API key
export OPENAI_API_KEY=sk-xxx

# Generate a game
game-prompt-engine "a snake game where eating food makes you faster and obstacles appear"
```

Your game opens in the browser instantly. The HTML file is saved to `./games/`.

## Providers

Bring your own API key. We support:

| Provider | Env Variable | Default Model |
|----------|-------------|---------------|
| OpenAI | `OPENAI_API_KEY` | gpt-4o |
| Anthropic | `ANTHROPIC_API_KEY` | claude-sonnet-4-20250514 |
| Google Gemini | `GEMINI_API_KEY` | gemini-2.5-flash |

```bash
# Use Anthropic
game-prompt-engine "a platformer with wall jumps" --provider anthropic

# Use Gemini
game-prompt-engine "a tower defense game" --provider gemini

# Use a specific model
game-prompt-engine "a puzzle game" --provider openai --model gpt-4o-mini
```

## Options

```
Usage: game-prompt-engine [options] <prompt>

Arguments:
  prompt                    Describe the game you want to build

Options:
  -p, --provider <provider> AI provider: openai, anthropic, gemini (default: "openai")
  -k, --api-key <key>       API key (or set via environment variable)
  -m, --model <model>       Model override
  -o, --output <dir>        Output directory (default: "./games")
  --port <port>             Dev server port (default: "3000")
  --no-open                 Don't auto-open in browser
  --no-serve                Just output the file, don't start server
  -V, --version             Output version
  -h, --help                Display help
```

## Use as a Library

```typescript
import { generate } from "@beyondplay/game-prompt-engine";

const result = await generate("a breakout clone with neon visuals", {
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

console.log(result.title);      // "Neon Breakout"
console.log(result.outputPath); // "./games/neon-breakout.html"
console.log(result.html);       // Full HTML string
```

## What You Get

Every generated game includes:
- 🎯 **Single HTML file** — no dependencies, no build step
- 🎮 **Keyboard + touch controls** — works on desktop and mobile
- 🏆 **Score tracking** — with high score persistence
- 🔄 **Start & game over screens** — with restart
- ✨ **Juice** — particles, screen shake, sound effects (Web Audio API)
- 📱 **Responsive** — adapts to any screen size

## Examples

```bash
# Classic arcade
game-prompt-engine "space invaders with power-ups and boss battles"

# Creative
game-prompt-engine "a game where you're a cat knocking things off tables for points"

# Multiplayer-ready
game-prompt-engine "2-player pong with special abilities"

# Educational
game-prompt-engine "a typing speed game with programming keywords"
```

## Development

```bash
git clone https://github.com/BeyondPlay-AI/game-prompt-engine
cd game-prompt-engine
npm install
npm run build
node dist/cli.js "your game idea"
```

## Want More?

This is the open source engine behind [BeyondPlay](https://beyondplay.xyz) — where you can build games with AI, add multiplayer, leaderboards, and share them with the world. No API key needed.

**[Try BeyondPlay Studio →](https://studio.beyondplay.xyz)**

## License

MIT — go build something fun.
