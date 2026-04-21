# Phase: V1 Manual Release QA — Context

**Gathered:** 2026-04-20
**Status:** Prepared for execution
**Source:** Release checklist, completed implementation phases, backend release pass

<domain>
## Phase Boundary

This phase does not add new features.

It prepares and records the final manual verification pass for:

- mobile first-run utility
- pairing later flow on two devices
- reminder visibility and notification setup
- web landing coherence on mobile viewport

It does **not** cover:

- visual polish beyond release-critical readability
- new backend capabilities
- broad UI redesign
</domain>

<baseline>
## QA-Ready Baseline

### Already Verified Automatically
- mobile typecheck for the solo-first and auth/pairing phases
- backend smoke flow for auth, pairing status, push token, reminder dispatch, and notifications
- backend reminder dispatch idempotence
- web typecheck and build after landing sync

### Still Requires Manual QA
- auth and first-value flow on a real mobile device
- pairing success and failure states on two devices
- notification permission prompt behavior on device / OS
- landing readability on a mobile viewport

### Current Release Risks
- pairing function QA has been deferred by design and still needs two-device execution
- notification behavior depends on real device permission flow, which automated tests do not cover
- some UI fit-and-finish issues may remain acceptable for release but still need explicit review
</baseline>

<references>
## Canonical References

- `docs/12_release_scope_v1.md`
- `docs/13_release_checklist_v1.md`
- `docs/11_mobile_calm_care_refactor.md`
- `.planning/phases/phase-v1-mobile-activation/CONTEXT.md`
- `.planning/phases/phase-v1-pairing-upgrade/CONTEXT.md`
- `.planning/phases/phase-v1-auth-onboarding-polish/CONTEXT.md`
</references>
