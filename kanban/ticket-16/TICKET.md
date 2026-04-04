# Ticket 16 — Home: bỏ icon vòng trên hero, căn giữa counter

## Meta

- **id**: 16
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / UI

## Spec

- Xóa **Lottie placeholder** (vòng / animation) giữa `HomeHeader` và `HeroCard`.
- **Hero card**: bỏ icon trang trí (sao/sparkle) quanh số đếm; căn giữa rõ **label + số + đồng hồ + tagline + pill ngày** trong card.

## Acceptance

- [x] Không còn block Lottie placeholder trên Home (giữ Lottie khác nếu vẫn dùng).
- [x] `HeroCard` không còn absolute star/sparkle; layout column căn giữa.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/app/(tabs)/home.tsx` | Xóa `<View>` + `EmplusLottie` `lottieInventory.placeholder` giữa header và hero |
| `mobile/src/features/home/components/HeroCard.tsx` | Bỏ `Ionicons` star/sparkle; `content` `minHeight` 320, `gap`, `topLabel` full width center; `ticker` full width center; `title` `textAlign: center`; xóa style `star*` |

### Hotfix (2026-04-04) — counter animation + căn số

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HomeClock.tsx` | Bỏ cuộn chữ số đối xứng (`isOpposite`); `withTiming` cubic ~420ms; ô cố định 70px, `gap` 8, `tabular-nums` (iOS); 2 chữ số khi &lt;100, 3 khi ≥100; đồng hồ nhỏ easing cubic 280ms |
| `mobile/src/features/home/components/HeroCard.tsx` | Giảm pulse scale hero (1.02) để không “đánh” cùng animation số |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04, sau hotfix)

## Residual

- Nếu vẫn thấy “gear” trên thiết bị thật, kiểm tra overlay hệ thống hoặc màn khác (không thấy trong `home.tsx` sau thay đổi).
