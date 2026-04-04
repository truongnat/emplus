# Ticket 47 — Care screen: layout, toast, hero gọn

## Metadata

- **ticket_id**: 47
- **status**: done
- **domain_stack**: `mobile` (Expo Router `(tabs)/care`)
- **opened**: 2026-04-04

## Intake

- Tiếp tục chỉnh **màn Cảm xúc** sau khi Care vào bottom tab.
- Giảm trùng lặp visual; toast / lỗi không phụ thuộc vị trí scroll.

## Acceptance

- [x] Toast thành công và banner lỗi **cố định phía trên tab bar** (theo safe area), không nằm trong `ScrollView`.
- [x] Luồng nam: **một** hero trạng thái (bỏ Lottie trùng với orb gradient).
- [x] Tự ẩn toast sau vài giây; `AppScreen` tắt `wrapWithKeyboardDismiss` để không chặn cử chỉ mood.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/care.tsx` — wrapper `flex:1`, overlay; `useSafeAreaInsets` + offset tab bar; `useEffect` dismiss notice; gỡ Lottie giữa header và nội dung nam; type gợi ý nhẹ.

## Verify

- `bunx tsc --noEmit` (mobile)

## Residual

- CTA gợi ý vẫn chỉ set notice (chưa deep link); loading skeleton API gợi ý có thể bổ sung sau.

## Closed

- **closed:** 2026-04-04
