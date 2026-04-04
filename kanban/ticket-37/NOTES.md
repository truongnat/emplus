# Ticket 37 — Notes

## Luồng dữ liệu

1. Mobile `listMemories` → `GET /timeline/memories?...` (Bearer).
2. API resolve `coupleId`, optional fake seed/sync, `store.listMemoriesByCouple`.
3. `useInfiniteQuery` gom `pages` → `groupMemories` → `SectionList`.

## Quyết định

- Timeline query: `staleTime: 0`, `refetchOnMount: 'always'`, không dehydrate `timelineMemories` (tránh cache cũ sau đổi seed).
- Ảnh: `expo-image`; preview modal full width từ `useWindowDimensions`.

## Skill tham chiếu (không thêm skill mới)

- `react-native-pro`, `mobile-design`, `api-design-pro` — khi mở rộng timeline sau này.
