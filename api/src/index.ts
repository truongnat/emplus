import { app } from "./app.ts";
import { websocket } from "hono/bun";
import { startSessionCleanup } from "./services/session-cleanup.ts";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  fetch: app.fetch,
  websocket,
});

startSessionCleanup();

console.log(`Em+ API đang chạy tại http://localhost:${port}`);
