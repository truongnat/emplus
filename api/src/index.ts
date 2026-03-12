import { app } from "./app.ts";
import { websocket } from "hono/bun";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  fetch: app.fetch,
  websocket,
});

console.log(`Em Plus API đang chạy tại http://localhost:${port}`);
