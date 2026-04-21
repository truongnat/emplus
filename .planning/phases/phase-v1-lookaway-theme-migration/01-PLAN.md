---
phase: v1-lookaway-theme-migration
plan: 01
type: execute
wave: 1
depends_on:
  - phase-v1-lookaway-style-audit
files_modified:
  - docs/17_lookaway_theme_migration_v1.md
  - mobile/src/theme/aura-colors.ts
  - mobile/src/theme/themes.ts
  - mobile/src/theme/emplus-design-tokens.ts
  - web/src/styles/global.css
autonomous: false
requirements: [V1-LOOKAWAY-THEME, V1-LIGHT-ONLY, V1-CALM-CARE]
---

<objective>
Migrate Em+ from the earlier aura-heavy romantic palette into a LookAway-disciplined visual system adapted for Em+:

- warm cream base instead of pure white
- one quiet terracotta accent instead of multiple loud accents
- light typography weight and calmer contrast
- matte surfaces and thin borders instead of glossy/glassy energy

Purpose: turn the style audit into an actual design-system migration, not just polish-by-screen.
Output: a documented theme migration spec plus first implementation pass in mobile theme tokens and web global variables.
</objective>

<execution_context>
Use the installed upstream GSD workflow through repo planning artifacts:

- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
- local path: `~/.claude/get-shit-done`

This repo applies GSD through:

- `.planning/phases/...`
- `docs/14_gsd_workflow_integration.md`
</execution_context>

<skills>
Use these skills for this phase:

- `mobile-design` for mobile token and hierarchy implications
- `frontend-design` for palette, density, and surface migration
- `landing-page-design` for marketing-site variable tuning
</skills>

<context>
@docs/10_calm_care_ui_direction.md
@docs/11_mobile_calm_care_refactor.md
@docs/16_lookaway_style_audit_v1.md
@mobile/src/theme/aura-colors.ts
@mobile/src/theme/themes.ts
@mobile/src/theme/emplus-design-tokens.ts
@web/src/styles/global.css
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Freeze the new visual language in writing</name>
  <action>
Create a migration spec that turns the user's latest LookAway analysis into concrete Em+ rules:

- cream background `#FDF8F5`
- terracotta / burnt sienna as the main accent
- lighter weight typography
- quiet, non-urgent copy posture
- thin borders and matte surfaces

State clearly what should be migrated now versus later screen-level cleanup.
  </action>
  <acceptance_criteria>
- The spec is concrete enough for future screen migration
- The rationale is tied directly to LookAway discipline adapted for Em+
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Migrate base mobile theme tokens</name>
  <action>
Update the main mobile theme palette and semantic colors so the app defaults to:

- warm cream backgrounds
- terracotta primary emphasis
- quieter secondary/accent roles
- softer borders and surface separation
  </action>
  <acceptance_criteria>
- Theme compiles cleanly
- Existing release-critical screens inherit the calmer palette without screen-specific edits
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Migrate web global variables</name>
  <action>
Update the web globals to the same cream / terracotta language and reduce background noise so landing reflects the same theme migration.
  </action>
  <acceptance_criteria>
- Web typecheck/build pass
- Web variables clearly align with the new style spec
  </acceptance_criteria>
</task>

</tasks>
