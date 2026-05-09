import { ApiError } from "@/lib/api-client";

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return error.message || "Email, mật khẩu hoặc mã xác minh chưa đúng.";
    }

    if (error.status === 409) {
      return "Email này đã được đăng ký. Bạn có thể đăng nhập thay vì tạo tài khoản mới.";
    }

    if (error.status === 429) {
      return "Bạn thao tác hơi nhanh. Vui lòng thử lại sau ít phút.";
    }

    return error.message || "Có lỗi xảy ra. Vui lòng thử lại.";
  }

  return "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại API backend.";
}
