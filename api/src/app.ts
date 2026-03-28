import { Hono } from "hono";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import type { AppEnv } from "./app-env.ts";
import { env } from "./config/env.ts";
import { buildOpenApiSpec } from "./docs/openapi.ts";
import {
  adminRoutes,
  authRoutes,
  budgetRoutes,
  careRoutes,
  couplesRoutes,
  dashboardRoutes,
  debugRoutes,
  liveRoutes,
  notificationRoutes,
  systemRoutes,
  timelineRoutes,
  userRoutes,
} from "./modules/index.ts";
import { corsMiddleware } from "./middleware/cors.ts";
import { securityHeaders } from "./middleware/security.ts";
import { generalRateLimit } from "./middleware/rate-limit.ts";
import { sanitizeMiddleware } from "./middleware/sanitize.ts";
import { AppError, fail, success } from "./utils/http.ts";

export const app = new Hono<AppEnv>();

// Security headers
app.use("*", securityHeaders);

// CORS middleware
app.use("*", corsMiddleware);

// Rate limiting (general)
app.use("*", generalRateLimit);

// Input sanitization
app.use("*", sanitizeMiddleware);

// Logging middleware
app.use("*", logger());

// Request ID middleware
app.use("*", async (context, next) => {
  context.set("requestId", crypto.randomUUID());
  await next();
});

// Health check
app.get("/health", (context) => success(context, { status: "hoat_dong" }));

// Swagger/OpenAPI (only in non-production when enabled)
if (env.swaggerEnabled) {
  const swaggerPath = (env.swaggerPath || "/v1/docs").replace(/\/+$/, "") || "/v1/docs";
  const openApiJsonPath = `${swaggerPath}/openapi.json`;

  app.get(openApiJsonPath, (context) => {
    const origin = new URL(context.req.url).origin;
    return context.json(buildOpenApiSpec(origin, swaggerPath));
  });
  app.get(swaggerPath, swaggerUI({
    url: openApiJsonPath,
    persistAuthorization: true,
  }));
}

// Route registration
app.route("/v1/auth", authRoutes);
app.route("/v1/users", userRoutes);
app.route("/v1/couples", couplesRoutes);
app.route("/v1/dashboard", dashboardRoutes);
app.route("/v1/timeline", timelineRoutes);
app.route("/v1/care", careRoutes);
app.route("/v1/system", systemRoutes);
app.route("/v1/budget", budgetRoutes);
app.route("/v1/live", liveRoutes);
app.route("/v1/notifications", notificationRoutes);
app.route("/v1/admin", adminRoutes);

// Debug routes - only in non-production
if (env.nodeEnv !== "production") {
  app.route("/v1/debug", debugRoutes);
}

// 404 handler
app.notFound((context) => fail(context, new AppError(404, "NOT_FOUND", "Endpoint không tồn tại.")));

// Global error handler
app.onError((error, context) => {
  const requestId = context.get("requestId") as string;
  const method = context.req.method;
  const path = context.req.path;

  const legacyError = error as Error & {
    status?: number;
    code?: string;
    details?: unknown[];
  };

  if (
    typeof legacyError.status === "number" &&
    legacyError.status >= 400 &&
    legacyError.status <= 599 &&
    typeof legacyError.code === "string"
  ) {
    const normalizedError = new AppError(
      legacyError.status as AppError["status"],
      legacyError.code,
      legacyError.message || "Request thất bại.",
      Array.isArray(legacyError.details) ? legacyError.details : [],
    );
    if (normalizedError.status >= 400 && normalizedError.status < 500) {
      console.warn(
        `[${requestId}] Warning (${normalizedError.status}): [${method} ${path}] ${normalizedError.code} - ${normalizedError.message}`,
      );
    } else {
      console.error(
        `[${requestId}] Error (${normalizedError.status}): [${method} ${path}] ${normalizedError.code} - ${normalizedError.message}`,
        error,
      );
    }
    return fail(context, normalizedError);
  }

  if (error instanceof AppError) {
    if (error.status >= 400 && error.status < 500) {
      console.warn(`[${requestId}] Warning (${error.status}): [${method} ${path}] ${error.code} - ${error.message}`);
    } else {
      console.error(`[${requestId}] Error (${error.status}): [${method} ${path}] ${error.code} - ${error.message}`, error);
    }
    return fail(context, error);
  }

  console.error(`[${requestId}] Internal Server Error: [${method} ${path}]`, error);
  return fail(context, new AppError(500, "INTERNAL_SERVER_ERROR", "Đã có lỗi hệ thống."));
});
