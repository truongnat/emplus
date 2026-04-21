# Em+ — Release Checklist V1

This checklist turns the V1 release scope into execution gates for:

- mobile
- backend
- web landing

It exists to prevent scope drift.

Use it with:

- [`12_release_scope_v1.md`](./12_release_scope_v1.md)
- [`10_calm_care_ui_direction.md`](./10_calm_care_ui_direction.md)
- [`11_mobile_calm_care_refactor.md`](./11_mobile_calm_care_refactor.md)

---

## 1. Release Rule

V1 is ready only if the product proves this sequence:

1. a user can start alone
2. a user can get value in session one
3. a user has a reason to return
4. pairing improves the experience but does not unlock basic usefulness

If any major task does not strengthen that sequence, it should not delay release.

---

## 2. Mobile Checklist

Mobile is the release-critical surface.

## 2.1 Auth

- [x] auth copy does not imply pairing is required
- [x] login / signup shell feels calm, not theatrical
- [x] first action is obvious in under 3 seconds
- [x] trust / privacy reassurance is present but brief

## 2.2 Onboarding

- [x] V1 currently treats `register -> verify-otp -> home` as the effective onboarding entry path
- [x] onboarding is 3 screens or fewer
- [x] solo value is explained before pairing
- [x] pairing is framed as enhancement, not gate
- [x] final onboarding step leads into first value, not a dead-end intro

## 2.3 Home

- [x] unpaired home is fully usable
- [ ] first viewport answers:
  - what matters now
  - what should I do today
  - what should I not forget
- [x] one dominant CTA exists
- [x] cards support recall, action, or reassurance
- [x] decorative chrome has been reduced

## 2.4 Important dates / reminders

- [x] user can create the first important date quickly
- [x] upcoming dates are readable without opening multiple layers
- [ ] edit / delete basics work
- [x] next relevant reminder is easy to identify
- [x] empty state tells the user what to do next

## 2.5 Partner notes / preferences

- [ ] user can save a lightweight note about the other person
- [ ] notes feel easier than storing the same thing in generic notes
- [ ] notes are editable and easy to review

## 2.6 Pairing

- [x] pairing entry point is visible but not dominant before first value
- [x] code generation works
- [x] code entry works
- [x] success state is clear and brief
- [ ] pairing failure states are understandable
- [ ] pairing happy/failure path QA deferred for two-device function test (see `docs/15_manual_release_qa_v1.md`)

## 2.7 Timeline

- [x] timeline is usable even if visually simple
- [x] list items are scannable
- [ ] timeline does not block release if media polish is incomplete

## 2.8 Mobile quality gate

- [x] typecheck passes
- [ ] at least one happy-path manual test for:
  - auth
  - onboarding
  - add first important date
  - view home as unpaired user
  - complete pairing later
  see `docs/15_manual_release_qa_v1.md`
- [x] release candidate feels useful before pairing

---

## 3. Backend Checklist

Backend must support the wedge cleanly, not the full platform story.

## 3.1 Auth

- [ ] register / login stable
- [ ] session validation stable
- [ ] basic user profile retrieval works

## 3.2 Home aggregation

- [x] dashboard/home payload works for unpaired users
- [x] dashboard/home payload works for paired users
- [x] payload contains enough data for greeting, next item, suggestion, and pairing status

## 3.3 Important dates / reminders

- [ ] create works
- [ ] read works
- [ ] update works
- [ ] delete works
- [ ] ordering supports "next relevant" behavior

## 3.4 Partner notes / memory details

- [x] create works
- [x] read works
- [x] update works
- [x] delete works

## 3.5 Pairing

- [ ] generate invite works
- [ ] join with code works
- [ ] pairing status endpoint is reliable
- [ ] solo usage is not broken before pairing

## 3.6 Notifications

- [x] push token registration works
- [x] reminder notification trigger works for core flow
- [x] notification logic does not depend on non-core features

## 3.7 Backend quality gate

- [x] API smoke tests cover auth, pairing status, reminder basics
- [x] no release-critical route depends on unstable realtime behavior
- [x] no release-critical route depends on rich media upload polish

---

## 4. Web Landing Checklist

The landing page should sell the wedge the app can already deliver.

## 4.1 Messaging

- [x] hero is problem-first
- [x] one-line promise is clear
- [x] one primary CTA exists
- [x] landing says the app is useful before pairing
- [x] pairing is positioned as better together, not required to begin

## 4.2 Scope discipline

- [x] landing explains the first believable wedge only
- [x] feature breadth is reduced
- [ ] budget is not a headline story
- [ ] realtime sync is not a headline story
- [ ] emotional engine complexity is not a headline story

## 4.3 Trust

- [x] trust section uses real situations, not fake testimonials
- [ ] privacy cues are visible
- [x] copy sounds calm and credible

## 4.4 Style gate

- [x] page is light-first by default
- [x] sections feel quiet and spacious
- [x] decorative effects do not compete with reading
- [x] hierarchy is clear in the first viewport
- [ ] the page feels inspired by the discipline of LookAway, not visually copied from it

## 4.5 Web quality gate

- [x] web typecheck passes
- [x] web build passes
- [ ] page reads clearly on mobile viewport (see `docs/15_manual_release_qa_v1.md`)

---

## 5. Cross-Team Release Gates

These are the non-negotiables before release.

- [x] solo user can get value without pairing
- [x] onboarding and landing say the same thing
- [x] home matches the promise made on web
- [x] pairing comes after first value, not before
- [ ] reminders create a real reason to return
- [ ] style direction feels calm, readable, and trustworthy

---

## 6. What To Cut First

If the team is overloaded, cut in this order:

1. timeline visual polish
2. non-core motion
3. broad care storytelling
4. secondary landing sections
5. non-essential notification variants

Do not cut:

1. unpaired home value
2. first reminder flow
3. notes/preferences flow
4. optional pairing path
5. landing clarity

---

## 7. Launch Review Questions

Before saying "ready", the team should answer:

- Can a first-time user understand the product in under 10 seconds?
- Can they add one important date in session one?
- Can they store one useful detail about their partner?
- Do they see a reason to come back?
- Does the app still make sense if they never pair on day one?

If the answer to any of these is no, release is not ready.
