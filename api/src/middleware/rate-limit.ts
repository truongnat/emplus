import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";

// ─── In-memory fallback ──────────────────────────────────────────────────────

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const memStore = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memStore.entries()) {
    if (now > entry.resetTime) {
      memStore.delete(key);
    }
  }
}, 60_000);

// ─── Redis backend (lazy-initialised) ────────────────────────────────────────

let redis: import("ioredis").default | null = null;
let redisUnavailable = false;

async function getRedis(): Promise<import("ioredis").default | null> {
  if (redisUnavailable || !env.redisUrl) return null;
  if (redis) return redis;
  try {
    const { default: Redis } = await import("ioredis");
    redis = new Redis(env.redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
    await redis.connect();
    return redis;
  } catch {
    redisUnavailable = true;
    console.warn("[rate-limit] Redis unavailable — falling back to in-memory");
    return null;
  }
}

async function redisIncrement(key: string, windowSec: number): Promise<{ count: number; ttl: number }> {
  const r = await getRedis();
  if (!r) throw new Error("no redis");
  const count = await r.incr(key);
  if (count === 1) {
    await r.expire(key, windowSec);
  }
  const ttl = await r.ttl(key);
  return { count, ttl: ttl > 0 ? ttl : windowSec };
}

// ─── Config ──────────────────────────────────────────────────────────────────

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  /** Tách bucket Redis/memory — bắt buộc khác nhau giữa các middleware để không cộng dồn nhầm. */
  keyNamespace: string;
  keyGenerator?: (c: Context<AppEnv>) => string;
  /** Bỏ qua giới hạn (ví dụ refresh token: duy trì phiên, không phải brute-force). */
  shouldSkip?: (c: Context<AppEnv>) => boolean;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60_000,
  max: 100,
  keyNamespace: "global",
  message: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
};

const authConfig: RateLimitConfig = {
  windowMs: 60_000,
  max: 10,
  keyNamespace: "auth",
  message: "Quá nhiều lần thử. Vui lòng thử lại sau.",
  shouldSkip: (c) => c.req.method === "POST" && c.req.path === "/v1/auth/refresh",
};

function getClientIp(c: Context<AppEnv>): string {
  const forwarded = c.req.header("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return c.req.header("X-Real-IP") || "unknown";
}

// ─── Middleware factory ──────────────────────────────────────────────────────

export const rateLimitMiddleware = (config: RateLimitConfig) => {
  const windowSec = Math.ceil(config.windowMs / 1000);
  const prefix = "rl:";

  return createMiddleware<AppEnv>(async (c, next) => {
    if (config.shouldSkip?.(c)) {
      await next();
      return;
    }

    const rawKey = config.keyGenerator ? config.keyGenerator(c) : getClientIp(c);
    const key = `${prefix}${config.keyNamespace}:${rawKey}`;
    const now = Date.now();

    let count: number;
    let resetTime: number;

    try {
      const result = await redisIncrement(key, windowSec);
      count = result.count;
      resetTime = now + result.ttl * 1000;
    } catch {
      let entry = memStore.get(key);
      if (!entry || now > entry.resetTime) {
        entry = { count: 0, resetTime: now + config.windowMs };
        memStore.set(key, entry);
      }
      entry.count++;
      count = entry.count;
      resetTime = entry.resetTime;
    }

    c.res.headers.set("X-RateLimit-Limit", String(config.max));
    c.res.headers.set("X-RateLimit-Remaining", String(Math.max(0, config.max - count)));
    c.res.headers.set("X-RateLimit-Reset", String(Math.ceil(resetTime / 1000)));

    if (count > config.max) {
      return c.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: config.message || "Quá nhiều yêu cầu.",
          },
        },
        429,
      );
    }

    await next();
  });
};

export const generalRateLimit = rateLimitMiddleware(defaultConfig);
export const authRateLimit = rateLimitMiddleware(authConfig);
