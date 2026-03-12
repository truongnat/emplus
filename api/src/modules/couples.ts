import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import { generateInvite, joinCouple } from "../services/couple.service.ts";
import { validateJoinCoupleInput } from "../dto/couples.dto.ts";
import { readJson, success } from "../utils/http.ts";

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

couplesRoutes.post("/join", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateJoinCoupleInput(body);

  const result = await joinCouple(user, input.inviteCode);

  return success(context, result);
});
