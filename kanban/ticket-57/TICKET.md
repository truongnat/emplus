# Ticket 57 — Home screen dark mode (thẻ trên lưới Aura)

## Metadata

- **id**: 57
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Trang home dùng `LoginGridAnimatedBackground`; các thẻ dưới hero vẫn dùng `colors.surface.raised` (đục, lạnh so với lưới). Dark mode: surface + viền ấm, bán trong suốt — cùng họ với `authSoftFieldSurface` (ticket-56).

## Acceptance

- [x] Quick actions, Focus card, Upcoming events (kể empty): dark dùng token grid.
- [x] Ô icon lồng / empty icon: inset tối nhẹ, không lệch zinc.
- [x] Nút chuông chrome: pill dark khớp.
- [x] Hero viền ngoài dark: viền coral nhẹ thay vì tím lạnh.

## Implementation

- `emplus-design-tokens.ts`: `homeDarkGridCard`, `homeDarkGridInset`, `homeDarkChromeButton`.
- `QuickActions`, `FocusCard`, `UpcomingEvents`, `HomeChromeNotificationButton`, `HeroCard`.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none
