# ticket-27 — notes

## Hotfix (2026-04-04)

- Bottom tab bar: `TabBarGridAnimatedBackground` with `variant="embed"` lives **inside** the glass pill and Care circle (under glass veil + `BlurView`), not as a full-width strip under the bar. Unique SVG pattern ids: `pill` / `care`.

## Hotfix — nav padding

- `tabBarWrapper`: `paddingHorizontal` = 16pt + safe-area left/right; `paddingBottom` safe area + 18pt (was +14 only).

## Hotfix — Care active “double background”

- When tab Care is **selected**: render **one** solid `View` (brand fill + border + heart), not `BlurView` over grid/veil (blur was compositing two layers). Inactive path unchanged (grid + veil + blur).

## Hotfix — Care heart icon size

- Navbar Care `Ionicons` heart: **24pt** (was 28), constant `CARE_HEART_ICON_SIZE`.

## Hotfix — Care button background “crescents”

- Outer shell: **no border** (border lived on 72×72 view while inner layers used radius 36 in an inset box → darker tint leaked at edges). One clip: `borderRadius: CARE_RADIUS` + `overflow: hidden`; hairline only on `BlurView`.
