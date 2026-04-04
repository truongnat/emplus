# Phase: Timeline — Create memory (mobile)

## Executive summary

- **API is done:** `POST /v1/timeline/memories` validates with Zod, persists via `store.saveMemory`, and invalidates home cache; mobile already has `CreateMemoryUseCase` → `TimelineRepositoryImpl.createMemory`.
- **Gap is UX:** Timeline **+** only runs `pickImage` + `Alert`; no navigation, no form, no mutation.
- **MVP:** New `app/add-memory.tsx` screen (mirror `add-expense.tsx`), `useMutation` + `queryClient.invalidateQueries` for all `timelineMemories` keys, default `mediaUrls: []` until a real upload/presign phase exists.
- **Tag convention:** New user memories should include `ky-niem` in `tags` so they align with the **Kỷ niệm** chip and `TimelineItem` classification (chi phí / nhiệm vụ use their own tags).
- **Verify:** Typecheck mobile + API with `bunx tsc`; manually create a memory and see it under the right filter after back navigation.

---

## Phase goal

Deliver an end-to-end flow where an authenticated user opens the timeline, taps **+**, fills a short form (title, ngày kỷ niệm `memoryDate` as YYYY-MM-DD, optional mô tả), submits, and sees the new item after returning to the timeline. The request must use the existing Clean Architecture path: screen → TanStack Query mutation → `createMemory` / `CreateMemoryUseCase` → `POST /timeline/memories` (API `POST /v1/timeline/memories` behind the client base URL), with cache invalidation so every active filter/order refetches.

## Out of scope

- **Production image upload:** No MinIO/S3 presign, no multipart pipeline, and **no** posting `file://` or other local picker URIs as `mediaUrls` (server expects fetchable URL strings). MVP ships with `mediaUrls: []` (or omit; server defaults empty). Optional UI: hide attachment UX or show a single disabled “Ảnh — sắp có” hint.
- **New API routes or DTO changes** unless execution discovers a contract mismatch vs `api/src/dto/timeline.dto.ts` (then a small follow-up patch, not a redesign).
- **Persisting timeline queries** or changing global query defaults beyond invalidation after create.
- **Deep link / share-sheet** entry points (can be a later phase).

---

## Architecture & files to touch

| Layer | Responsibility | Paths (primary) |
|--------|----------------|------------------|
| **Route / screen** | Full-screen compose, validation UX, submit, loading/error toast | `mobile/app/add-memory.tsx` (new; same level as `mobile/app/add-expense.tsx`) |
| **Header** | **+** → `router.push("/add-memory")` (remove stub `pickImage` + success `Alert`, or optional: navigate with query params if you add optional image stub later) | `mobile/src/features/timeline/components/TimelineHeader.tsx` |
| **Data / DI** | No change expected: `dependencies.timeline.createMemory`, `TimelineRepositoryImpl.createMemory`, `api.ts` `createMemory` | `mobile/src/framework/di/dependencies.ts`, `mobile/src/data/repositories/modules.repository.impl.ts`, `mobile/src/api.ts` |
| **Queries** | Document invalidation pattern (predicate on `queryKey[0] === "timelineMemories"`) | Inline in screen or small `mobile/src/features/timeline/hooks/useCreateMemoryMutation.ts` (optional extract) |
| **Types** | `TimelineModule.CreateRequest` from OpenAPI sync | `mobile/src/domain/entities/schemas.ts` (regenerate only if API contract changed: `bun run api:sync` per project script) |
| **API** | None for happy path | `api/src/modules/timeline.ts`, `api/src/dto/timeline.dto.ts` (reference only) |

**Reference patterns**

- Form + mutation + invalidate + `router.back()`: `mobile/app/add-expense.tsx`
- Auth-wrapped fetch: `mobile/src/features/timeline/components/timelineQueries.ts` (`withAccessToken` + `listMemories`); use the same **token-first** callback shape for `createMemory` as in `api.ts` (`createMemory(token, data)` — token may be unused if `apiClient` uses `tokenManager`, but keeps one consistent pattern with the timeline query).

---

## Tasks (waves & dependencies)

### Wave 1 — Screen + mutation (depends: nothing)

**Task 1 — Add `add-memory` route and compose UI**

- **Files:** `mobile/app/add-memory.tsx` (new).
- **Action:**
  - Use `AppScreen`, `KeyboardAvoidingView` / `ScrollView`, theme components consistent with `add-expense.tsx`.
  - Fields: `title` (required), `memoryDate` (string `YYYY-MM-DD`, default today), `description` (optional).
  - Submit builds payload: `{ title, memoryDate, description?: string, mediaUrls: [], tags: ["ky-niem"] }` unless product wants additional tags (document in code comment). Including **`ky-niem`** matches `TimelineHeader` filter id and `TimelineItem` logic (`chi-phi` / `nhiem-vu` are for other item types).
  - Client-side checks: non-empty title, valid date format before calling mutation; show `useToast` warnings like add-expense.
- **Acceptance criteria:**
  - Screen renders from Expo Router path `/add-memory`.
  - Submit disabled or blocked when title empty; valid payload shape matches `CreateMemoryDto` (title, memoryDate, optional description, mediaUrls array, tags array).

**Task 2 — Wire `useMutation` and cache invalidation**

- **Files:** `mobile/app/add-memory.tsx` (same or extracted hook file).
- **Action:**
  - `useMutation` with `mutationFn: (data) => withAccessToken((token) => createMemory(token, data))` (import `createMemory` from `@/src/api`, `useSession`, `useQueryClient`, `useToast`, `useRouter` like add-expense).
  - `onSuccess`: `queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === "timelineMemories" })` so all `[activeFilter, order]` variants refetch. Optionally invalidate home/dashboard queries if the app shows timeline-derived data there (grep `queryKey` for home — only if a real key exists).
  - `onError`: surface `err.message` via toast (reuse `toDisplayError` from `@/src/core/api` if that’s the project norm for API errors).
  - `onSuccess`: toast success (Vietnamese), `router.back()`.
- **Acceptance criteria:**
  - After successful create, returning to timeline shows the new row without manual pull-to-refresh (given `staleTime: 0` + invalidation).
  - Pending state shows loading/disabled submit (e.g. `ActivityIndicator` or button `disabled`).

**Dependencies:** Task 2 logically follows Task 1 in the same file; can be one implementation pass.

### Wave 2 — Entry point (depends: Wave 1 route exists)

**Task 3 — Timeline header + button**

- **Files:** `mobile/src/features/timeline/components/TimelineHeader.tsx`.
- **Action:**
  - Import `useRouter` from `expo-router`.
  - Replace `handleAddMemory` body: `router.push("/add-memory")` (remove `pickImage`, `Alert` stub, unused imports if any).
  - Keep `accessibilityLabel="Thêm kỷ niệm"`.
- **Acceptance criteria:**
  - From timeline tab, tapping **+** opens the new screen; back returns to timeline.

**Dependency graph:** Task 3 → requires Task 1 (route registered by file name). No API wave.

---

## Verification

### Automated

From repo root (adjust if your scripts differ):

```bash
cd mobile && bunx tsc --noEmit
cd ../api && bunx tsc --noEmit
```

If either package uses a different check script, use the project’s `package.json` `typecheck` script instead, but keep **non-interactive** CI-style checks.

### Manual (goal-backward / UAT)

1. Log in as a user with an active couple (existing auth flow).
2. Open **Dòng thời gian**, tap **+** → compose screen opens.
3. Enter title + date, submit → success toast, navigates back.
4. Confirm new item appears in list; switch filter to **Kỷ niệm** (`ky-niem`) → item still visible if tagged with `ky-niem`.
5. Optional: filter **Tất cả** → item visible (depends on API tag filtering for `tat-ca` / empty — if API treats `tat-ca` specially, confirm behavior matches backend; adjust payload or docs if not).

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| **`mediaUrls` not usable for local URIs** | MVP: always `[]`; document follow-up phase (presigned upload + HTTPS URL). Do not send `file://` strings. |
| **Tag / filter mismatch** | Default `tags: ["ky-niem"]` for user-created memories; align with `TimelineItem` / `TimelineHeader` ids (`chi-phi`, `nhiem-vu`, `ky-niem`). |
| **Partial query invalidation** | Use predicate on `timelineMemories`, not a single fixed key. |
| **Auth / 401** | Rely on existing `apiClient` + session refresh; user sees toast and existing session handlers. |
| **OpenAPI drift** | If `CreateRequest` fields differ from DTO after API changes, run `api:sync` and fix compile errors before merge. |

---

## Goal-backward check

| User-visible truth | How this phase proves it |
|--------------------|---------------------------|
| User can start “create kỷ niệm” from timeline | Task 3: **+** → `/add-memory`. |
| User can enter required data and submit | Task 1: form + validation. |
| Created memory is stored server-side | Task 2: successful `POST` (201) via existing repository. |
| User sees the new memory on the timeline after submit | Task 2: invalidate all `timelineMemories` queries + Task 3 return navigation; **last verification step** is manual: item visible under expected filter. |

---

## Follow-up phase (not this plan)

- Presigned upload → public `mediaUrls`, optional “attach from + button” flow, and removal of MVP empty-array constraint.

---

## Related research

- [timeline-create-item-RESEARCH.md](../../research/timeline-create-item-RESEARCH.md)

---

## Security note (planning)

- No new secrets; Bearer auth unchanged. Payload is user-authored text/arrays — avoid logging full bodies in production. MVP without file upload reduces attack surface for this phase.
