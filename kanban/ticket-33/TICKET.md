# ticket-33 — Timeline empty Lottie (Love) + API seed 10 demo (mọi loại filter)

## Summary

- Empty state **Dòng thời gian**: Lottie **`Love.lottie`** → `timeline-empty-love.json`, hiển thị qua `EmplusLottie`.
- **API** (`GET /v1/timeline/memories`): khi `env.fakeTimelineMemories` (mặc định `NODE_ENV=development`) và couple **chưa có memory**, seed **10** bản ghi với tag **`chi-phi` / `nhiem-vu` / `ky-niem`** (và một mục **tag rỗng** cho lọc Kỷ niệm), có `mediaUrls` picsum nơi cần ảnh.

## Acceptance

- [x] Bundle `mobile/assets/lottie/timeline-empty-love.json` + `lottieInventory.timelineEmptyLove`.
- [x] Màn paired + list rỗng: Lottie Love thay `empty.json`.
- [x] Dev API: lần đầu mở timeline (0 memory) → sau request có 10 item; filter **Tất cả / Chi phí / Nhiệm vụ / Kỷ niệm** có dữ liệu tương ứng.
- [x] `NODE_ENV=test`: không seed → test timeline vẫn pass.
- [x] `bun run typecheck` (api + mobile).

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `cd api && bun run typecheck && bun test`
- `bun run typecheck:mobile`

## Implementation

- `mobile/assets/lottie/timeline-empty-love.json`, `mobile/src/lottie/inventory.ts`, `mobile/app/(tabs)/timeline.tsx`
- `api/src/modules/demo-timeline-memories.ts`, `api/src/modules/timeline.ts`, `api/src/config/env.ts` (`fakeTimelineMemories`)

## Residual

- Ảnh demo dùng `picsum.photos` (chỉ data seed dev). Production tắt seed mặc định.
- Phân trang + lọc tag trên server: `total` có thể không khớp số item sau lọc (hành vi cũ).
