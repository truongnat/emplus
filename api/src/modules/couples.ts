import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import { generateInvite, joinCouple } from "../services/couple.service.ts";
import { validateJoinCoupleInput } from "../dto/couples.dto.ts";
import { readJson, success } from "../utils/http.ts";
import { store } from "../store.ts";
import { displayGender } from "../utils/presentation.ts";

export const couplesRoutes = new Hono<AppEnv>();

couplesRoutes.use("*", requireAuth);

couplesRoutes.post("/generate-invite", async (context) => {
  const user = context.get("user");

  const result = await generateInvite(user.id);

  return success(
    context,
    {
      inviteCode: result.inviteCode,
      expiresIn: result.expiresIn,
    },
    201,
  );
});

couplesRoutes.get("/status", async (context) => {
  const user = context.get("user");
  const couple = await store.getActiveCoupleForUser(user.id);

  if (!couple || !couple.partner2Id) {
    return success(context, { paired: false });
  }

  const partnerId = couple.partner1Id === user.id ? couple.partner2Id : couple.partner1Id;
  const partner = await store.getUserById(partnerId);

  return success(context, {
    paired: true,
    coupleId: couple.id,
    partner: partner
      ? { id: partner.id, fullName: partner.fullName, gender: displayGender(partner.gender) }
      : undefined,
  });
});

couplesRoutes.post("/join", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateJoinCoupleInput(body);

  const result = await joinCouple(user, input.inviteCode);

  return success(context, result);
});
