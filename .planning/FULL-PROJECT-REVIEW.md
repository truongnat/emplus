# Em+ Full Project Audit Report

**Date:** 2026-04-05
**Scope:** Backend (api/src/) + Mobile App (mobile/src/ + mobile/app/)
**Stack:** Bun + Hono + PostgreSQL + Redis | React Native + Expo Router + TanStack Query + Reanimated

---

## Combined Score: 39/48

| Area | Dimension | Score | Status |
|------|-----------|-------|--------|
| **Backend** | Clean Code | 3/4 | Good |
| **Backend** | Performance | 3/4 | Good |
| **Backend** | Security | 4/4 | Excellent |
| **Backend** | Architecture | 3/4 | Good |
| **Backend** | Testing | 3/4 | Good |
| **Backend** | API Design | 3/4 | Good |
| | | **19/24** | |
| **Mobile** | Clean Code | 3/4 | Good |
| **Mobile** | Performance | 3/4 | Good |
| **Mobile** | UI/UX Design | 4/4 | Excellent |
| **Mobile** | Architecture | 4/4 | Excellent |
| **Mobile** | Theme System | 3/4 | Good |
| **Mobile** | Experience Design | 3/4 | Good |
| | | **20/24** | |

### Scoring Guide
- 4 = Excellent -- production-ready, follows best practices
- 3 = Good -- minor issues, mostly solid
- 2 = Needs Work -- significant gaps to address
- 1 = Critical -- fundamental issues requiring immediate attention

---

# PART 1: BACKEND API AUDIT (19/24)

## 1. Clean Code (3/4)

### What's Done Well
- Consistent Vietnamese naming for all user-facing strings (error messages, OTP emails, API responses)
- Strong type definitions in `types.ts` with proper use of optional fields and union types
- Clean module separation: each domain has route module, service, and DTO
- Utility extraction for common operations (`resolveActiveCoupleIdAsync`, `readJson`, `hashPassword`)
- Constants centralized in `constants/index.ts` with descriptive names

### Issues Found
- **20+ instances of legacy error pattern** (`as Error & { status; code }`) when `AppError` already exists
- **Duplicate token generation** in `shared/token.ts`, `utils/token.ts`, and `store/in-memory-store.ts`
- **`any` type abuse in admin module** -- `(store as any).listAllUsers?.()` instead of type guards
- **Debug module uses `Math.random()`** while rest of codebase uses `crypto.randomUUID()`
- **Mixed import paths** -- some use `../utils/date.ts` (re-export), others use `../shared/date.ts` directly

### Recommendations
- Replace all legacy error patterns with `throw new AppError(...)`
- Consolidate on `shared/token.ts`, remove duplicates
- Use proper optional method access on `DataStore` in admin.ts
- Standardize import paths

---

## 2. Performance (3/4)

### What's Done Well
- Redis caching with graceful fallback (logs once, continues DB-only on Redis failure)
- Read replica support via `readDatabaseUrl` config
- Connection pooling via `postgres` library
- Server-side pagination with `MAX_PAGE_SIZE = 50` cap
- Home dashboard cached for 15 minutes

### Issues Found
- **Budget summary loads ALL items into memory** then aggregates in JS -- should be SQL aggregate
- **Budget pagination is in-memory** -- loads all, slices in JS instead of SQL `OFFSET/LIMIT`
- **Rate limiter is process-local** -- `Map`-based, won't work across instances
- **No session cleanup** -- expired sessions accumulate indefinitely in PostgreSQL
- **Demo data check on every timeline request** when `fakeTimelineMemories` is enabled

### Recommendations
- SQL aggregation for budget: `SELECT SUM(amount) FILTER (WHERE status IN (...))`
- Push budget pagination to SQL with `ORDER BY date DESC OFFSET $1 LIMIT $2`
- Redis-backed rate limiter when available
- Cron job: `DELETE FROM user_sessions WHERE expires_at < NOW()`

---

## 3. Security (4/4)

### What's Done Well
- PBKDF2-SHA256 password hashing (210,000 iterations, random salt, `timingSafeEqual`)
- `crypto.getRandomValues()` for all OTP/invite codes, verified by dedicated test
- 4 distinct rate limit checks on auth flows (login, OTP send, OTP verify, password reset)
- Refresh token rotation with atomic delete (prevents replay)
- Comprehensive security headers (HSTS, X-Frame-Options, CSP, Referrer-Policy)
- XSS sanitization middleware on all JSON request bodies
- Zod validation on every endpoint
- SQL injection prevention via parameterized tagged templates
- File upload MIME type allowlist + 10MB size limit
- `passwordHash` never exposed in API responses
- WebSocket authentication with couple membership verification

### Minor Issues
- OTP in email subject line (visible in previews/notifications)
- OTP logged to console in dev fallback without environment guard
- Debug endpoints lack authentication in non-production

---

## 4. Architecture (3/4)

### What's Done Well
- Clean layered architecture: Routes -> DTOs -> Services -> Store
- Store abstraction with `DataStore` interface (InMemoryStore + PostgresStore)
- Environment-based store selection with safety guard
- Custom migration system with checksum verification
- API versioning under `/v1/`
- Centralized configuration with type-safe env parsing
- Comprehensive dependency health checks

### Issues Found
- **Global singleton store import** -- no DI, hard to test in isolation
- **Services import store directly** -- tight coupling
- **Business logic in route handlers** -- dashboard, timeline creation, care/partner resolution inline in modules
- **No transaction support** -- couple joining does 5 parallel writes without atomicity
- **Demo data generators mixed in module layer** -- should be in fixtures/seeds

### Recommendations
- Pass `store` as parameter to services or use factory pattern
- Extract business logic from route handlers into services
- Add `sql.begin()` transaction wrapper for couple joining
- Move demo generators to `fixtures/` directory

---

## 5. Testing (3/4)

### What's Done Well
- 8 test files covering critical auth, validation, anniversary, security randomness, notifications, system, date calculation
- Integration tests use real app instance via `app.request()`
- Store reset between tests for isolation
- Security-focused test verifying `Math.random` is never called
- Comprehensive auth flow tests (registration -> login -> refresh -> pairing -> mood -> timeline)

### Issues Found
- **No unit tests for services** -- all tests are integration-only
- **No budget tests** -- CRUD operations untested
- **No media upload tests** -- MIME validation, size limits untested
- **No WebSocket tests**
- **No care edge case tests** -- missing authorization failures, boundary values
- **No admin tests**

### Recommendations
- Add unit tests for services with mock stores
- Priority: budget CRUD, media upload, care authorization tests
- Add test coverage reporting

---

## 6. API Design (3/4)

### What's Done Well
- Consistent `{ success, data, meta }` envelope with requestId + timestamp
- Standard pagination format `{ items, pagination: { page, limit, totalItems, totalPages, hasNext } }`
- RESTful resource naming
- Proper HTTP status codes (201, 400, 401, 403, 404, 409, 429)
- OpenAPI 3.0.3 documentation verified by automated tests
- Swagger UI in non-production
- Structured validation errors with per-field details

### Issues Found
- **Admin module bypasses response envelope** -- returns raw `c.json()` without `success()` wrapper
- **Mixed action naming** -- some endpoints use verbs (`/generate-invite`), others are pure resources
- **Budget status filter accepts Vietnamese display strings** -- couples API to display language
- **PUT used for partial updates** -- should be PATCH semantically
- **WebSocket auth via query parameters** -- tokens may be logged by proxies

---

---

# PART 2: MOBILE APP AUDIT (20/24)

## 1. Clean Code (3/4)

### What's Done Well
- Atomic design hierarchy: atoms -> molecules -> organisms properly structured
- Feature-based module organization (auth, home, timeline, budget, care, mood, pairing, live)
- Custom hooks extract single concerns cleanly (`useHomeData`, `useTimelineData`, `useLogin`)
- Centralized Zod form validation in `forms.ts` with Vietnamese messages
- Consistent import organization with `@/src/` alias
- Route files are thin (16-18 lines) delegating to feature components

### Issues Found
- **`src/api.ts` has 37 `any` types** -- bypasses the well-designed typed domain layer; dead `token` parameters
- **Triple negation `!!!`** in `_layout.tsx:332`
- **`care.tsx` (730 lines) and `profile.tsx` (680 lines)** have 280+ line inline `createStyles` functions
- **`CustomTabBar` props typed as `any`** instead of `BottomTabBarProps`
- **Magic numbers for spacing** -- `128`, `100` repeated across screens without constants
- **Dead `Reveal` component** in `ui-kit.tsx` -- renders `<>{children}</>` (no-op)

### Recommendations
- Retire `src/api.ts` -- use `dependencies` directly with proper types
- Extract inline styles to `.styles.ts` files (pattern exists in auth screens)
- Create `SCROLL_PAD_BOTTOM` shared constant
- Type CustomTabBar with `@react-navigation/bottom-tabs`
- Remove dead `Reveal` component

---

## 2. Performance (3/4)

### What's Done Well
- 137 uses of `useMemo`/`useCallback`/`memo` across 41 files
- Theme engine splits into 4 contexts to prevent unnecessary re-renders
- `WeakMap` style caching in `useThemedStyles`
- TanStack Query: 5min staleTime, 30min gcTime, intelligent retry, network-aware, selective persistence
- Timeline uses `useInfiniteQuery` with virtualized `AnimatedFlatList`
- `expo-image` with memory-disk caching and priority loading
- WebSocket exponential backoff (capped at 30s)
- Concurrency-safe token refresh with singleton promise

### Issues Found
- **`ScrollView` + `.map()` in care suggestions and notifications** -- no virtualization
- **`MoodOrb` uses old `Animated` API** instead of Reanimated -- adds JS thread pressure
- **No image compression before upload** -- raw camera images on avatar/banner/memory
- **`createProfileStyles` and `createCareStyles` recompute on theme change** -- should use `useThemedStyles` WeakMap caching
- **Date picker nests `TouchableOpacity`** -- known iOS touch issues

### Recommendations
- Replace ScrollView + map with FlatList for notifications/care
- Migrate MoodOrb to Reanimated
- Add `expo-image-manipulator` compression (max 1200px, 80% quality)
- Use `useThemedStyles` for profile/care screen styles

---

## 3. UI/UX Design (4/4)

### What's Done Well
- Consistent visual language: `AppScreen` base, animated backgrounds, `useAuthGridChrome` for chrome
- Production-grade glass morphism: `LiquidGlassView` (iOS 26+) + `BlurView` fallback
- Tab bar pill with spring animation, haptic feedback, glass borders
- Typography hierarchy: 8 semantic roles using Be Vietnam Pro (5 weights) + Roboto Mono
- High component reuse: `Button` (5 variants, 3 sizes), `Input` (2 variants, 3 sizes), `Card`, `Badge`, `Avatar`, `Switch`, `Skeleton`
- Vietnamese copy adapts by gender ("Cham soc co ay" vs "Goc cua em")
- Lovingly designed empty states with Lottie animations per screen
- Systematic color palette: warm coral/indigo/teal triad with taupe neutrals
- Dark mode uses warm backgrounds (`#1A1416`, `#261C20`) matching brand personality

### Minor Notes
- Profile logout has no confirmation dialog
- Male view has substantially more care content than female view

---

## 4. Architecture (4/4)

### What's Done Well
- Clean Architecture: Domain (entities, repositories, usecases) -> Data (repository impls) -> Presentation (hooks) -> Framework (DI, contexts)
- Centralized DI container (`dependencies.ts`) with typed singleton wiring
- 18 concrete UseCases following `abstract UseCase<Params, Result>` contract
- Repository pattern abstracts data access (switchable from REST to GraphQL by changing Data layer only)
- Robust session management: SecureStore hydration, silent refresh, app-state-aware, graceful error handling
- Correct provider nesting in root layout
- Production-grade API client: singleton, auto-auth, AbortController timeout, multipart detection, concurrency-safe 401 refresh

### Minor Notes
- `createVariants` utility defined but not widely adopted
- Smart cache design excludes volatile queries from persistence

---

## 5. Theme System (3/4)

### What's Done Well
- 11 token categories: palette (80+ colors), spacing (4pt grid), typography, radius, border, shadow, motion (spring presets), z-index, breakpoints, sizes (HIG-compliant), icon sizes
- Complete semantic color layer: background, surface, border, text, brand, secondary, accent, status, interactive -- all with light + dark variants
- Component tokens as third abstraction layer (button, input, card, etc. never reference raw palette)
- Multi-theme support: `aura` (romantic) and `telegram` (classic) via `createThemePair`
- Dark mode is first-class with warm tones
- Platform-appropriate shadow/elevation mapping
- 8 ready-to-use typography roles

### Issues Found
- **60+ hardcoded hex colors** in `.tsx` files despite comprehensive token system
- **`Text` atom hardcodes palette colors** in static styles that don't respond to theme changes
- **Spacing tokens defined but not consumed** -- literal `paddingHorizontal: 24` instead of `theme.space[6]`
- **`useBreakpoint` defined but unused** -- no tablet adaptation

### Recommendations
- Audit and replace ~20 hardcoded hex values with direct token equivalents
- Fix Text atom to use fully dynamic styles
- Replace literal spacing with `theme.space[N]` across screens
- Leverage `useBreakpoint` for iPad layouts

---

## 6. Experience Design (3/4)

### What's Done Well
- Exceptional reduced motion support: 41 refs across 20 files, worklet-based animation skipping, Lottie bypass
- 209 accessibility attributes across 52 files: roles, states, labels, hints, contrast checker, touch target enforcer
- Branded Lottie loading everywhere (not generic spinners)
- Global error handling with Vietnamese messages (network, server, permission)
- Haptic feedback on tab bar + care interactions
- Production-grade animation system: worklet press feedback, entrance animations, spring physics
- Push notification bootstrap with Expo push token sync
- WebSocket live channel with reconnection

### Issues Found
- **No confirmation for destructive actions** (logout, delete)
- **No offline mutation queue or optimistic updates**
- **No deep linking configuration**
- **Inconsistent form handling** -- some screens use useState per field instead of React Hook Form
- **No skeleton loading for data screens** (Skeleton component exists but underused)

### Recommendations
- Add `Alert.alert` confirmation for logout/delete
- Implement optimistic updates for mood changes and mark-as-read
- Add offline mutation queue
- Adopt React Hook Form consistently
- Add skeleton loading states for home, care, timeline

---

---

# COMBINED ANALYSIS

## What's Been Achieved

### Backend
- Mature security posture (PBKDF2, crypto-random, rate limiting, refresh rotation, SQL injection prevention, XSS sanitization, security headers)
- Clean store abstraction enabling in-memory testing and PostgreSQL production with Redis caching
- Consistent API response envelope with pagination, request IDs, structured validation errors
- OpenAPI 3.0.3 documentation verified by automated tests
- Solid integration test suite covering critical flows
- Migration system with checksum verification

### Mobile
- Clean Architecture with proper layer separation and centralized DI
- Comprehensive token-based design system (11 categories) with multi-theme support
- Production-grade accessibility (209 a11y attributes, reduced motion in 20 files, WCAG contrast checker)
- Sophisticated theme engine with split contexts and WeakMap caching
- Glass morphism with native LiquidGlass + BlurView fallback
- TanStack Query with network-aware caching and selective persistence
- Concurrency-safe token refresh
- Branded empty states with Lottie and contextual Vietnamese copy
- Feature-based module organization with thin route files

---

## Gaps -- What's Missing

### Backend Gaps
1. Unit tests for service layer (all tests are integration-only)
2. Test coverage for budget, media upload, WebSocket, admin, care edge cases
3. Transaction support for multi-step operations
4. Session cleanup for expired records
5. Structured logging (Loki logger exists but unused)
6. Request body size limit
7. Process-level health check

### Mobile Gaps
1. ErrorBoundary wrapping for screens/features
2. Offline mutation queue / optimistic updates
3. Deep linking / universal link configuration
4. Skeleton loading states for main content screens
5. Confirmation dialogs for destructive actions
6. React Hook Form adoption in add-memory/add-expense
7. Image compression before upload
8. Tablet/iPad adaptation (useBreakpoint unused)

---

## Priority Improvements (Ordered by Impact)

### P0 -- Fix Now
| # | Area | Issue | Effort |
|---|------|-------|--------|
| 1 | Backend | Replace 20+ legacy error patterns with `AppError` | 30 min |
| 2 | Mobile | Replace `src/api.ts` (37 `any` types) with typed `dependencies` usage | 2 hours |
| 3 | Mobile | Add confirmation dialogs for logout/delete | 15 min |
| 4 | Backend | Push budget aggregation + pagination to SQL | 1 hour |

### P1 -- This Sprint
| # | Area | Issue | Effort |
|---|------|-------|--------|
| 5 | Backend | Add transaction wrapper for couple joining (5 concurrent writes) | 1 hour |
| 6 | Mobile | Replace `ScrollView` + `.map()` with `FlatList` in notifications/care | 30 min |
| 7 | Mobile | Add image compression before upload | 30 min |
| 8 | Mobile | Adopt spacing tokens consistently (replace literal px) | 2 hours |
| 9 | Backend | Add budget CRUD + media upload tests | 2 hours |
| 10 | Mobile | Extract inline createStyles from care.tsx/profile.tsx | 30 min |

### P2 -- Next Sprint
| # | Area | Issue | Effort |
|---|------|-------|--------|
| 11 | Mobile | Add skeleton loading states for data screens | 2 hours |
| 12 | Mobile | Implement optimistic updates for mutations | 3 hours |
| 13 | Backend | Add expired session cleanup job | 15 min |
| 14 | Mobile | Migrate MoodOrb from Animated to Reanimated | 30 min |
| 15 | Mobile | Add ErrorBoundary wrapping | 1 hour |
| 16 | Backend | Fix admin response format to use `success()` wrapper | 2 min |

### P3 -- Backlog
| # | Area | Issue | Effort |
|---|------|-------|--------|
| 17 | Mobile | Add deep linking configuration | 2 hours |
| 18 | Mobile | Adopt React Hook Form for add-memory/add-expense | 2 hours |
| 19 | Backend | Redis-backed rate limiter for multi-instance | 2 hours |
| 20 | Mobile | Add offline mutation queue | 4 hours |
| 21 | Mobile | Tablet adaptation with useBreakpoint | 4 hours |

---

## Quick Wins (Under 10 Minutes Each)

| # | Area | Fix | Time |
|---|------|-----|------|
| 1 | Backend | Fix admin `c.json()` -> `success(c, data)` | 2 min |
| 2 | Mobile | Fix `!!!` -> `!` in `_layout.tsx:332` | 30 sec |
| 3 | Mobile | Remove dead `Reveal` component from `ui-kit.tsx` | 2 min |
| 4 | Mobile | Add `Alert.alert` confirmation for logout | 5 min |
| 5 | Mobile | Replace `"#FFFFFF"` with theme token in `Button.tsx:169` | 1 min |
| 6 | Mobile | Type `CustomTabBar` props with `BottomTabBarProps` | 5 min |
| 7 | Backend | Move OTP out of email subject line | 2 min |
| 8 | Backend | Remove duplicate `utils/token.ts` | 5 min |
| 9 | Mobile | Extract scroll padding constant | 10 min |

---

## Detailed Reports

- Backend: [BACKEND-AUDIT.md](.planning/BACKEND-AUDIT.md)
- Mobile: [MOBILE-AUDIT.md](.planning/MOBILE-AUDIT.md)
