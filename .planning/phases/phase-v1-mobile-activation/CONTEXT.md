# Phase: V1 Mobile Activation — Context

**Gathered:** 2026-04-19
**Status:** Executed and ready for review
**Source:** Release scope + release checklist + current product direction

<domain>
## Phase Boundary

This phase aligns the first-run mobile experience with the current V1 release thesis:

> Em+ must be useful before pairing.

The phase covers:

- onboarding
- auth shell messaging
- unpaired home experience
- placement and framing of pairing as an upgrade

This phase does **not** cover:

- broad care redesign
- budget as a headline experience
- realtime sync expansion
- rich timeline polish
- backend platform expansion beyond what is needed for activation

</domain>

<decisions>
## Implementation Decisions

### Product Boundary
- Em+ V1 is a **single-player first** product with optional pairing later
- Pairing must never be the gate to first value
- First-session value must come from:
  - important dates
  - partner notes or preferences
  - one lightweight suggestion

### UX Direction
- Onboarding explains solo value first and pairing second
- Home must be usable and credible when unpaired
- Pairing entry points should exist, but not dominate before first value
- Empty states must guide the next useful action instead of implying the app is incomplete

### UI Direction
- Follow the Calm Care direction already defined in docs
- Borrow LookAway's discipline, not its exact visual identity
- Prioritize clarity, hierarchy, and low-pressure utility over ornamental motion or glossy presentation

### Verification Standard
- Phase is complete only if a new user can understand the app quickly and get value without pairing
- Mobile screens should be reviewed against release gates, not against abstract design goals

### Claude's Discretion
- Exact copy rewrites within the approved product message
- Specific component simplifications when they improve clarity
- Minor navigation adjustments that support the solo-first activation path

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Release Boundary
- `docs/12_release_scope_v1.md` — V1 product boundary for mobile, backend, and web
- `docs/13_release_checklist_v1.md` — release gates and non-negotiables

### Design Direction
- `docs/10_calm_care_ui_direction.md` — YC + LookAway rationale, Calm Care rules
- `docs/11_mobile_calm_care_refactor.md` — mobile-first execution priorities
- `docs/06_ui_ux_screen_flows.md` — intended screen behavior after the design shift

### Current Mobile Surfaces
- `mobile/app/login.tsx`
- `mobile/app/register.tsx`
- `mobile/app/(tabs)/home.tsx`
- `mobile/src/features/auth/`
- `mobile/src/features/home/`
- `mobile/src/features/pairing/`

### Testing / Verification
- `knowledge-base/documents/repo/testing-plan-unit-e2e.md` — current testing strategy and gaps

</canonical_refs>

<specifics>
## Specific Ideas

- The first onboarding pass should be very short: explain value, not breadth
- Unpaired home should still feel complete enough to use every day
- The first strong CTA should likely be "add an important date" or equivalent, not "pair now"
- Pairing should be framed as "better together" after the user already sees value alone

</specifics>

<implementation_notes>
## Implementation Audit Notes — 2026-04-19

### Pairing-Gated Surfaces Found
- `mobile/app/index.tsx` redirected authenticated but unpaired users straight to `/pairing`
- `mobile/app/login.tsx` redirected authenticated users to `/pairing` when `coupleId` was missing
- `mobile/src/features/auth/components/VerifyOtpForm.tsx` sent newly verified users to `/pairing`
- `mobile/app/(tabs)/home.tsx` rendered a blocking empty state with `Ghép đôi` as the only meaningful action

### Product-Story Drift Found
- The current post-auth flow implied Em+ was incomplete before pairing, which contradicted the V1 release thesis
- Unpaired home copy promised value only after connection, not before it
- The first-value path was hidden behind a social dependency instead of starting with a solo utility story

### Phase 1 Decisions Applied
- Auth and post-auth entry points now land authenticated users on `/(tabs)/home` regardless of pairing status
- Unpaired home now explains solo value first, presents pairing as an upgrade, and offers a practical CTA before pairing
- Unpaired users can now save one local `important date` draft from the existing add-memory screen and see it reflected back on home
- Unpaired home now derives a simple countdown / reminder suggestion from that local important date so the product starts signaling `what not to forget next`
- Notifications now surfaces that same solo important date as a reminder-setup card, so empty state users still get a concrete next step toward `save -> prepare reminder`
- Timeline now shows a solo preview state for that local important date instead of hard-gating all unpaired users behind pairing
- Existing paired-home dashboard remains unchanged for this phase to keep blast radius small

### Deferred After Phase 1
- `care` still assumes paired/couple-backed data
- A full backend-supported solo timeline/reminder model still does not exist; the current first important date path is local-first on device
- Auth shell visuals and hero messaging can be tightened further once the solo-first utility path is broader than notifications + pairing-later framing

</implementation_notes>

<verification_notes>
## Verification Notes — Phase 1 Closeout

### Verified During Execution
- `mobile` typecheck passed after the solo-first routing changes
- `mobile` typecheck passed after local important date storage and unpaired home work
- `mobile` typecheck passed after notifications and timeline solo-preview work
- post-login crash caused by the home query focus/refetch loop was fixed by gating dashboard queries to paired users only

### Manually Confirmed
- login now lands in the app instead of pushing unpaired users into `/pairing`
- unpaired users can add a first important date
- home reflects that date back with countdown context
- notifications provides a reminder-setup next step for solo users
- timeline no longer hard-blocks all unpaired users

### Still Needs Manual Release QA
- pairing later happy path after a user has already started solo
- notifications settings behavior on a real device with OS-level permission prompts
- copy consistency review across auth, pairing, and web landing

</verification_notes>

<deferred>
## Deferred Ideas

- broad auth shell visual redesign beyond what is needed for clarity
- advanced emotional care storytelling
- premium / social / community experiences
- timeline media-heavy polish
- new backend modules that do not improve first-session activation

</deferred>

---

*Phase: v1-mobile-activation*
*Context gathered: 2026-04-19 via release docs and current product direction*
