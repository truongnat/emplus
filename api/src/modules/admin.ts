import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth, requireAdmin } from "../middleware/auth.ts";
import { store } from "../store.ts";
import { success } from "../utils/http.ts";
import type { Couple, User } from "../types.ts";

export const adminRoutes = new Hono<AppEnv>();

// Get admin stats
adminRoutes.get("/stats", requireAuth, requireAdmin, async (c) => {
  const users = (await store.listAllUsers?.()) ?? [];
  const couples = (await store.listAllCouples?.()) ?? [];

  const activeStatuses = new Set(["DANG_YEU", "DA_CUOI"]);

  const stats = {
    totalUsers: users.length,
    totalCouples: couples.length,
    activeCouples: couples.filter((cp) => activeStatuses.has(cp.status)).length,
    totalMemories: (await store.countMemories?.()) ?? 0,
  };

  const transformedUsers = users.map((u: User) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    nickname: u.nickname,
    gender: u.gender,
    isAdmin: u.isAdmin || false,
    isActive: u.isActive,
    createdAt: u.createdAt,
  }));

  const transformedCouples = await Promise.all(
    couples.map(async (couple: Couple) => {
      const partner1 = couple.partner1Id
        ? await store.getUserById(couple.partner1Id)
        : null;
      const partner2 = couple.partner2Id
        ? await store.getUserById(couple.partner2Id)
        : null;

      return {
        id: couple.id,
        partner1Email: partner1?.email || "Unknown",
        partner2Email: partner2?.email || null,
        status: couple.status,
        loveStartDate: couple.loveStartDate,
        createdAt: couple.createdAt,
      };
    }),
  );

  return success(c, {
    stats,
    users: transformedUsers,
    couples: transformedCouples,
  });
});
