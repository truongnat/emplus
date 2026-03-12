import { env } from "./config/env.ts";
import type { DataStore } from "./store/contracts.ts";
import { InMemoryStore } from "./store/in-memory-store.ts";
import { createPostgresStore } from "./store/postgres-store.ts";

function createStore(): DataStore {
  if (env.storeMode === "postgres") {
    if (!env.databaseUrl) {
      throw new Error("Thiếu DATABASE_URL khi DATA_STORE=postgres.");
    }

    return createPostgresStore(env.databaseUrl, env.redisUrl, env.readDatabaseUrl);
  }

  if (env.nodeEnv !== "test") {
    throw new Error("DATA_STORE=memory bị tắt ở môi trường chạy thực tế. Hãy dùng DATA_STORE=postgres.");
  }

  return new InMemoryStore();
}

export const store = createStore();
