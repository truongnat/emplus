# Ticket 37 — Timeline: API + UI (feature hoàn chỉnh)

## Metadata

- **ticket_id**: 37
- **status**: done
- **domain_stack**: `api` (Hono) + `mobile` (Expo / React Native)
- **closed**: 2026-04-04

## Spec (tổng hợp)

Luồng **Dòng thời gian** end-to-end: client gọi API có auth, hiển thị danh sách kỷ niệm theo ngày, lọc theo tag, phân trang vô hạn; thẻ có ảnh (lưới kiểu social khi nhiều ảnh), tap mở fullscreen preview đa ảnh; dev có seed/sync demo.

## Phạm vi đã giao

### API

- `GET /v1/timeline/memories` — query `page`, `limit`, `order`, `tag`; phản hồi phân trang; `requireAuth`; couple active.
- `POST /v1/timeline/memories` — tạo memory (DTO Zod).
- Lưu trữ: `DataStore` (`listMemoriesByCouple`, `saveMemory`, `updateMemory`), Postgres `memories.media_urls` JSONB.
- Dev: `fakeTimelineMemories` → `ensureDemoTimelineMemories`, `syncDemoTimelineMediaUrls`, `ensureDemoGridTestMemories` (`api/src/modules/demo-timeline-memories.ts`, `api/src/modules/timeline.ts`).

### Mobile UI

- Màn `mobile/app/(tabs)/timeline.tsx` — grid nền auth, `SectionList`, empty/loading.
- `useTimelineData` + `useTimelineMemoriesQuery` (TanStack Query, timeline không persist cache).
- Components: `TimelineHeader`, `TimelineDateGroupHeader`, `TimelineItem` (lưới ảnh 1 / 2 / 3 / 4+ với `+N`), `TimelineImageViewer` (modal, FlatList ngang).
- `timeline-helpers` / `parseMediaUrls`; repository `TimelineRepositoryImpl` → `/timeline/memories`.

## Acceptance criteria (đã đạt)

1. User đã đăng nhập + ghép đôi thấy timeline; chưa thì CTA login/pairing.
2. Lọc chip khớp tag API (`tat-ca`, `chi-phi`, `nhiem-vu`, `ky-niem`).
3. Cuộn tải thêm trang khi gần cuối danh sách.
4. Nhiều `mediaUrls`: thẻ hiển thị lưới; preview fullscreen vuốt được; tap đúng index.
5. API contract khớp schema client (`TimelineModule` / OpenAPI trong repo).

## Liên quan ticket nhỏ (đã done)

- [ticket-32](../ticket-32/TICKET.md) — shell timeline, typography
- [ticket-33](../ticket-33/TICKET.md) — empty Lottie + demo API
- [ticket-34](../ticket-34/TICKET.md), [ticket-35](../ticket-35/TICKET.md) — layout thẻ / cột
- [ticket-36](../ticket-36/TICKET.md) — đa ảnh + preview (đã tiến hóa sang lưới FB-style sau đó)

## Task breakdown

- [x] API list/create memory + store
- [x] Mobile list, filter, infinite query, nhóm theo ngày
- [x] Ảnh đơn / đa ảnh + viewer
- [x] Demo seed & sync dev (tùy env)

## Implementation (tham chiếu file)

| Layer | Đường dẫn chính |
|--------|------------------|
| Routes | `api/src/modules/timeline.ts` |
| DTO | `api/src/dto/timeline.dto.ts` |
| Demo | `api/src/modules/demo-timeline-memories.ts` |
| Store | `api/src/store/postgres-store.ts` (`listMemoriesByCouple`, `saveMemory`, `updateMemory`) |
| Screen | `mobile/app/(tabs)/timeline.tsx` |
| Feature | `mobile/src/features/timeline/**` |
| API client | `mobile/src/data/repositories/modules.repository.impl.ts` |

## Verify

- `api`: `bunx tsc --noEmit`
- `mobile`: `bunx tsc --noEmit`
- Tay: đăng nhập → Timeline → lọc → cuộn → tap ảnh / ô `+N` → đóng preview

## Residual risk

- Demo chỉ nên bật trong dev (`FAKE_TIMELINE_MEMORIES`).
- `syncDemoTimelineMediaUrls` ghi đè `mediaUrls` khi tiêu đề trùng spec demo — tránh trùng tiêu đề dữ liệu thật khi fake bật.
