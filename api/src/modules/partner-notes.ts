import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { validatePartnerNoteInput } from "../dto/partner-note.dto.ts";
import { requireAuth } from "../middleware/auth.ts";
import { store } from "../store.ts";
import type { PartnerNote } from "../types.ts";
import { AppError, readJson, success } from "../utils/http.ts";

export const partnerNotesRoutes = new Hono<AppEnv>();

partnerNotesRoutes.use("*", requireAuth);

partnerNotesRoutes.get("/", async (context) => {
  const user = context.get("user");
  const notes = await store.listPartnerNotesByUser(user.id);
  return success(context, notes);
});

partnerNotesRoutes.get("/:id", async (context) => {
  const user = context.get("user");
  const id = context.req.param("id");
  const note = await store.getPartnerNoteByUser(user.id, id);

  if (!note) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy ghi nhớ.");
  }

  return success(context, note);
});

partnerNotesRoutes.post("/", async (context) => {
  const user = context.get("user");
  const body = await readJson<Record<string, unknown>>(context);
  const input = validatePartnerNoteInput(body);
  const activeCouple = await store.getActiveCoupleForUser(user.id);
  const now = new Date().toISOString();

  const note: PartnerNote = {
    id: crypto.randomUUID(),
    userId: user.id,
    coupleId: activeCouple?.id,
    title: input.title,
    content: input.content,
    category: input.category,
    createdAt: now,
    updatedAt: now,
  };

  await store.savePartnerNote(note);
  return success(context, note, 201);
});

partnerNotesRoutes.put("/:id", async (context) => {
  const user = context.get("user");
  const id = context.req.param("id");
  const existing = await store.getPartnerNoteByUser(user.id, id);

  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy ghi nhớ.");
  }

  const body = await readJson<Record<string, unknown>>(context);
  const input = validatePartnerNoteInput(body);
  const activeCouple = await store.getActiveCoupleForUser(user.id);

  const note: PartnerNote = {
    ...existing,
    coupleId: activeCouple?.id,
    title: input.title,
    content: input.content,
    category: input.category,
    updatedAt: new Date().toISOString(),
  };

  await store.updatePartnerNote(note);
  return success(context, note);
});

partnerNotesRoutes.delete("/:id", async (context) => {
  const user = context.get("user");
  const id = context.req.param("id");
  const deleted = await store.deletePartnerNote(user.id, id);

  if (!deleted) {
    throw new AppError(404, "NOT_FOUND", "Không tìm thấy ghi nhớ.");
  }

  return success(context, { ok: true });
});
