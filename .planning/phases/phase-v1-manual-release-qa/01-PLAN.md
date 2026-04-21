---
phase: v1-manual-release-qa
plan: 01
type: execute
wave: 1
depends_on:
  - phase-v1-mobile-activation
  - phase-v1-pairing-upgrade
  - phase-v1-auth-onboarding-polish
files_modified:
  - docs/15_manual_release_qa_v1.md
  - docs/13_release_checklist_v1.md
  - docs/11_mobile_calm_care_refactor.md
autonomous: false
requirements: [V1-RELEASE-QA, V1-SOLO-FIRST, V1-PAIRING-LATER]
---

<objective>
Prepare and run the release-candidate manual QA pass for Em+ V1.

Purpose: convert the current release thesis and implementation state into a concrete test run across mobile, backend-supported flows, and web landing so the remaining risks are explicit.
Output: a single manual QA checklist with clear test cases, expected outcomes, and pass/fail notes for the release-critical flows.
</objective>

<context>
@.planning/phases/phase-v1-mobile-activation/CONTEXT.md
@.planning/phases/phase-v1-pairing-upgrade/CONTEXT.md
@.planning/phases/phase-v1-auth-onboarding-polish/CONTEXT.md
@docs/12_release_scope_v1.md
@docs/13_release_checklist_v1.md
@docs/11_mobile_calm_care_refactor.md
@knowledge-base/documents/repo/testing-plan-unit-e2e.md
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Define release-critical manual QA matrix</name>
  <files>
    docs/15_manual_release_qa_v1.md,
    docs/13_release_checklist_v1.md
  </files>
  <action>
Create a compact manual QA matrix that covers only the release-critical flows:

- auth entry and first value
- unpaired home and first important date
- pairing later on two devices
- notification permission and reminder visibility
- web landing read-through on mobile viewport

Each scenario must specify:
- prerequisites
- steps
- expected result
- status field for pass / fail / blocked
  </action>
  <acceptance_criteria>
- QA matrix is concrete enough for a tester to execute without extra interpretation
- Every open release-critical checklist item maps to at least one manual scenario
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Mark release checklist handoff points for manual QA</name>
  <files>
    docs/13_release_checklist_v1.md,
    docs/11_mobile_calm_care_refactor.md
  </files>
  <action>
Align the release checklist and mobile refactor doc with the new QA matrix:

- point deferred two-device pairing QA to the new document
- point auth/manual QA items to the same document
- keep unchecked items unchecked unless they have already been verified
  </action>
  <acceptance_criteria>
- Handoff between implementation docs and QA doc is explicit
- No checklist item is marked complete without evidence
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Document the current QA-ready baseline</name>
  <files>
    .planning/phases/phase-v1-manual-release-qa/CONTEXT.md,
    knowledge-base/documents/repo/activity-log.md
  </files>
  <action>
Summarize what is already automated and what still requires manual verification, including:

- backend smoke test coverage
- mobile typecheck coverage
- two-device pairing dependency
- real-device notification permission dependency
  </action>
  <acceptance_criteria>
- QA baseline is clear before anyone starts device testing
- Remaining manual risks are visible and finite
  </acceptance_criteria>
</task>

</tasks>

<verification>
This phase is documentation-first.

Verification means:

1. the QA matrix is actionable
2. release checklist references the matrix
3. manual-only risks are clearly identified before device testing starts
</verification>
