# Ticket 65 — Ghi chú

- API `POST /v1/users/push-token` đã hỗ trợ `expoPushToken: null` (DTO + Postgres) — không cần migration mới.
- Không thêm cột `push_enabled` trên DB: token null = không gửi; đủ cho MVP.
