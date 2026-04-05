# Ticket 71 — Ẩn tạm sao lưu đám mây (Tài khoản)

- **status**: done
- **opened**: 2026-04-05
- **closed**: 2026-04-05

## Spec

- Ẩn section **Đồng bộ** / **Sao lưu đám mây** trên tab Tài khoản cho release hiện tại.
- Phase sau: tính năng premium, cần backend + billing.

## Implementation

- `mobile/app/(tabs)/profile.tsx`: gỡ `syncEnabled`, `Switch` import, toàn bộ card đồng bộ; comment hướng dẫn bật lại.

## Verify

- `bun run typecheck` trong `mobile/`.
