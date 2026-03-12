import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { buildMaleSuggestions, getEmotionalPhase } from "../engines/emotional.ts";
import { validateSaveCycleInput } from "../dto/care.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import type { EmotionalCycle, User } from "../types.ts";
import { todayUtc } from "../utils/date.ts";
import { AppError, readJson, success } from "../utils/http.ts";

async function getPartner(current: User): Promise<{ partner: User; coupleId: string }> {
  const couple = await store.getActiveCoupleForUser(current.id);
  if (!couple || !couple.partner2Id) {
    throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa có mối quan hệ đang hoạt động.");
  }

  const partnerId = couple.partner1Id === current.id ? couple.partner2Id : couple.partner1Id;
  const partner = await store.getUserById(partnerId);
  if (!partner) {
    throw new AppError(404, "PARTNER_NOT_FOUND", "Không tìm thấy đối tác.");
  }

  return { partner, coupleId: couple.id };
}

export const careRoutes = new Hono<AppEnv>();

careRoutes.use("*", requireAuth);

careRoutes.post("/female-cycle", async (context) => {
  const user = context.get("user");
  if (user.gender !== "NU") {
    throw new AppError(403, "FORBIDDEN", "API này chỉ dành cho nữ giới.");
  }

  const body = await readJson<Record<string, unknown>>(context);
  const input = validateSaveCycleInput(body);

  const cycle: EmotionalCycle = {
    id: crypto.randomUUID(),
    userId: user.id,
    startDate: input.lastPeriodStart,
    cycleDuration: input.avgCycleLength,
    periodDuration: input.avgPeriodLength,
    symptomNotes: [],
    isTrackingActive: true,
  };

  await store.saveCycle(cycle);

  const activeCouple = await store.getActiveCoupleForUser(user.id);
  if (activeCouple) {
    await store.invalidateHomeCache(activeCouple.id);
  }

  return success(context, {
    message: "Đã lưu chu kỳ thành công.",
    cycle,
  });
});

careRoutes.get("/male-suggestions", async (context) => {
  const user = context.get("user");

  if (user.gender !== "NAM") {
    throw new AppError(403, "FORBIDDEN", "API này chỉ dành cho nam giới.");
  }

  const { partner } = await getPartner(user);
  const partnerCycle = await store.getCycleByUserId(partner.id);

  if (!partnerCycle || !partnerCycle.isTrackingActive) {
    return success(context, {
      emotionalStatusContext: "CHUA_CHIA_SE_CHU_KY",
      suggestions: [
        {
          priority: 1,
          text: `Hôm nay hãy bắt đầu bằng một lời hỏi thăm ngắn dành cho ${partner.fullName}.`,
          callToAction: {
            label: "Gợi ý quà nhẹ nhàng",
            actionType: "MO_TAB_QUA_TANG",
            icon: "heart",
          },
        },
      ],
    });
  }

  const phase = getEmotionalPhase(partnerCycle, todayUtc());
  const transformed = buildMaleSuggestions(partner.fullName, phase);

  return success(context, {
    emotionalStatusContext: transformed.emotionalStatusContext,
    suggestions: transformed.suggestions,
  });
});
