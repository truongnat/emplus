import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../app-env.ts";
import { env } from "../config/env.ts";

const isProduction = env.nodeEnv.trim().toLowerCase() === "production";

const cspProduction =
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self'; " +
  "img-src 'self' data: https:; " +
  "font-src 'self'; " +
  "connect-src 'self' https:; " +
  "frame-ancestors 'none'";

const cspDevelopment =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
  "img-src 'self' data: https:; " +
  "font-src 'self' data: https://cdn.jsdelivr.net; " +
  "connect-src 'self' https:; " +
  "frame-ancestors 'none'";

export const securityHeaders = createMiddleware<AppEnv>(async (c, next) => {
  const headers = new Headers();

  if (isProduction) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-XSS-Protection", "1; mode=block");
  headers.set("Content-Security-Policy", isProduction ? cspProduction : cspDevelopment);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Powered-By", "");

  await next();

  headers.forEach((value, key) => {
    c.res.headers.set(key, value);
  });
});
