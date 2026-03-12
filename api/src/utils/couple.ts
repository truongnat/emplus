import { store } from "../store.ts";
import { AppError } from "../utils/http.ts";

/**
 * Shared utility to resolve the active couple ID for a user.
 * Throws if user is not in an active couple.
 */
export async function resolveActiveCoupleIdAsync(userId: string): Promise<string> {
    const couple = await store.getActiveCoupleForUser(userId);
    if (!couple) {
        throw new AppError(404, "COUPLE_NOT_FOUND", "Bạn chưa ghép đôi hoặc chưa có mối quan hệ đang hoạt động.");
    }
    return couple.id;
}
