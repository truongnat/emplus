# RESEARCH — Tạo kỷ niệm / timeline item (API + Mobile)

**Phạm vi:** Lập kế hoạch triển khai luồng **người dùng tạo memory** từ app (UI → upload/picker → `POST /v1/timeline/memories` → làm mới danh sách).

**Trạng thái repo (2026-04):** API create đã có; mobile có `CreateMemoryUseCase` + `createMemory` nhưng nút **+** trên `TimelineHeader` chỉ `pickImage` + `Alert` — **chưa** gọi API.

---

## Standard Stack

| Lớp | Dùng gì |
|-----|---------|
| API | Hono, Zod (`validateCreateMemoryInput`), `DataStore.saveMemory`, `invalidateHomeCache` |
| Mobile | Expo Router, TanStack Query (`timelineMemories`), DI (`dependencies.timeline.createMemory`), `apiClient` + Bearer |
| Ảnh | `expo-image-picker` (đã bọc `pickImage` trong ui-kit); upload object **chưa** thấy route chung — cần MinIO/S3 presign hoặc tạm `mediaUrls` rỗng + bổ sung sau |
| Form | Theo pattern `add-expense.tsx`: màn hình riêng, validation, mutation + `queryClient.invalidateQueries` |

**Không** đề xuất thư viện form nặng nếu màn chỉ 4–6 field: React state + Zod phía client (optional) hoặc validate theo lỗi API.

---

## Architecture Patterns

1. **Màn compose** — `app/add-memory.tsx` (hoặc `app/timeline/create.tsx`) tương tự `add-expense`: full screen, back, submit.
2. **Mutation** — `useMutation` gọi `withAccessToken(() => createMemory(...))` hoặc execute use case qua DI; `onSuccess` → `queryClient.invalidateQueries({ queryKey: ["timelineMemories"] })` (mọi filter) + optional `invalidateQueries` home nếu dashboard phụ thuộc cache.
3. **Điều hướng** — `TimelineHeader` `router.push("/add-memory")` thay vì chỉ picker; form có thể nhận `initialMedia` qua params nếu vẫn muốn entry từ nút +.
4. **Contract** — Body khớp `CreateMemoryDto`: `title`, `memoryDate` (YYYY-MM-DD), optional `description`, `mediaUrls: string[]`, `tags: string[]`. Đồng bộ với `TimelineModule.CreateRequest` sau `bun run api:sync`.

---

## Don't Hand-Roll

- **Validation server** — Giữ Zod `createMemorySchema` là nguồn sự thật; client chỉ UX validation, không nhân đôi rules phức tạp.
- **Auth / couple** — Không tự resolve `coupleId` trên client; API đã gắn từ session.
- **Lưu Postgres** — Không bypass `store.saveMemory`; mọi side effect (home cache) đã có trong handler.

---

## Common Pitfalls

1. **Chỉ invalidate đúng một `queryKey`** — Timeline có nhiều `activeFilter`; invalidate bằng predicate `queryKey[0] === "timelineMemories"` hoặc refetch toàn bộ biến thể.
2. **`mediaUrls` là URL string** — Picker trả local URI; **không** POST trực tiếp `file://` nếu backend không serve được. Cần bước upload → public HTTPS URL, hoặc ship MVP không ảnh (`mediaUrls: []`) + copy rõ trong UI.
3. **Ngày** — `memoryDate` là **ngày kỷ niệm**, không nhầm với `createdAt` (server set).
4. **Tag vs filter** — Chip lọc dùng `chi-phi` / `nhiem-vu` / `ky-niem` / `tat-ca`; payload `tags` phải khớp convention filter nếu muốn xuất hiện đúng tab.
5. **Persisted query** — Timeline đã `staleTime: 0` + không persist; sau create vẫn nên invalidate để mọi tab đồng bộ.
6. **Lỗi 401** — Dùng chuỗi xử lý sẵn của `apiClient` / session.

---

## Code Examples (neo vào repo hiện tại)

**API handler (đã có):**

```46:74:api/src/modules/timeline.ts
timelineRoutes.post("/memories", async (context) => {
  const user = context.get("user");
  const coupleId = await resolveActiveCoupleIdAsync(user.id);
  const body = await readJson<Record<string, unknown>>(context);
  const input = validateCreateMemoryInput(body);
  // ... saveMemory, invalidateHomeCache, success 201
});
```

**DTO (đã có):**

```31:37:api/src/dto/timeline.dto.ts
const createMemorySchema = z.object({
  title: requiredTrimmedString("title là bắt buộc."),
  description: optionalTrimmedString(),
  memoryDate: isoDateString("memoryDate phải theo định dạng YYYY-MM-DD."),
  mediaUrls: z.array(nonEmptyTrimmedStringSchema).optional().default([]),
  tags: z.array(nonEmptyTrimmedStringSchema).optional().default([]),
});
```

**Client repository (đã có):**

```25:30:mobile/src/data/repositories/modules.repository.impl.ts
  async createMemory(params: TimelineModule.CreateRequest) {
    const response = await apiClient.post<
      ApiResponse<TimelineModule.CreateResponse>
    >("/timeline/memories", params);
    return response.data;
  }
```

**Nút + hiện tại (cần thay bằng navigate hoặc mở form):**

```33:45:mobile/src/features/timeline/components/TimelineHeader.tsx
  const handleAddMemory = async () => {
    try {
      const asset = await pickImage();
      if (asset) {
        Alert.alert(
          "Thành công",
          `Đã chọn ảnh: ${asset.fileName || "ảnh mới"}`,
        );
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };
```

---

## Độ tin cậy

| Khẳng định | Mức tin | Ghi chú |
|------------|---------|---------|
| POST contract | Cao | Đọc trực tiếp `timeline.dto.ts` + `timeline.ts` |
| Chưa có upload ảnh production | Cao | Không thấy module upload gắn memory trong grep nhanh |
| Invalidate queryKey | Cao | Pattern TanStack Query v5 |

---

## RESEARCH COMPLETE

**Bước tiếp theo gợi ý**

1. `/gsd-plan-phase` (khi đã có phase trên roadmap) hoặc ticket Kanban: MVP form (title, date, tag, description) + `createMemory` + invalidate.
2. Phase 2: tích hợp upload (presigned URL MinIO trong monorepo) rồi điền `mediaUrls`.

**Lưu ý orchestrator:** Lệnh `gsd-research-phase` yêu cầu **số phase** trong `{{GSD_ARGS}}` và binary `~/.cursor/get-shit-done/bin/gsd-tools.cjs` — môi trường hiện tại không chạy được init/roadmap tự động; tài liệu này thay thế output researcher cho chủ đề *create timeline item*.
