# ticket-29 — Home screen review & completion pass

## Summary

Audit paired/guest/unpaired home shell: structure, scroll safe-area vs floating tab bar, dead code; mark screen ready for ongoing polish.

## Spec

- Remove unused code on `home.tsx`.
- Scroll `contentContainerStyle` bottom padding respects **safe area** above floating tab bar (no last card clipped on notched devices).
- Document acceptance; typecheck passes.

## Acceptance

- [x] No dead handlers / unused session API on home route.
- [x] `paddingBottom` ≥ previous minimum and scales with `insets.bottom`.
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/app/(tabs)/home.tsx`: drop unused `handleLogout` / `clearSession`; dynamic `paddingBottom` with `insets.bottom`.

## Residual

- Logout entry point remains on Profile (or settings), not duplicated on Home.
