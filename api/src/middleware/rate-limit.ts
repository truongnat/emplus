import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";

// Simple in-memory rate limiter store
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  keyGenerator?: (c: any) => string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60000, // 1 minute
  max: 100, // 100 requests per minute
  message: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
};

const authConfig: RateLimitConfig = {
  windowMs: 60000, // 1 minute
  max: 10, // 10 requests per minute for auth endpoints
  message: "Quá nhiều lần thử. Vui lòng thử lại sau.",
};

function getClientIp(c: any): string {
  const forwarded = c.req.header("X-Forwarded-For");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return c.req.header("X-Real-IP") || "unknown";
}

export const rateLimitMiddleware = (config: RateLimitConfig = defaultConfig) => {
  return createMiddleware<AppEnv>(async (c, next) => {
    const key = config.keyGenerator ? config.keyGenerator(c) : getClientIp(c);
    const now = Date.now();

    let entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      rateLimitStore.set(key, entry);
    }

    entry.count++;

    // Set rate limit headers
    c.res.headers.set("X-RateLimit-Limit", String(config.max));
    c.res.headers.set(
      "X-RateLimit-Remaining",
      String(Math.max(0, config.max - entry.count))
    );
    c.res.headers.set(
      "X-RateLimit-Reset",
      String(Math.ceil(entry.resetTime / 1000))
    );

    if (entry.count > config.max) {
      return c.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: config.message || "Quá nhiều yêu cầu.",
          },
        },
        429
      );
    }

    await next();
  });
};

// Pre-configured rate limiters
export const generalRateLimit = rateLimitMiddleware(defaultConfig);
export const authRateLimit = rateLimitMiddleware(authConfig);
