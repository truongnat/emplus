# Ticket 6 — Đồng bộ padding top màn auth (grid full-bleed)

## Meta

- **id**: 6
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / auth UI layout

## Spec

- Một nguồn sự thật cho **khoảng cách từ safe-area top đến nội dung scroll** trên các màn auth dùng **lưới full-bleed** (login + `AuthGridScreenShell`).
- Hằng số cho **vị trí brand** login.

## Acceptance

- [x] `authScreenLayout.ts`: `AUTH_GRID_*`, `authGridScrollPaddingTop`, `AUTH_LOGIN_BRAND_TOP_OFFSET`.
- [x] `login.tsx` dùng helper + brand offset (không magic `44` / `8`).
- [x] `AuthGridScreenShell` dùng cùng helper + `AUTH_GRID_TOP_BAR_OFFSET`.
- [x] Xóa `registerLayout.ts` (gộp vào `authScreenLayout`).
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/auth/authScreenLayout.ts` | Mới — token + `authGridScrollPaddingTop` |
| `mobile/app/login.tsx` | Import layout chung |
| `mobile/src/features/auth/components/AuthGridScreenShell.tsx` | Import layout chung |
| `mobile/src/features/auth/registerLayout.ts` | Xóa |

## Verify

- `bun run typecheck:mobile`

## Residual

- `reset-password` vẫn có thể migrate sang grid shell sau; `verify-otp` đã dùng `AuthGridScreenShell` (ticket 8).
- Tab / màn khác ngoài auth grid không nằm trong ticket này.
