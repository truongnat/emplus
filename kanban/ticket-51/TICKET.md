# ticket-51 — Mood đồng bộ cặp đôi (API + UI)

## Metadata

- **status**: done
- **opened**: 2026-04-04
- **closed**: 2026-04-04

## Spec

- API lưu mood 0–100 theo user; GET trả self + partner khi đã ghép đôi (partner luôn có `fullName`; `value`/`updatedAt` null nếu chưa lưu).
- Mobile: nữ — slider đồng bộ server; nam — thẻ “Tâm trạng cô ấy” + refetch định kỳ.

## Acceptance

- [x] `PUT /v1/care/mood` + `GET /v1/care/mood` (auth), Postgres + in-memory store.
- [x] Cả hai phía thấy mood đối phương sau khi lưu.
- [x] OpenAPI + schema mobile (`CareModule`).

## Implementation

- `api`: migration `user_mood`, `care` routes, store methods, tests trong flow ghép đôi.
- `mobile`: `ApiClient.put`, `CareRepository` mood, `MoodVibeCheck` (React Query), `care.tsx` thẻ partner (nam).

## Verify

- `bun test` trong `api/` (hoặc script test dự án).
- `bunx tsc --noEmit` trong `api/` và `mobile/`.

## Residual risk

- Realtime không có — chỉ polling ~20s trên màn nam; có thể bổ sung WebSocket/signal sau.
