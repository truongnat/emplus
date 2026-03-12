import type { MiddlewareHandler } from "hono";
import { store } from "../store.ts";
import { AppError } from "../utils/http.ts";

export const requireAuth: MiddlewareHandler = async (context, next) => {
  const header = context.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "UNAUTHORIZED", "Thiếu bearer token trong header Authorization.");
  }

  const token = header.replace("Bearer ", "").trim();
  if (!token) {
    throw new AppError(401, "UNAUTHORIZED", "Thiếu bearer token trong header Authorization.");
  }

  const user = await store.getUserByToken(token);
  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.");
  }

  context.set("user", user);
  await next();
};

/**
 * Middleware to require admin privileges
 */
export const requireAdmin: MiddlewareHandler = async (context, next) => {
  const user = context.get("user");

  if (!user) {
    throw new AppError(401, "UNAUTHORIZED", "Vui lòng đăng nhập.");
  }

  if (!user.isAdmin) {
    throw new AppError(403, "FORBIDDEN", "Bạn không có quyền truy cập admin.");
  }

  await next();
};
