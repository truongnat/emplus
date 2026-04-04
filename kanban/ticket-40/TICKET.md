# Ticket 40 — Kế hoạch: xoá & chỉnh sửa mục timeline (memory)

## Metadata

- **ticket_id**: 40
- **status**: backlog *(ghi chú: ticket này là **tài liệu kế hoạch**; chuyển `doing` khi bắt đầu code)*
- **domain_stack**: `api` (Hono + Postgres) + `mobile` (Expo)
- **opened**: 2026-04-04

## As-is (repo hiện tại)

- **API công khai:** chỉ `GET` + `POST /v1/timeline/memories` (`api/src/modules/timeline.ts`).
- **Store:** `saveMemory`, `updateMemory` đã có (`postgres-store`, `in-memory-store`); **không** có `deleteMemory` trong `DataStore` (`api/src/store/contracts.ts`).
- **Mobile:** `TimelineRepositoryImpl` — `getMemories`, `createMemory`; không có update/delete client.

Kết luận: **chỉnh sửa** có thể tái dùng `updateMemory` sau khi bổ sung endpoint + quyền; **xoá** cần thêm tầng lưu trữ + HTTP DELETE (và có thể dọn MinIO).

---

## Mục tiêu sản phẩm

1. Người dùng trong cặp đôi có thể **sửa** nội dung mục đã đăng (tiêu đề, ngày, ghi chú, loại/tag, ảnh — theo phạm vi từng phase).
2. Người dùng có thể **xoá** mục khỏi timeline của couple (không ảnh hưởng couple khác).
3. UX rõ ràng, có **xác nhận khi xoá**, lỗi mạng/API có phản hồi (toast đã full width — ticket 39).

---

## Ý tưởng API (đề xuất)

### PATCH `/v1/timeline/memories/:id`

- **Auth:** `requireAuth`; couple active giống create.
- **Body (partial):** `title?`, `description?`, `memoryDate?`, `mediaUrls?`, `tags?` — validate Zod (`updateMemorySchema`), ít nhất một field.
- **Luồng:** load bản ghi theo `id` + `coupleId` (404 nếu không thuộc couple); merge field; `updateMemory`; `invalidateHomeCache(coupleId)`.
- **Quyền:** mặc định **mọi thành viên couple** được sửa (đơn giản). Tuỳ chọn sau: chỉ `createdById` (cần thống nhất PM).

### DELETE `/v1/timeline/memories/:id`

- **Auth + couple** như trên.
- **Store:** thêm `deleteMemory(coupleId, id): Promise<void>` — `DELETE FROM memories WHERE id = $id AND couple_id = $coupleId` (row count 0 → 404).
- **In-memory store:** xoá khỏi `Map` theo id + filter couple.
- **Cache:** `invalidateHomeCache` sau khi xoá.

### OpenAPI + mobile schema

- Bổ sung path trong `openapi.ts` và regenerate / cập nhật tay `mobile/src/domain/entities/schemas.ts` (`TimelineModule.UpdateRequest`, v.v.).

---

## Lưu trữ & MinIO

- **Update:** client gửi `mediaUrls` mới (giống create: upload từng ảnh rồi PATCH). Ảnh cũ bị bỏ khỏi mảng → **URL orphan** trên MinIO (chấp nhận MVP hoặc job dọn sau).
- **Delete:** xoá row DB; file MinIO **không** tự xoá trừ khi thêm worker hoặc gọi MinIO delete trong handler (latency + lỗi partial). Đề xuất: **phase 1** chỉ xoá DB; **phase 2** best-effort xoá object theo prefix `timeline/{userId}/` nếu URL khớp bucket nội bộ.

---

## Ý tưởng UX mobile

| Hành động | Ý tưởng | Ghi chú |
|-----------|---------|--------|
| Mở menu | Long-press hoặc nút `⋯` trên `TimelineItem` | Tránh tap nhầm khi xem ảnh; `hitSlop` / a11y label |
| Sửa | `router.push` tới `edit-memory?id=` **hoặc** reuse `add-memory` với `initialParams` | Form tái sử dụng logic upload + date + loại (ticket 38) |
| Xoá | `Alert.alert` / bottom sheet xác nhận “Xoá vĩnh viễn?” | Copy tiếng Việt nhất quán app |
| Danh sách | `invalidateQueries` `timelineMemories`; tuỳ chọn optimistic `remove` trong cache | Cân nhắc infinite list: remove theo `id` trong pages |

### MVP gợi ý (theo wave)

1. **Wave A:** DELETE API + store + nút xoá + confirm + invalidate.
2. **Wave B:** PATCH chỉ field text (`title`, `description`, `memoryDate`, `tags`) — không đổi ảnh.
3. **Wave C:** PATCH `mediaUrls` + UI thêm/bớt ảnh giống create.

---

## Rủi ro & bảo mật

- **IDOR:** bắt buộc filter `couple_id` từ server (đã có pattern create); không tin `coupleId` từ client.
- **Rate limit:** DELETE/PATCH nên nằm trong rate limit chung; cân nhắc stricter cho DELETE.
- **Audit:** (tuỳ chọn) log `who deleted what` cho tranh chấp trong couple.

---

## Acceptance (khi triển khai code)

1. Member couple A không đọc/sửa/xoá memory của couple B (404/403).
2. Xoá thành công → mục biến mất khỏi list sau refresh/invalidate.
3. Sửa thành công → nội dung mới hiển thị đúng trên timeline và khớp filter tag.
4. `tsc` api + mobile; test store in-memory + postgres nếu có harness.

## Liên quan

- [ticket-37](./ticket-37/TICKET.md) — timeline list/create
- [ticket-38](./ticket-38/TICKET.md) — form thêm kỷ niệm (tái sử dụng cho edit)
