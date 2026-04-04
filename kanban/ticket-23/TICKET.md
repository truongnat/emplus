# Ticket 23 — Home counter Lottie (bird pair, sky)

## Meta

- **id**: 23
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / home / HeroCard / Lottie

## Spec

- Thay accent bên phải vùng đếm (hàng số lớn) bằng animation **Bird pair love and flying sky** (file gốc `.lottie` từ user).
- Giữ layout ticket-22: eyebrow, số + **ngày**, divider, đồng hồ, hai nút.
- Bundle: trích JSON từ dotLottie (`animations/*.json`), không binary `.lottie` trong repo (theo quy ước `lottieInventory`).
- Giảm chớp nháy: `EmplusLottie` + reduce-motion; tốc độ nhẹ (`speed` ~0.9).

## Acceptance

- [x] Asset JSON trong `mobile/assets/lottie/`, key mới trong `lottieInventory`.
- [x] `HeroCard` dùng Lottie bên phải `NumberTicker`, căn giữa theo trục dọc hàng số.
- [x] Trang trí: `accessibilityElementsHidden` (không chen a11y label hero).
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/assets/lottie/home-counter-bird-pair-sky.json` | JSON từ `Bird pair love and flying sky.lottie` |
| `mobile/src/lottie/inventory.ts` | `homeCounterBirdPairSky` |
| `mobile/src/features/home/components/HeroCard.tsx` | Thay vòng tròn bằng `EmplusLottie` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Có thể chỉnh `counterLottie` width/height theo UAT từng máy / safe area.

## Source asset

- Gốc: `Bird pair love and flying sky.lottie` (user Downloads) — bản quyền theo nguồn tải; giữ trong repo chỉ bản JSON đã trích.
