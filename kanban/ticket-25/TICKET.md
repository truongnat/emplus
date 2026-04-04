# Ticket 25 — Home: remake nội dung dưới hero (ý nghĩa + thẩm mỹ)

## Meta

- **id**: 25
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / QuickActions / FocusCard / UpcomingEvents

## Spec

- Rà soát **toàn bộ khối dưới `HeroCard`**: lối tắt, thẻ trọng tâm, kỷ niệm sắp tới.
- **Ý nghĩa**: nhãn tiếng Việt rõ **đích đến** (nhật ký/chăm sóc vs dòng thời gian), phụ đề section ngắn.
- **Thẩm mỹ**: bỏ `#FFFFFF` / rose cứng; dùng **semantic** `surface` / `border` / `brand` / `secondary`, shadow `elevation`, dark mode; đường nối dọc giữa hai lối tắt (nhịp mockup).

## Acceptance

- [x] `QuickActions`: section header + copy mới + theme + connector.
- [x] `FocusCard`: token theme, không `palette as any` / slate cứng.
- [x] `UpcomingEvents`: section phụ đề + card/empty theme + copy nhẹ nhàng hơn.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/QuickActions.tsx` | Remake layout, copy, theme, connector |
| `mobile/src/features/home/components/FocusCard.tsx` | Theme tokens, badge/decoration |
| `mobile/src/features/home/components/UpcomingEvents.tsx` | Section, surfaces, countdown copy |
| `mobile/app/(tabs)/home.tsx` | Whitespace cleanup (nếu có) |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Có thể tách style card dùng chung `homeBelowHeroCard` sau nếu lặp lại.
