# Deep Scan Report - eMPlus Mobile

**Ngày scan:** 2026-03-15
**Scope:** Full codebase scan - tìm tất cả gaps còn lại

---

## Tổng quan phát hiện

| Mức độ   | Số lượng | Phân loại                             |
| -------- | -------- | ------------------------------------- |
| CRITICAL | 10       | App crashes, auth failures, data loss |
| HIGH     | 12       | Broken features, UX failures          |
| MEDIUM   | 15       | Code quality, minor UX, security      |
| LOW      | 8        | Polish, optimization                  |

---

## CRITICAL

### 1. Provider ordering có thể gây crash - `app/_layout.tsx`

- `ApiProvider` gọi `useToast()` bên trong `useConfiguredQueryClient()`
- `ToastProvider` wrap bên ngoài `ApiProvider` → **đúng thứ tự**
- **NHƯNG:** `ToastContainer` bên trong `ToastProvider` cần `useTheme()`, mà `ThemeProvider` có thể không phải ancestor
- **Impact:** Toast không render đúng theme hoặc crash
- **Fix:** Đảm bảo ThemeProvider wrap ngoài cùng, trước ToastProvider

### 2. withAccessToken truyền empty string khi chưa có session - `session-context.tsx:69-71`

```typescript
const token = session?.tokens.accessToken || "";
return operation(token); // Gọi API với Bearer ""
```

- Khi session null/đang hydrate, API call vẫn chạy với token rỗng
- **Impact:** API trả 401 silently, UX confusing
- **Fix:** Throw error hoặc block operation khi chưa có token

### 3. Race condition token refresh khi init - `session-context.tsx:82`

```typescript
setSession({ user, tokens }); // Async state update
if (tokens.refreshToken) await refreshAuth(); // Đọc stale state
```

- `refreshAuth()` chạy ngay sau `setSession()` nhưng state chưa update xong
- **Impact:** Refresh dùng token cũ/undefined → 401 error khi khởi động app

### 4. AppState refresh không có concurrency protection - `session-context.tsx:106-112`

- User background/foreground nhanh → nhiều `refreshAuth()` chạy đồng thời
- SessionContext không check `isRefreshing` flag
- **Impact:** Token exhaustion, user bị logout bất ngờ

### 5. Switch component thiếu export statement - `atoms/Switch.tsx`

- Component defined nhưng không có `export` ở cuối file
- **Impact:** Import Switch sẽ fail → crash

### 6. atoms/index.ts thiếu exports quan trọng

- **Thiếu:** Switch, Toast, BottomSheet
- Các component này heavily used nhưng không available từ barrel export
- **Impact:** Import path dài hoặc broken imports

### 7. Button thiếu 'ghost' variant style - `atoms/Button.tsx`

- Type declares `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'`
- StyleSheet không có key `ghost` → `dynamicStyles['ghost']` = undefined
- **Impact:** Ghost button render không có style, có thể crash

### 8. Hardcoded test credentials trong production code - `login.tsx:48-50`

```typescript
defaultValues: {
  email: "truongdq.dev@gmail.com",
  password: "12345678"
}
```

- **Impact:** Security risk - credentials lộ trong source code
- **Fix:** Xóa hoặc chỉ set trong `__DEV__` mode

### 9. Missing environment validation - `env.ts`

- `NODE_ENV` required nhưng không có default
- Trong React Native/Expo production, `process.env` có thể rỗng
- **Impact:** App crash khi validate env ở production

### 10. Mock API function trả undefined - `api.ts:15`

```typescript
export const seedHappyCase = () => Promise.resolve(); // Returns undefined
```

- Budget screen (line 35) access `seededMemories`, `seededBudget` → crash
- **Impact:** Seed feature broken hoàn toàn

---

## HIGH

### 11. No splash screen handling - `app/_layout.tsx`

- Không import `expo-splash-screen`
- Không có `preventAutoHideAsync()` / `hideAsync()`
- **Impact:** White flash khi mở app, 2 loading states liên tiếp

### 12. Deep linking chưa configure - `app.json`

- `scheme: "emplus"` có nhưng không có path mapping
- `expo-linking` installed nhưng chưa config
- **Impact:** Invite links, notification deep links không hoạt động

### 13. PersonalInfo - nút "Lưu" không làm gì - `personal-info.tsx:90`

```typescript
onPress={() => {}}  // Empty handler
```

- **Impact:** User edit thông tin nhưng không save được

### 14. Forgot password chưa implement - `login.tsx:212`

- Button "Quên mật khẩu?" có TODO comment, onPress rỗng
- **Impact:** Feature thiếu, user bị stuck nếu quên mật khẩu

### 15. OTP auto-focus chưa implement - `verify-otp.tsx:140-145`

- Comment nói auto-focus nhưng chưa code
- User phải tap từng ô nhập OTP
- **Impact:** UX tệ trên flow quan trọng

### 16. BottomSheet thiếu dependencies trong useEffect - `BottomSheet.tsx:216-217`

```typescript
useEffect(() => {
  snapToIndex(initialSnap);
}, []); // Missing deps
```

- Nếu parent thay đổi `initialSnap`, sheet không snap lại
- **Impact:** BottomSheet mở sai vị trí

### 17. AnimatedFlatList - animations vẫn broken

- `slide-left`, `slide-right`, `zoom` return `undefined`
- Swipe action callbacks không bao giờ invoke
- `style?: any` chưa fix
- Hardcoded colors: `#7C3AED`, `#E4E4E7`, `#71717A`

### 18. LoadingOverlay - không theme, không a11y

- Hardcoded `color="#fff"`, `backgroundColor: 'rgba(0,0,0,0.5)'`
- Không có `useTheme()`, không có `accessibilityRole`

### 19. Privacy.tsx + Profile.tsx (tab) - vẫn native Switch

- Import `Switch` từ `react-native` thay vì design system

### 20. QueryClient recreate khi showToast thay đổi - `api-context.tsx:68`

```typescript
return useMemo(() => { ... }, [showToast]);
```

- Mỗi lần `showToast` reference thay đổi → QueryClient mới → mất cache
- **Impact:** Cache loss, performance regression

### 21. Aggressive cache clear khi logout - `useLogout.ts:30`

- `queryClient.clear()` xóa TẤT CẢ queries, kể cả non-auth data
- **Impact:** UI flickering, unnecessary API calls sau logout

### 22. Memory leak - animation event listener - `animations/hooks.ts:39`

```typescript
AccessibilityInfo.addEventListener("reduceMotionChanged", _notify); // No cleanup
```

- Module-level listener không bao giờ remove
- **Impact:** Memory leak suốt lifetime của app

---

## MEDIUM

### 23. Hardcoded border-radius (chưa dùng tokens)

| Component | Value | Token                  |
| --------- | ----- | ---------------------- |
| Button    | 12    | `theme.radius.md/lg`   |
| Input     | 12    | `theme.radius.md/lg`   |
| Card      | 16    | `theme.radius.xl` (20) |
| Toast     | 14    | token tương ứng        |

### 24. Hardcoded shadows (chưa dùng tokens)

- Card, BottomSheet, Toast vẫn dùng raw shadow values

### 25. JSON.stringify anti-pattern - `variants.ts:51`

```typescript
}, [theme, JSON.stringify(props)]);
```

### 26. Theme switcher race condition - `switcher.tsx:83-89`

- `setTimeout(fn, 120)` hardcoded, không integrate `useReducedMotion()`

### 27. Tabs layout hardcoded colors - `_layout.tsx`

- `"#ec1334"`, `"#94a3b8"` thay vì palette tokens
- `appearance.tsx` cũng hardcoded `#ec1334`

### 28. `icon as any` casting trên nhiều screens

- profile.tsx, notifications.tsx (tab), add-expense.tsx, policy.tsx

### 29. Type safety issues

- `add-expense.tsx`: `data: any`, `err: any`
- `MoodVibeCheck.tsx`: invalid tws class `w-[SCREEN_WIDTH-44px]`
- `Text.tsx:32`: `(palette as any)[color]` unsafe lookup
- `AnimatedFlatList.tsx`: `style?: any`

### 30. Import pattern chưa thống nhất (3 patterns)

- `@/src/components/atoms/...` vs `@/src/ui-kit` vs raw `react-native`

### 31. SecureStore không try/catch JSON.parse - `storage.ts:12-19`

```typescript
const raw = await SecureStore.getItemAsync(...);
return raw ? JSON.parse(raw) : null;  // No try/catch
```

- Corrupted data → app crash

### 32. No error boundaries

- Không có error boundary nào wrap feature components
- Single component error crash toàn bộ section

### 33. Budget toLocaleString() thiếu locale - `BudgetSummaryCard.tsx`

- `.toLocaleString()` không truyền locale → format phụ thuộc device
- Nên dùng `.toLocaleString('vi-VN')`

### 34. Date timezone issue - `add-expense.tsx:73`

- `new Date(date).toISOString()` không account cho local timezone
- **Impact:** Expense date bị lệch ngày

### 35. Missing query key centralization

- Query keys hardcoded strings rải rác: `"budgetSummary"`, `"budgetExpenses"`, `"timeline"`, `"homeStats"`
- Dễ typo, khó invalidate đúng

### 36. Unused import trong switcher.tsx

- `View` imported nhưng không dùng (chỉ dùng `Animated.View`)

### 37. Missing letterSpacing trong token exports - `tokens/index.ts`

- `letterSpacing` defined nhưng không có trong master `tokens` export object

---

## LOW

### 38. Dead code - `engine.tsx:352-370`

- `registerTokenOverride()` / `useTokenOverride()` exported nhưng không ai import

### 39. Platform font override chưa implement - `tokens/index.ts:85-89`

- Comment "override per platform" nhưng chưa dùng `Platform.select()`

### 40. organisms/index.ts thiếu AppScreen export

### 41. ThemeSwitcherProvider chưa integrate trong app

### 42. Toast autoInvokeAfterMs declared nhưng chưa implement

### 43. Pairing screen keyboard dismiss chỉ on success, không on error

### 44. Profile screen syncEnabled state không persist/dùng

### 45. `react-dom` trong package.json không cần cho React Native

---

## Component Health Matrix (Final)

| Component        | API | A11y | Theme | Animation | Status               |
| ---------------- | --- | ---- | ----- | --------- | -------------------- |
| Toast            | ⭐  | ✅   | ⭐    | ⭐        | ⭐ Excellent         |
| BottomSheet      | ⚠️  | ✅   | ✅    | ⭐        | ✅ Good (deps issue) |
| Button           | ❌  | ✅   | ✅    | ❌        | ⚠️ (ghost variant)   |
| Input            | ✅  | ✅   | ✅    | ❌        | ✅ Good              |
| Card             | ✅  | ✅   | ✅    | ❌        | ✅ Good              |
| Switch           | ❌  | ✅   | ✅    | ✅        | ❌ (missing export)  |
| AppScreen        | ✅  | ⚠️   | ✅    | ❌        | ✅ Good              |
| Text             | ✅  | ⚠️   | ✅    | ❌        | ✅ Good              |
| Avatar           | ✅  | ✅   | ✅    | ❌        | ✅ Good              |
| Badge            | ✅  | ✅   | ✅    | ❌        | ✅ Good              |
| Skeleton         | ✅  | ✅   | ✅    | ⚠️        | ✅ Good              |
| LoadingOverlay   | ✅  | ❌   | ❌    | ❌        | ❌ Poor              |
| AnimatedFlatList | ❌  | ❌   | ❌    | ❌        | ❌ Poor              |

---

## Recommended Fix Priority

### P0 - App không chạy được nếu không fix

1. Switch missing export
2. atoms/index.ts missing exports (Switch, Toast, BottomSheet)
3. Button ghost variant style
4. Provider ordering (ThemeProvider → ToastProvider → ApiProvider)
5. Environment validation crash

### P1 - Auth/Security

6. withAccessToken empty string token
7. Token refresh race condition on init
8. AppState refresh concurrency
9. Hardcoded credentials trong login.tsx
10. SecureStore JSON.parse no try/catch

### P2 - Broken Features

11. Mock seedHappyCase returns undefined
12. PersonalInfo save button empty
13. Forgot password not implemented
14. OTP auto-focus not implemented
15. Deep linking not configured

### P3 - UX/Polish

16. Splash screen handling
17. LoadingOverlay theme + a11y
18. AnimatedFlatList fix animations + colors
19. Native Switch → design system (privacy, profile)
20. Hardcoded colors/radius/shadows → tokens

### P4 - Code Quality

21. Import pattern standardization
22. Type safety (remove any casts)
23. Error boundaries
24. Query key centralization
25. Dead code cleanup
