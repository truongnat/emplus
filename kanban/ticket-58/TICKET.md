# Ticket 58 — Home hero counter — dark mode dịu, Aura

## Metadata

- **id**: 58
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Thẻ đếm ngày (Hero) ở dark trông nặng, đỏ bão hòa (`coral900`/`coral800`), lệch so với lưới + thẻ glass. Làm mềm gradient (taupe/cocoa + chút hồng), số dùng `brand.strong`, giảm bóng/đường kẻ gắt.

## Acceptance

- [x] `heroCardGradient.dark` không còn stop đỏ thẫm góc.
- [x] Stops/locations dark mượt hơn.
- [x] Số ngày + vùng đồng hồ hài hòa contrast, không “chói”.

## Implementation

- `gradients.ts`: `heroCardGradient.dark`, `gradientLocations.heroCounterDark`.
- `HeroCard.tsx`: locations theo theme, `digitColor`, shadow/divider theo dark.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none
