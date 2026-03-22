import express from "express";
import { readFileSync } from "fs";

export function serve(filePath: string, port: number): Promise<string> {
  return new Promise((resolve) => {
    const app = express();
    const html = readFileSync(filePath, "utf-8");

    app.get("/", (_req, res) => {
      res.type("html").send(html);
    });

    const server = app.listen(port, () => {
      const url = `http://localhost:${port}`;
      resolve(url);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      server.close();
      process.exit(0);
    });
  });
}
