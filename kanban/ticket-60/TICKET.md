# Ticket 60 — Bottom tab bar: liquid glass + nền vùng đáy

## Metadata

- **id**: 60
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Tab bar dùng **liquid glass** (`LiquidGlassView` / `expo-glass-effect`) khi thiết bị hỗ trợ; fallback **BlurView + LinearGradient** giống `GlassCard`. Thêm **lớp nền gradient** phía dưới (toàn chiều ngang, fade từ trong suốt → nền app) để không “lơ lửng” trên nội dung.

## Acceptance

- [x] Pill tab: liquid khi `isLiquidGlassAvailable`; không thì blur + gradient.
- [x] Có lớp backdrop phía dưới pill + safe area.
- [x] Giữ grid nhẹ, indicator, màu icon như hiện tại.

## Implementation

- `mobile/app/(tabs)/_layout.tsx` — gradient đáy, nhánh liquid vs blur.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: Android không có liquid — vẫn blur+gradient; cần máy iOS 26+ (hoặc SDK glass) để thấy liquid native.
