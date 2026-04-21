---
phase: v1-mobile-activation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - mobile/app/login.tsx
  - mobile/app/register.tsx
  - mobile/app/(tabs)/home.tsx
  - mobile/src/features/auth/
  - mobile/src/features/home/
  - mobile/src/features/pairing/
  - docs/11_mobile_calm_care_refactor.md
autonomous: false
requirements: [V1-MOBILE-ACTIVATION, V1-SOLO-FIRST, V1-PAIRING-LATER]

must_haves:
  truths:
    - "A first-time user can understand Em+ without pairing first"
    - "The unpaired home experience still provides real utility"
    - "Pairing is presented as an enhancement, not a prerequisite"
    - "Onboarding, auth, and home all tell the same product story"
  artifacts:
    - path: "mobile/app/(tabs)/home.tsx"
      provides: "solo-first home experience"
      contains: "unpaired value path"
    - path: "mobile/src/features/home/"
      provides: "home components aligned with activation goals"
      contains: "important now and do next hierarchy"
    - path: "mobile/src/features/auth/"
      provides: "auth and onboarding messaging aligned with V1 scope"
      contains: "solo-first copy"
  key_links:
    - from: "docs/12_release_scope_v1.md"
      to: "mobile/app/(tabs)/home.tsx"
      via: "single-player first release thesis"
      pattern: "use alone first"
    - from: "docs/13_release_checklist_v1.md"
      to: "mobile/src/features/home/"
      via: "release gates for unpaired home and first-session value"
      pattern: "unpaired home is fully usable"
    - from: "docs/10_calm_care_ui_direction.md"
      to: "mobile/src/features/auth/"
      via: "calm-care copy and visual hierarchy"
      pattern: "problem-first"
---

<objective>
Align mobile onboarding, auth messaging, and unpaired home so Em+ V1 delivers value before pairing.

Purpose: Protect the release wedge. A user should understand the product quickly, complete the first useful action, and feel that pairing improves the experience later instead of unlocking it.
Output: A mobile activation path where auth, onboarding, home, and pairing entry points all support the same solo-first story.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-v1-mobile-activation/CONTEXT.md
@docs/12_release_scope_v1.md
@docs/13_release_checklist_v1.md
@docs/10_calm_care_ui_direction.md
@docs/11_mobile_calm_care_refactor.md
@docs/06_ui_ux_screen_flows.md
@knowledge-base/documents/repo/testing-plan-unit-e2e.md
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Audit current mobile activation flow against release gates</name>
  <files>
    mobile/app/login.tsx,
    mobile/app/register.tsx,
    mobile/app/(tabs)/home.tsx,
    mobile/src/features/auth/,
    mobile/src/features/home/,
    mobile/src/features/pairing/
  </files>
  <read_first>
    docs/12_release_scope_v1.md,
    docs/13_release_checklist_v1.md,
    docs/10_calm_care_ui_direction.md,
    docs/11_mobile_calm_care_refactor.md,
    mobile/app/login.tsx,
    mobile/app/register.tsx,
    mobile/app/(tabs)/home.tsx
  </read_first>
  <action>
Create a concise implementation audit before editing:

- identify places where the current mobile flow still implies pairing is required
- identify where auth or onboarding copy drifts away from the release thesis
- identify whether unpaired home currently delivers real first-session value
- identify any home components that act like decorative dashboard chrome instead of helping action or recall

Write findings as implementation notes in the working context for use in Tasks 2 and 3. Focus on product behavior, not generic style commentary.
  </action>
  <acceptance_criteria>
- Clear list of pairing-gated or pairing-implying surfaces exists
- Clear list of auth/onboarding/home inconsistencies exists
- Findings are specific enough to guide concrete edits in later tasks
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Refactor auth and onboarding messaging for solo-first activation</name>
  <files>
    mobile/app/login.tsx,
    mobile/app/register.tsx,
    mobile/src/features/auth/
  </files>
  <read_first>
    docs/12_release_scope_v1.md,
    docs/13_release_checklist_v1.md,
    docs/10_calm_care_ui_direction.md,
    docs/11_mobile_calm_care_refactor.md,
    mobile/app/login.tsx,
    mobile/app/register.tsx
  </read_first>
  <action>
Update auth and onboarding-facing copy and screen hierarchy so the user learns:

- Em+ is useful before pairing
- the first value is remembering important things and acting at the right moment
- pairing improves the experience later

Keep the UI calm and concise. Do not broaden the feature story. Do not reintroduce decorative or dreamy framing that weakens trust.
  </action>
  <acceptance_criteria>
- No primary auth/onboarding copy implies pairing is required to begin
- Solo-first value proposition is visible in the first auth/onboarding impression
- Copy remains consistent with the Calm Care direction
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Refactor unpaired home toward first value and pairing-later UX</name>
  <files>
    mobile/app/(tabs)/home.tsx,
    mobile/src/features/home/,
    mobile/src/features/pairing/
  </files>
  <read_first>
    docs/12_release_scope_v1.md,
    docs/13_release_checklist_v1.md,
    docs/10_calm_care_ui_direction.md,
    docs/11_mobile_calm_care_refactor.md,
    docs/06_ui_ux_screen_flows.md,
    mobile/app/(tabs)/home.tsx
  </read_first>
  <action>
Adjust the unpaired home experience so it clearly supports first-session value:

- important now
- what to do today
- what not to forget

Reduce any remaining dashboard feeling.
Make pairing visible as the next layer of improvement, but not the first required action.
If needed, simplify or demote components whose main role is decorative rather than useful.
  </action>
  <acceptance_criteria>
- Unpaired home is understandable and useful without pairing
- One dominant next action exists on the home screen
- Pairing appears as enhancement rather than gate
- Home reflects the same product promise made in auth and onboarding
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 4: Verify the activation path and document release impact</name>
  <files>
    mobile/app/login.tsx,
    mobile/app/(tabs)/home.tsx,
    docs/11_mobile_calm_care_refactor.md
  </files>
  <read_first>
    docs/13_release_checklist_v1.md,
    knowledge-base/documents/repo/testing-plan-unit-e2e.md
  </read_first>
  <action>
Run the smallest meaningful verification for this phase:

- mobile typecheck
- quick manual verification notes for auth -> solo-first understanding -> unpaired home -> pairing later

If docs need one small clarification after implementation, update them so the release checklist stays aligned with reality.
  </action>
  <acceptance_criteria>
- Typecheck passes or failures are documented precisely
- Verification notes cover auth, unpaired understanding, home utility, and pairing-later behavior
- Phase outcome is easy to review against the release checklist
  </acceptance_criteria>
</task>

</tasks>

<verification>
Run:

```bash
bun run typecheck:mobile
```

Then manually verify:

1. login/register entry feels solo-first
2. user can understand value before pairing
3. unpaired home offers a useful next step
4. pairing can be discovered later without blocking first-session value
</verification>

<success_criteria>

- Mobile activation path is aligned with the V1 release thesis
- Pairing is no longer framed as the prerequisite for usefulness
- Auth, onboarding, and home tell one consistent product story
- The result strengthens the release gates in `docs/13_release_checklist_v1.md`

</success_criteria>
