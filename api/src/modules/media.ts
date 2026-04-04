import { Hono } from "hono";
import type { AppEnv } from "../app-env.ts";
import { requireAuth } from "../middleware/auth.ts";
import {
  buildPublicObjectUrl,
  isMediaUploadEnabled,
  putTimelineObject,
} from "../services/media-storage.ts";
import { AppError, success } from "../utils/http.ts";

export const mediaRoutes = new Hono<AppEnv>();

mediaRoutes.use("*", requireAuth);

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extFromMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

/**
 * Upload một ảnh lên MinIO (multipart field `file`).
 * Trả về URL công khai để gắn vào `mediaUrls` khi tạo kỷ niệm.
 */
mediaRoutes.post("/upload", async (context) => {
  if (!isMediaUploadEnabled()) {
    throw new AppError(
      503,
      "SERVICE_UNAVAILABLE",
      "Lưu ảnh chưa được cấu hình (thiếu MinIO).",
    );
  }

  const user = context.get("user");
  const body = await context.req.parseBody();
  const raw = body.file;

  if (!raw || typeof raw === "string") {
    throw new AppError(
      400,
      "BAD_REQUEST",
      "Thiếu file ảnh (multipart field: file).",
    );
  }

  const file = raw as File;
  const size = file.size ?? 0;
  if (size > 10 * 1024 * 1024) {
    throw new AppError(400, "BAD_REQUEST", "Ảnh tối đa 10MB.");
  }

  const mime = (file.type || "").toLowerCase();
  if (!ALLOWED_TYPES.has(mime)) {
    throw new AppError(
      400,
      "BAD_REQUEST",
      "Chỉ chấp nhận ảnh JPEG, PNG, WebP hoặc GIF.",
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = extFromMime(mime);
  const key = `timeline/${user.id}/${crypto.randomUUID()}.${ext}`;

  try {
    await putTimelineObject(key, buf, mime);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "FILE_TOO_LARGE") {
      throw new AppError(400, "BAD_REQUEST", "Ảnh tối đa 10MB.");
    }
    throw new AppError(
      502,
      "BAD_GATEWAY",
      "Không ghi được file lưu trữ. Kiểm tra MinIO.",
    );
  }

  const url = buildPublicObjectUrl(key);
  return success(context, { url }, 201);
});
