import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../app-env.ts";

// Max lengths for different input types
const MAX_LENGTHS = {
  email: 255,
  password: 128,
  name: 100,
  text: 1000,
  id: 36,
  code: 20,
};

// Basic XSS prevention patterns
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:/gi,
];

function sanitizeString(value: string, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  // Trim and limit length
  let sanitized = value.trim().slice(0, maxLength);

  // Remove XSS patterns
  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, "");
  }

  return sanitized;
}

function sanitizeObject(obj: any, maxDepth = 5): any {
  if (maxDepth <= 0) {
    return undefined;
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return sanitizeString(obj, MAX_LENGTHS.text);
  }

  if (typeof obj === "number" || typeof obj === "boolean") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, maxDepth - 1));
  }

  if (typeof obj === "object") {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Determine max length based on key
      let maxLength = MAX_LENGTHS.text;
      if (key.includes("email")) {
        maxLength = MAX_LENGTHS.email;
      } else if (key.includes("password")) {
        maxLength = MAX_LENGTHS.password;
      } else if (key === "id" || key.endsWith("Id")) {
        maxLength = MAX_LENGTHS.id;
      } else if (key === "code" || key === "inviteCode") {
        maxLength = MAX_LENGTHS.code;
      } else if (key === "fullName" || key === "nickname" || key === "name") {
        maxLength = MAX_LENGTHS.name;
      }

      if (typeof value === "string") {
        sanitized[key] = sanitizeString(value, maxLength);
      } else {
        sanitized[key] = sanitizeObject(value, maxDepth - 1);
      }
    }
    return sanitized;
  }

  return obj;
}

export const sanitizeMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  // Sanitize query params
  const queryParams: Record<string, any> = {};
  const rawQueries = c.req.queries();
  for (const key of Object.keys(rawQueries)) {
    const values = rawQueries[key];
    queryParams[key] = values.map(v => sanitizeString(v, MAX_LENGTHS.text));
  }
  (c.req as any).sanitizedQuery = queryParams;

  // Sanitize body for POST/PUT/PATCH (JSON only — multipart must stay unread for handlers)
  if (["POST", "PUT", "PATCH"].includes(c.req.method)) {
    const ct = c.req.header("content-type") ?? "";
    if (ct.includes("multipart/form-data")) {
      (c.req as any).sanitizedBody = null;
    } else {
      try {
        const body = await c.req.json();
        const sanitizedBody = sanitizeObject(body);
        (c.req as any).sanitizedBody = sanitizedBody;
      } catch {
        (c.req as any).sanitizedBody = null;
      }
    }
  }

  await next();
});

// Helper to get sanitized input
export function getSanitizedBody(c: any): any {
  return (c.req as any).sanitizedBody;
}

export function getSanitizedQuery(c: any): Record<string, any> {
  return (c.req as any).sanitizedQuery;
}
