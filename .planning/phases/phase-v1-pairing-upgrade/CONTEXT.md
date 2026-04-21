# Phase: V1 Pairing Upgrade — Context

**Gathered:** 2026-04-19
**Status:** Ready for planning and execution
**Source:** Phase 1 mobile activation closeout + V1 release scope + current pairing implementation

<domain>
## Phase Boundary

This phase aligns the pairing experience with the current V1 release thesis:

> Pairing improves the experience later, but does not unlock first value.

The phase covers:

- pairing screen messaging
- pairing screen hierarchy
- solo-first framing of pairing entry points
- transition language around "use alone first, pair later"

This phase does **not** cover:

- backend pairing protocol changes
- invite-code infrastructure redesign
- realtime sync expansion
- broad auth or onboarding redesign
- web landing implementation work

</domain>

<decisions>
## Implementation Decisions

### Product Boundary
- Pairing is an upgrade path, not the first proof of value
- The pairing screen should feel relevant after solo progress already exists
- The user should immediately understand:
  - why pairing helps
  - what changes after pairing
  - that they have already started correctly even without it

### UX Direction
- Pairing should answer "Why pair now?" before "How do I pair?"
- Invite and join actions may both exist, but one should dominate visually
- Success state should feel brief, warm, and credible
- Failure states should reduce confusion, not add romance-themed fluff

### UI Direction
- Keep the Calm Care tone
- Borrow LookAway-style discipline: fewer ideas, more clarity
- Reduce concept-app energy in the header / hero region if it weakens trust

### Verification Standard
- A solo user arriving from Phase 1 should not feel punished or "unfinished"
- Pairing should read as better together, not required to begin
- The screen should be understandable in under a few seconds

### Claude's Discretion
- Rewrite pairing copy within the approved V1 thesis
- Demote or simplify decorative elements when clarity improves
- Rebalance CTA hierarchy if the current split layout feels too equal-weight

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

### Current Mobile Surfaces
- `mobile/app/pairing.tsx`
- `mobile/src/features/pairing/PairingScreenBody.tsx`
- `mobile/src/features/pairing/PairingGridShell.tsx`
- `mobile/src/features/pairing/pairingScreen.styles.ts`

</canonical_refs>

<specifics>
## Specific Ideas

- The screen should likely explain the upgrade in plain language before showing QR / code mechanics
- The main CTA should reflect the most common next step, not simply present both flows with equal emotional weight
- Copy should explicitly acknowledge solo-first progress:
  - "Bạn đã bắt đầu rồi"
  - "Ghép đôi để đồng bộ trải nghiệm"
- The current title / subtitle may still be too romantic and not concrete enough for release

</specifics>

<implementation_notes>
## Implementation Audit Notes — 2026-04-20

### Current Mismatch With The Solo-First Thesis
- The pairing header still reads like a romantic start point, not an upgrade after progress already exists
- The subtitle `Kết nối trái tim của hai bạn` is emotionally warm but weak on concrete product value
- The screen explains mechanics (`scan`, `copy`, `enter code`) before clearly explaining why pairing helps now

### Decision Structure Problems
- The QR invite path visually dominates the upper half of the screen before the user gets any plain-language explanation
- `copy` and `scan` are given equal weight in the toolbar, but the screen does not indicate which action is primary for the current user
- The lower join flow also introduces a second strong CTA, so the overall screen has too many equal-weight actions

### Clarity / Trust Risks
- The lottie hero + gradient title + QR card combination still leans toward concept-app energy instead of calm utility
- The code-entry label is mechanically clear, but disconnected from a concrete user moment like “pair to sync your important dates and reminders”
- There is no explicit acknowledgement that the user has already started correctly on their own

### What The Next Refactor Should Do
- add a short plain-language explanation above the mechanics:
  - what pairing improves
  - what stays usable without pairing
  - why pairing might be useful now
- choose one stronger action hierarchy:
  - either “share your code” first
  - or “join with a code” first
  depending on the likely dominant use case
- reduce visual emphasis that does not improve comprehension
- keep warmth, but remove language that sounds like a romantic concept deck instead of a release-ready utility screen

### Task 2 Progress
- the pairing header now acknowledges that the user already started correctly
- the subtitle now explains concrete upgrade value instead of abstract romance language
- the screen now includes a short explainer block before the QR mechanics
- action labels now read more plainly:
  - `Chia sẻ mã`
  - `Quét mã người ấy`
  - `Đồng bộ ngay`
- the screen now includes a low-pressure note that pairing can happen later

### Task 3 Progress
- the QR/invite path now has a stronger informational lead-in and clearer primary position
- `share code` is now the dominant action in the upper section
- `join with code` is still available, but framed as a secondary path with explicit context
- the lower CTA has been visually softened so the screen no longer presents multiple equally loud next actions

</implementation_notes>

<deferred>
## Deferred Ideas

- pairing success animation overhaul
- invite lifecycle redesign
- richer partner identity / profile context on pairing
- post-pair onboarding expansion

</deferred>

---

*Phase: v1-pairing-upgrade*
*Context gathered: 2026-04-19 from Phase 1 closeout and current V1 release docs*
