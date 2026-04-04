# Ticket 21 — Counter hero: layout mới (ui-ux-pro-max + Aura)

## Meta

- **id**: 21
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / HeroCard / UX

## Research (ui-ux-pro-max)

Đã chạy:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py \
  "couples relationship wellness emotional mobile app counter anniversary" \
  --design-system -p "Em Plus"
```

Script gợi ý pattern **block / focal**, contrast rõ, motion 200–300ms, **tránh emoji làm icon** (dùng SVG/icon set). **Không** đổi palette sang lavender của output script — giữ **Aura coral / indigo** (`VISUAL_DESIGN_GUIDE.md`).

Bổ sung:

```bash
python3 .agents/skills/ui-ux-pro-max/scripts/search.py \
  "accessibility touch hero card" --stack react-native
```

→ nhấn mạnh semantic / touch; hero counter không interactive nên tập trung **hierarchy + a11y label** đã có.

## Spec

- **Focal panel** (glass inset): số + đơn vị **“ngày”** trong một khối để quét nhanh.
- **Headline** sentence case **“Đã bên nhau”** — khớp guide (tránh ALL CAPS toàn dòng).
- **Icon vector** (`Ionicons` sparkles / time) thay emoji ✨ trong copy.
- **Viền ngoài** nhẹ indigo (secondary) cho depth, không lệch brand.
- **Khối giờ:** caption “Bây giờ” + pill có icon đồng hồ.

## Acceptance

- [x] `HeroCard` layout mới: header row, `focalPanel`, `timeBlock`.
- [x] `accessibilityLabel` giữ nguyên ý nghĩa; `accessibilityRole="summary"` nếu platform hỗ trợ.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HeroCard.tsx` | Border ngoài indigo; headline + sparkles icon; focal glass + hàng số + suffix “ngày”; caption + pill time |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Fine-tune `marginBottom` của `unitSuffix` theo UAT thiết bị.
- `prefers-reduced-motion` cho pulse ticker — ticket khác (ticket-19 residual).

## Skill

- Tham chiếu `.agents/skills/ui-ux-pro-max` (không thêm skill repo mới).
