# Phase: V1 LookAway Theme Migration — Context

**Gathered:** 2026-04-20
**Status:** Started
**Source:** user-provided LookAway analysis, existing style audit, current theme implementation

<domain>
## Phase Boundary

This phase migrates the **design system foundation**:

- palette
- semantic theme roles
- surface rules
- web global variables

It does **not** try to finish every screen visually in one pass.
</domain>

<key_point>
## Why This Phase Exists

Phase 4 proved that screen-level polish helps, but the older aura palette is still underneath the app.

That creates a mismatch:

- the flow is calm
- some screens are calmer
- but the base theme still leans toward romantic multi-accent energy

This phase fixes the foundation.
</key_point>

<migration_direction>
## New Direction

The user has now clarified the desired Em+ adaptation of LookAway:

- base: off-white cream `#FDF8F5`
- accent: terracotta / burnt sienna, not valentine red
- typography: lighter visual weight, fewer loud headings
- voice: quiet and non-urgent
- surface treatment: matte, thin border, low-noise

This is not brand imitation.

It is:

- LookAway discipline
- reinterpreted for a relationship / memory product
</migration_direction>

<risk>
## Risk Level

Manual blast-radius review indicates **HIGH** scope:

- `auraPalette` feeds `auraTheme`
- `auraTheme` feeds the active theme registry
- `useTheme()` / `useThemeColors()` are used across many mobile surfaces
- `web/src/styles/global.css` affects all web sections

Therefore migration will proceed in this order:

1. document the new theme
2. migrate base tokens only
3. verify build/typecheck
4. do screen cleanup separately if needed
</risk>

<progress>
## Current Progress

Base migration is complete for:

- mobile palette
- mobile semantic theme roles
- mobile product token helpers
- web root variables

First screen migration pass has started with:

- `login`
- `register`

That pass intentionally changed presentation only:

- quieter hero
- matte auth card
- solid terracotta CTA
- calmer brand wordmark
- lighter register hero and calmer selection chips
</progress>
