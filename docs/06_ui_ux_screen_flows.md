# UI/UX Screen Flows & Component Architecture

This document describes the intended screen behavior for Em+ after the shift toward the Calm Care direction.

It is written for:

- product design
- Figma exploration
- mobile implementation in React Native / Expo

Use it with:

- [`05_ui_ux_guidelines.md`](./05_ui_ux_guidelines.md)
- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`11_mobile_calm_care_refactor.md`](./11_mobile_calm_care_refactor.md)

---

## 1. Foundation

Em+ should no longer treat "liquid glass" as the default visual system.

The new baseline is:

- matte surfaces
- readable contrast
- large radii
- soft borders
- restrained warmth

Atomic design is still valid, but the visual direction changes.

### 1.1 Atoms

- `AppText`: semantic typography roles, not decorative headline usage by default
- `AppButton`: one dominant action style, one calmer secondary style
- `IconBadge`: contextual timing / priority marker, not sticker decoration
- `SurfaceCard`: matte card with visible border and short shadow

### 1.2 Molecules

- `ReminderSummaryCard`: next important date + action
- `SuggestionCard`: one lightweight action for today
- `MemoryListItem`: title + date + optional media, optimized for scanning
- `PairingCodePanel`: share / enter code with minimal ambiguity

---

## 2. Screen-by-Screen Flows

## 2.1 Splash & Auth

### Goal

- move the user to the next useful state quickly

### States

- `Initializing`: check session, preload essentials, route onward
- `Unauthenticated`: calm auth shell with one headline, one reassurance, and primary sign-in path

### Rules

- no cinematic background needed by default
- trust matters more than atmosphere
- auth copy should feel private and low-pressure

## 2.2 Onboarding

### Goal

- explain the first believable wedge, then get out of the way

### Recommended sequence

1. Em+ helps you remember important things
2. Em+ helps you act at the right time
3. Em+ works best when both people are connected

### Rules

- maximum 3 steps before action
- each screen should communicate one idea only
- avoid showing the full platform breadth here

## 2.3 Pairing

### Goal

- make account connection feel simple, immediate, and emotionally positive

### Primary questions

- what do I do first?
- where is my code?
- how do I enter the other person's code?

### States

- `WaitingToStart`
- `ShowingMyCode`
- `EnteringPartnerCode`
- `Connecting`
- `Connected`
- `Error`

### Rules

- keep both paths visible, but only one should be dominant at a time
- code entry must be obvious in the first viewport
- success feedback can be warm, but should remain brief and clear

## 2.4 Home

### Goal

- help the user answer three questions immediately

Questions:

- what matters now?
- what should I do today?
- what should I not forget?

### Required order

1. greeting / context
2. relationship status or important upcoming item
3. one suggested action
4. quick path to reminders / memory / timeline
5. upcoming dates

### Rules

- one hero message only
- reduce dashboard feeling
- no ornamental sections between useful sections
- every visible card must support action, recall, or reassurance

## 2.5 Care

### Goal

- turn emotional support into something usable, not theatrical

### Female-facing states

- log a cycle-related state
- decide whether to share a simplified signal
- review lightweight history

### Partner-facing states

- see simplified guidance
- understand what tone or support is useful
- act on one concrete suggestion

### Rules

- never overload the partner view with medical detail
- keep the guidance respectful, specific, and calm
- one recommendation should be easier to act on than ignoring it

## 2.6 Timeline

### Goal

- help users revisit memories and prepare for upcoming dates

### Rules

- list must be scannable before it is emotional
- future important dates should be easy to distinguish from past memories
- cards should prioritize title, date, and context

## 2.7 Reminders

### Goal

- make upcoming importance visible without becoming a complex planner

### Rules

- highlight the next relevant reminder first
- default sort should match urgency, not database order
- empty state should clearly explain how to create the first useful reminder

---

## 3. Error, Empty, and Edge States

Good product tone appears most clearly in edge states.

### 3.1 No internet

Use:

- simple explanation
- calm reassurance
- one recovery action

Avoid:

- overly poetic sadness
- decorative empty illustrations without guidance

### 3.2 Empty home / timeline

Use copy like:

- "Chưa có ngày nào gần kề"
- "Thêm điều quan trọng để Em+ bắt đầu nhắc đúng lúc"

### 3.3 Incomplete pairing

When the user returns mid-flow:

- restore the pairing state directly
- do not force them through unrelated screens

---

## 4. Mobile Component Architecture Notes

When implementing new mobile surfaces:

- prefer composable semantic components over one-off visual wrappers
- avoid introducing glass-heavy container abstractions as the default pattern
- encode hierarchy through spacing, typography, and action contrast first

The design system should make the calm version of the UI easy to build repeatedly.
