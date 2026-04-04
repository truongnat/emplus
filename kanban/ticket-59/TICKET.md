# Ticket 59 — Bottom tab bar: active primary + icon trắng; inactive đen/trắng theo theme

## Metadata

- **id**: 59
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Custom tab bar (`app/(tabs)/_layout.tsx`): tab **active** — nền **primary** (coral), icon **trắng**. Tab không chọn: **light** — icon **đen**; **dark** — icon **trắng**.

## Acceptance

- [x] Pill active dùng màu primary, không còn `brand.muted` nhạt.
- [x] Icon focused `onBrand` (trắng).
- [x] Icon unfocused: `#000` light, `#FFF` dark.

## Implementation

- `mobile/app/(tabs)/_layout.tsx` — `activeIndicator` + `Ionicons` `color`.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none
