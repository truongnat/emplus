---
phase: v1-lookaway-style-audit
plan: 01
type: discuss
wave: 1
depends_on:
  - phase-v1-mobile-activation
  - phase-v1-pairing-upgrade
  - phase-v1-auth-onboarding-polish
  - phase-v1-manual-release-qa
files_modified:
  - docs/16_lookaway_style_audit_v1.md
  - docs/11_mobile_calm_care_refactor.md
  - docs/13_release_checklist_v1.md
autonomous: false
requirements: [V1-LOOKAWAY-DISCIPLINE, V1-CALM-CARE, V1-SOLO-FIRST]
---

<objective>
Separate the structural YC-driven refactor from the visual/style work inspired by LookAway, then define the next polish order.

Purpose: avoid confusing product-flow correctness with visual completion.
Output: a style audit that identifies what parts of Em+ already reflect LookAway-derived discipline, what parts do not, and which screens should receive the next polish pass first.
</objective>

<execution_context>
GSD is installed locally from the upstream project:

- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
- local path: `~/.claude/get-shit-done`

In this repo, GSD is applied through:

- `.planning/phases/...`
- `docs/14_gsd_workflow_integration.md`

There is no standalone `gsd` skill available in this session, so we use the installed upstream workflows through repo planning artifacts instead of a direct skill invocation.
</execution_context>

<skills>
Use these available skills as accelerators for this phase:

- `mobile-design` for touch-first and mobile hierarchy review
- `landing-page-design` for landing-page messaging and section discipline
- `frontend-design` for translating audit findings into a concrete polish direction
- `web-design-guidelines` as a secondary web sanity check if needed
- `playwright` / `screenshot` for viewport verification if execution moves beyond documentation
</skills>

<context>
@docs/10_calm_care_ui_direction.md
@docs/11_mobile_calm_care_refactor.md
@docs/12_release_scope_v1.md
@docs/13_release_checklist_v1.md
@docs/14_gsd_workflow_integration.md
@mobile/src/features/auth/
@mobile/src/features/home/
@mobile/src/features/pairing/
@web/src/components/
@web/src/styles/global.css
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Audit current implementation against LookAway-derived discipline</name>
  <action>
Review the current mobile and web surfaces against the Calm Care / LookAway-derived rules:

- light-first calm presentation
- strong spacing and quiet sections
- one dominant next action
- fewer loud surfaces per screen
- credible, low-pressure copy
- practical hierarchy over concept-app energy

Separate the findings into:

- already aligned
- partially aligned
- still off-direction
  </action>
  <acceptance_criteria>
- Audit clearly distinguishes YC flow progress from visual/style progress
- Findings are grouped by screen/surface, not by abstract theory only
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Prioritize the next style polish order</name>
  <action>
Define a polish order that improves release readiness fastest without reopening broad scope.

Expected priority:

1. mobile home
2. pairing
3. notifications
4. auth shell
5. landing page final visual pass
  </action>
  <acceptance_criteria>
- The next style order is explicit
- Each target includes a concrete reason for why it matters now
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Document skill availability and gaps</name>
  <action>
Record which skills are being used for this phase and which expected helpers are not available in-session.
  </action>
  <acceptance_criteria>
- The phase notes which skills are active now
- Any missing capability is stated plainly so the user can decide whether to install something else
  </acceptance_criteria>
</task>

</tasks>
