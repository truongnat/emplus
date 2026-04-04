# Ticket 17 — Home hero counter: màu, gradient, phân cấp chữ

## Meta

- **id**: 17
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / theme / home / HeroCard

## Research (nguồn)

- **`docs/VISUAL_DESIGN_GUIDE.md`** — thang coral / indigo / taupe, glass (viền + độ trong), liquid glass.
- **`mobile/src/theme/tokens/palette.ts`** + **`aura-colors`** — primitive coral50→500.
- **`mobile/src/theme/typography-roles.ts`** — caption / numeric (Roboto Mono cho số phụ).
- **`mobile/src/theme/themes.ts`** — semantic `text.primary` / `secondary` / `tertiary`, `secondary.text` cho icon meta.

## Spec

- Gradient vùng counter **không** dùng chỉ `brand.muted → brand.default`; dùng **nhiều stop** theo Aura (chiều sâu coral), có **dark** riêng.
- **Phân cấp chữ** trong card: overline nhỏ / display số nổi / đồng hồ hỗ trợ / tagline / meta ngày — không dùng một mức `text.primary` cho hết.
- Pill đồng hồ + pill ngày: glass có **viền** nhẹ (HIG guide §2.6).

## Acceptance

- [x] Token gradient hero card tập trung trong `theme/gradients.ts` (`heroCardGradient`, `gradientLocations.heroCounter`).
- [x] `HeroCard` dùng `useThemeMode` + gradient + glass động light/dark.
- [x] `ClockTicker tone="onHero"`: màu secondary, font mono cho thời gian; overline/tagline/meta theo hierarchy.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/theme/gradients.ts` | `gradientLocations.heroCounter`; `heroCardGradient` light (coral50→100→300→500), dark (coral900/800 + taupe rose) |
| `mobile/src/features/home/components/HeroCard.tsx` | `LinearGradient` 4 stop + locations; glass badge/date; overline `secondary` + caption family; tagline `secondary`; date `tertiary` + icon `secondary.text`; `gap` 8 |
| `mobile/src/features/home/components/HomeClock.tsx` | `ClockTickerTone`, `ClockTicker` prop `tone`; `onHero` → màu secondary; colon + clock digits dùng `typographyRoles.numeric.fontFamily` |
| `mobile/src/features/home/index.ts` | Export type `ClockTickerTone` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Số ngày lớn (`NumberTicker`) vẫn dùng `text.primary` — đúng vai trò **display**; có thể tinh chỉnh shadow khi contrast kém trên gradient rất nhạt (UAT).

## Skill

- Không thêm skill mới (`bundle_state`: không chạy `validate-skills`).
