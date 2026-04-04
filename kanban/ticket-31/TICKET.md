# ticket-31 — Notifications empty: cat Lottie, no Em Plus wordmark, title at top

## Summary

- Replace empty-state Lottie with **Cat playing animation** (from `.lottie` → `notifications-empty-cat.json` in bundle).
- Remove **LoginBrandGradientTitle** (Em Plus) from notifications chrome.
- Position **Thông báo** under status bar (no extra brand row) — tighter `paddingTop` from safe area only.

## Acceptance

- [x] Empty list shows cat animation (loop, reduce-motion respected via `EmplusLottie`).
- [x] No Em Plus logo on notifications screen; grid background may remain.
- [x] Screen title reads at top of content area below status bar.
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/assets/lottie/notifications-empty-cat.json` (extracted from user dotLottie).
- `mobile/src/lottie/inventory.ts` — `notificationsEmptyCat`.
- `mobile/app/(tabs)/notifications.tsx`.

## Residual

- Source file: user’s `Cat playing animation.lottie` (not committed); JSON is canonical in repo.
