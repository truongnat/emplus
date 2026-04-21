# Em+ — Release Scope V1

This document defines the narrowest believable V1 release scope for Em+ across:

- mobile app
- backend API
- web landing page

It is based on two inputs already adopted in the design direction:

- **YC-style startup validation**: focus on a real wedge, real user behavior, and fast time-to-value
- **LookAway-derived style discipline**: calm, clear, light-first, credible, and conversion-focused presentation

Use this with:

- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`11_mobile_calm_care_refactor.md`](./11_mobile_calm_care_refactor.md)
- [`06_ui_ux_screen_flows.md`](./06_ui_ux_screen_flows.md)

---

## 1. Release Thesis

Em+ V1 should **not** launch as a broad "couples super app".

It should launch as:

> a personal relationship assistant that helps you remember important things and act at the right moment

Pairing remains valuable, but it is **not** the prerequisite for first value.

### Product promise

- use alone first
- get value in the first session
- pair later for a better shared experience

### Core release wedge

Em+ replaces a messy mix of:

- calendar reminders
- notes
- pinned chat messages
- memory

with one calmer, more contextual flow:

- remember important dates
- save important details about your partner
- receive a reminder at the right time
- get one lightweight suggestion for today

---

## 2. Release Goals

V1 is successful if a new user can:

1. understand the app in under 10 seconds
2. create first value without pairing
3. see one useful "today" moment
4. come back because something still matters later

### Primary activation path

`install or sign up -> add first important date -> save one partner detail -> see one suggestion -> return`

### Secondary expansion path

`pair account -> sync context -> improve shared experience`

---

## 3. In Scope vs Out of Scope

## 3.1 Must-have for V1

- authentication
- single-player onboarding
- unpaired home experience
- important dates / reminders
- partner notes or preferences
- one lightweight daily suggestion
- optional pairing flow
- calm web landing page aligned with the real wedge

## 3.2 Explicitly out of scope for V1

- budget as a headline feature
- realtime sync as a core marketing message
- broad emotional dashboards
- complex mood engines
- chat / DM
- feature-heavy social surfaces
- "super app" positioning

## 3.3 Allowed but secondary

- pairing completion
- memory / timeline browsing
- push notification polish
- basic trust / privacy pages on web

---

## 4. Mobile App Scope

Mobile is the center of V1.

If mobile does not feel useful before pairing, the release is not ready.

## 4.1 Screens required for release

### A. Auth

Required:

- sign up / log in
- calm shell
- clear value statement
- no implication that pairing is required to begin

Release standard:

- user can enter the app with minimal friction
- copy feels private, clear, and low-pressure

### B. Onboarding

Required:

- maximum 3 steps
- explain solo value first
- explain pairing as enhancement later

Must communicate:

- Em+ helps you remember important things
- Em+ helps you act at the right moment
- you can start alone today

### C. Home

Required:

- strong state for unpaired users
- one primary "today" suggestion
- upcoming important date or relationship reminder
- quick access to notes / reminders / timeline

Home must answer:

- what matters now?
- what should I do today?
- what should I not forget?

### D. Important dates / reminders

Required:

- create first important date
- list upcoming dates
- edit / delete basic reminder items
- see the next relevant item clearly

Release standard:

- upcoming importance is obvious
- creating the first reminder is easy

### E. Partner notes / preferences

Required:

- create lightweight notes about the other person
- examples: favorite things, important preferences, useful small details
- make these notes easy to browse and edit

Release standard:

- this should feel faster and more contextual than storing the same info in generic notes

### F. Pairing

Required:

- optional pairing entry point
- generate code / enter code
- success state

Not required:

- pairing as first-run gate

Release standard:

- pairing should be easy when wanted
- pairing should never block first value

### G. Timeline

Required:

- basic timeline list is acceptable if it supports reminders / memory context

Not required:

- rich media-heavy storytelling experience for launch

Release standard:

- usable, not ornamental

## 4.2 Mobile UI rules for release

Based on the Calm Care direction and LookAway-derived discipline:

- one primary CTA per screen
- visible hierarchy in the first viewport
- reduce decorative chrome
- avoid glass-heavy default surfaces
- prefer matte surfaces, clear borders, short shadows
- copy must describe real user moments, not broad abstract features

## 4.3 Mobile features to cut or demote in V1

- budget visible as a primary tab story
- broad emotional analytics
- decorative hero interactions
- dense carousels that do not improve action clarity
- any screen that needs pairing to become understandable

---

## 5. Backend Scope

Backend V1 should support the narrow product wedge cleanly and reliably.

## 5.1 Required API capabilities

### A. Auth

Required:

- register / login
- session validation
- basic user profile retrieval / update

### B. Dashboard / home aggregation

Required:

- return enough data to drive:
  - greeting
  - important upcoming item
  - lightweight suggestion
  - pairing status

Release standard:

- home payload supports both unpaired and paired states

### C. Important dates / reminders

Required:

- create
- read
- update
- delete
- upcoming ordering

Release standard:

- backend can reliably provide the next relevant reminder for home

### D. Partner notes / memory details

Required:

- create
- read
- update
- delete

Release standard:

- notes can be stored and retrieved without needing full rich-media timeline complexity

### E. Pairing

Required:

- generate invite
- join with code
- expose pairing status

Release standard:

- pairing can be completed later without breaking solo usage

### F. Notifications

Required:

- push token registration
- trigger reminder notifications for upcoming dates

Secondary:

- email notifications if already stable

## 5.2 Backend items to defer

- realtime-first flows as a release dependency
- broad notification types not tied to the wedge
- complex media upload as a release blocker
- heavy analytics features that do not improve retention decisions

## 5.3 Backend reliability requirements

Before release:

- auth flows stable
- reminder CRUD stable
- pairing flow stable
- notification delivery for core reminder use case works
- home aggregation works for both paired and unpaired users

---

## 6. Web Landing Page Scope

The landing page exists to convert the right users into first-time app users.

It should not try to explain the entire product map.

## 6.1 Required sections

### A. Hero

Must include:

- problem-first headline
- one-line promise
- one primary CTA
- light reassurance

Example direction:

- remember important things
- care at the right time
- start alone today

### B. Core wedge explanation

Must explain only the first believable wedge:

- important dates
- things to remember about your partner
- lightweight suggestions
- reminder support

### C. Trust / fit section

Must use:

- real situations
- privacy cues
- clarity cues

Must avoid:

- fake-looking testimonials
- feature grids that lead with breadth

### D. CTA repeat

Must reinforce:

- easy start
- private feel
- useful before pairing

## 6.2 Landing page style rules

Derived from the prior LookAway analysis:

- light-first presentation
- strong spacing
- quiet sections
- clear value hierarchy
- limited feature count
- low decorative noise

This does **not** mean copying LookAway visually.

It means adopting the same discipline:

- clarity before spectacle
- believable utility before feature abundance

## 6.3 Web items to avoid in V1

- lead with budget
- lead with realtime sync
- lead with emotional engine complexity
- show all modules equally
- overuse glass / glow / ornamental motion

---

## 7. Release Metrics

V1 should not be judged primarily by installs.

## 7.1 Primary metrics

- signed up users
- users who add first important date
- users who save first partner note
- users who return within 3 days

## 7.2 Secondary metrics

- pairing prompt seen
- pairing completed
- reminder notification opened

## 7.3 Non-goal metrics for V1

- total feature usage breadth
- budget module engagement
- realtime interaction volume

---

## 8. Cut List

If scope pressure appears, cut these first:

1. rich timeline polish
2. broad care presentation
3. advanced email preference complexity
4. non-core realtime touches
5. decorative landing interactions

Do **not** cut:

1. first reminder creation
2. unpaired home value
3. clear onboarding
4. stable pairing as optional expansion
5. landing message clarity

---

## 9. Release Readiness Checklist

Release is ready only if all of these are true:

- new user can start without pairing
- first value appears in session one
- home is understandable in the first viewport
- reminders are stable and useful
- pairing is optional and understandable
- landing page matches actual app value
- visual style feels calm, clear, and trustworthy

---

## 10. Direct Founder Recommendation

If forced to choose, protect this sequence:

1. solo utility
2. reminder retention
3. optional pairing
4. calm landing clarity

Do not release Em+ as:

- a broad relationship operating system
- a mood-heavy experience app
- a two-person-only workflow

Release it as:

> the easiest way to remember important relationship details and act before it's too late
