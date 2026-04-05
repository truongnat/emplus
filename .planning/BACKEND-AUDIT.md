# Backend API Audit Report -- emplus

**Date:** 2026-04-05
**Scope:** api/src/ (full backend)
**Runtime:** Bun + Hono
**Database:** PostgreSQL + Redis (optional cache layer)
**Object Storage:** MinIO

## Overall Score: 19/24

| Dimension | Score | Status |
|-----------|-------|--------|
| Clean Code | 3/4 | Good |
| Performance | 3/4 | Good |
| Security | 4/4 | Excellent |
| Architecture | 3/4 | Good |
| Testing | 3/4 | Good |
| API Design | 3/4 | Good |

## Scoring Guide
- 4 = Excellent -- production-ready, follows best practices
- 3 = Good -- minor issues, mostly solid
- 2 = Needs Work -- significant gaps to address
- 1 = Critical -- fundamental issues requiring immediate attention

---

## 1. Clean Code (3/4)

### What's Done Well

- **Consistent Vietnamese naming for user-facing strings.** All error messages, OTP emails, and API responses are in Vietnamese, appropriate for the target user base.
- **Strong type definitions.** `api/src/types.ts` defines clear domain types (`User`, `Couple`, `MemoryItem`, `Anniversary`, `EmotionalCycle`, `BudgetItem`, `InAppNotification`). All fields are typed, optional fields use `?`, and union types are used for enums.
- **Clean module separation.** Each domain has its own route module (`modules/*.ts`), service (`services/*.ts`), and DTO (`dto/*.ts`). The pattern is consistently applied across auth, user, couples, budget, timeline, care, notifications, media, and live modules.
- **Utility extraction.** Common operations are extracted to well-named utilities: `resolveActiveCoupleIdAsync` (couple.ts), `readJson` (http.ts), `hashPassword`/`verifyPassword` (password.ts), date manipulation (shared/date.ts).
- **Constants centralized.** `constants/index.ts` defines all magic numbers (TTLs, rate limits, page sizes) in one location with descriptive names.

### Issues Found

1. **Repetitive error construction pattern.** Throughout the codebase, errors are constructed using the legacy pattern of attaching `status` and `code` to a plain `Error` object, despite `AppError` existing. This appears in 20+ locations across services.

   `auth.service.ts:107-110`:
   ```typescript
   const error = new Error("Email da duoc dang ky") as Error & { status: number; code: string };
   error.status = 409;
   error.code = "EMAIL_ALREADY_EXISTS";
   throw error;
   ```
   While `app.ts:97-126` normalizes these legacy errors, this is unnecessarily verbose when `AppError` already exists and is imported in most modules.

2. **Duplicate token generation utilities.** Token generation is duplicated in three places:
   - `shared/token.ts:15-19` (the canonical location)
   - `utils/token.ts:1-6` (near-identical copy)
   - `store/in-memory-store.ts:526-531` (exported but appears unused externally)

   The `auth.service.ts:19` imports from `shared/token.ts`, which is correct, but the duplicate in `utils/token.ts` creates confusion.

3. **`any` type usage in admin module.** `modules/admin.ts:11` uses `(store as any).listAllUsers?.()` and `(store as any)` casts throughout. The `DataStore` contract (`store/contracts.ts:74-76`) already defines these as optional methods (`listAllUsers?`, `listAllCouples?`, `countMemories?`). A type guard or conditional check would be cleaner.

4. **Debug module uses `Math.random()`.** `modules/debug.ts:17,49` uses `Math.random().toString(36).substring(7)` for generating random IDs, while the rest of the codebase correctly uses `crypto.randomUUID()` and `crypto.getRandomValues()`. While this is dev-only code, it's inconsistent.

5. **Mixed import paths.** Some modules import from `../utils/date.ts` which re-exports from `../shared/date.ts`. This creates unnecessary indirection. For example, `engines/emotional.ts:2` imports from `../utils/date.ts`, while `engines/anniversary.ts:2` imports from `../utils/date.ts`. The re-export in `utils/date.ts` exists "for backwards compatibility" but adds confusion.

### Recommendations

- Replace all legacy error patterns (`as Error & { status; code }`) with `throw new AppError(...)`. This would eliminate ~20 lines of boilerplate per error throw site.
- Remove `utils/token.ts` and `store/in-memory-store.ts:generateTokens` -- consolidate on `shared/token.ts`.
- Use proper optional method access on `DataStore` instead of `(store as any)` casts in admin.ts.
- Standardize import paths: either always use `shared/` or always use `utils/` re-exports, not both.

---

## 2. Performance (3/4)

### What's Done Well

- **Redis caching layer with graceful fallback.** `postgres-store.ts:329-345` implements a resilient Redis strategy: if Redis fails, it logs once and falls back to DB-only mode without crashing. Sessions, refresh tokens, invite codes, and home cache are all cached in Redis.
- **Read replica support.** `config/env.ts:43` defines `readDatabaseUrl` and the `PostgresStore` constructor accepts a separate `readSql` connection for read queries, enabling read scaling.
- **Connection pooling.** The `postgres` library is used with connection pooling by default (the `Sql` type manages its own pool). The health check in `dependencies.ts:44` correctly uses `max: 1` for probe connections.
- **Server-side pagination.** All list endpoints (memories, expenses, notifications) implement proper pagination with `page`/`limit` parameters, capped at `MAX_PAGE_SIZE = 50`.
- **Home dashboard caching.** `dashboard.ts:64` caches the computed dashboard payload for 15 minutes, avoiding repeated computation of love days, upcoming events, and emotional suggestions.

### Issues Found

1. **Budget summary loads ALL items into memory.** `budget.service.ts:33` calls `store.listBudgetItemsByCouple(coupleId)` which fetches all budget items for a couple, then performs in-memory aggregation. For couples with hundreds of expenses, this is wasteful. A SQL aggregate query would be significantly more efficient.

2. **Budget expenses pagination is in-memory.** `budget.service.ts:67` loads all items, then slices in memory:
   ```typescript
   let items = await store.listBudgetItemsByCouple(coupleId);
   // ... filter, sort, slice
   const pagedItems = items.slice(offset, offset + limit);
   ```
   The `listBudgetItemsByCouple` method in `postgres-store.ts` should accept pagination parameters and push filtering/sorting to SQL.

3. **In-memory rate limiter in middleware.** `middleware/rate-limit.ts` uses an in-memory `Map` for rate limiting. This does not work across multiple server instances. The application-level rate limiting in `auth.service.ts` correctly uses the store (which uses Redis when available), but the middleware-level rate limiter (`generalRateLimit`, `authRateLimit`) is process-local only.

4. **No session cleanup job for PostgreSQL.** Expired sessions in `user_sessions` and `user_refresh_sessions` are never cleaned up. The `getUserByToken` query filters by `expires_at > NOW()`, so expired sessions are simply ignored but remain in the database indefinitely. A periodic cleanup job or DB-level TTL mechanism is needed.

5. **Demo data generation on every request.** `timeline.ts:47-51` calls `ensureDemoTimelineMemories` on every GET request when `fakeTimelineMemories` is enabled (default in development). While it checks for existing data, this adds unnecessary overhead to every timeline request.

### Recommendations

- Add SQL aggregation for budget summary: `SELECT SUM(amount) FILTER (WHERE status IN ('PAID','OVER_BUDGET')) ...`.
- Push budget expense pagination to SQL with `ORDER BY date DESC OFFSET $1 LIMIT $2`.
- Consider using Redis for the middleware rate limiter when available, or document that `generalRateLimit` is per-instance.
- Add a cron job or scheduled task to `DELETE FROM user_sessions WHERE expires_at < NOW()`.
- Cache the demo data check result per couple to avoid repeated lookups.

---

## 3. Security (4/4)

### What's Done Well

- **Password hashing with PBKDF2-SHA256.** `utils/password.ts` uses `pbkdf2Sync` with 210,000 iterations, 32-byte key length, random salt, and `timingSafeEqual` for comparison. This is OWASP-recommended.
- **Cryptographically secure random generation.** `shared/code.ts` uses `crypto.getRandomValues()` for OTP codes and invite codes. A dedicated test (`security_random.test.ts`) verifies that `Math.random` is never called.
- **Comprehensive rate limiting on auth flows.** Four distinct rate limit checks:
  - Login attempts: 10 per 5 minutes per email (`auth.service.ts:128-135`)
  - OTP send: 5 per 10 minutes per email (`auth.service.ts:138-145`)
  - OTP verify: 5 attempts before invalidation (`auth.service.ts:190-197`)
  - Password reset: 5 per 10 minutes (`auth.service.ts:272-279`)
- **Refresh token rotation.** `consumeRefreshSession` in both stores atomically deletes the refresh token when used, preventing token replay. The test at `app.test.ts:141-149` verifies that reused refresh tokens are rejected.
- **Comprehensive security headers.** `middleware/security.ts` sets HSTS, X-Frame-Options: DENY, X-Content-Type-Options, XSS-Protection, CSP (with frame-ancestors 'none'), Referrer-Policy, and Permissions-Policy.
- **Input sanitization middleware.** `middleware/sanitize.ts` applies XSS pattern removal, field-specific length limits, and recursive depth limiting on all JSON request bodies.
- **Zod-based input validation on every endpoint.** Every route handler validates input through DTOs (`dto/*.ts`) before passing to services. The `parseWithSchema` utility provides consistent error formatting.
- **CORS properly configured.** `middleware/cors.ts` allows wildcard only in non-production, rejects unknown origins in production, and only allows localhost in development.
- **SQL injection prevention.** All database queries in `postgres-store.ts` use tagged template literals (`sql\`...\``), which the `postgres` library parameterizes automatically. No raw string interpolation in SQL.
- **Authorization checks.** `requireAuth` middleware verifies bearer tokens. `requireAdmin` checks `isAdmin` flag. Couple-scoped resources verify the user belongs to the couple via `resolveActiveCoupleIdAsync`.
- **WebSocket authentication.** `modules/live.ts:30-49` authenticates WebSocket connections via query parameters and verifies couple membership before allowing subscription.
- **OTP not exposed in email subjects (partially).** `services/mail.ts:17` includes the OTP in the email subject line (`Mã xác thực OTP của bạn: ${otp}`), which is a minor concern as email subjects may appear in notifications/previews. However, the OTP TTL is short (5 minutes) which mitigates risk.
- **File upload validation.** `modules/media.ts:15-35` validates MIME type against an allowlist and enforces a 10MB size limit.
- **Sensitive data exclusion.** `passwordHash` is never returned in API responses. The `AuthPayload` type in `auth.service.ts:24-38` explicitly selects only safe user fields.

### Issues Found

1. **OTP in email subject line.** `services/mail.ts:17` includes the OTP in the subject: `Mã xác thực OTP của bạn: ${otp}`. This means the OTP may be visible in push notifications, email previews, and subject line logs. Best practice is to keep the OTP only in the email body.

2. **OTP logged to console in dev fallback.** `services/mail.ts:41`: `console.log(\`[DEV] OTP cho ${email} là: ${otp}\`)`. This is acceptable for development but should be confirmed it's never activated in production. The code only runs in the `catch` block when mail sending fails, and there's no environment guard.

3. **Debug endpoints lack environment guard on `/seed-user` and `/seed-invite`.** While the debug routes are only mounted when `env.nodeEnv !== "production"` (`app.ts:84`), the `seed-user` and `seed-invite` endpoints within debug.ts don't require authentication, allowing anyone to create users in non-production environments.

### Recommendations

- Move OTP out of email subject line: use a generic subject like "Ma xac thuc Em+" and keep the code only in the body.
- Add an explicit environment check before the OTP console.log fallback.
- These are all minor -- the security posture is strong overall.

---

## 4. Architecture (3/4)

### What's Done Well

- **Clean layered architecture.** The codebase follows a clear pattern: Routes (modules/) -> DTOs (dto/) -> Services (services/) -> Store (store/). Each layer has a well-defined responsibility.
- **Store abstraction with contract interface.** `store/contracts.ts` defines the `DataStore` interface, implemented by both `InMemoryStore` (for testing) and `PostgresStore` (for production). This enables testing without a database.
- **Environment-based store selection.** `store.ts:6-22` selects the store implementation based on `DATA_STORE` config, with a safety guard preventing in-memory store in non-test environments.
- **Migration system.** `db/migrate.ts` implements a custom migration runner with checksum verification, ordered execution, and status reporting. This is simple and reliable.
- **API versioning.** All routes are under `/v1/`, enabling future version introduction without breaking changes.
- **Module-based route organization.** Each domain module exports a single `Hono` router instance, composed in `app.ts`. This makes it easy to add/remove feature modules.
- **Configuration management.** `config/env.ts` centralizes all environment variable parsing with type-safe helpers (`boolFromEnv`, `numberFromEnv`, `listFromEnv`), default values, and an `EnvConfig` interface.
- **Dependency health checking.** `services/dependencies.ts` provides comprehensive health checks for all external dependencies (PostgreSQL, Redis, SMTP, MinIO) with timeout handling and parallel execution.

### Issues Found

1. **Global singleton store import.** The `store` singleton is created at module load time in `store.ts` and imported directly throughout the codebase. This makes it impossible to inject different store implementations per request or per test without full module mocking. A dependency injection container or factory pattern would improve testability.

2. **Services import store directly.** `auth.service.ts:5`, `user.service.ts:7`, `couple.service.ts:5`, `budget.service.ts:3` all import `store` directly. This tight coupling means services cannot be tested in isolation with a mock store without module-level mocking.

3. **Business logic in route handlers.** Some route handlers contain business logic that should be in services:
   - `modules/timeline.ts:81-96` constructs the `MemoryItem` object directly in the route handler
   - `modules/care.ts:11-24` (`getPartner`) contains business logic inline in the module file
   - `modules/dashboard.ts:15-66` contains the entire dashboard computation inline

4. **No transaction support visible in service layer.** `couple.service.ts:128-134` performs multiple store operations that should be atomic (update couple, update two users, delete invite, invalidate cache) but executes them via `Promise.all` without a transaction wrapper. If any operation fails, the system could be left in an inconsistent state.

5. **Mixed concerns in modules.** `modules/demo-timeline-memories.ts` and `modules/demo-in-app-notifications.ts` contain demo data seeding logic that conceptually belongs in a separate seeding/fixture layer, not in the module layer.

### Recommendations

- Consider passing `store` as a parameter to service functions, or create a service factory that accepts a store instance.
- Extract business logic from route handlers into service functions (especially dashboard, timeline creation, and care/partner resolution).
- Add transaction support to the DataStore contract for multi-step operations.
- Move demo data generators to a `fixtures/` or `seeds/` directory separate from modules.

---

## 5. Testing (3/4)

### What's Done Well

- **8 test files covering critical paths.** Tests exist for: auth flows (`auth.test.ts`), full app integration (`app.test.ts`), input validation (`validation.test.ts`), anniversary engine (`anniversary.test.ts`), security randomness (`security_random.test.ts`), notifications (`notifications.test.ts`), system health (`system.test.ts`), and date calculations (`love-days-utc.test.ts`).
- **Integration tests use real app instance.** Tests use `app.request()` to test through the full HTTP stack including middleware, routing, validation, and store operations. This provides high confidence in end-to-end behavior.
- **Store reset between tests.** `app.test.ts:42-44` and `validation.test.ts:34-37` call `store.reset()` in `beforeEach`, ensuring test isolation.
- **Security-focused tests.** `security_random.test.ts` uses `spyOn(Math, "random")` to verify that security-sensitive code never uses `Math.random`. This is an excellent practice.
- **Edge case coverage for dates.** `anniversary.test.ts` tests leap year handling, year-end wrap-around, window boundaries, and priority assignment. `love-days-utc.test.ts` verifies UTC-based day counting.
- **Auth flow tests are comprehensive.** `app.test.ts` tests the complete flow: registration, login, token refresh, refresh token rotation (single-use), invite generation/invalidation, pairing, mood sync between partners, emotional cycle, care suggestions, timeline creation, and dashboard.

### Issues Found

1. **No unit tests for services.** The test suite consists entirely of integration tests through the HTTP layer. Services like `auth.service.ts`, `couple.service.ts`, and `budget.service.ts` have no isolated unit tests. This means:
   - Edge cases in service logic are only testable via HTTP
   - Test feedback cycles are slower
   - Failure localization is harder

2. **No tests for budget module.** There are no test files for budget endpoints (GET /summary, GET/POST/PUT/DELETE /expenses). The budget validation test in `validation.test.ts:111-138` only covers a single invalid input case.

3. **No tests for media upload.** The media upload endpoint (`POST /v1/media/upload`) has no tests, including no tests for MIME type validation, file size limits, or MinIO failure handling.

4. **No tests for WebSocket connections.** `modules/live.ts` has no test coverage for WebSocket authentication, subscription, or broadcasting.

5. **No tests for care module edge cases.** Care module tests (in `app.test.ts`) only cover the happy path. Missing tests for: unauthorized gender access (male trying female-cycle), partner without cycle, unpaired user accessing mood, mood value boundary (0, 100, out-of-range).

6. **No tests for admin module.** The admin stats endpoint has no test coverage.

### Recommendations

- Add unit tests for service functions, injecting mock stores.
- Add integration tests for budget CRUD operations and budget summary calculation.
- Add tests for media upload edge cases (wrong MIME, oversized file, missing file).
- Add care module tests for authorization failures and edge cases.
- Consider adding a test coverage report to identify untested code paths.

---

## 6. API Design (3/4)

### What's Done Well

- **Consistent response envelope.** All responses use `{ success, data, meta }` for success and `{ success, error, meta }` for failures. The `meta` object includes `requestId` and `timestamp` on every response.
- **Consistent pagination format.** All paginated endpoints return `{ items, pagination: { page, limit, totalItems, totalPages, hasNext } }`.
- **RESTful resource naming.** Endpoints follow REST conventions: `GET /v1/users/me`, `PUT /v1/users/me`, `GET /v1/budget/expenses`, `POST /v1/budget/expenses`, `PUT /v1/budget/expenses/:id`, `DELETE /v1/budget/expenses/:id`.
- **Proper HTTP status codes.** 201 for resource creation, 200 for success, 400 for validation, 401 for auth failures, 403 for forbidden, 404 for not found, 409 for conflicts, 429 for rate limits.
- **OpenAPI 3.0.3 documentation.** `docs/openapi.ts` provides a comprehensive OpenAPI spec with schemas, security definitions, and all endpoints documented. Tests in `system.test.ts:77-131` verify that all required paths and schemas are present.
- **Swagger UI available in non-production.** Configurable via `SWAGGER_ENABLED` and `SWAGGER_PATH`, with automatic OpenAPI JSON endpoint.
- **Error responses include details array.** Validation errors include a `details` array with per-field information (path, code, message), enabling clients to show field-level error messages.
- **Request ID tracking.** Every request gets a UUID (`app.ts:46-49`) that flows through to response `meta` and error logs, enabling request tracing.

### Issues Found

1. **Inconsistent response format in admin module.** `modules/admin.ts:54-58` returns `c.json({ stats, users, couples })` directly, bypassing the standard `success(context, data)` wrapper used everywhere else. This means admin responses lack the `success`, `meta`, and standard envelope.

2. **Mixed action naming conventions.** Some endpoints use verbs (`/generate-invite`, `/join`), while others are pure resources (`/expenses`, `/memories`). This is a minor inconsistency. More notable: `/notifications/read-all` uses a POST with an action name, while `/:id/read` uses PATCH. The PATCH approach is more RESTful.

3. **Budget status filter accepts Vietnamese display strings.** `budget.service.ts:68-69` and `dto/budget.dto.ts:13-15,131-133` handle status filtering using both internal values (`PAID`, `PENDING`) and Vietnamese display strings (`Da tra`, `Dang cho`). This coupling between display labels and API query parameters means the API contract depends on the mobile app's display language.

4. **No PATCH support for partial updates.** `PUT /v1/users/me` and `PUT /v1/budget/expenses/:id` are used for partial updates (fields are optional). Semantically, PUT implies full replacement while PATCH implies partial update. The current behavior is PATCH-like on PUT endpoints.

5. **WebSocket authentication via query parameters.** `modules/live.ts:31-33` passes the access token as a query parameter (`?token=...`). Query parameters may be logged by proxies, load balancers, and browser history. While WebSocket connections have limited alternatives, the token should have a short TTL or be a single-use WebSocket ticket.

6. **No API versioning deprecation strategy.** While routes are under `/v1/`, there's no mechanism for version negotiation or deprecation headers.

### Recommendations

- Fix admin module to use `success(context, data)` wrapper.
- Remove Vietnamese display string acceptance from budget status filter -- clients should send internal status values only.
- Consider renaming PUT endpoints to PATCH for partial update semantics, or document that PUT is used for partial updates.
- Consider implementing a short-lived WebSocket ticket system instead of passing the main access token in query parameters.

---

## Summary

### Achievements (What's been done well)

- Mature security posture: PBKDF2 password hashing with timing-safe comparison, crypto-random code generation with verification tests, comprehensive rate limiting on all auth flows, refresh token rotation, SQL injection prevention via parameterized queries, XSS sanitization middleware, and comprehensive security headers.
- Clean store abstraction enabling both in-memory testing and PostgreSQL production with Redis caching and graceful fallback.
- Consistent API response format with envelope, pagination, request ID tracking, and structured validation errors.
- Comprehensive OpenAPI documentation with Swagger UI, verified by automated tests.
- Well-organized codebase with clear module boundaries, centralized constants, and type-safe configuration management.
- Solid integration test suite covering critical auth flows, pairing, mood sync, emotional care, timeline, and edge cases like leap years and refresh token reuse.
- Migration system with checksum verification preventing accidental migration modifications.

### Gaps (What's missing)

- Unit tests for service layer functions (all tests are integration-only).
- Test coverage for budget CRUD, media upload, WebSocket, admin, and care edge cases.
- Transaction support for multi-step store operations (couple joining involves 5 parallel writes).
- Session cleanup mechanism for expired PostgreSQL sessions.
- Structured logging (the Loki logger exists in `utils/logger.ts` but is not used anywhere).
- No request body size limit beyond per-field sanitization limits.
- No health check for the application process itself (the `/health` endpoint is static).

### Priority Improvements (What needs fixing)

1. **Replace legacy error pattern with AppError.** There are 20+ instances of the verbose `as Error & { status; code }` pattern. Migrating to `throw new AppError(...)` would reduce code by ~60 lines and improve consistency. Files affected: `auth.service.ts`, `user.service.ts`, `couple.service.ts`, `budget.service.ts`, `modules/user.ts`.

2. **Push budget aggregation and pagination to SQL.** The current approach of loading all budget items into memory for both summary calculation and paginated listing will degrade as data grows. Add SQL-level `SUM/COUNT` for summary and `OFFSET/LIMIT/WHERE` for listing in `postgres-store.ts`.

3. **Add transaction wrapper for couple joining.** `couple.service.ts:128-134` performs 5 concurrent writes that should be atomic. Add a `transaction()` method to the DataStore contract or use the postgres library's `sql.begin()` for this critical operation.

4. **Add unit tests for services and expand integration test coverage.** Priority: budget CRUD tests, media upload validation tests, care authorization tests.

5. **Fix admin module response format.** Use `success(context, data)` wrapper instead of raw `c.json()` to maintain API consistency.

### Quick Wins (Low effort, high impact)

1. **Replace legacy error throws with AppError.** Find-and-replace across service files. Estimated effort: 30 minutes. Impact: eliminates code duplication and the legacy normalization path in `app.ts:97-126`.

2. **Fix admin response format.** One-line change in `modules/admin.ts:54`. Estimated effort: 2 minutes.

3. **Remove duplicate token generation utilities.** Delete `utils/token.ts` and `store/in-memory-store.ts:generateTokens`. Update imports. Estimated effort: 10 minutes.

4. **Move OTP out of email subject.** Change `services/mail.ts:17` subject to a generic message. Estimated effort: 2 minutes.

5. **Add expired session cleanup.** Add a SQL migration with a periodic cleanup query or a simple `setInterval` in the store. Estimated effort: 15 minutes.

---

## Files Audited

### Core
- `api/src/index.ts` -- entry point
- `api/src/app.ts` -- app setup, middleware chain, error handler
- `api/src/app-env.ts` -- Hono environment types
- `api/src/store.ts` -- store factory
- `api/src/types.ts` -- domain type definitions
- `api/src/config/env.ts` -- environment configuration

### Middleware
- `api/src/middleware/auth.ts` -- requireAuth, requireAdmin
- `api/src/middleware/cors.ts` -- CORS configuration
- `api/src/middleware/rate-limit.ts` -- in-memory rate limiter
- `api/src/middleware/security.ts` -- security headers
- `api/src/middleware/sanitize.ts` -- input sanitization

### Modules (Route Handlers)
- `api/src/modules/index.ts` -- route re-exports
- `api/src/modules/auth.ts` -- auth routes
- `api/src/modules/user.ts` -- user profile routes
- `api/src/modules/couples.ts` -- couple pairing routes
- `api/src/modules/budget.ts` -- budget management routes
- `api/src/modules/timeline.ts` -- memory/timeline routes
- `api/src/modules/care.ts` -- emotional care routes
- `api/src/modules/notifications.ts` -- notification routes
- `api/src/modules/live.ts` -- WebSocket routes
- `api/src/modules/media.ts` -- media upload routes
- `api/src/modules/dashboard.ts` -- dashboard/home route
- `api/src/modules/system.ts` -- system health routes
- `api/src/modules/admin.ts` -- admin routes
- `api/src/modules/debug.ts` -- debug/seed routes

### Services
- `api/src/services/auth.service.ts` -- auth business logic
- `api/src/services/user.service.ts` -- user profile business logic
- `api/src/services/couple.service.ts` -- couple pairing business logic
- `api/src/services/budget.service.ts` -- budget business logic
- `api/src/services/media-storage.ts` -- MinIO storage client
- `api/src/services/mail.ts` -- SMTP email service
- `api/src/services/dependencies.ts` -- dependency health checks

### Store Layer
- `api/src/store/contracts.ts` -- DataStore interface
- `api/src/store/in-memory-store.ts` -- in-memory implementation
- `api/src/store/postgres-store.ts` -- PostgreSQL + Redis implementation

### DTOs / Validation
- `api/src/dto/auth.dto.ts`
- `api/src/dto/user.dto.ts`
- `api/src/dto/budget.dto.ts`
- `api/src/dto/couples.dto.ts`
- `api/src/dto/timeline.dto.ts`
- `api/src/dto/care.dto.ts`
- `api/src/dto/notifications.dto.ts`
- `api/src/dto/live.dto.ts`
- `api/src/shared/validators/zod.ts`

### Utilities
- `api/src/utils/http.ts` -- AppError, success/fail/paginated helpers
- `api/src/utils/password.ts` -- PBKDF2 hashing
- `api/src/utils/couple.ts` -- resolveActiveCoupleIdAsync
- `api/src/utils/date.ts` -- date re-export
- `api/src/utils/presentation.ts` -- gender/status display
- `api/src/utils/token.ts` -- duplicate token utils
- `api/src/utils/logger.ts` -- Loki logger (unused)
- `api/src/shared/code.ts` -- secure random code generation
- `api/src/shared/date.ts` -- UTC date utilities
- `api/src/shared/token.ts` -- token generation

### Engines
- `api/src/engines/emotional.ts` -- emotional phase calculation
- `api/src/engines/anniversary.ts` -- upcoming event computation

### Database
- `api/src/db/bootstrap.ts` -- migration trigger
- `api/src/db/migrate.ts` -- migration runner
- `api/src/db/seed.ts` -- seed data generator
- `api/src/db/migrations/001_initial_schema.sql` through `012_profile_background_url.sql`
- `api/src/constants/index.ts` -- centralized constants
- `api/src/docs/openapi.ts` -- OpenAPI spec builder

### Tests
- `api/src/__tests__/auth.test.ts` -- auth registration, login, refresh
- `api/src/__tests__/app.test.ts` -- full integration: pairing, care, timeline, dashboard
- `api/src/__tests__/validation.test.ts` -- Zod validation edge cases
- `api/src/__tests__/anniversary.test.ts` -- anniversary engine unit tests
- `api/src/__tests__/security_random.test.ts` -- crypto randomness verification
- `api/src/__tests__/notifications.test.ts` -- notification CRUD
- `api/src/__tests__/system.test.ts` -- health check, OpenAPI spec
- `api/src/__tests__/love-days-utc.test.ts` -- UTC day calculation
