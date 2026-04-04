# Ticket 62 — Care tab — dark mode Aura (lưới)

## Metadata

- **id**: 62
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Màn **Cảm xúc** (`care.tsx`) + **MoodVibeCheck** dùng token grid dark (`homeDarkGridCard` / `homeDarkGridInset`) và màu chữ semantic; bỏ nền trắng cứng. **MoodOrb** gradient đỡ chói trên nền tối.

## Acceptance

- [x] Thẻ/badge/gợi ý nam: surface dark khớp home/timeline.
- [x] Mood slider (nữ): card + track + chữ + divider theo theme.
- [x] Orb: không kết thúc bằng `white` thuần khi dark.

## Implementation

- `mobile/app/(tabs)/care.tsx`, `mobile/src/features/mood/components/MoodVibeCheck.tsx`.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none

### Closing report

- **care.tsx**: `createCareStyles(colors, isDark)` dùng `homeDarkGridCard` / `homeDarkGridInset` khi dark; shadow `#0A0809`. Gỡ override inline badge/avatar/dot; icon trạng thái light vẫn `brand.muted`, dark dùng inset. **MoodOrb**: gradient kết thúc bằng `rgba(255,245,247,0.22)` thay `white` khi dark.
- **MoodVibeCheck.tsx**: `vibeTheme` (useMemo) — card/track/thumb/divider/chữ/icon theo semantic + grid dark; StyleSheet chỉ còn layout/typography.
- **Verify**: `mobile` — `bun run typecheck` ✓
