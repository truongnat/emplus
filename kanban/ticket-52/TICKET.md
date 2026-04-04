# ticket-52 — Care: một màn, không cuộn dọc

## Metadata

- **status**: done
- **opened**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile/expo

## Spec

- Màn **Cảm xúc** (`care.tsx`) hiển thị toàn bộ nội dung trong **một viewport** (không `ScrollView` dọc toàn màn).
- Nữ: `MoodVibeCheck` ở chế độ **compact** (blob + card gọn hơn).
- Nam: giảm khoảng trắng, orb nhỏ hơn, thẻ gợi ý gọn; text gợi ý giới hạn dòng để tránh tràn.

## Acceptance

- [x] Không bọc nội dung chính bằng `ScrollView` dọc trên `CareScreen` (đã đăng nhập).
- [x] Nữ: blob + slider + card gọn (`compact` + SVG 200) cho một màn có tab bar.
- [x] Nam: layout `flex`, orb 88px, spacing/card nhỏ, gợi ý `numberOfLines={4}`.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/care.tsx`: thay `ScrollView` bằng `View` `flex:1`, `contentPadBottom` gọn, header/title nhỏ hơn, `MoodOrb` nhận `size`, `MoodVibeCheck` với `compact`, gợi ý cắt dòng.
- `mobile/src/features/mood/components/MoodVibeCheck.tsx`: prop `compact`, `VisualArea` nhận `size` + margin gọn, style compact cho card/slider/chữ.

## Verify

- `bunx tsc --noEmit` trong `mobile/` — pass (2026-04-04).

## Residual risk

- iPhone SE + nhiều gợi ý dài: có thể bị cắt phía dưới; cân nhắc `ScrollView` chỉ vùng gợi ý hoặc “xem thêm”.
