# Ticket 10 — Pairing: Lottie “family love”

## Meta

- **id**: 10
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / assets

## Spec

- Thay hero Lottie màn **ghép đôi** từ `careHeart` sang animation **family love** (file gốc `.lottie` từ LottieFiles).
- Bundle **một file JSON** trong repo (PNG nhúng base64) để Metro / `lottie-react-native` không phải resolve thư mục ảnh riêng.

## Acceptance

- [x] `mobile/assets/lottie/pairing-family-love.json` (từ `family love.lottie` + embed ảnh).
- [x] `lottieInventory.pairingFamilyLove`.
- [x] `PairingScreenBody` dùng `pairingFamilyLove`, `speed` ~0.92.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/assets/lottie/pairing-family-love.json` | Animation + base64 images |
| `mobile/src/lottie/inventory.ts` | `pairingFamilyLove` |
| `mobile/src/features/pairing/PairingScreenBody.tsx` | Source + speed |

## Verify

- `bun run typecheck:mobile`

## Residual

- File JSON ~63KB; nếu cần giảm size có thể tối ưu ảnh hoặc dùng vector-only export từ LottieFiles.
