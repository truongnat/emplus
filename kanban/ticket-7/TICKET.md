# Ticket 7 — Forgot password: căn giữa theo chiều dọc (như login)

## Meta

- **id**: 7
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / auth UI

## Spec

- Màn **forgot-password** căn **giữa theo chiều dọc** (hero + form + footer) trong vùng scroll, gần với cảm giác **login** (cột không dính sát dưới top bar).
- **Register** giữ `flex-start` — không đổi layout.

## Acceptance

- [x] `AuthGridScreenShell` nhận prop `centerContent` (optional, default `false`).
- [x] `forgot-password.tsx` bật `centerContent`.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/auth/components/AuthGridScreenShell.tsx` | Prop `centerContent` → `justifyContent: "center"` trên inner scroll wrapper |
| `mobile/app/forgot-password.tsx` | `<AuthGridScreenShell centerContent>` |

## Verify

- `bun run typecheck:mobile`

## Residual

- Khi bàn phím mở, `KeyboardAwareScrollView` vẫn cuộn — cần thử thiết bị thật nếu cảm giác offset chưa đủ.
