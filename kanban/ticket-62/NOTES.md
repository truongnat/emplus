# Ticket 62

- `Card` vẫn có `#fff` mặc định; style truyền từ care đè `backgroundColor` — không đổi molecule trong ticket này.

## Hotfix 2026-04-05 (Care dark glass)

- **Symptom**: Thẻ mood (nữ) dark vẫn trông phẳng, không “glass” trên lưới.
- **Fix**: `MoodVibeCheck` dark bọc `GlassCard` (blur + `authGlassBlurIntensity.dark`), `darkOverlayGradient` mỏng (`CARE_MOOD_DARK_GLASS_GRADIENT`) để lưới/aura lọt qua; nhãn slider dark dùng `text.secondary`. `GlassCard` thêm `contentStyle`, `darkOverlayGradient`; liquid dark + custom gradient dùng tint coral Aura.
- **care.tsx**: nút CTA gợi ý nam bỏ override màu — giữ `createCareStyles` dark inset.
