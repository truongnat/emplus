# ticket-27 — Bottom tab bar: align with Visual Design Guide

## Summary

Refresh the custom Expo Router tab bar (glass pill + detached Care control) to match `docs/VISUAL_DESIGN_GUIDE.md`: glass fills, hairline borders, semantic elevation, radius scale, and calmer proportions.

## Spec

- Glass surfaces: primary glass opacity targets (light/dark) + 1px-style border per guide §2.6.
- Elevation: `elevation.raised` on main pill, `elevation.floated` on Care FAB-style control; optional warm `shadowColor` from brand on Care.
- Shape: `radius["2xl"]` (28) for pill capsule; full pill for Care outer ring.
- Tab bar height closer to guide §4.2 (~56–64pt content) while keeping touch targets ≥ 44pt.
- No new dependencies; reuse theme tokens (`@/src/theme/elevation`, `@/src/theme/tokens`).

## Acceptance

- Light/dark: readable icons, visible glass edge (border), no harsh black shadows only.
- Care selected/unselected states preserved; haptics preserved.
- `bun run typecheck:mobile` passes.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile` — pass

## Implementation

- `mobile/app/(tabs)/_layout.tsx`: tokenized glass colors/borders, `elevation`, `radius`, unified dimensions, refined Care halo shadow.

## Residual

- None.
