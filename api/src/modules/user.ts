import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import { getUserProfile, updateUserProfile } from "../services/user.service.ts";
import { validatePushTokenInput, validateUpdateProfileInput } from "../dto/user.dto.ts";
import { AppError, readJson, success } from "../utils/http.ts";
import { store } from "../store.ts";

export const userRoutes = new Hono<AppEnv>();

userRoutes.use("*", requireAuth);

// Get current user profile
userRoutes.get("/me", async (context) => {
  const user = context.get("user");
  const profile = await getUserProfile(user.id);

  if (!profile) {
    throw new AppError(404, "USER_NOT_FOUND", "Không tìm thấy người dùng.");
  }

  return success(context, profile);
});

// Update current user profile
userRoutes.put("/me", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);

  const input = validateUpdateProfileInput(body);

  const profile = await updateUserProfile(user.id, {
    fullName: input.fullName,
    nickname: input.nickname,
    avatarUrl: input.avatarUrl,
    profileBackgroundUrl: input.profileBackgroundUrl,
    gender: input.gender,
    dob: input.dob,
    birthTime: input.birthTime,
    timezone: input.timezone,
    emailNotificationsEnabled: input.emailNotificationsEnabled,
    profilePrivate: input.profilePrivate,
    showOnlineStatus: input.showOnlineStatus,
  });

  return success(context, profile);
});

userRoutes.post("/push-token", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);
  const input = validatePushTokenInput(body);
  await store.updateExpoPushToken(user.id, input.expoPushToken);
  return success(context, { saved: true });
});
