# 🏗️ Em Plus - System Architecture Design

Tài liệu này mô tả chi tiết kiến trúc hệ thống, stack công nghệ và các mẫu thiết kế (Design Patterns) được áp dụng trong dự án Em Plus.

## 1. Kiến trúc tổng thể (High-level Architecture)
Dự án được xây dựng theo mô hình **Monorepo** tập trung để tối ưu hóa việc quản lý mã nguồn, chia sẻ types và đồng bộ hóa quy trình phát triển giữa API, Mobile và Web.

### 1.1 Cấu trúc thư mục (Monorepo Layout)
```text
/
├── api/            # Backend API (Node/Bun + Hono)
├── mobile/         # Mobile App (Expo / React Native)
├── scripts/        # Công cụ hỗ trợ automation
├── docs/           # Tài liệu kỹ thuật (Agentic SDLC)
└── GEMINI.md       # Quy tắc vàng của AI Agent
```

## 2. Tech Stack Chi tiết
| Thành phần | Công nghệ | Lý do chọn |
| :--- | :--- | :--- |
| **Runtime** | Bun | Tốc độ thực thi cực nhanh, tích hợp sẵn package manager & test runner. |
| **Backend Framework** | Hono | Nhẹ, tối ưu cho TypeScript, hỗ trợ Middleware mạnh mẽ, dễ deploy lên Edge/Serverless. |
| **Database** | PostgreSQL | Hệ quản trị CSDL quan hệ tin cậy cho dữ liệu có cấu trúc phức tạp. |
| **Caching/KV** | Redis | Tăng tốc truy vấn và quản lý state cho phiên làm việc. |
| **Mobile App** | React Native / Expo | Phát triển đa nền tảng (iOS/Android) với NativeWind (Tailwind CSS). |
| **Logging** | Loki / Grafana | Hệ thống quan sát tập trung chuyên nghiệp. |

## 3. Các mẫu thiết kế & Quy ước (Design Patterns & Conventions)

### 3.1 Backend Pattern (Hono API)
- **Middleware-based Architecture:** Sử dụng middleware để xử lý Authentication, Validation (Zod), Logging.
- **Service Layer Pattern:** Tách biệt logic xử lý nghiệp vụ ra khỏi router để dễ dàng kiểm thử.
- **Postgres.js:** Sử dụng driver non-blocking để đạt hiệu năng tối đa.

### 3.2 Mobile Pattern (React Native)
- **Feature-based Folder Structure:** Tổ chức mã nguồn theo tính năng để tăng khả năng mở rộng.
- **Offline-first with TanStack Query:** Quản lý state từ API và bộ nhớ đệm cục bộ hiệu quả.

## 4. Mô hình triển khai (Deployment Model)
Dự án được container hóa bằng **Docker** và hỗ trợ triển khai linh hoạt thông qua **Kubernetes (K8s)**.

---
*Kiến trúc này được thiết kế để chịu tải cao, dễ mở rộng và tối ưu hóa chi phí vận hành.*
