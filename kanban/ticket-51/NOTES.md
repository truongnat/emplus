## Hotfix (2026-04-04 — không PUT khi chỉ mở tab)

- Bỏ `saveMood` trong `useEffect` cleanup unmount (Strict Mode / đổi tab khiến PUT + toast dù chưa kéo).
- `lastPersistedValueRef` (hydrate + `onSuccess`): `saveMood` bỏ qua nếu trùng giá trị đã lưu → không toast thừa.
- `useAnimatedReaction`: bỏ lần chạy đầu (`previous === undefined`) để tránh flush JS thừa lúc mount.

## Hotfix (2026-04-04 — PUT ngay khi buông slider)

- **Cập nhật**: bỏ debounce 1.5s; `onPanFinalize` gọi thẳng `saveMood(rounded)` → mỗi lần user **kết thúc** kéo = một lần `PUT /care/mood` (tránh cảm giác không gọi API / timer bị `onBegin` hủy).

## Hotfix (2026-04-04)

- Mood slider: API `PUT /care/mood` được hẹn **1.5s** sau khi buông tay; chạm kéo lại trước khi hết hạn **hủy** timer (không gọi API bản cũ).
- **Maximum update depth**: `useEffect` cleanup có deps `[saveMood]` → mỗi lần identity đổi lại chạy cleanup → `saveMood` → invalidate → loop. Sửa: unmount-only `[]` + `mutateAsync` qua ref; `saveMood` stable `useCallback([])`.
- **Debounce kiểu input**: mỗi `onPanResponderMove` + `release` gọi `scheduleDebouncedMoodSave` (trailing debounce); đang kéo liên tục thì timer luôn reset; `grant` clear timer (hủy bản chờ). Không dùng throttle.
- **PUT đúng giá trị khi kéo nhanh**: timer gọi `saveMood(latestDragValueRef.current)` (không closure); `release` ưu tiên ref sau khi đã có `move` (tránh `moveX` lệch); không gán ref từ `value` mỗi render; chặn sync server khi `moodSaveDebouncePendingRef`.
- **UX mượt khi kéo**: `setValue` + `scheduleDebouncedMoodSave` gộp qua `requestAnimationFrame` (tối đa mỗi frame), hủy RAF khi grant/release/terminate/unmount.
- **Reanimated + RNGH Pan**: thumb + `progressSV` trên UI thread; blob/chữ chỉ `setState` throttle ~100ms; không còn đồng bộ `self` từ mọi lần refetch (hydrate một lần) để tránh ghi đè giá trị cũ. Debounce PUT chỉ bắt đầu sau `onFinalize` (buông tay) + 1,5s im.
- **Worklets crash**: không `runOnJS(ref.current)` / không gán `ref.current = fn` cho callback đưa vào worklet — dùng `useCallback` + `runOnJS(flushLabelThrottled)` / `runOnJS(onPanFinalize)` / `runOnJS(clearPendingMoodSave)` và deps `useAnimatedReaction` / `useMemo` gesture.
