# Em+ — Manual Release QA V1

Use this document when running the release-candidate pass on real devices and the production-like web build.

Status values:

- `PASS`
- `FAIL`
- `BLOCKED`
- `NOT RUN`

---

## 1. Test Setup

### Devices
- Device A: primary test account
- Device B: secondary account for pairing test

### Builds / Environments
- mobile app points to the release-candidate backend
- web landing is the current release-candidate build
- notifications are enabled for at least Device A

### Test Accounts
- Account A: unpaired at start
- Account B: unpaired at start

---

## 2. Mobile QA Matrix

## 2.1 Auth + First Value

### Case M1 — Register and enter the app solo-first
- Status: `NOT RUN`
- Prerequisite: fresh Account A, no existing session
- Steps:
  1. Open the app
  2. Register a new account
  3. Complete OTP verification
  4. Observe the first screen after auth
- Expected:
  - user lands inside the app, not on a forced pairing gate
  - first screen makes solo usage understandable
  - no crash or infinite redirect

### Case M2 — Login and return to useful state
- Status: `NOT RUN`
- Prerequisite: Account A already exists
- Steps:
  1. Log out if needed
  2. Log back in with Account A
  3. Confirm navigation result
- Expected:
  - login succeeds
  - app returns to the usable solo path
  - home does not force pairing

### Case M3 — Add the first important date
- Status: `NOT RUN`
- Prerequisite: Account A is logged in and still unpaired
- Steps:
  1. Tap the primary CTA on unpaired home
  2. Add one important date
  3. Return to home
- Expected:
  - save flow completes without error
  - home shows the date back with countdown context
  - next action remains obvious

## 2.2 Notifications + Reminder Visibility

### Case M4 — Notification permission and settings handoff
- Status: `NOT RUN`
- Prerequisite: Account A is logged in, first important date already exists
- Steps:
  1. Open notifications tab
  2. Follow the reminder setup CTA
  3. Respond to the OS permission prompt
- Expected:
  - the app explains the next step clearly
  - permission prompt appears or settings handoff is clear
  - the app does not dead-end after the prompt

### Case M5 — Reminder appears after backend dispatch
- Status: `NOT RUN`
- Prerequisite: Account A has a qualifying reminder/milestone and backend dispatch has been run
- Steps:
  1. Trigger or wait for reminder dispatch in the target environment
  2. Open notifications tab
- Expected:
  - at least one reminder is visible in-app
  - copy is understandable
  - opening notifications does not require pairing

## 2.3 Pairing Later — Two Devices

### Case M6 — Pairing happy path on two devices
- Status: `NOT RUN`
- Prerequisite: Device A with Account A, Device B with Account B
- Steps:
  1. On Device A, generate an invite code
  2. On Device B, join using the code
  3. Return to pairing / home on both devices
- Expected:
  - code generation succeeds
  - join succeeds
  - status becomes paired
  - pairing is acknowledged briefly and clearly

### Case M7 — Pairing failure state with bad or expired code
- Status: `NOT RUN`
- Prerequisite: Device B available
- Steps:
  1. Attempt join with an invalid or old code
- Expected:
  - request fails cleanly
  - error state is understandable
  - app remains usable after the error

---

## 3. Web QA Matrix

### Case W1 — Landing readability on mobile viewport
- Status: `BLOCKED`
- Prerequisite: release-candidate landing page URL
- Steps:
  1. Open the landing page on a narrow mobile viewport
  2. Read hero, feature section, trust section, and CTA
- Expected:
  - message is readable without awkward overflow
  - hero clearly says the app is useful before pairing
  - pairing is described as an upgrade later
- Notes:
  - attempted automated viewport verification via Playwright MCP
  - blocked by local environment issue: Playwright MCP could not initialize because it tried to create `/.playwright-mcp` on a read-only root path
  - still needs real browser verification on a phone or a working local browser automation environment

### Case W2 — Scope discipline on landing
- Status: `PASS`
- Prerequisite: release-candidate landing page URL
- Steps:
  1. Read the page from top to bottom once
- Expected:
  - budget is not a headline story
  - realtime sync is not a headline story
  - emotional engine complexity is not a headline story
  - page feels calm and credible
- Notes:
  - verified by source/build audit after removing the leftover dark-mode toggle and dark boot script from the shared web layout
  - checked release-candidate build output for `solo-first` and `pair later` messaging plus absence of non-core headline stories

---

## 4. Sign-Off Notes

Use this section during execution:

- blockers found:
  - automated mobile viewport verification for web is blocked by the current Playwright MCP environment (`/.playwright-mcp` cannot be created from this session)
- routes or screens that need follow-up:
  - mobile cases `M1` through `M7` still require real-device execution
  - web case `W1` still needs manual browser verification on a narrow viewport
- screenshots / recordings collected:
  - none in this pass
- release recommendation:
  - web message discipline is aligned and the leftover dark-mode toggle has been removed
  - do not treat manual release QA as complete until mobile cases and web narrow-viewport verification are run on real devices
