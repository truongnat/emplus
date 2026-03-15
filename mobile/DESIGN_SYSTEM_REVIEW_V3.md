# Design System Review V3 - Post-Fix Round 2

**Ngày review:** 2026-03-15
**Scope:** Review lại toàn bộ sau khi agent thứ 3 đã fix

---

## So sánh qua các lần review

| Hạng mục                | V1               | V2               | V3               |
| ----------------------- | ---------------- | ---------------- | ---------------- |
| Theme Engine            | ⭐ Excellent     | ⭐ Excellent     | ⭐ Excellent     |
| Token system            | ⭐ Comprehensive | ⭐ Comprehensive | ⭐ Comprehensive |
| Component library       | ⚠️ Fair          | ✅ Good          | ✅ Good+         |
| Atoms theme-aware       | 2/12             | 6/12             | 10/12            |
| Atoms a11y              | 3/12             | 6/12             | 10/12            |
| Feature/screen adoption | ~60%             | ~80%             | ~85%             |
| NativeWind removal      | ⚠️ 95%           | ✅ Complete      | ✅ Complete      |
| Tamagui removal         | ✅ Complete      | ✅ Complete      | ✅ Complete      |

---

## V2 Issues - Trạng thái sau V3

### ✅ ĐÃ FIX

#### 1. Switch → useTheme() ✅

- Giờ dùng `useTheme()` với `theme.colors.brand.default` và `theme.colors.border.default`
- Đã thêm accessibility: `accessibilityRole="switch"`, `accessibilityState`

#### 2. Text → useTheme() ✅

- Giờ dùng `useTheme()` cho dynamic color support

#### 3. Avatar → useTheme() + a11y ✅

- Giờ dùng `useTheme()` với `theme.colors.text.onBrand`
- Đã thêm: `accessibilityRole="image"`, `accessibilityLabel`

#### 4. Badge → useTheme() + a11y ✅

- Giờ dùng `useTheme()` với color variants
- Đã thêm: `accessibilityRole="summary"`, `accessibilityLabel`

#### 5. Skeleton → useTheme() + a11y ✅

- Giờ dùng `useTheme()` với `theme.colors.surface.sunken`, `theme.colors.border.subtle`
- Đã thêm: `accessibilityRole="progressbar"`, `accessibilityLabel`

#### 6. organisms/index.ts exports ✅ (partial)

- `LoadingOverlay` đã được export
- `AppScreen` vẫn chưa export (xem mục còn tồn tại)

---

### ❌ CHƯA FIX

#### 7. LoadingOverlay - không theme-aware, không a11y

- **File:** `src/components/organisms/LoadingOverlay.tsx`
- Vẫn hardcoded `color="#fff"` và `backgroundColor: 'rgba(0,0,0,0.5)'`
- Không dùng `useTheme()`
- Không có accessibility attributes (`accessibilityRole`, `accessibilityLiveRegion`)

#### 8. AnimatedFlatList - animations chưa đầy đủ

- **File:** `src/components/organisms/AnimatedFlatList.tsx`
- `slide-left`, `slide-right`, `zoom` vẫn return `undefined` trong switch statement
- Có function `itemEnterAnim()` implement đúng nhưng SwipeableItem không gọi nó
- Hardcoded colors vẫn còn: `#7C3AED`, `#E4E4E7`, `#71717A`
- `style?: any` chưa đổi sang `ViewStyle`
- Không có a11y attributes

#### 9. Hardcoded border-radius (chưa dùng tokens)

| Component | Hardcoded          | Token tương ứng                          |
| --------- | ------------------ | ---------------------------------------- |
| Button    | `borderRadius: 12` | `theme.radius.md` hoặc `theme.radius.lg` |
| Input     | `borderRadius: 12` | `theme.radius.md` hoặc `theme.radius.lg` |
| Card      | `borderRadius: 16` | `theme.radius.xl` (20)                   |
| Toast     | `borderRadius: 14` | token tương ứng                          |

**Note:** BottomSheet đã dùng `theme.radius.xl` ✅

#### 10. Hardcoded shadows (chưa dùng tokens)

| Component       | Status                                               |
| --------------- | ---------------------------------------------------- |
| Card (elevated) | Hardcoded shadow values → nên dùng `theme.shadow.md` |
| BottomSheet     | Hardcoded shadow values → nên dùng `theme.shadow.lg` |
| Toast           | Hardcoded shadow values → nên dùng `theme.shadow.md` |

#### 11. JSON.stringify(props) anti-pattern

- **File:** `src/core/variants.ts:51`
- Vẫn dùng `JSON.stringify(props)` trong useMemo dependency

#### 12. Theme switcher race condition

- **File:** `src/theme/switcher.tsx:83-89`
- Vẫn hardcoded `setTimeout(fn, 120)`
- Không integrate `useReducedMotion()` hook

#### 13. Dead code trong engine.tsx

- `registerTokenOverride()` và `useTokenOverride()` vẫn exported nhưng không ai import

#### 14. Platform font override

- **File:** `src/theme/tokens/index.ts:85-89`
- Comment "override per platform" nhưng chưa dùng `Platform.select()`

#### 15. privacy.tsx - native Switch

- **File:** `app/profile-details/privacy.tsx`
- Vẫn import `Switch` từ `react-native` thay vì design system

#### 16. profile.tsx (tab) - native Switch

- **File:** `app/(tabs)/profile.tsx`
- Vẫn import `Switch` từ `react-native`

#### 17. \_layout.tsx (tabs) - hardcoded colors

- **File:** `app/(tabs)/_layout.tsx`
- `"#ec1334"` và `"#94a3b8"` vẫn hardcoded

#### 18. add-expense.tsx - any types

- `mutationFn: (data: any)` và `onError: (err: any)` vẫn dùng `any`

#### 19. MoodVibeCheck.tsx - invalid tws class

- `w-[SCREEN_WIDTH-44px]` không phải valid Tailwind class (biến JS không dùng được)

#### 20. Import pattern chưa thống nhất

- Pattern 1: `@/src/components/atoms/...` (mới, chuẩn)
- Pattern 2: `@/src/ui-kit` (legacy, dùng trong profile-details screens)
- Pattern 3: Raw `react-native` imports (profile.tsx, privacy.tsx)

#### 21. organisms/index.ts thiếu AppScreen export

---

## Issues mới phát hiện V3

### 22. `icon as any` casting trên nhiều screens

| File                    | Dòng          |
| ----------------------- | ------------- |
| profile.tsx             | `icon as any` |
| notifications.tsx (tab) | `icon as any` |
| add-expense.tsx         | `icon as any` |
| policy.tsx              | `icon as any` |

Nên type đúng Ionicons name thay vì cast `any`.

### 23. MoodVibeCheck.tsx hardcoded color strings

- Dùng hardcoded hex colors trong `getMoodConfig()` thay vì palette tokens
- VD: `"#22c55e"`, `"#eab308"`, `"#ec1334"`

### 24. ThemeSwitcherProvider chưa integrate vào app

- `ThemeSwitcherProvider` defined trong `src/theme/switcher.tsx`
- Nhưng **không được dùng** trong `app/_layout.tsx`
- Theme switching có thể không hoạt động

### 25. appearance.tsx hardcoded colors

- Dùng `#ec1334` hardcoded thay vì palette token

---

## Component Health Matrix V3

| Component        | API | A11y | Theme | Animation | V1  | V2  | V3   |
| ---------------- | --- | ---- | ----- | --------- | --- | --- | ---- |
| Toast            | ⭐  | ✅   | ⭐    | ⭐        | ⭐  | ⭐  | ⭐   |
| BottomSheet      | ✅  | ✅   | ✅    | ⭐        | ✅  | ✅  | ✅   |
| Button           | ✅  | ✅   | ✅    | ❌        | ⚠️  | ✅  | ✅   |
| Input            | ✅  | ✅   | ✅    | ❌        | ❌  | ✅  | ✅   |
| Card             | ✅  | ✅   | ✅    | ❌        | ⚠️  | ✅  | ✅   |
| Switch           | ✅  | ✅   | ✅    | ✅        | ✅  | ⚠️  | ✅ ↑ |
| AppScreen        | ✅  | ⚠️   | ✅    | ❌        | ⚠️  | ✅  | ✅   |
| Avatar           | ✅  | ✅   | ✅    | ❌        | ⚠️  | ⚠️  | ✅ ↑ |
| Badge            | ✅  | ✅   | ✅    | ❌        | ⚠️  | ⚠️  | ✅ ↑ |
| Skeleton         | ✅  | ✅   | ✅    | ⚠️        | ⚠️  | ⚠️  | ✅ ↑ |
| Text             | ✅  | ⚠️   | ✅    | ❌        | ❌  | ⚠️  | ✅ ↑ |
| LoadingOverlay   | ✅  | ❌   | ❌    | ❌        | ⚠️  | ⚠️  | ❌   |
| AnimatedFlatList | ❌  | ❌   | ❌    | ⚠️        | ❌  | ❌  | ❌   |

---

## Tổng kết tiến độ

### Đã fix qua 3 rounds: 13/14 issues gốc

| Issue gốc (V1)              | V1  | V2  | V3  |
| --------------------------- | --- | --- | --- |
| Text bodyBold/captionBold   | ❌  | ✅  | ✅  |
| Input size prop             | ❌  | ✅  | ✅  |
| tsconfig nativewind ref     | ❌  | ✅  | ✅  |
| AnimatedFlatList animations | ❌  | ❌  | ❌  |
| Button theme-aware          | ❌  | ✅  | ✅  |
| Input theme-aware           | ❌  | ✅  | ✅  |
| Card theme-aware            | ❌  | ✅  | ✅  |
| AppScreen theme-aware       | ❌  | ✅  | ✅  |
| Switch theme-aware          | ❌  | ❌  | ✅  |
| Text theme-aware            | ❌  | ❌  | ✅  |
| Avatar theme-aware + a11y   | ❌  | ❌  | ✅  |
| Badge theme-aware + a11y    | ❌  | ❌  | ✅  |
| Skeleton theme-aware + a11y | ❌  | ❌  | ✅  |
| personal-info → Input       | ❌  | ✅  | ✅  |

### Remaining issues (15 total)

**High priority (5):**

1. LoadingOverlay: useTheme() + a11y
2. AnimatedFlatList: fix animations, colors, types
3. privacy.tsx + profile.tsx: native Switch → design system
4. ThemeSwitcherProvider not integrated in app
5. organisms/index.ts: missing AppScreen export

**Medium priority (5):** 6. Hardcoded border-radius → tokens (Button, Input, Card, Toast) 7. Hardcoded shadows → tokens (Card, BottomSheet, Toast) 8. \_layout.tsx tabs: hardcoded colors 9. MoodVibeCheck: invalid tws class + hardcoded colors 10. `icon as any` casting trên 4+ screens

**Low priority (5):** 11. JSON.stringify anti-pattern trong variants.ts 12. Theme switcher race condition + useReducedMotion 13. Import pattern chuẩn hóa 14. Dead code cleanup (registerTokenOverride) 15. Platform font override + type safety (any types)
