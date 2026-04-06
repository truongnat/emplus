# Chỉ mục dự án Em Plus

Monorepo **Bun workspaces**: API (Hono), mobile (Expo), công cụ theme (Vite).

## Gốc repo

| Đường dẫn | Nội dung |
|-----------|----------|
| `package.json` | Script dev/test/db, `api:sync` (OpenAPI → mobile) |
| `docker-compose.yml` | PostgreSQL, replica, Redis, MinIO, Mailpit |
| `scripts/` | `dev.sh`, `ports.sh`, `ai-workflow.sh` |
| `deploy/k8s/` | Script Kubernetes |

## `api/` — Backend

| Đường dẫn | Nội dung |
|-----------|----------|
| `src/index.ts` | `Bun.serve` + Hono `app.fetch` |
| `src/app.ts` | Middleware, đăng ký route `/v1/*`, Swagger khi bật |
| `src/modules/` | Route modules: `auth`, `users`, `couples`, `dashboard`, `timeline`, `care`, `system`, `budget`, `live`, `admin`, `debug` |
| `src/services/` | Logic nghiệp vụ (auth, user, couple, budget, mail, …) |
| `src/store/` | Postgres + in-memory (test), contracts |
| `src/middleware/` | CORS, auth, rate limit, sanitize, security |
| `src/dto/` | DTO / validation theo domain |
| `src/db/` | Migrate, seed, bootstrap |
| `src/docs/openapi.ts` | Spec OpenAPI |
| `openapi.json` | Export cho client |
| `src/__tests__/` | Test Bun |

**Prefix API:** `/v1` (ví dụ `/v1/auth`, `/v1/timeline`). Health: `GET /health`.

## `mobile/` — Expo (React Native)

| Đường dẫn | Nội dung |
|-----------|----------|
| `app/` | Expo Router: `(tabs)` (home, timeline, budget, care, profile, notifications), auth (`login`, `register`, …), `pairing`, `add-expense`, `profile-details/*` |
| `src/features/` | Feature slices: `home`, `timeline`, `budget`, `mood`, `live` (WebSocket) |
| `src/domain/` | Entities, repositories (ports), use cases |
| `src/data/repositories/` | Implement repository (API) |
| `src/framework/` | DI, session, API context |
| `src/theme/` | Theme engine, tokens, semantic colors |
| `src/components/` | Atoms / organisms (UI kit) |
| `src/api.ts` | Gọi API client |
| `scripts/sync-api.ts` | Đồng bộ type từ OpenAPI (gọi từ root `api:sync`) |

## `design-builder/`

Vite + React: công cụ xây / tinh chỉnh theme (Radix, Tailwind, Zustand).

## `.planning/phases/phase-landing-page-seo/` — Landing + blog (SEO)

Astro `web/` workspace (Markdown + Content Collections): foundation đã scaffold; research/plan gốc vẫn có phần Next/Velite là **lịch sử**. Handoff: [phase-landing-page-seo/README.md](phases/phase-landing-page-seo/README.md).

## Đồng bộ API ↔ Mobile

```bash
bun run api:sync
```

Chạy export OpenAPI trong `api` rồi sync sang `mobile`.

## Lệnh thường dùng

| Lệnh | Mô tả |
|------|--------|
| `bun run db:up` | Docker DB + Redis + MinIO + Mailpit |
| `bun run dev:api` | API dev |
| `bun run dev:mobile` | Expo |
| `bun run test:api` | Test API (memory store) |
