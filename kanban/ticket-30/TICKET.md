# ticket-30 — Notifications screen: align with Home shell & semantics

## Summary

Match paired **Home** patterns: full-bleed auth grid + `LoginBrandGradientTitle`, `useAuthGridChrome`, transparent `AppScreen`, safe-area scroll padding above floating tab bar, and heading/accessibility hierarchy like ticket-26.

## Spec

- Shell: `LoginGridAnimatedBackground`, brand top-left, `StatusBar`, same `AppScreen` props as Home (`applyTopSafeAreaPadding={false}`, `animatedEntrance={false}`, `loginScreenStyles`).
- Scroll: `paddingTop` / `paddingBottom` aligned with `authGridScrollPaddingTop` + `AUTH_LOGIN_SCROLL_EXTRA_TOP` and `Math.max(128, insets.bottom + 100)`.
- Typography: `typographyRoles` for screen title + overline; section labels as `header` where appropriate.
- Horizontal rhythm: `paddingHorizontal` 22 to match Home scroll.

## Acceptance

- [x] Notifications visually sits on same grid/chrome as Home.
- [x] Last list items not clipped by tab bar on devices with large home indicator.
- [x] Screen title announced as heading; section labels sensible for rotor.
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/app/(tabs)/notifications.tsx`

## Residual

- None.
