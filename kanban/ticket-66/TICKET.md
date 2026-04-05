# Ticket 66 — Thông báo qua email (preference)

## Metadata

- **status**: done
- **closed**: 2026-04-05

## Spec

- Lưu tùy chọn nhận email trên user; trả về trong `GET/PUT /v1/users/me`.
- Mobile: switch **Thông báo email** gọi API, cập nhật session, cooldown giống push.

## Implementation

- DB: `api/src/db/migrations/014_email_notifications_enabled.sql`, `users.email_notifications_enabled` (BOOLEAN NOT NULL DEFAULT true).
- API: `User`, `UserProfile`, DTO `UpdateUserProfile`, `postgres-store` (đọc/ghi), `user.service`, OpenAPI.
- Mobile: `schemas.ts` (`User`, `UpdateUserProfile`), `profile-details/notifications.tsx` (`useMutation` + `updateProfile`).

## Verify

- `DATA_STORE=memory NODE_ENV=test bun test` trong `api/` — pass.
- `npm run typecheck` trong `mobile/` — pass.

## Deploy

- **Bắt buộc** chạy migration `014` trên Postgres trước khi deploy API; nếu không, query user sẽ lỗi thiếu cột.

## Residual

- Worker gửi email thực tế cần đọc `email_notifications_enabled` trước khi gửi (ngoài phạm vi ticket).
