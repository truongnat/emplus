# Ticket 67 — Hồ sơ riêng tư (profile private switch)

- **status**: done
- **opened**: 2026-04-05
- **closed**: 2026-04-05

## Spec

- Lưu trạng thái **Hồ sơ riêng tư** trên server; đồng bộ với app (session / GET profile).
- `PUT /v1/users/me` nhận `profilePrivate` (boolean).
- Mobile: màn Quyền riêng tư — switch gọi API, debounce tối thiểu giữa hai request (giống màn Thông báo).

## Acceptance

- [x] DB: cột `users.profile_private` (default `false`).
- [x] API: `User` + `UpdateUserProfile` + service + store Postgres.
- [x] OpenAPI + mobile `schemas.ts` (sync-api).
- [x] `privacy.tsx`: load từ session, mutation + toast, revert khi lỗi.

## Implementation

- Migration `api/src/db/migrations/015_profile_private.sql`, `schema.sql`.
- `profilePrivate` trên `User`, `UserProfile`, DTO, `postgres-store` (mọi SELECT/INSERT/UPSERT).
- `createUser` / debug seed: `profilePrivate: false`.
- Mobile: `useMutation` + `SETTINGS_TOGGLE_MIN_INTERVAL_MS`, `ActivityIndicator` khi pending.

## Verify

- `NODE_ENV=test DATA_STORE=memory ALLOW_MOCK_OAUTH=true bun test` (api) — pass.
- `mobile`: `bun run typecheck` — pass.

## Residual risk / follow-up

- **Chưa** áp dụng `profilePrivate` vào luồng “xem hồ sơ người khác” / discovery — chỉ lưu preference. Cần ticket riêng cho authorization ở các endpoint public profile.
