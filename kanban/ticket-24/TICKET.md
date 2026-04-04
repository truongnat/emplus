# Ticket 24 — Đồng hồ hero: đồng bộ giây + cuộn odometer đúng chiều (9→0, 5→0)

## Meta

- **id**: 24
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / home / `HomeClock` / Reanimated

## Spec

- Đồng hồ số (`ClockTicker`) cập nhật **đúng mốc giây hệ thống** — không dùng `setInterval(1000)` (trôi phase, lệch với animation / Lottie).
- Chữ số kiểu **odometer**: khi hết vòng (…8→9→**0**, hoặc phút/giây hàng chục …4→5→**0**) phải **cuộn xuôi** qua ô trùng `0` cuối dải, không kéo ngược qua 8,7,… (trông “sai” / giật sau ~10 lần đổi số giây).
- Giây: thời gian cuộn **~1000ms** (linear) khớp một nhịp giây; phút/hàng chục / giờ: `rollMs` ngắn hơn hợp lý.

## Acceptance

- [x] Hook `useAlignedClockNow` — cập nhật `Date` tại biên giây (`1000 - now % 1000`).
- [x] `ClockDigit` dải `0…modulo-1` + `0` trùng; wrap `prev === modulo - 1 && n === 0` → `withSequence` xuống ô dưới rồi snap về 0.
- [x] Meta theo vị trí: giây (6+10), phút chục (6), **giờ chục 24h (3)**, còn lại 10.
- [x] Export `useAlignedClockNow` từ feature `home` (tái dùng sau, ví dụ Lottie).
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HomeClock.tsx` | `useAlignedClockNow`, `clockDigitMeta`, `ClockDigit` modular + wrap, `ClockTicker` dùng hook |
| `mobile/src/features/home/index.ts` | export `useAlignedClockNow` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Màn hình khác nếu có đồng hồ tương tự nên dùng chung hook / pattern này.
- Lottie hero (3s loop) có thể neo thêm vào `useAlignedClockNow` hoặc `progress` nếu cần khớp từng frame (chưa làm trong ticket này).

## Skill

- `react-native-pro` / Reanimated timing + `withSequence`.
