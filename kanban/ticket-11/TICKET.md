# Ticket 11 — Pairing UI: cân bằng dọc, không quá nhỏ

## Meta

- **id**: 11
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / pairing screen

## Spec

- Sau bản “compact” quá chật: **tăng** kích thước hợp lý (Lottie, QR, chữ, nút), **padding** trong thẻ glass, **CTA** gần login (`lg` input, `minHeight` 52).
- **Bố cục hai cụm** `upperBlock` / `lowerBlock` + `justifyContent: "space-between"` để **kéo khối HOẶC + form xuống gần đáy**, tránh khoảng trống lớn phía dưới.
- `AUTH_GRID_PAIRING_TOP_EXTRA` và padding shell chỉnh lại vừa phải.

## Acceptance

- [x] `pairingScreen.styles.ts` — token mới `upperBlock`, `lowerBlock`, kích thước/spacing cập nhật.
- [x] `PairingScreenBody` — bọc JSX hai khối; QR **160**; icon/copy/timer lớn hơn.
- [x] `PairingGridShell` — `paddingHorizontal` 24, `paddingBottom` thoáng hơn.
- [x] `authScreenLayout` — `AUTH_GRID_PAIRING_TOP_EXTRA` **18**.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/pairing/pairingScreen.styles.ts` | Hai khối + spacing đẹp hơn |
| `mobile/src/features/pairing/PairingScreenBody.tsx` | Cấu trúc + QR 160 + input `lg` |
| `mobile/src/features/pairing/PairingGridShell.tsx` | Padding |
| `mobile/src/features/auth/authScreenLayout.ts` | Top extra pairing |

## Verify

- `bun run typecheck:mobile`

## Residual

- Màn hình rất thấp + bàn phím mở: vẫn dựa `KeyboardAvoidingView`; nếu cần có thể bật scroll nhẹ chỉ khi keyboard visible.
