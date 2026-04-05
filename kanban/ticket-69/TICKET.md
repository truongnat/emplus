# Ticket 69 — Ẩn tạm «Cho phép nhắn tin» (Quyền riêng tư)

- **status**: done
- **opened**: 2026-04-05
- **closed**: 2026-04-05

## Spec

- Ẩn hàng cài đặt **Cho phép nhắn tin** trên `profile-details/privacy` cho đợt release hiện tại.
- Phase sau: backend + UX tin nhắn người lạ, rồi bật lại switch (hoặc đồng bộ field tương ứng).

## Implementation

- `mobile/app/profile-details/privacy.tsx`: gỡ `allowMessages` / `Switch` hàng chat; giữ comment hướng dẫn bật lại.

## Verify

- `bun run typecheck` trong `mobile/`.
