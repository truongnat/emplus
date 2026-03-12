/**
 * Định nghĩa các mã lỗi API phổ biến để quản lý tập trung.
 */
export enum ApiErrorCode {
  NETWORK_ERROR = 0,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  TIMEOUT = 408,
  SERVER_ERROR = 500,
  VALIDATION_ERROR = 422,
}

export default class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details: unknown[];
  readonly requestId?: string;

  constructor(input: {
    message: string;
    status: number;
    code?: string;
    details?: unknown[];
    requestId?: string;
  }) {
    super(input.message);
    this.name = "ApiError";
    this.status = input.status;
    this.code = input.code;
    this.details = input.details ?? [];
    this.requestId = input.requestId;
  }

  /**
   * Kiểm tra xem lỗi có phải do mất kết nối mạng không.
   */
  isNetworkError(): boolean {
    return this.status === ApiErrorCode.NETWORK_ERROR || this.status === ApiErrorCode.TIMEOUT;
  }

  /**
   * Kiểm tra lỗi xác thực (hết hạn session).
   */
  isUnauthorized(): boolean {
    return this.status === ApiErrorCode.UNAUTHORIZED;
  }

  /**
   * Kiểm tra xem lỗi này có nên cho phép TanStack Query thử lại (retry) không.
   */
  shouldRetry(): boolean {
    // Không retry nếu là lỗi Client (trừ Timeout)
    if (this.status >= 400 && this.status < 500 && this.status !== ApiErrorCode.TIMEOUT) {
      return false;
    }
    return true;
  }

  /**
   * Kiểm tra xem session có bị khóa quyền truy cập không.
   */
  isForbidden(): boolean {
    return this.status === ApiErrorCode.FORBIDDEN;
  }
}
