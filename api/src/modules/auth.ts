import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { readJson } from "../utils/http.ts";
import { requireAuth } from "../middleware/auth.ts";
import {
  registerUser,
  loginUser,
  verifyOtpAndLogin,
  refreshToken,
  logout,
} from "../services/auth.service.ts";
import {
  validateRegisterInput,
  validateLoginInput,
  validateRefreshTokenInput,
  validateVerifyOtpInput,
  validateLogoutInput,
} from "../dto/auth.dto.ts";
import { success } from "../utils/http.ts";

export const authRoutes = new Hono<AppEnv>();

authRoutes.post("/register", async (context) => {
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateRegisterInput(body);

  const payload = await registerUser(input.email, input.password, input.fullName, input.gender);
  return success(context, payload, 201);
});

authRoutes.post("/login", async (context) => {
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateLoginInput(body);

  const result = await loginUser(input.email, input.password);
  return success(context, result);
});

authRoutes.post("/verify-otp", async (context) => {
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateVerifyOtpInput(body);

  const payload = await verifyOtpAndLogin(input.email, input.otp);
  return success(context, payload);
});

authRoutes.post("/refresh", async (context) => {
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateRefreshTokenInput(body);

  const payload = await refreshToken(input.refreshToken);
  return success(context, payload);
});

authRoutes.post("/logout", requireAuth, async (context) => {
  const user = context.get("user");
  const body = await context.req.json<Record<string, unknown>>().catch(() => ({}));
  const input = validateLogoutInput(body);

  await logout(user.id, input.accessToken, input.refreshToken);

  return success(context, { loggedOut: true });
});
