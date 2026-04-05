# Ticket 68 — Hiển thị trạng thái online (lưu server)

- **status**: done
- **opened**: 2026-04-05
- **closed**: 2026-04-05

## Spec

- Lưu preference **Hiển thị trạng thái online** trên DB, expose qua `GET/PUT /v1/users/me` (`showOnlineStatus`, default **true**).
- Mobile: màn Quyền riêng tư — switch gọi API, debounce 450ms, `ActivityIndicator` khi pending, đồng bộ session.

## Acceptance

- [x] Migration `016_show_online_status.sql` + `schema.sql`.
- [x] API: `User`, `UpdateUserProfile`, service, store, DTO, module.
- [x] OpenAPI + `bun scripts/sync-api.ts`.
- [x] `privacy.tsx`: mutation riêng, `refreshPrivacyFromSession` gộp với hồ sơ riêng tư.

## Verify

- `NODE_ENV=test DATA_STORE=memory ALLOW_MOCK_OAUTH=true bun test` — pass.
- `mobile` `bun run typecheck` — pass.

## Residual

- Chưa có heartbeat/presence hay ẩn “online” thực tế cho partner — chỉ lưu cờ; cần luồng realtime sau.
