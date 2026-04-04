const DEFAULT_API_VERSION = "1.0.0";

function docsPathFrom(input: string): string {
  const normalized = input.trim().replace(/\/+$/, "");
  return normalized.length > 0 ? normalized : "/v1/docs";
}

export function buildOpenApiSpec(origin: string, docsPath: string): Record<string, unknown> {
  const safeDocsPath = docsPathFrom(docsPath);
  const openApiJsonPath = `${safeDocsPath}/openapi.json`;

  return {
    openapi: "3.0.3",
    info: {
      title: "Em+ API",
      version: DEFAULT_API_VERSION,
      description: "API xác thực, ghép đôi cặp đôi, chăm sóc cảm xúc, timeline và bảng điều khiển.",
    },
    servers: [
      {
        url: origin,
      },
    ],
    tags: [
      { name: "Hệ thống" },
      { name: "Xác thực" },
      { name: "Cặp đôi" },
      { name: "Trang chủ" },
      { name: "Kỷ niệm" },
      { name: "Media" },
      { name: "Chăm sóc" },
      { name: "Debug" },
      { name: "Thông báo" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Gender: {
          type: "string",
          enum: ["NAM", "NU", "KHAC", "KHONG_TIET_LO"],
        },
        User: {
          type: "object",
          required: ["id", "email", "fullName", "gender", "isActive", "createdAt", "updatedAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            fullName: { type: "string" },
            nickname: { type: "string" },
            avatarUrl: { type: "string", format: "uri" },
            profileBackgroundUrl: { type: "string", format: "uri" },
            gender: { $ref: "#/components/schemas/Gender" },
            dob: { type: "string", format: "date" },
            timezone: { type: "string" },
            isActive: { type: "boolean" },
            isAdmin: { type: "boolean" },
            coupleId: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UpdateUserProfile: {
          type: "object",
          description: "Các trường tùy chọn; chỉ gửi trường cần đổi.",
          properties: {
            fullName: { type: "string" },
            nickname: { type: "string", description: "Tên hiển thị trong ứng dụng" },
            avatarUrl: { type: "string", format: "uri", maxLength: 2000 },
            profileBackgroundUrl: {
              type: "string",
              format: "uri",
              maxLength: 2000,
              description: "Ảnh bìa hồ sơ (URL sau POST /v1/media/upload)",
            },
            gender: { $ref: "#/components/schemas/Gender" },
            dob: { type: "string", format: "date" },
            timezone: { type: "string" },
          },
        },
        TokenPair: {
          type: "object",
          required: ["accessToken", "refreshToken", "expiresIn"],
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            expiresIn: { type: "number" },
          },
        },
        AuthResponse: {
          type: "object",
          required: ["user", "tokens"],
          properties: {
            user: { $ref: "#/components/schemas/User" },
            tokens: { $ref: "#/components/schemas/TokenPair" },
          },
        },
        LoginResult: {
          oneOf: [
            { $ref: "#/components/schemas/AuthResponse" },
            {
              type: "object",
              required: ["requiresOTP"],
              properties: {
                requiresOTP: { type: "boolean", enum: [true] },
              },
            },
          ],
        },
        PasswordResetAck: {
          type: "object",
          required: ["success"],
          properties: {
            success: { type: "boolean" },
          },
        },
        Couple: {
          type: "object",
          required: ["id", "partner1Id", "status", "settings", "createdAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            partner1Id: { type: "string", format: "uuid" },
            partner2Id: { type: "string", format: "uuid" },
            loveStartDate: { type: "string", format: "date" },
            weddingDate: { type: "string", format: "date" },
            status: { type: "string", enum: ["CHO_GHEP_DOI", "DANG_YEU", "DA_CUOI", "DA_CHIA_TAY"] },
            inviteCode: { type: "string" },
            inviteExpiresAt: { type: "string", format: "date-time" },
            settings: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Memory: {
          type: "object",
          required: ["id", "coupleId", "createdById", "title", "memoryDate", "mediaUrls", "tags", "createdAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            coupleId: { type: "string", format: "uuid" },
            createdById: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            memoryDate: { type: "string", format: "date" },
            mediaUrls: { type: "array", items: { type: "string" } },
            tags: { type: "array", items: { type: "string" } },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        DashboardHome: {
          type: "object",
          required: ["coupleContext", "upcomingEvents", "careAdvice"],
          properties: {
            coupleContext: {
              type: "object",
              required: ["loveDays", "loveStartDate"],
              properties: {
                loveDays: { type: "number" },
                loveStartDate: { type: "string", format: "date" },
                weddingDate: { type: "string", format: "date" },
              },
            },
            upcomingEvents: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "title", "date", "daysLeft", "category", "isSystem"],
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  date: { type: "string", format: "date" },
                  daysLeft: { type: "number" },
                  category: { type: "string" },
                  isSystem: { type: "boolean" },
                  priority: { type: "string", enum: ["MEDIUM", "HIGH"] },
                },
              },
            },
            careAdvice: {
              type: "object",
              required: ["greeting", "subGreeting", "iconName"],
              properties: {
                greeting: { type: "string" },
                subGreeting: { type: "string" },
                iconName: { type: "string" },
              },
            },
          },
        },
        BudgetItem: {
          type: "object",
          required: ["id", "coupleId", "createdById", "title", "amount", "category", "date", "status", "createdAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            coupleId: { type: "string", format: "uuid" },
            createdById: { type: "string", format: "uuid" },
            title: { type: "string" },
            amount: { type: "number" },
            category: { type: "string" },
            date: { type: "string", format: "date" },
            place: { type: "string" },
            status: { type: "string", enum: ["PAID", "PENDING", "OVER_BUDGET", "DRAFT"] },
            note: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        BudgetSummary: {
          type: "object",
          required: ["totalBudget", "totalSpent", "pendingAmount", "remainingAmount", "usagePercentage", "projectedTotal"],
          properties: {
            totalBudget: { type: "number" },
            totalSpent: { type: "number" },
            pendingAmount: { type: "number" },
            remainingAmount: { type: "number" },
            usagePercentage: { type: "number" },
            projectedTotal: { type: "number" },
          },
        },
        InAppNotification: {
          type: "object",
          required: ["id", "userId", "type", "title", "createdAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            coupleId: { type: "string", format: "uuid" },
            type: { type: "string" },
            title: { type: "string" },
            body: { type: "string" },
            iconName: { type: "string" },
            iconColor: { type: "string" },
            iconBg: { type: "string" },
            actionLabel: { type: "string" },
            metadata: { type: "object", additionalProperties: true },
            readAt: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          tags: ["Hệ thống"],
          summary: "Kiểm tra sức khỏe dịch vụ",
          responses: {
            200: {
              description: "API hoạt động bình thường",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/v1/system/dependencies": {
        get: {
          tags: ["Hệ thống"],
          summary: "Báo cáo trạng thái các phụ thuộc",
          responses: {
            200: {
              description: "Tất cả phụ thuộc quan trọng đều ổn hoặc phụ thuộc tùy chọn được bỏ qua.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      database: { type: "string" },
                      redis: { type: "string" },
                      mail: { type: "string" },
                      minio: { type: "string" },
                    },
                  },
                },
              },
            },
            503: {
              description: "Có ít nhất một phụ thuộc đang lỗi hoặc không truy cập được.",
            },
          },
        },
      },
      "/v1/auth/register": {
        post: {
          tags: ["Xác thực"],
          summary: "Đăng ký bằng email/mật khẩu",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                    },
                    password: {
                      type: "string",
                    },
                    fullName: {
                      type: "string",
                    },
                    gender: { $ref: "#/components/schemas/Gender" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Đăng ký và đăng nhập thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            409: {
              description: "Email đã tồn tại",
            },
            400: {
              description: "Dữ liệu gửi lên không hợp lệ",
            },
          },
        },
      },
      "/v1/auth/login": {
        post: {
          tags: ["Xác thực"],
          summary: "Đăng nhập bằng email/mật khẩu",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đăng nhập thành công hoặc cần OTP (đăng ký lười)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginResult" },
                },
              },
            },
            401: {
              description: "Thông tin đăng nhập không đúng",
            },
            400: {
              description: "Dữ liệu gửi lên không hợp lệ",
            },
          },
        },
      },
      "/v1/auth/verify-otp": {
        post: {
          tags: ["Xác thực"],
          summary: "Xác minh OTP (đăng ký lười / hoàn tất đăng nhập)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "otp"],
                  properties: {
                    email: { type: "string", format: "email" },
                    otp: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Xác minh thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            400: { description: "Dữ liệu không hợp lệ" },
            401: { description: "OTP sai hoặc hết hạn" },
            429: { description: "Quá nhiều lần thử" },
          },
        },
      },
      "/v1/auth/forgot-password": {
        post: {
          tags: ["Xác thực"],
          summary: "Yêu cầu đặt lại mật khẩu (gửi OTP qua email)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", format: "email" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đã gửi OTP (nếu email tồn tại)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PasswordResetAck" },
                },
              },
            },
            400: { description: "Email không hợp lệ" },
            404: { description: "Không tìm thấy người dùng" },
          },
        },
      },
      "/v1/auth/reset-password": {
        post: {
          tags: ["Xác thực"],
          summary: "Đặt lại mật khẩu bằng OTP",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "otp", "newPassword"],
                  properties: {
                    email: { type: "string", format: "email" },
                    otp: { type: "string" },
                    newPassword: { type: "string", minLength: 8 },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đặt lại mật khẩu thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PasswordResetAck" },
                },
              },
            },
            400: { description: "Dữ liệu không hợp lệ" },
            401: { description: "OTP sai hoặc hết hạn" },
            404: { description: "Không tìm thấy tài khoản" },
            429: { description: "Quá nhiều lần thử OTP" },
          },
        },
      },
      "/v1/auth/refresh": {
        post: {
          tags: ["Xác thực"],
          summary: "Làm mới phiên đăng nhập bằng refresh token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["refreshToken"],
                  properties: {
                    refreshToken: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Làm mới phiên thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/TokenPair" },
                },
              },
            },
            401: {
              description: "Refresh token không hợp lệ hoặc đã hết hạn",
            },
            400: {
              description: "Dữ liệu gửi lên không hợp lệ",
            },
          },
        },
      },
      "/v1/users/me": {
        get: {
          tags: ["Xác thực"],
          summary: "Thông tin người dùng hiện tại",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Hồ sơ người dùng",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            401: { description: "Chưa xác thực" },
          },
        },
        put: {
          tags: ["Xác thực"],
          summary: "Cập nhật hồ sơ người dùng hiện tại",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUserProfile" },
              },
            },
          },
          responses: {
            200: {
              description: "Hồ sơ sau cập nhật",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            400: { description: "Dữ liệu không hợp lệ" },
            401: { description: "Chưa xác thực" },
            404: { description: "Không tìm thấy người dùng" },
          },
        },
      },
      "/v1/users/push-token": {
        post: {
          tags: ["Xác thực"],
          summary: "Lưu Expo push token (hoặc xóa bằng null)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["expoPushToken"],
                  properties: {
                    expoPushToken: {
                      oneOf: [{ type: "string", maxLength: 512 }, { type: "null" }],
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đã lưu",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["saved"],
                    properties: {
                      saved: { type: "boolean" },
                    },
                  },
                },
              },
            },
            401: { description: "Chưa xác thực" },
          },
        },
      },
      "/v1/notifications": {
        get: {
          tags: ["Thông báo"],
          summary: "Danh sách thông báo in-app",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "page", in: "query", schema: { type: "integer", minimum: 1, default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 50, default: 20 } },
            {
              name: "unread_only",
              in: "query",
              description: "true/1 để chỉ lấy chưa đọc",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Danh sách phân trang",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["items", "pagination"],
                    properties: {
                      items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/InAppNotification" },
                      },
                      pagination: {
                        type: "object",
                        required: ["page", "limit", "totalItems", "totalPages"],
                        properties: {
                          page: { type: "number" },
                          limit: { type: "number" },
                          totalItems: { type: "number" },
                          totalPages: { type: "number" },
                          hasNext: { type: "boolean" },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Chưa xác thực" },
          },
        },
      },
      "/v1/notifications/{id}/read": {
        patch: {
          tags: ["Thông báo"],
          summary: "Đánh dấu một thông báo đã đọc",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: {
              description: "Bản ghi sau khi cập nhật",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/InAppNotification" },
                },
              },
            },
            404: { description: "Không tìm thấy" },
            401: { description: "Chưa xác thực" },
          },
        },
      },
      "/v1/notifications/read-all": {
        post: {
          tags: ["Thông báo"],
          summary: "Đánh dấu tất cả đã đọc",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Số bản ghi đã cập nhật",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["markedCount"],
                    properties: {
                      markedCount: { type: "integer" },
                    },
                  },
                },
              },
            },
            401: { description: "Chưa xác thực" },
          },
        },
      },
      "/v1/couples/generate-invite": {
        post: {
          tags: ["Cặp đôi"],
          summary: "Tạo mã mời ghép đôi",
          security: [{ bearerAuth: [] }],
          responses: {
            201: {
              description: "Tạo mã mời thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["inviteCode", "expiresIn"],
                    properties: {
                      inviteCode: { type: "string" },
                      expiresIn: { type: "number" },
                    },
                  },
                },
              },
            },
            401: { description: "Chưa xác thực" },
          },
        },
      },
      "/v1/couples/join": {
        post: {
          tags: ["Cặp đôi"],
          summary: "Tham gia cặp đôi bằng mã mời",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["inviteCode"],
                  properties: {
                    inviteCode: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Ghép đôi thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["coupleId", "status", "partnerInfo"],
                    properties: {
                      coupleId: { type: "string", format: "uuid" },
                      status: { type: "string" },
                      partnerInfo: {
                        type: "object",
                        required: ["id", "fullName", "gender"],
                        properties: {
                          id: { type: "string", format: "uuid" },
                          fullName: { type: "string" },
                          gender: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            404: { description: "Không tìm thấy mã mời hoặc mã đã hết hạn" },
          },
        },
      },
      "/v1/dashboard/home": {
        get: {
          tags: ["Trang chủ"],
          summary: "Lấy dữ liệu trang chủ",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Trả về dữ liệu trang chủ",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DashboardHome" },
                },
              },
            },
            404: { description: "Không có mối quan hệ đang hoạt động" },
          },
        },
      },
      "/v1/timeline/memories": {
        get: {
          tags: ["Kỷ niệm"],
          summary: "Lấy danh sách kỷ niệm",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "query", name: "page", schema: { type: "integer", default: 1 } },
            { in: "query", name: "limit", schema: { type: "integer", default: 10 } },
            { in: "query", name: "order", schema: { type: "string", enum: ["asc", "desc"] } },
          ],
          responses: {
            200: {
              description: "Danh sách kỷ niệm",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["items", "pagination"],
                    properties: {
                      items: { type: "array", items: { $ref: "#/components/schemas/Memory" } },
                      pagination: {
                        type: "object",
                        required: ["page", "limit", "totalItems", "totalPages"],
                        properties: {
                          page: { type: "number" },
                          limit: { type: "number" },
                          totalItems: { type: "number" },
                          totalPages: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Kỷ niệm"],
          summary: "Tạo kỷ niệm mới",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "memoryDate"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    memoryDate: { type: "string", format: "date" },
                    mediaUrls: { type: "array", items: { type: "string" } },
                    tags: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Tạo kỷ niệm thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Memory" },
                },
              },
            },
            400: { description: "Dữ liệu gửi lên không hợp lệ" },
          },
        },
      },
      "/v1/timeline/memories/{id}": {
        get: {
          tags: ["Kỷ niệm"],
          summary: "Chi tiết một mục timeline",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: {
              description: "Memory",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Memory" },
                },
              },
            },
            404: { description: "Không tìm thấy" },
          },
        },
        delete: {
          tags: ["Kỷ niệm"],
          summary: "Xoá mục timeline",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } },
          ],
          responses: {
            200: {
              description: "Đã xoá",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["ok"],
                    properties: { ok: { type: "boolean" } },
                  },
                },
              },
            },
            404: { description: "Không tìm thấy" },
          },
        },
      },
      "/v1/media/upload": {
        post: {
          tags: ["Media"],
          summary: "Upload một ảnh lên MinIO (timeline)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: {
                    file: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "URL công khai của ảnh",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["success", "data"],
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        required: ["url"],
                        properties: { url: { type: "string", format: "uri" } },
                      },
                    },
                  },
                },
              },
            },
            400: { description: "File không hợp lệ" },
            503: { description: "MinIO chưa cấu hình" },
          },
        },
      },
      "/v1/care/female-cycle": {
        post: {
          tags: ["Chăm sóc"],
          summary: "Lưu dữ liệu chu kỳ (nữ)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["lastPeriodStart", "avgCycleLength", "avgPeriodLength"],
                  properties: {
                    lastPeriodStart: { type: "string", format: "date" },
                    avgCycleLength: { type: "integer", minimum: 20, maximum: 40 },
                    avgPeriodLength: { type: "integer", minimum: 2, maximum: 10 },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Lưu thành công",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                    },
                  },
                },
              },
            },
            403: { description: "Chỉ tài khoản nữ mới được gọi API này" },
          },
        },
      },
      "/v1/care/male-suggestions": {
        get: {
          tags: ["Chăm sóc"],
          summary: "Lấy gợi ý chăm sóc (nam)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Dữ liệu gợi ý chăm sóc",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["context", "suggestions"],
                    properties: {
                      context: { type: "string" },
                      suggestions: {
                        type: "array",
                        items: {
                          type: "object",
                          required: ["priority", "text", "callToAction"],
                          properties: {
                            priority: { type: "number" },
                            text: { type: "string" },
                            callToAction: {
                              type: "object",
                              required: ["label"],
                              properties: {
                                label: { type: "string" },
                                actionType: { type: "string" },
                                actionUrl: { type: "string" },
                                icon: { type: "string" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            403: { description: "Chỉ tài khoản nam mới được gọi API này" },
          },
        },
      },
      "/v1/care/mood": {
        get: {
          tags: ["Chăm sóc"],
          summary: "Tâm trạng cặp đôi (bản thân + đối phương)",
          description:
            "Trả về mood đã lưu của user hiện tại và của partner (nếu đã ghép đôi). Partner null khi chưa có couple.",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "self và partner (nullable)",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["self", "partner"],
                    properties: {
                      self: {
                        nullable: true,
                        type: "object",
                        required: ["value", "updatedAt"],
                        properties: {
                          value: { type: "integer", minimum: 0, maximum: 100 },
                          updatedAt: { type: "string", format: "date-time" },
                        },
                      },
                      partner: {
                        nullable: true,
                        type: "object",
                        required: ["userId", "fullName", "value", "updatedAt"],
                        properties: {
                          userId: { type: "string" },
                          fullName: { type: "string" },
                          value: { type: "integer", minimum: 0, maximum: 100, nullable: true },
                          updatedAt: { type: "string", format: "date-time", nullable: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Chăm sóc"],
          summary: "Cập nhật tâm trạng của bản thân",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["value"],
                  properties: {
                    value: { type: "integer", minimum: 0, maximum: 100 },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Đã lưu",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["value", "updatedAt"],
                    properties: {
                      value: { type: "integer", minimum: 0, maximum: 100 },
                      updatedAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            400: { description: "Giá trị không hợp lệ" },
          },
        },
      },
      "/v1/budget/summary": {
        get: {
          tags: ["Ngân sách"],
          summary: "Lấy tổng quan ngân sách",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Tổng quan ngân sách",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BudgetSummary" },
                },
              },
            },
          },
        },
      },
      "/v1/budget/expenses": {
        get: {
          tags: ["Ngân sách"],
          summary: "Lấy danh sách khoản chi",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "query", name: "category", schema: { type: "string" } },
            { in: "query", name: "page", schema: { type: "integer", default: 1 } },
          ],
          responses: {
            200: {
              description: "Danh sách khoản chi",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["items", "pagination"],
                    properties: {
                      items: { type: "array", items: { $ref: "#/components/schemas/BudgetItem" } },
                      pagination: {
                        type: "object",
                        required: ["page", "limit", "totalItems", "totalPages"],
                        properties: {
                          page: { type: "number" },
                          limit: { type: "number" },
                          totalItems: { type: "number" },
                          totalPages: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Ngân sách"],
          summary: "Tạo khoản chi mới",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "amount", "category", "date"],
                  properties: {
                    title: { type: "string" },
                    amount: { type: "number" },
                    category: { type: "string" },
                    date: { type: "string", format: "date" },
                    place: { type: "string" },
                    note: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Tạo khoản chi thành công",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BudgetItem" },
                },
              },
            },
          },
        },
      },
      "/v1/debug/seed-user": {
        post: {
          tags: ["Debug"],
          summary: "Tạo người dùng mẫu ngẫu nhiên",
          responses: {
            201: {
              description: "Tạo người dùng thành công",
            },
          },
        },
      },
      "/v1/debug/seed-invite": {
        post: {
          tags: ["Debug"],
          summary: "Tạo mã mời ghép đôi mẫu",
          responses: {
            201: {
              description: "Tạo mã mời thành công",
            },
          },
        },
      },
      "/v1/debug/seed-happy-case": {
        post: {
          tags: ["Debug"],
          summary: "Tạo dữ liệu Happy Case",
          description: "Tạo dữ liệu mẫu (kỷ niệm, sự kiện, ngân sách) cho người dùng hiện tại để kiểm tra giao diện. Cần xác thực Bearer Token của người dùng đã có couple.",
          security: [{ bearerAuth: [] }],
          responses: {
            201: {
              description: "Tạo dữ liệu happy case thành công",
            },
            401: {
              description: "Chưa xác thực",
            },
            400: {
              description: "Tài khoản chưa có couple để thao tác",
            },
          },
        },
      },
      [openApiJsonPath]: {
        get: {
          tags: ["Hệ thống"],
          summary: "Đặc tả OpenAPI",
          responses: {
            200: {
              description: "Tệp JSON OpenAPI",
            },
          },
        },
      },
    },
  };
}
