import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../app-env.ts";

/**
 * Security headers middleware using Helmet-like approach
 * Note: Hono doesn't have a direct Helmet package, so we implement security headers manually
 */
export const securityHeaders = createMiddleware<AppEnv>(async (c, next) => {
  const headers = new Headers();

  // HSTS - Force HTTPS
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff");

  // XSS Protection (legacy but still helpful for older browsers)
  headers.set("X-XSS-Protection", "1; mode=block");

  // Content Security Policy
  // Allow Swagger UI to load CSS from CDN
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data: https://cdn.jsdelivr.net; " +
    "connect-src 'self' https:; " +
    "frame-ancestors 'none'"
  );

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Remove server identification
  headers.set("X-Powered-By", "");

  await next();

  // Add headers to response
  headers.forEach((value, key) => {
    c.res.headers.set(key, value);
  });
});
