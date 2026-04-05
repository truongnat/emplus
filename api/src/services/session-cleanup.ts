/**
 * Periodic cleanup of expired sessions from PostgreSQL.
 * Redis keys auto-expire via TTL; this handles the DB rows.
 */

import { store } from "../store.ts";

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const BATCH_SIZE = 500;

let timer: ReturnType<typeof setInterval> | null = null;

async function runCleanup(): Promise<number> {
  const dataStore = store as unknown as Record<string, unknown>;
  if (typeof dataStore.cleanupExpiredSessions !== "function") {
    return 0;
  }
  return (dataStore as unknown as { cleanupExpiredSessions: (batch: number) => Promise<number> })
    .cleanupExpiredSessions(BATCH_SIZE);
}

export function startSessionCleanup(): void {
  if (timer) return;

  runCleanup().catch((err) =>
    console.error("[session-cleanup] initial run failed:", err),
  );

  timer = setInterval(() => {
    runCleanup()
      .then((count) => {
        if (count > 0) {
          console.log(`[session-cleanup] removed ${count} expired sessions`);
        }
      })
      .catch((err) =>
        console.error("[session-cleanup] run failed:", err),
      );
  }, CLEANUP_INTERVAL_MS);
}

export function stopSessionCleanup(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
