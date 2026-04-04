import ApiError from "@/src/core/api/api-error";
import { toast } from "@/src/components/atoms/Toast";

/** Dùng `replace: true` để tránh spam toast khi nhiều request 401. */
export const SESSION_AUTH_TOAST_ID = "emplus-session-auth";

/**
 * Thông báo trong app (toast) khi lỗi phiên / token / API liên quan auth.
 * Không throw — chỉ hiển thị cho người dùng.
 */
export function notifySessionOrTokenFailure(err: unknown): void {
  if (err instanceof ApiError) {
    if (err.isUnauthorized()) {
      toast.error(
        err.message ||
          "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.",
        {
          id: SESSION_AUTH_TOAST_ID,
          replace: true,
          duration: 5500,
          position: "top",
        },
      );
      return;
    }
    if (err.isNetworkError()) {
      toast.warning("Không thể kết nối. Kiểm tra mạng và thử lại.", {
        id: `${SESSION_AUTH_TOAST_ID}-net`,
        replace: true,
        position: "top",
      });
      return;
    }
    if (err.status >= 500) {
      toast.error("Hệ thống đang bận. Thử lại sau.", {
        id: `${SESSION_AUTH_TOAST_ID}-5xx`,
        replace: true,
        position: "top",
      });
      return;
    }
    toast.error(err.message || "Đã có lỗi xảy ra.", {
      duration: 4500,
      position: "top",
    });
    return;
  }
  if (err instanceof Error && err.message) {
    toast.error(err.message, { duration: 4500, position: "top" });
    return;
  }
  toast.error("Đã có lỗi xảy ra.", { duration: 4000, position: "top" });
}
