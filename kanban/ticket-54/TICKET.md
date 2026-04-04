# Ticket 54 — Hồ sơ: ảnh bìa, avatar, tên hiển thị

## Metadata

- **id**: 54
- **status**: done
- **domain_stack**: api (Hono/Postgres), mobile (Expo)
- **opened**: 2026-04-04

## Spec

- **Ảnh nền / bìa hồ sơ**: lưu URL công khai (sau upload MinIO), trường `profileBackgroundUrl` trên user; GET/PUT `/v1/users/me`.
- **Avatar**: dùng `avatarUrl` có sẵn; mobile chọn ảnh → upload `/v1/media/upload` → PUT profile.
- **Tên hiển thị**: dùng `nickname` (API); hiển thị `nickname` hoặc fallback `fullName`; form chỉnh trong Thông tin cá nhân + PUT.

## Acceptance

- [x] Migration Postgres thêm cột `profile_background_url` (nullable).
- [x] API: type, DTO, service, store (memory + postgres), route PUT merge field mới; URL http(s) tối đa 2000 ký tự cho ảnh; chuỗi rỗng xóa ảnh.
- [x] OpenAPI: `User.profileBackgroundUrl`, `UpdateUserProfile`, `PUT /v1/users/me`.
- [x] Mobile: sync OpenAPI types; `AuthRepository.updateProfile`; Profile (bìa/avatar/tên); personal-info (họ tên, tên hiển thị, ngày sinh).

## Tasks

1. API schema + migration + store + service + routes + OpenAPI export
2. Mobile repository + use case + DI + profile UI + personal-info form
3. Verify: `bun run typecheck` (api + mobile), smoke PUT + upload

## Implementation

- API: `api/src/types.ts`, `user.dto.ts`, `user.service.ts`, `modules/user.ts`, `postgres-store.ts`, migration `012_profile_background_url.sql`, `docs/openapi.ts`, `db/schema.sql`.
- Mobile: `auth.repository*`, `UpdateProfileUseCase`, `dependencies`, `profile.tsx`, `personal-info.tsx`, `expo-helpers.ts` (`pickBannerImage`), `session-context.tsx` (`setSession` = `Dispatch<SetStateAction<…>>`), `scripts/sync-api.ts` (UserModule + TimelineModule.DeleteResponse).

## Verify

- `mobile`: `bun run typecheck` — pass.
- `api`: `bun x tsc --noEmit` — pass; `NODE_ENV=test DATA_STORE=memory bun test src/__tests__/app.test.ts` — pass.

## Close

- **closed_at**: 2026-04-04
- **residual risk**: Cần chạy `bun src/db/migrate.ts` trên môi trường có Postgres để áp migration 012. Upload ảnh bìa/avatar phụ thuộc MinIO (`POST /v1/media/upload`).
