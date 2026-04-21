# Phase Plan: V1 Auth & Onboarding Polish

## Objective

Make auth and onboarding match the release thesis:

- use alone first
- pair later
- reach first value fast

## Execution Order

### Task 1 — Audit current auth/onboarding messaging
- review login, register, verify-otp, and any onboarding entry copy
- mark screens that still sound theatrical, vague, or pairing-gated
- identify which screen currently makes the first-value promise most clearly

### Task 2 — Refactor register and login framing
- tighten headlines, subtitles, and reassurance copy
- reduce decorative wording that weakens trust
- keep one dominant CTA per screen

### Task 3 — Refactor verify-otp as a “last step before value” screen
- ensure the screen feels compact and practical
- make the post-success destination obvious in wording if needed
- avoid copy that sounds like a separate ceremony

### Task 4 — Audit and tighten onboarding entry path
- if onboarding exists, cap scope to the first believable wedge
- ensure solo value is explained before pairing
- ensure the final step leads into first value, not a dead-end intro

### Task 5 — Verification and docs sync
- run `bun x tsc --noEmit --pretty false` in `mobile/`
- update `docs/11_mobile_calm_care_refactor.md`
- update `docs/13_release_checklist_v1.md`
- note Phase 2 as deferred for function QA on two devices

## Out of Scope

- backend auth contract changes
- reminder feature work
- pairing mechanics redesign
- web landing implementation
