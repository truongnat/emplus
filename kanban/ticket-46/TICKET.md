# Ticket 46 — Tab Thẻ thay Ngân sách; pill 4 ô; padding ngang 24

## Metadata

- **ticket_id**: 46
- **status**: done
- **domain_stack**: `mobile` (Expo Router tabs)
- **opened**: 2026-04-04

## Intake

- Thay tab **Ngân sách** bằng tab **Thẻ** (`card`) trong bottom pill.
- Pill **4 mục**: Trang chủ, Kế hoạch, Thẻ, Tài khoản (care / notifications vẫn ngoài pill như hiện tại).
- Thanh dưới **full width**, lề trái/phải màn hình **24** (+ safe area).

## Acceptance

- [x] `card` hiển thị trong tab bar; `budget` không còn route tab.
- [x] `TAB_SLOTS === 4`; `pillWidth` = `screen - 24*2 - insets - gap - FAB`.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/card.tsx` — màn placeholder (shell grid).
- `mobile/app/(tabs)/_layout.tsx` — layout + `useWindowDimensions`.
- Xóa `mobile/app/(tabs)/budget.tsx`.

## Residual

- Nội dung nghiệp vụ “Thẻ” có thể thay placeholder sau; API ngân sách / `add-expense` giữ nguyên nếu cần.

## Closed

- **closed:** 2026-04-04
