# 🚢 Em Plus - Deployment & Infrastructure

Tài liệu này mô tả hạ tầng kỹ thuật, quy trình container hóa và các bước triển khai hệ thống Em Plus.

## 1. Hạ tầng dịch vụ (Infrastructure Services)

Dự án sử dụng Docker để đồng nhất môi trường phát triển và triển khai. Các dịch vụ chính bao gồm:

| Dịch vụ | Hình ảnh (Image) | Cổng (Port) | Vai trò |
| :--- | :--- | :--- | :--- |
| **PostgreSQL** | `postgres:15-alpine` | 5432 | CSDL chính (Master). |
| **PostgreSQL Slave** | `postgres:15-alpine` | 5433 | CSDL dự phòng/đọc (Slave). |
| **Redis** | `redis:7-alpine` | 6379 | Caching, Session, OTP. |
| **MinIO** | `minio/minio` | 9000/9001 | Lưu trữ tệp tin (S3 Compatible). |
| **Mailpit** | `axllent/mailpit` | 1025/8025 | Giả lập Mail Server cho môi trường Dev. |

## 2. Quy trình triển khai cục bộ (Local Development)

Để khởi động toàn bộ hạ tầng cần thiết, sử dụng lệnh:
```bash
bun run infra:up  # Lệnh được định nghĩa trong api/package.json
```

Lệnh này sẽ khởi tạo các container và tự động tạo bucket `emplus` trong MinIO để sẵn sàng lưu trữ ảnh kỷ niệm.

## 3. Containerization (Docker)

Mỗi module (`api`, `web`) đều có `Dockerfile` riêng để tối ưu hóa kích thước image và thời gian build.
- **Backend (API):** Sử dụng image `oven/bun:alpine` để đảm bảo hiệu năng cao nhất.
- **Frontend (Web):** Sử dụng quy trình build đa tầng (multi-stage build) cho Next.js.

## 4. Quản lý cấu hình (Environment Variables)

Hệ thống sử dụng các file `.env` để quản lý bí mật và cấu hình theo từng môi trường.
- `api/.env`: Chứa kết nối DB, Redis, S3 keys, JWT secret.
- `mobile/.env`: Chứa API URL cho môi trường Expo.
- `web/.env.local`: Chứa các biến cho Next.js.

## 5. Khả năng quan sát (Observability)

Dự án tích hợp bộ công cụ giám sát tập trung trong thư mục `api/grafana` và `api/loki`:
- **Loki:** Thu thập logs từ các container.
- **Grafana:** Hiển thị biểu đồ giám sát hiệu năng và tình trạng hệ thống.

---
*Hạ tầng được thiết kế theo hướng Cloud-native, sẵn sàng triển khai lên AWS, Google Cloud hoặc On-premise K8s.*
