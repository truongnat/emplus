# Em+ — GSD Workflow Integration

This document explains how `get-shit-done` (GSD) should be used in this repository.

The goal is not to replace the existing docs.

The goal is to make GSD work as the execution layer on top of the release strategy already defined for Em+.

Use this with:

- [`12_release_scope_v1.md`](./12_release_scope_v1.md)
- [`13_release_checklist_v1.md`](./13_release_checklist_v1.md)
- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`11_mobile_calm_care_refactor.md`](./11_mobile_calm_care_refactor.md)

---

## 1. Current status

GSD is already installed locally on this machine at:

- `~/.claude/get-shit-done`

This local installation matches the public upstream project:

- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)

The local tree already contains the same core workflow structure:

- `workflows/`
- `templates/`
- `commands/`
- `bin/gsd-tools.cjs`

This repo also already contains:

- `.planning/`
- prior phase documents
- references to GSD workflow files in older planning artifacts

What was missing before this integration:

- a repo-specific usage guide
- a stable wrapper for checking the local setup
- a clear mapping from GSD phases to Em+ release priorities

---

## 2. Repo helper

Use:

```bash
bash ./scripts/gsd.sh doctor
```

Available helper commands:

- `bash ./scripts/gsd.sh doctor`
- `bash ./scripts/gsd.sh status`
- `bash ./scripts/gsd.sh paths`
- `bash ./scripts/gsd.sh guide`

This helper does not replace upstream GSD slash commands.

It only makes the local setup easier to inspect and reuse.

---

## 3. How GSD should be used in Em+

GSD should follow the product boundary already defined in the release docs.

That means:

- do **not** let planning re-expand the scope into a broad couples super app
- do **not** let execution drift away from `single-player first`
- do **not** let UI planning contradict the Calm Care direction

### Source of truth

Before planning any new phase, treat these files as locked context:

- [`12_release_scope_v1.md`](./12_release_scope_v1.md)
- [`13_release_checklist_v1.md`](./13_release_checklist_v1.md)
- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`11_mobile_calm_care_refactor.md`](./11_mobile_calm_care_refactor.md)

---

## 4. Recommended command mapping

These commands map directly to the upstream GSD workflow model from `gsd-build/get-shit-done`.

## 4.1 For small tasks

Use:

- `/gsd:quick --full`

Good for:

- one screen refactor
- one backend endpoint adjustment
- one landing page section rewrite
- one test or verification task

## 4.2 For release-critical workstreams

Use:

1. `/gsd:discuss-phase`
2. `/gsd:plan-phase`
3. `/gsd:execute-phase`

Good for:

- onboarding rewrite
- pairing refactor
- reminders flow stabilization
- landing page messaging cleanup

## 4.3 For brownfield re-orientation

Use:

- `/gsd:map-codebase`

Only when:

- the current context is stale
- a new agent or teammate needs a fresh architecture map
- major refactors changed assumptions

---

## 5. Em+ phase strategy

For the current release, GSD phases should follow this order:

1. mobile onboarding
2. mobile pairing
3. mobile reminders
4. mobile timeline list
5. auth polish
6. backend support and smoke verification
7. landing page alignment

This order is intentional.

It reflects the current release thesis:

> get solo value working first, then make pairing and marketing reinforce it

---

## 6. Phase rules for Em+

Whenever a GSD phase is created for this repo, it should obey these rules:

- every phase must strengthen first-session value
- every phase must preserve solo usability before pairing
- every mobile screen must have one dominant next action
- web messaging must match actual app behavior
- pairing is never allowed to become the gate for first value

If a phase conflicts with any of these, the phase should be rewritten before execution.

---

## 7. Recommended GSD usage examples

### Example A: onboarding refactor

Use:

- `/gsd:discuss-phase`
  Focus on solo-first onboarding, 3 screens max, pairing later.
- `/gsd:plan-phase`
  Lock mobile-only execution details and acceptance criteria.
- `/gsd:execute-phase`
  Implement, verify, and summarize.

### Example B: reminder backend stabilization

Use:

- `/gsd:quick --full`

Because this is likely a narrow API and verification task, not a large product phase.

### Example C: release readiness pass

Use:

- `/gsd:review`

The review prompt should explicitly reference:

- [`13_release_checklist_v1.md`](./13_release_checklist_v1.md)

So the review is done against release gates, not generic code quality only.

---

## 8. What not to do

Do not use GSD to:

- reopen already-cut V1 scope casually
- add budget or broad social features back into release
- generate phase plans without reading the release scope first
- let design planning drift back to glass-heavy, feature-heavy presentation

---

## 9. Practical next step

For Em+ right now, the best first real GSD phase is:

- mobile onboarding and unpaired home alignment

That is the highest-leverage phase because it affects:

- activation
- first-session value
- the truthfulness of the landing page promise
