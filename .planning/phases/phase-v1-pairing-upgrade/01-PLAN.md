---
phase: v1-pairing-upgrade
plan: 01
type: execute
wave: 2
depends_on: [phase-v1-mobile-activation]
files_modified:
  - mobile/app/pairing.tsx
  - mobile/src/features/pairing/
  - docs/11_mobile_calm_care_refactor.md
autonomous: false
requirements: [V1-PAIRING-LATER, V1-SOLO-FIRST, V1-MOBILE-ACTIVATION]
---

<objective>
Refactor the pairing experience so it matches the solo-first release story and feels like a clear upgrade path instead of a gate.

Purpose: Protect the release narrative after Phase 1. Once users can start alone, pairing must stop sounding like the "real beginning" and instead become the next useful layer.
Output: A pairing screen that explains why to pair, what improves after pairing, and how to do it without confusion or theatrical framing.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-v1-pairing-upgrade/CONTEXT.md
@.planning/phases/phase-v1-mobile-activation/CONTEXT.md
@docs/12_release_scope_v1.md
@docs/13_release_checklist_v1.md
@docs/10_calm_care_ui_direction.md
@docs/11_mobile_calm_care_refactor.md
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Audit current pairing screen against the solo-first release thesis</name>
  <files>
    mobile/app/pairing.tsx,
    mobile/src/features/pairing/
  </files>
  <action>
Identify which parts of the pairing experience still:

- imply the user has not really started yet
- over-index on romance visuals instead of clarity
- give equal weight to invite/join when one should be primary
- fail to explain the concrete value of pairing after solo use

Write concise implementation notes before editing.
  </action>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Rewrite pairing copy and hierarchy for upgrade framing</name>
  <files>
    mobile/src/features/pairing/
  </files>
  <action>
Adjust title, subtitle, body copy, CTA language, and supporting explanation so the screen says:

- you already started correctly
- pairing improves the experience
- here is the simplest next step

Keep the tone calm and credible.
  </action>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Simplify visual emphasis and decision structure</name>
  <files>
    mobile/src/features/pairing/
  </files>
  <action>
Reduce any visual or layout choices that make the screen feel like a concept page or a social gate.
Keep one stronger next action.
Make scanning, copying, and entering a code feel obvious.
  </action>
</task>

<task type="auto" tdd="false">
  <name>Task 4: Verify and update release notes</name>
  <files>
    mobile/src/features/pairing/,
    docs/11_mobile_calm_care_refactor.md
  </files>
  <action>
Run mobile typecheck and update phase notes if the pairing screen meaningfully improves release readiness.
  </action>
</task>

</tasks>

<verification>
Run:

```bash
bun run typecheck:mobile
```

Then manually verify:

1. pairing reads as optional upgrade
2. why-to-pair is understandable before how-to-pair
3. one next action feels dominant
4. the screen still feels warm, but no longer theatrical
</verification>

<success_criteria>

- Pairing no longer reads like the real start of the app
- Solo-first progress is acknowledged in the copy
- Upgrade value is clear in plain language
- The screen fits the Calm Care direction and the V1 release thesis

</success_criteria>
