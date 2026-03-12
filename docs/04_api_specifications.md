# 🔌 Em Plus - API Specifications

Tài liệu này cung cấp cái nhìn tổng quan về các điểm cuối (Endpoints) của API Em Plus, quy chuẩn phản hồi và cơ chế bảo mật.

## 1. Quy chuẩn chung (General Standards)

### 1.1 Base URL
- **Local:** `http://localhost:3000/v1`
- **Staging/Prod:** `https://api.emplus.app/v1`

### 1.2 Định dạng phản hồi (Response Format)
Tất cả các API đều trả về dữ liệu dưới dạng JSON với cấu trúc thống nhất:

**Thành công (Success):**
```json
{
  "success": true,
  "data": { ... }
}
```

**Thất bại (Error):**
```json
{
  "success": false,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Thông tin không hợp lệ.",
    "details": []
  }
}
```

## 2. Danh sách các Module API

| Module | Base Path | Chức năng chính |
| :--- | :--- | :--- |
| **Auth** | `/auth` | Đăng ký, đăng nhập (Local, Google), OTP, Refresh Token. |
| **Users** | `/users` | Quản lý hồ sơ cá nhân, cập nhật Avatar, cài đặt. |
| **Couples** | `/couples` | Tạo mã mời, ghép đôi, quản lý trạng thái mối quan hệ. |
| **Timeline** | `/timeline` | CRUD kỷ niệm, tải lên hình ảnh/video, quản lý tags. |
| **Dashboard** | `/dashboard` | Thống kê ngày yêu, tổng quan ngân sách, nhắc hẹn. |
| **Care** | `/care` | Theo dõi chu kỳ cảm xúc, gợi ý chăm sóc. |
| **Budget** | `/budget` | Quản lý chi tiêu chung, phân loại hạng mục. |
| **Live** | `/live` | Xử lý các sự kiện thời gian thực (WebSockets). |

## 3. Bảo mật (Security)

- **Authentication:** Sử dụng **JWT (JSON Web Token)**. Token phải được gửi kèm trong Header: `Authorization: Bearer <token>`.
- **Rate Limiting:** Áp dụng giới hạn số lượng request từ một IP để ngăn chặn tấn công.
- **Sanitization:** Mọi dữ liệu đầu vào đều được làm sạch để chống XSS và SQL Injection.

## 4. Tài liệu chi tiết (Swagger/OpenAPI)
Hệ thống tích hợp sẵn Swagger UI tại endpoint `/v1/docs` (chỉ khả dụng trong môi trường phát triển). Bạn có thể truy cập để xem chi tiết từng tham số request/response.

---
*API được thiết kế theo chuẩn RESTful, tối ưu hóa cho hiệu năng và khả năng bảo trì.*
