# Ticket 49 — Mood blob màu theo slider

## Metadata

- **ticket_id**: 49
- **status**: done
- **domain_stack**: `mobile` (`MoodVibeCheck`)
- **opened**: 2026-04-04

## Intake

- Animation màu **ở giữa** (hai blob radial SVG) **đổi theo** vị trí **slider** tâm trạng (0–100), đồng bộ dải màu với track (xanh → vàng → hồng).

## Acceptance

- [x] `VisualArea` nhận `moodT` (0–1); `Stop` radial cập nhật theo `value`.
- [x] Nội suy màu trùng gradient thanh `#10B981` → `#FACC15` → `#FB7185`.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/src/features/mood/components/MoodVibeCheck.tsx` — helpers `lerpHex` / `interpolateTrackColor` / `mixWithWhite`; props `moodT` cho `VisualArea`.

## Verify

- `bunx tsc --noEmit` (mobile)

## Residual

- Không.

## Closed

- **closed:** 2026-04-04
