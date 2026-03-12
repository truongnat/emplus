/**
 * TokenManager là một Singleton lưu giữ Token hiện tại trong bộ nhớ.
 * Nó giúp ApiClient truy cập Token mà không cần thông qua React Context.
 */
export class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshHandler: (() => Promise<string | null>) | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) TokenManager.instance = new TokenManager();
    return TokenManager.instance;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Đăng ký hàm thực hiện Refresh Token từ tầng Framework.
   */
  setRefreshHandler(handler: () => Promise<string | null>) {
    this.refreshHandler = handler;
  }

  async refreshToken(): Promise<string | null> {
    if (!this.refreshHandler) return null;
    return this.refreshHandler();
  }
}

export const tokenManager = TokenManager.getInstance();
