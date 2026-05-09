import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import { generateInvite, joinCouple, createCouple, updateCouple } from "../services/couple.service.ts";
import { validateJoinCoupleInput, validateCreateCoupleInput, validateUpdateCoupleInput } from "../dto/couples.dto.ts";
import { readJson, success, AppError } from "../utils/http.ts";
import { store } from "../store.ts";
import { displayGender, displayCoupleStatus } from "../utils/presentation.ts";

export const couplesRoutes = new Hono<AppEnv>();

couplesRoutes.use("*", requireAuth);

couplesRoutes.get("/me", async (context) => {
  const user = context.get("user");
  const couple = await store.getActiveCoupleForUser(user.id);

  if (!couple) {
    return success(context, { couple: null, status: "no_couple" });
  }

  let partner;
  let inviteCode;

  if (couple.partner2Id) {
    const partnerId = couple.partner1Id === user.id ? couple.partner2Id : couple.partner1Id;
    partner = await store.getUserById(partnerId);
  }

  if (!couple.partner2Id && couple.partner1Id === user.id) {
    inviteCode = couple.inviteCode;
  }

  return success(context, {
    couple: {
      id: couple.id,
      loveStartDate: couple.loveStartDate,
      status: displayCoupleStatus(couple.status),
      inviteCode: inviteCode,
      partner: partner
        ? { id: partner.id, fullName: partner.fullName, gender: displayGender(partner.gender) }
        : null,
    },
    status: couple.partner2Id ? "paired" : "pending",
  });
});

couplesRoutes.post("/", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateCreateCoupleInput(body);

  const couple = await createCouple(user.id, input);

  return success(
    context,
    {
      couple: {
        id: couple.id,
        loveStartDate: couple.loveStartDate,
        status: displayCoupleStatus(couple.status),
        inviteCode: couple.inviteCode,
      },
    },
    201,
  );
});

couplesRoutes.patch("/me", async (context) => {
  const user = context.get("user");
  const activeCouple = await store.getActiveCoupleForUser(user.id);

  if (!activeCouple) {
    throw new AppError(404, "NO_COUPLE", "Bạn chưa tạo cặp đôi.");
  }

  const body = await readJson<Record<string, unknown>>(context);
  const input = validateUpdateCoupleInput(body);

  const updated = await updateCouple(activeCouple.id, input);

  return success(context, {
    couple: {
      id: updated.id,
      loveStartDate: updated.loveStartDate,
      status: displayCoupleStatus(updated.status),
    },
  });
});

couplesRoutes.post("/invite", async (context) => {
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
