# Ticket 48 — Care screen: nền lưới animation (auth grid)

## Metadata

- **ticket_id**: 48
- **status**: done
- **domain_stack**: `mobile` (Expo `(tabs)/care`)
- **opened**: 2026-04-04

## Intake

- Đồng bộ **LoginGridAnimatedBackground** + **useAuthGridChrome** cho màn Cảm xúc như Home / Thông báo / Timeline.

## Acceptance

- [x] Care dùng shell full-bleed: `AppScreen` transparent, `LoginGridAnimatedBackground`, `StatusBar` theo theme.
- [x] `paddingTop` scroll theo safe area (`insets.top + 10`); `paddingBottom` chừa tab bar.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/care.tsx` — import grid + `useThemeMode` + `useAuthGridChrome` + `loginScreenStyles` / `homeScreenStyles.layerRoot`.

## Verify

- `bunx tsc --noEmit` (mobile)

## Residual

- Không.

## Closed

- **closed:** 2026-04-04
