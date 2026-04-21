# Em+ — Mobile Calm Care Refactor

This document turns the Calm Care direction into a mobile-first execution checklist for React Native / Expo.

Use it together with:

- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`05_ui_ux_guidelines.md`](./05_ui_ux_guidelines.md)

## 1. Mobile Design Goal

Mobile should feel like:

- private
- touch-friendly
- low-pressure
- useful within seconds

It should **not** feel like:

- a glossy dashboard
- a romance-themed concept app
- a feature browser
- a screen full of equally loud cards

## 2. Mobile Product Hierarchy

Every primary mobile surface should answer, in this order:

1. what matters now?
2. what should I do next?
3. what should I not forget?

If a screen cannot answer those quickly, it is still too decorative or too broad.

## 3. Core Mobile Rules

### 3.1 One dominant action

- each screen gets one primary CTA
- avoid two equal-weight buttons in the same decision moment
- secondary actions should be calmer in both tone and contrast

### 3.2 Thumb-first layout

- primary actions should sit in easy reach
- repeated taps should not depend on top-right-only affordances
- dense horizontal carousels should not be the default pattern

### 3.3 Cards must earn their space

A card may exist only if it improves one of:

- recall
- action
- reassurance

If it is mostly decoration, remove or flatten it.

### 3.4 Copy should sound human, not theatrical

Prefer:

- "Chưa có ngày nào gần kề"
- "Thêm điều quan trọng để Em+ nhắc đúng lúc"
- "Một việc nhỏ cho hôm nay"

Avoid:

- poetic but vague emotional copy
- exaggerated romance language
- labels that sound like a concept deck instead of a product

### 3.5 Motion should support touch, not compete with reading

Keep:

- press feedback
- subtle number transitions
- gentle reveals

Reduce:

- floating ornaments
- looping decorative animation
- hero motion that distracts from the next action

## 4. Screen Priorities

## 4.1 Onboarding

Goal:

- explain the first wedge, not the full platform

Must communicate:

- Em+ helps you remember what matters
- Em+ helps you act at the right moment
- Em+ works best when both people are connected

Rules:

- 3 screens max before action
- each screen carries one idea only
- final screen should lead directly into pairing or account completion

## 4.2 Pairing

Goal:

- make the first useful milestone feel immediate

Primary user question:

- "How do we connect quickly without confusion?"

Rules:

- one clear next step on screen
- reduce ornamental split layouts
- code entry and sharing should be obvious in under 3 seconds
- success state should feel warm, but still restrained

## 4.3 Reminders

Goal:

- show upcoming importance, not calendar complexity

Rules:

- default view should emphasize next relevant reminder
- timing, status, and action should be scannable
- avoid turning reminders into a dense productivity list

## 4.4 Timeline list

Goal:

- make memories and upcoming dates feel easy to revisit

Rules:

- one list can contain both past memories and future important dates, but grouping must be obvious
- cards should prioritize title, date, and context
- image treatment should support memory, not overpower content

## 4.5 Login / Register

Goal:

- reduce emotional flourish and increase trust

Rules:

- simple headline
- short reassurance
- calm authentication shell
- privacy and trust cues visible without overexplaining

## 5. Mobile UI Audit Checklist

Use this before shipping any new mobile screen.

- Is the primary action obvious in under 3 seconds?
- Is the first visible card actionable or informative?
- Does the screen feel useful in light mode without relying on glow?
- Are there any decorative surfaces that could be flattened?
- Does the copy describe a real user moment instead of a broad feature?
- Can the user operate the main path one-handed?
- Is the empty state helpful, specific, and calm?

## 6. Implementation Order

Recommended order for the next refactor slice:

1. onboarding
2. pairing
3. reminders
4. timeline list
5. auth polish

## 7. Definition of Done

A mobile refactor slice is done when:

- the screen has one dominant next action
- the first viewport explains itself without narration
- decorative chrome has been reduced to the minimum needed for warmth
- empty, loading, and error states match the same calm-care tone
- the screen feels native to daily use, not like a landing page inside the app

## 8. Phase 1 Status

Phase 1 focused on **mobile activation** and is now in a good review state.

Completed in this phase:

- post-auth routing no longer forces unpaired users into pairing first
- unpaired home now explains solo value and gives one dominant next action
- solo users can save a first important date locally from the existing add-memory screen
- home now shows a countdown / reminder hint from that first date
- notifications now gives solo users a concrete reminder-setup next step
- timeline no longer hard-blocks all unpaired users and instead shows a solo preview state

Still deferred after Phase 1:

- full backend-supported solo reminders and solo timeline model
- pairing screen copy and hierarchy polish
- auth shell / onboarding copy tightening
- care screen behavior for solo users
- web landing sync pass against the final mobile promise

## 9. Phase 2 Status

Phase 2 is currently focused on **pairing as upgrade**, not pairing as gate.

Completed so far in this phase:

- pairing copy now acknowledges that the user already started correctly
- pairing explains practical upgrade value before showing mechanics
- QR / invite flow now has a clearer informational lead-in
- action hierarchy is clearer: sharing a code is primary, joining with a code is secondary
- the screen is warmer and calmer, with less concept-app energy than before

Still deferred in Phase 2:

- manual QA for pairing success and failure states (tracked in `docs/15_manual_release_qa_v1.md`)
- final decision on whether invite or join should be the dominant path based on real user behavior
- any backend or protocol changes to pairing itself

Phase 2 note:

- pairing implementation is far enough to continue product work
- function QA for pairing will be deferred and tested later on two physical devices

## 10. Phase 3 Start

Phase 3 should now focus on **auth and onboarding polish**.

Priority order:

1. login / register copy and hierarchy
2. verify-otp compactness and clarity
3. onboarding entry wording and sequence

Goal:

- auth should feel calm and trustworthy
- onboarding should explain solo-first value before pairing
- the user should move from account creation into first value with minimal narrative friction

Current V1 interpretation:

- there is no separate onboarding route yet
- for release purposes, the auth entry path itself acts as onboarding:
  - register
  - verify-otp
  - home
- any future dedicated onboarding should be optional unless it clearly improves activation

## 11. Phase 3 Status

Phase 3 focused on **auth and onboarding polish**.

Completed in this phase:

- `login` now carries a clearer practical message instead of relying mostly on decorative hero treatment
- `register` now explains the first believable solo-first value more directly
- both auth forms now include short reassurance that pairing comes later
- `verify-otp` has been tightened into a more compact “last step before value” screen
- V1 now explicitly treats `register -> verify-otp -> home` as the effective onboarding entry path

Still deferred after Phase 3:

- manual auth QA inside the broader release candidate pass (tracked in `docs/15_manual_release_qa_v1.md`)
- any dedicated onboarding route or onboarding experiment
- web landing sync against the updated auth/onboarding promise
