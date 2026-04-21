import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { computeUpcomingEvents } from "../engines/anniversary.ts";
import { buildMaleSuggestions, getEmotionalPhase } from "../engines/emotional.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import { diffDays, parseDate, todayUtc } from "../utils/date.ts";
import { success } from "../utils/http.ts";
import { env } from "../config/env.ts";

export const dashboardRoutes = new Hono<AppEnv>();

dashboardRoutes.use("*", requireAuth);

function buildSoloHomePayload() {
  return {
    coupleContext: {
      loveDays: 0,
      loveStartDate: "",
    },
    upcomingEvents: [],
    careAdvice: {
      greeting: "Bắt đầu từ một điều quan trọng",
      subGreeting: "Thêm ngày quan trọng đầu tiên để Em+ nhắc bạn đúng lúc. Ghép đôi khi cả hai đã sẵn sàng.",
      iconName: "sparkles-outline",
    },
  };
}

dashboardRoutes.get("/home", async (context) => {
  const user = context.get("user");
  const couple = await store.getActiveCoupleForUser(user.id);

  if (!couple) {
    return success(context, buildSoloHomePayload());
  }

  const cached = await store.getHomeCache(couple.id);
  if (cached) {
    return success(context, cached);
  }

  const loveStartDate = couple.loveStartDate ?? couple.createdAt.slice(0, 10);
  const today = todayUtc();
  const loveDays = diffDays(parseDate(loveStartDate), today) + 1;
  const upcomingEvents = computeUpcomingEvents(couple, today, 45);

  const randomQuote = env.fallbackQuotes[today.getUTCDate() % env.fallbackQuotes.length];

  let actionHint = "Gửi một tin nhắn hỏi thăm và lên kế hoạch cho cuối tuần này.";
  let actionType = "MO_TAB_KY_NIEM";

  const partnerId = couple.partner1Id === user.id ? couple.partner2Id : couple.partner1Id;
  const partner = partnerId ? await store.getUserById(partnerId) : undefined;

  if (user.gender === "NAM" && partner) {
    const partnerCycle = await store.getCycleByUserId(partner.id);
    if (partnerCycle) {
      const phase = getEmotionalPhase(partnerCycle, today);
      const transformed = buildMaleSuggestions(partner.fullName, phase);
      actionHint = transformed.suggestions[0]?.text ?? actionHint;
      actionType = transformed.suggestions[0]?.callToAction.actionType ?? "MO_TAB_CHAM_SOC";
    }
  }

  const payload = {
    coupleContext: {
      loveDays,
      loveStartDate,
    },
    upcomingEvents,
    careAdvice: {
      greeting: randomQuote,
      subGreeting: actionHint,
      iconName: actionType === "MO_TAB_CHAM_SOC" ? "heart-outline" : "calendar-outline",
    },
  };

  await store.setHomeCache(couple.id, payload, 15 * 60);
  return success(context, payload);
});
