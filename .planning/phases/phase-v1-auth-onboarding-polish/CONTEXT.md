# Phase: V1 Auth & Onboarding Polish — Context

**Gathered:** 2026-04-20
**Status:** Executed and ready for review
**Source:** Phase 1 solo-first activation + Phase 2 pairing upgrade + V1 release scope

<domain>
## Phase Boundary

This phase aligns the auth and onboarding experience with the current V1 release thesis:

> A user can start alone, understand the value quickly, and pair later only if it helps.

The phase covers:

- login / register / verify-otp copy and hierarchy
- onboarding entry messaging and sequencing
- auth trust / reassurance cues
- wording consistency around solo-first and pair-later

This phase does **not** cover:

- backend auth protocol redesign
- pairing mechanics redesign
- reminder or timeline feature expansion
- web landing implementation
- visual polish beyond what is necessary for clarity

</domain>

<decisions>
## Implementation Decisions

### Product Boundary
- Auth should get the user into first value, not into a narrative detour
- Onboarding should explain the wedge, not the full product vision
- Pairing should only appear as an enhancement after solo value is understood

### UX Direction
- Every auth surface should answer one question fast:
  - login: "How do I get back in?"
  - register: "Why start now?"
  - verify OTP: "What do I do next?"
  - onboarding: "What will this app help me do first?"
- Cut romance-heavy or theatrical wording if it weakens trust
- Prefer short, plain-language reassurance over decorative persuasion

### UI Direction
- Calm Care tone stays
- Reduce hero weight if it pushes important actions below the fold
- Keep one dominant CTA per screen
- Trust cues should be visible but brief

### Verification Standard
- A new user should understand solo-first usefulness in a few seconds
- No auth screen should imply pairing is required to begin
- Onboarding must lead into first value, not into a dead-end intro

### Claude's Discretion
- Flatten non-essential decorative elements when readability improves
- Rewrite auth/onboarding copy inside the approved V1 thesis
- Shorten or remove steps if they do not increase activation confidence

</decisions>

<canonical_refs>
## Canonical References

### Release Boundary
- `docs/12_release_scope_v1.md`
- `docs/13_release_checklist_v1.md`

### Design Direction
- `docs/10_calm_care_ui_direction.md`
- `docs/11_mobile_calm_care_refactor.md`
- `.planning/phases/phase-v1-mobile-activation/CONTEXT.md`
- `.planning/phases/phase-v1-pairing-upgrade/CONTEXT.md`

### Current Mobile Surfaces
- `mobile/app/login.tsx`
- `mobile/app/register.tsx`
- `mobile/app/verify-otp.tsx`
- `mobile/src/features/auth/components/LoginAuthForm.tsx`
- `mobile/src/features/auth/components/RegisterAuthForm.tsx`
- `mobile/src/features/auth/components/VerifyOtpForm.tsx`

</canonical_refs>

<specifics>
## Specific Ideas

- Login should feel calm and trustworthy, not dreamy for its own sake
- Register should explain the immediate solo value in one sharp sentence
- Verify OTP should feel like the last small step before value, not a decorative checkpoint
- If onboarding exists as a separate sequence, it should likely be 3 screens or fewer
- Trust and privacy cues should be visible in auth without turning the screen into a legal explainer

</specifics>

<implementation_notes>
## Implementation Audit Notes — 2026-04-20

### Current Surface Inventory
- There is no obvious dedicated onboarding route in `mobile/app` yet
- The current auth surfaces that matter for Phase 3 are:
  - `login`
  - `register`
  - `verify-otp`

### Login Findings
- `mobile/app/login.tsx` still carries a visually strong hero region before the form
- `LoginHeroSection` is almost entirely decorative and does not reinforce the solo-first wedge
- The form itself is functional, but the screen message is still weak:
  - it tells the user how to sign in
  - it does not clearly reinforce why Em+ is useful immediately after login

### Register Findings
- `mobile/app/register.tsx` uses the shared auth shell and is structurally simple
- `RegisterHeroSection` is currently just a looping heart animation with no product promise
- `RegisterAuthForm` gets the user through account creation, but the screen does not yet frame:
  - what happens first after creating the account
  - that the user can start alone
  - that pairing comes later if useful

### Verify OTP Findings
- `VerifyOtpHeroSection` is more concrete than login/register because it states the immediate action
- `VerifyOtpForm` now has better submit guards and routes to home correctly
- The screen still feels somewhat ceremonial because of the hero animation and spacing, but it is closer to release-ready than the other auth surfaces

### Phase 3 Implications
- The biggest gap is not auth mechanics; it is auth messaging
- Register is likely the highest-leverage screen to tighten first, because it defines the first-value expectation
- Login should be calmer and more trust-oriented, with less decorative emphasis
- If onboarding is still absent as a distinct flow, the auth screens themselves currently serve as onboarding entry and should be treated that way

### Task 4 Result
- There is no dedicated onboarding route in `mobile/app` at the moment
- The effective V1 onboarding entry path is:
  - `register`
  - `verify-otp`
  - `home` (solo-first)
- This means V1 should not assume a separate multi-screen onboarding flow before release
- For now, the auth stack itself must carry onboarding responsibility:
  - register explains first value
  - verify-otp feels like the final step before use
  - home delivers the first usable solo moment
- A dedicated onboarding flow remains optional later, but should not block current release work

### Task 5 Verification
- `register` now carries a clearer solo-first promise instead of relying on decorative animation only
- `login` now carries a clearer practical return-to-value message plus a short trust note
- `verify-otp` is now more compact and reads as the final small step before first value
- V1 docs now explicitly treat `register -> verify-otp -> home` as the effective onboarding entry path
- verification command:
  - `bun x tsc --noEmit --pretty false` in `mobile/` → pass

### Remaining Defer After Phase 3
- manual auth happy-path test remains to be done as part of broader release QA
- a separate onboarding route is still optional and not yet implemented
- web landing still needs messaging sync with the updated auth/onboarding promise

</implementation_notes>

<deferred>
## Deferred Ideas

- experimental onboarding variations
- auth illustration redesign
- web landing sync pass
- advanced trust surfaces or social proof experiments

</deferred>

---

*Phase: v1-auth-onboarding-polish*
*Context gathered: 2026-04-20 from V1 release docs and completed mobile phases*
