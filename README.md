# Em Plus - Ứng dụng chăm sóc tình yêu (Mobile First)

Dự án Monorepo cung cấp nền tảng hỗ trợ các cặp đôi ghi lại kỷ niệm, theo dõi số ngày yêu và chăm sóc mối quan hệ.

## 🚀 Cấu trúc dự án
- `api`: Backend API sử dụng Bun + Hono (Hieu nang cao)
- `mobile`: Ứng dụng di động Expo (React Native)
- `scripts`: Công cụ hỗ trợ phát triển và tự động hóa

## 🛠 Yêu cầu hệ thống
- **Bun** (Bắt buộc)
- **Docker** (Để chạy PostgreSQL, Redis, v.v.)

## 🏁 Bắt đầu nhanh
1. Sao chép file môi trường: `cp api/.env.example api/.env`
2. Cấu hình các biến cần thiết trong `.env`.
3. Khởi động hạ tầng: `bun run db:up`
4. Chạy API: `bun run dev:api`
5. Chạy Mobile: `bun run dev:mobile` (trong một terminal khác)

## 🤖 Quy trình phát triển (Agentic SDLC)
Dự án áp dụng quy trình AI-driven development.
- `bun run ai:feature "Tên tính năng"`: Để thêm tính năng mới.
- `bun run ai:bugfix "Mô tả lỗi"`: Để sửa lỗi.
- `bun run ai:review`: Để rà soát mã nguồn.

---
*Dự án tập trung hoàn toàn vào trải nghiệm di động đỉnh cao cho cặp đôi.*
