# Em+ — LookAway Style Audit V1

This document separates:

- **flow correctness shaped by YC-style thinking**
- **visual/style discipline derived from LookAway**

The goal is to avoid calling the UI "done" when only the product hierarchy has been corrected.

---

## 1. What Has Been Refactored Mainly by YC Logic

These changes are primarily about product truth and activation flow:

- solo-first auth and onboarding
- pairing later, not pairing first
- first-session value on home
- reminder/revisit logic becoming clearer
- landing page messaging matching actual app behavior

This work is necessary, but it is not yet the full LookAway-style pass.

---

## 2. What LookAway Means in Em+

For Em+, LookAway should translate into:

- calmer first impression
- lighter, steadier surfaces
- stronger spacing rhythm
- fewer equally loud cards
- short, credible copy
- practical section hierarchy
- less decorative motion
- less concept-app energy

It does **not** mean copying LookAway's exact palette, layout, or brand neutrality.

---

## 3. Audit Summary

## 3.1 Already Aligned

### Mobile flow hierarchy
- auth no longer pushes users straight into pairing
- home prioritizes the next meaningful action more clearly
- pairing is framed more like an upgrade than a prerequisite

### Web messaging discipline
- hero and CTA now reflect the real solo-first promise
- feature breadth has been reduced
- web is already more light-first and calmer than before

## 3.2 Partially Aligned

### Mobile home
- hierarchy is better than before
- still not fully "quiet"
- some cards still compete for attention more than they should

### Pairing
- copy is more practical
- action hierarchy is clearer
- visual density and compactness still need a final polish pass

### Auth screens
- messaging is calmer and more truthful
- visual shell still needs a stronger spacing/weight discipline to fully match the new tone

### Landing page
- messaging is aligned
- visual discipline is improved
- still needs a final pass to feel intentionally "quiet" rather than simply "less noisy"

## 3.3 Still Off-Direction

### Notifications
- functionally clearer than before
- not yet obviously polished as a calm daily-use screen
- still needs a more deliberate visual hierarchy for reminder-first usage

### Some mobile screen density
- several surfaces now work logically but still feel like refactored product screens, not a finished visual system

---

## 4. Priority Order for the Next Style Pass

## 4.1 Mobile Home

Why first:
- it is the highest-frequency screen
- it carries the product promise after auth
- it should feel immediately useful and calm

Needs:
- stronger quiet hierarchy
- fewer competing blocks
- clearer spacing rhythm

Current progress:

- first visual polish pass applied
- header has been flattened and simplified
- hero card has less ornamental energy
- quick-action and upcoming sections now use shorter, quieter headings and denser cards
- further work is still possible, but the screen is closer to `calm daily utility` than before

## 4.2 Pairing

Why second:
- the product story is fixed, but the screen still needs visual restraint
- this is where "upgrade, not gate" must also feel true visually

Needs:
- compact balance on smaller viewports
- calmer fallback treatment for code entry
- less visual stacking

Current progress:

- first visual polish pass applied
- QR path is still primary, but surrounding copy is shorter and quieter
- divider, footnote, CTA labels, and section density are more restrained
- screen is closer to a practical upgrade surface and less like a concept demo

## 4.3 Notifications

Why third:
- reminders are part of the return loop
- current function is present, but visual priority is not yet sharp enough

Needs:
- reminder-first composition
- cleaner empty / setup / feed hierarchy

Current progress:

- first visual polish pass applied
- header is quieter and no longer leans on a branded or ornamental tone
- feed cards use calmer density and softer action treatment
- empty state and solo reminder setup now read more clearly as part of the return loop
- further polishing is still possible, but the screen now feels closer to a daily utility surface

## 4.4 Auth Shell

Why fourth:
- copy is already closer to target
- remaining gap is mostly visual and spacing discipline

Needs:
- more deliberate top-to-bottom rhythm
- calmer hero-to-form relationship

Current progress:

- first visual polish pass applied
- hero sections are smaller and less ornamental
- auth card rhythm is tighter and feels less like a showcase surface
- supporting trust notes are shorter and less intrusive
- the shell is closer to a calm entry flow, though a final fit-and-finish pass is still possible

## 4.5 Landing Page Final Pass

Why fifth:
- web is already aligned enough for message
- visual pass should come after the higher-frequency mobile screens

Needs:
- final section quieting
- mobile viewport refinement
- stronger "LookAway discipline, not imitation" finish

Current progress:

- first landing visual polish pass applied
- hero preview now feels more like an outcome snapshot than a product demo card
- section spacing and card density are calmer across features, scenarios, and CTA
- the page keeps the same YC thesis while landing closer to a restrained, credible finish
- further mobile viewport review is still worth doing during manual QA

---

## 5. Skills Used for This Phase

Available now and useful:

- `mobile-design`
- `landing-page-design`
- `frontend-design`
- `web-design-guidelines`
- `playwright`
- `screenshot`
- `figma`

Missing in this session:

- no standalone `get-shit-done` skill

So Phase 4 uses the installed upstream GSD workflow through repo planning packets, not through a dedicated skill command.

---

## 6. Theme Decision

- release v1 should use a single light theme only
- do not keep dark/light switching for the release candidate
- keep the visual language closer to `LookAway discipline`: bright, quiet, low-noise, readable, and consistent
- implementation can keep some internal `isDark` branches temporarily, but the theme engine should resolve to light-only until a future cleanup phase

## 7. Next Foundation Phase

The next step after this audit is no longer another screen-by-screen polish pass.

It is a base theme migration:

- cream base instead of pure white
- terracotta / burnt sienna instead of bright romantic coral
- one quiet main accent instead of multi-accent competition
- matte surfaces and thin warm borders

That migration is tracked separately in:

- [`17_lookaway_theme_migration_v1.md`](./17_lookaway_theme_migration_v1.md)

Current cleanup progress:

- theme mode is now locked to light-only
- appearance no longer acts as a light/dark switcher
- release-critical surfaces touched in phase 4 have had their dead dark-mode branches reduced or removed
- a full app-wide purge is still optional later, but no longer needed to support the release candidate
