# ticket-28 — Navbar Care (heart): press bounce animation

## Summary

Add a short scale “bounce” on the detached **Cảm xúc** heart control when pressed, using existing Reanimated stack; respect **Reduce Motion**.

## Spec

- Trigger on **press** (same navigation + haptics as today).
- Animation: subtle squash → slight overshoot → settle to 1 (aligned with gentle motion in VISUAL_DESIGN_GUIDE §7).
- If Reduce Motion is on: skip scale animation, keep haptics + navigate.

## Acceptance

- Tap heart: visible bounce; tab still switches to Care.
- Reduce Motion: no scale loop/bounce; behavior otherwise unchanged.
- `bun run typecheck:mobile` passes.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/app/(tabs)/_layout.tsx`: `carePressScale` + `withSequence`/`withSpring`; `Reanimated.View` wraps care chrome; `useReducedMotion`.

## Residual

- None.

## Hotfix (post-close)

- Heart bounce: scale **icon only** (not BlurView) + `withTiming` press-in + single `withSpring` settle — smoother on iOS.
