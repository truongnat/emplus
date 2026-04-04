# Ticket 9 — Màn ghép đôi (pairing): grid + glass đồng bộ auth

## Meta

- **id**: 9
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo — `generateInvite`, `join` couple API

## Spec

- Đưa **`/pairing`** vào cùng **visual system** với login/register: **lưới animated**, **`useAuthGridChrome`**, **stack transparent**, **KeyboardAwareScrollView** có `automaticallyAdjustKeyboardInsets`.
- **GlassCard** (liquid khi hỗ trợ) bọc khối QR; input join dùng **soft** giống auth; CTA **gradient** giống login.
- Tách **`PairingGridShell`** + **`PairingScreenBody`** + **`pairingScreen.styles.ts`**.
- Giữ hành vi: refresh mã 120s, copy, join 6 ký tự auto-submit, `COUPLE_ALREADY_PAIRED` → sync profile → home, overlay khi join pending.

## Acceptance

- [x] `authScreenLayout`: `AUTH_GRID_PAIRING_TOP_EXTRA`, `authGridScrollPaddingTopPairing`.
- [x] `PairingGridShell` — grid + safe top rhythm (không hàng back).
- [x] `PairingScreenBody` — QR, copy, join, mutations.
- [x] `Stack.Screen pairing` — `contentStyle: { backgroundColor: "transparent" }`.
- [x] Trạng thái `!hydrated` — loader trong shell (không còn `null`).
- [x] `bun run typecheck:mobile` pass.

## Implementation

| Khu vực | File |
|---------|------|
| Route | `mobile/app/pairing.tsx` |
| Shell / body / styles | `mobile/src/features/pairing/PairingGridShell.tsx`, `PairingScreenBody.tsx`, `pairingScreen.styles.ts` |
| Layout tokens | `mobile/src/features/auth/authScreenLayout.ts` |
| Stack | `mobile/app/_layout.tsx` |

## Verify

- `bun run typecheck:mobile`

## Residual

- Có thể thêm nút đăng xuất / trợ giúp trên pairing (ngoài phạm vi ticket).
