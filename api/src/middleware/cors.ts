/**
 * CORS middleware
 */

import { cors } from "hono/cors";
import { env } from "../config/env.ts";

function isLocalhostOrigin(origin: string): boolean {
  try {
    const target = new URL(origin);
    return target.hostname === "localhost" || target.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

const isProduction = env.nodeEnv.trim().toLowerCase() === "production";

export const corsMiddleware = cors({
  origin: (origin) => {
    // No origin header - be strict in production
    if (!origin) {
      return isProduction ? "" : "*";
    }

    // Wildcard only allowed in non-production
    if (env.corsAllowedOrigins.includes("*")) {
      return isProduction ? "" : "*";
    }

    // Check exact match
    if (env.corsAllowedOrigins.includes(origin)) {
      return origin;
    }

    // Allow localhost in development only
    if (!isProduction && isLocalhostOrigin(origin)) {
      return origin;
    }

    // Reject in production
    return "";
  },
  allowHeaders: ["Authorization", "Content-Type"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  exposeHeaders: ["X-Request-Id", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
  credentials: true,
});
