# Em+ PWA MVP Architecture

Status: locked for MVP planning  
Last updated: 2026-05-09

This document locks the technology stack, architecture, scope boundaries, and implementation phases for the Em+ PWA MVP. It is the source of truth for future implementation work on the new `app` workspace.

## 1. Product MVP Scope

The PWA MVP is a focused partner experience for couples. It must ship the smallest coherent product surface that supports a shared relationship timeline, lightweight interaction, and milestone-driven moments.

In scope:

- Love counter based on the couple `loveStartDate`.
- Automatic relationship milestones generated dynamically from `loveStartDate`.
- Custom user-created milestones stored per couple.
- Timeline memories for relationship events and media-backed memories.
- Poke/Nudge feature between partners.
- Static gift suggestions near relevant milestones using configured TikTok/Shopee-style external product links.
- PWA install support through a web app manifest and service worker.
- Web push notification architecture prepared for phase 2.

Primary MVP user flows:

- A signed-in user views the couple home screen and sees the current love counter.
- A signed-in user sees upcoming auto milestones derived from the couple start date.
- A signed-in user creates, edits, and deletes custom milestones.
- A signed-in user creates timeline memories and views them in chronological order.
- A signed-in user sends a nudge to their partner.
- A signed-in user sees milestone-related static gift suggestions.
- A user installs the PWA from a supported browser.

## 2. Explicit Non-Goals

The following are not part of the PWA MVP and must not be introduced unless the scope is explicitly changed:

- No budget feature in the new PWA MVP.
- No daily care feature in the new PWA MVP.
- No complex admin panel.
- No native mobile work in this phase.
- No changes to the existing `mobile` Expo app except future integration work explicitly approved later.
- No changes to `design-builder`.
- No scraping TikTok, Shopee, or other commerce platforms.
- No real-time WebSocket layer unless a later feature proves polling or push is insufficient.
- No over-engineered infrastructure such as microservices, event buses, Kubernetes-first deployment, CQRS, or background workflow engines.
- No auth migration to HttpOnly cookies in the MVP.
- No database persistence for auto-generated milestones.
- No database persistence for gift suggestions in the MVP.

## 3. Final Tech Stack

### Frontend PWA

- Workspace: `app`.
- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: TailwindCSS.
- UI approach: custom lightweight components first.
- Heavy UI kit: not allowed for MVP unless a specific component gap is approved.
- Client state: Zustand.
- Server state: TanStack Query.
- Forms: React Hook Form.
- Schema validation: Zod.
- Icons: `lucide-react`.
- Dates: `date-fns`.
- PWA: web app manifest plus service worker.
- Web push: phase 2.

### Backend

- Workspace: `api`.
- Runtime: Bun.
- Framework: Hono.
- Validation: Zod.
- Database: PostgreSQL.
- Redis: keep for sessions, rate limit, and existing use cases.
- Media: keep MinIO/S3-compatible object storage approach.
- API docs: keep existing OpenAPI/Swagger setup.
- Auth: keep the current token/session flow for MVP.

### Existing Workspaces

- `api`: backend source of truth.
- `app`: new PWA user application.
- `web`: existing Astro marketing site, kept for landing/marketing.
- `mobile`: existing Expo app, frozen for this phase.
- `design-builder`: untouched.

The root Bun monorepo should add `app` as a workspace when implementation begins. This architecture step does not make that code change.

## 4. Repo Architecture

Target monorepo shape:

```text
emplus/
  api/              # Bun + Hono backend
  app/              # Next.js App Router PWA, new workspace
  web/              # Astro marketing site
  mobile/           # Expo app, frozen for this phase
  design-builder/   # Existing design builder, untouched
  docs/             # Product and architecture documentation
```

Ownership rules:

- `api` owns business data, persistence, auth, validation, OpenAPI, notifications, and media access.
- `app` owns PWA UX, routing, local UI state, install support, and browser capability integration.
- `web` owns public marketing pages only.
- `mobile` remains frozen and must not receive PWA MVP changes.
- `design-builder` must not be modified for this MVP.

## 5. Frontend Architecture

The `app` workspace is the main user-facing PWA.

Recommended structure:

```text
app/
  src/
    app/                    # Next.js App Router routes and layouts
    features/
      auth/
      couple-home/
      milestones/
      timeline/
      nudges/
      gift-suggestions/
      notifications/
      pwa/
    components/
      ui/                   # Lightweight shared UI primitives
      layout/
    lib/
      api/
      query/
      auth/
      dates/
      validation/
    stores/                 # Zustand stores for local client state
    styles/
  public/
    manifest.webmanifest
    icons/
```

Frontend rules:

- Use server components for static shell and route composition where practical.
- Use client components for interactive product surfaces, forms, install prompts, local state, and browser APIs.
- Use TanStack Query for API-backed reads and mutations.
- Use Zustand only for local UI state, ephemeral session UI state, and PWA/browser state that does not belong in the backend.
- Use React Hook Form plus Zod for all user input forms.
- Keep UI primitives simple and local before adopting a component kit.
- Use generated or typed API clients only after the backend OpenAPI contract is stable enough to support them.
- Keep all MVP product routes in `app`; do not add user-product routes to `web`.

Initial route map:

```text
/login
/signup
/home
/milestones
/timeline
/nudges
/gifts
/settings
```

Route intent:

- `/home`: love counter, upcoming milestones, recent memories, latest nudge state.
- `/milestones`: automatic milestones and custom milestone management.
- `/timeline`: memory list, creation, detail, and media attachment flows.
- `/nudges`: nudge history and send nudge actions.
- `/gifts`: milestone-adjacent static gift suggestions.
- `/settings`: couple profile, install state, notification preferences, account basics.

## 6. Backend Architecture

The existing `api` workspace remains the backend. The PWA should consume the same API instead of adding a separate backend layer.

Backend modules to keep as MVP platform modules:

- `auth`
- `users`
- `couples`
- `timeline`
- `media`
- `notifications`
- `system`

Backend modules to add for PWA MVP:

- `milestones`
- `nudges`
- `gift-suggestions`

Backend module to add later:

- `push-subscriptions`

Existing backend modules that are not part of the PWA MVP, such as budget, care, admin, debug, demo, live, or partner-note functionality, should not be expanded for this phase. They may remain in the repository, but the new PWA must not depend on them for MVP flows.

Backend module boundaries:

- `couples`: couple relationship profile, partner linkage, and `loveStartDate`.
- `milestones`: auto milestone generation, custom milestone persistence, and milestone queries.
- `timeline`: relationship memories and timeline ordering.
- `nudges`: nudge creation, partner delivery state, and nudge history.
- `gift-suggestions`: static backend-owned gift config and milestone matching.
- `notifications`: phase 1 in-app notification records and phase 2 notification orchestration.
- `push-subscriptions`: phase 2 browser push subscription storage and lifecycle.
- `media`: upload, object storage, signed URLs, and media metadata.
- `system`: health checks, version, diagnostics safe for clients.

## 7. API Endpoint Map

The endpoint map below is the target contract for the PWA MVP. Exact request and response schemas should be defined in the API implementation with Zod and exported through OpenAPI.

### Auth

```text
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
GET    /auth/me
POST   /auth/refresh
```

Purpose:

- Keep current token/session flow.
- Do not refactor to HttpOnly cookie auth during MVP.

### Users

```text
GET    /users/me
PATCH  /users/me
```

Purpose:

- Current user profile reads and updates.

### Couples

```text
GET    /couples/me
PATCH  /couples/me
POST   /couples/invite
POST   /couples/join
```

Purpose:

- Couple profile and `loveStartDate`.
- Partner invitation or linking flow if not already available.

### Milestones

```text
GET    /milestones
GET    /milestones/auto
GET    /milestones/custom
POST   /milestones/custom
PATCH  /milestones/custom/:id
DELETE /milestones/custom/:id
```

Purpose:

- `/milestones` returns a combined timeline of auto and custom milestones.
- `/milestones/auto` computes generated milestones dynamically from `loveStartDate`.
- `/milestones/custom` manages persisted custom milestones.

### Timeline

```text
GET    /timeline/memories
POST   /timeline/memories
GET    /timeline/memories/:id
PATCH  /timeline/memories/:id
DELETE /timeline/memories/:id
```

Purpose:

- Timeline memories with chronological ordering.
- Media references should be handled through the media module.

### Media

```text
POST   /media/uploads
GET    /media/:id
DELETE /media/:id
```

Purpose:

- Upload initiation and metadata.
- Object access through MinIO/S3-compatible storage.

### Nudges

```text
GET    /nudges
POST   /nudges
PATCH  /nudges/:id/read
```

Purpose:

- Store nudges in PostgreSQL.
- Enable partner-to-partner lightweight interaction.
- Use polling or normal refetch in phase 1; do not add WebSockets by default.

### Gift Suggestions

```text
GET    /gift-suggestions
GET    /gift-suggestions/for-milestone/:milestoneKey
```

Purpose:

- Return static backend-configured product suggestions.
- Filter by milestone key, relationship duration, category, and optional tags.

### Notifications

```text
GET    /notifications
PATCH  /notifications/:id/read
PATCH  /notifications/read-all
```

Purpose:

- Phase 1 in-app notification center.
- Store application notifications where needed.

### Push Subscriptions, Phase 2

```text
POST   /push-subscriptions
GET    /push-subscriptions/me
DELETE /push-subscriptions/:id
```

Purpose:

- Store browser push subscriptions in PostgreSQL.
- Support opt-in, revocation, and device/browser-level subscription management.

### System

```text
GET    /system/health
GET    /system/version
```

Purpose:

- Health and version checks for deployment and client diagnostics.

## 8. Data Model Decisions

### Stored In PostgreSQL

- Users.
- Couples.
- Couple `loveStartDate`.
- Custom milestones.
- Timeline memories.
- Media metadata.
- Nudges.
- In-app notification records where needed.
- Push subscriptions in phase 2.

### Not Stored In PostgreSQL For MVP

- Auto-generated milestones.
- Static gift suggestion catalog.
- Scraped commerce data.
- Derived love counter values.
- Derived upcoming milestone lists.

### Dynamic Computation

Auto milestones are generated dynamically from `loveStartDate`. The backend should compute them deterministically so every client sees the same milestone dates and labels.

Recommended auto milestone inputs:

- Couple `loveStartDate`.
- Current date.
- Static milestone definitions such as day counts, month counts, year counts, and named anniversary rules.

Recommended auto milestone output fields:

```text
key
type
title
description
date
daysFromStart
status
giftSuggestionTags
```

### Custom Milestones

Custom milestones are persisted in PostgreSQL.

Recommended fields:

```text
id
coupleId
title
description
date
createdByUserId
createdAt
updatedAt
```

### Timeline Memories

Timeline memories are persisted in PostgreSQL.

Recommended fields:

```text
id
coupleId
authorUserId
title
body
memoryDate
mediaIds
createdAt
updatedAt
```

### Nudges

Nudges are persisted in PostgreSQL.

Recommended fields:

```text
id
coupleId
fromUserId
toUserId
kind
message
status
readAt
createdAt
```

### Gift Suggestions

Gift suggestions are static backend config for MVP.

Recommended fields:

```text
id
title
description
provider
url
imageUrl
priceLabel
tags
milestoneKeys
active
```

`provider` may be values such as `tiktok`, `shopee`, or `external`. The API must treat links as static external URLs and must not scrape or enrich data from the commerce platforms.

## 9. Notification Strategy

### Phase 1: In-App Notifications

Phase 1 should avoid browser push complexity.

Use normal API-backed notification records and TanStack Query refetching for:

- New nudge indicators.
- Upcoming milestone reminders shown inside the app.
- Timeline activity shown inside the app.

Delivery rules:

- No WebSocket by default.
- No push subscription storage.
- No service worker push event handling.
- Use query invalidation after local mutations.
- Use periodic refetch only where it improves UX and does not create backend load issues.

### Phase 2: Web Push

Phase 2 adds browser push support after the PWA core is usable.

Required additions:

- Browser notification permission UI.
- Service worker push event handling.
- VAPID configuration.
- `push-subscriptions` backend module.
- PostgreSQL storage for push subscriptions.
- Subscription revoke and cleanup flow.
- Notification send path for nudges and milestone reminders.

Phase 2 must still avoid WebSockets unless a separate real-time requirement is approved.

## 10. Gift Suggestion Strategy

Gift suggestions are a lightweight MVP feature, not a marketplace system.

Rules:

- Store gift suggestions as static backend config.
- Return gift suggestions through the API so the PWA does not hardcode commerce content.
- Link out to TikTok/Shopee-style URLs as external links.
- Do not scrape TikTok, Shopee, or any commerce website.
- Do not store product inventory, prices, commissions, affiliate state, or click analytics in MVP.
- Match suggestions to milestones by static tags and milestone keys.

Recommended config location:

```text
api/src/modules/gift-suggestions/
  gift-suggestions.config.ts
  gift-suggestions.routes.ts
  gift-suggestions.schemas.ts
```

The implementation can adapt file names to existing API conventions, but the module boundary should stay clear.

## 11. Deployment Recommendation

Keep deployment simple for MVP.

Recommended deployment shape:

- `app`: deploy as a Next.js web app on a platform that supports Next.js and service workers.
- `web`: keep Astro marketing deployment separately or as the existing marketing target.
- `api`: deploy Bun/Hono API as a single backend service.
- PostgreSQL: managed PostgreSQL or existing provisioned PostgreSQL.
- Redis: managed Redis or existing provisioned Redis.
- Media: MinIO for self-hosted environments or S3-compatible managed object storage.

Recommended production routing:

```text
em-plus domain:
  /              -> web marketing site
  app.emplus...  -> app PWA
  api.emplus...  -> api backend
```

Acceptable MVP alternatives:

- Use a subdomain for the PWA to keep marketing and app deployments independent.
- Use environment variables for API base URL, object storage config, Redis, PostgreSQL, and push keys.

Avoid for MVP:

- Kubernetes-first deployment.
- Multi-region architecture.
- Event streaming infrastructure.
- Separate backend-for-frontend service.
- Serverless fragmentation across many functions.

## 12. Implementation Phases

### Phase 0: Architecture Lock

- Create this document.
- Do not implement application code.
- Do not modify `api`, `mobile`, `web`, or `design-builder`.

### Phase 1: PWA Foundation

- Add `app` workspace to the Bun monorepo.
- Scaffold Next.js App Router with TypeScript and TailwindCSS.
- Add manifest and service worker basics.
- Add custom lightweight UI primitives.
- Add auth shell and API client foundation.
- Add TanStack Query and Zustand wiring.

### Phase 2: Couple Home And Love Counter

- Connect current auth/session flow.
- Fetch current couple.
- Show love counter from `loveStartDate`.
- Show upcoming generated milestones.
- Add basic settings for couple profile and start date if needed.

### Phase 3: Milestones

- Add backend `milestones` module.
- Generate auto milestones dynamically.
- Store custom milestones in PostgreSQL.
- Build milestone list, create, edit, and delete screens.
- Add milestone detail state where useful.

### Phase 4: Timeline Memories

- Use existing or refined `timeline` backend module.
- Build timeline memory list.
- Build memory create/edit/delete.
- Connect media upload flow if needed for MVP.

### Phase 5: Nudges And In-App Notifications

- Add backend `nudges` module.
- Store nudges in PostgreSQL.
- Build send nudge and nudge history UX.
- Surface unread nudge state through in-app notifications or query-backed indicators.

### Phase 6: Gift Suggestions

- Add backend `gift-suggestions` static config.
- Add milestone-based suggestion endpoints.
- Build PWA gift suggestions surface.
- Link out to static external product URLs.

### Phase 7: MVP Hardening

- Validate OpenAPI coverage.
- Add focused backend tests for milestones, nudges, and gift suggestions.
- Add frontend smoke coverage for core PWA routes.
- Verify PWA install behavior.
- Verify deployment environment variables.
- Confirm mobile, web, and design-builder remain unaffected.

### Phase 8: Web Push, Later

- Add push subscription persistence.
- Add service worker push event handling.
- Add browser permission UI.
- Add notification send path for nudges and milestone reminders.
- Add cleanup for expired or revoked subscriptions.

## 13. Rules For Future Agents To Avoid Scope Creep

Future agents must follow these rules when implementing the PWA MVP:

- Do not implement application code while updating this architecture document unless explicitly requested.
- Do not modify `mobile` during the PWA MVP.
- Do not modify `design-builder`.
- Do not move marketing app responsibilities from `web` into `app`.
- Do not add budget, daily care, complex admin, commerce scraping, marketplace, or affiliate features.
- Do not introduce WebSockets unless explicitly approved.
- Do not introduce a heavy UI kit by default.
- Do not refactor auth into HttpOnly cookies during MVP.
- Do not store auto-generated milestones.
- Do not store gift suggestions in PostgreSQL for MVP.
- Do not hardcode gift suggestion content in the PWA; keep it backend-owned static config.
- Do not create a separate backend-for-frontend.
- Do not turn notification phase 1 into web push implementation.
- Do not touch `api`, `mobile`, `web`, or `design-builder` when the task is documentation-only.
- Before implementation, check this document against the requested task and reject work that expands beyond the locked MVP scope.

## Final Architecture Decision

The Em+ PWA MVP will be implemented as a new `app` workspace using Next.js App Router, TypeScript, TailwindCSS, custom lightweight UI components, Zustand, TanStack Query, React Hook Form, Zod, `lucide-react`, and `date-fns`.

The existing Bun + Hono `api` remains the backend and owns persistence, validation, OpenAPI, auth, media, notifications, milestones, nudges, and gift suggestions. PostgreSQL remains the source of persisted product data, Redis remains for existing session/rate-limit use cases, and MinIO/S3-compatible storage remains the media strategy.

The MVP deliberately excludes native mobile work, budget, daily care, commerce scraping, WebSockets, auth refactors, and over-engineered infrastructure.
