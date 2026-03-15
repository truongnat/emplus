# Design System Review Report

**Ngày review:** 2026-03-15
**Scope:** Toàn bộ mobile design system sau khi agent coding

---

## Tổng quan

| Hạng mục                  | Đánh giá                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| Theme Engine architecture | ⭐ Excellent - 4 contexts split, pre-built themes, performance tốt |
| Token system              | ⭐ Comprehensive - 3 tầng (primitive → semantic → component)       |
| Component library         | ⚠️ Fair - Foundations tốt nhưng nhiều lỗi implementation           |
| Feature/screen adoption   | ⚠️ ~60% - Nhiều screen chưa migrate xong                           |
| Tamagui removal           | ✅ Complete                                                        |
| NativeWind removal        | ⚠️ 95% - còn sót reference trong tsconfig                          |

---

## CRITICAL - Cần fix ngay

### 1. Text component - variant bị thiếu style

**File:** `src/components/atoms/Text.tsx`

- `bodyBold` và `captionBold` declared trong type nhưng không có style definition
- **Impact:** Runtime error khi sử dụng các variant này
- **Fix:** Thêm style definitions cho `bodyBold` và `captionBold` trong `StyleSheet.create()`

### 2. Input component - size prop bị broken

**File:** `src/components/atoms/Input.tsx`

- Dynamic key `styles[\`inputContainer${Size}\`]` nhưng không có style tương ứng (`inputContainerSm`, `inputContainerMd`, `inputContainerLg` không tồn tại)
- **Impact:** Size variants không hoạt động, style = `undefined`
- **Fix:** Tạo style definitions cho từng size hoặc dùng lookup object

### 3. AnimatedFlatList - props khai báo nhưng không implement

**File:** `src/components/organisms/AnimatedFlatList.tsx`

- `itemExitAnimation` declared trong props nhưng không được sử dụng
- Chỉ `fade` animation hoạt động; `slide-left`, `slide-right`, `zoom` return `undefined`
- **Impact:** API lừa dối - developer expect animation nhưng không có
- **Fix:** Implement đầy đủ hoặc remove khỏi props interface

### 4. tsconfig.json reference file đã xóa

**File:** `tsconfig.json` (line 60)

- `"nativewind-env.d.ts"` trong `include` array nhưng file không tồn tại
- **Impact:** TypeScript warning/error
- **Fix:** Xóa dòng `"nativewind-env.d.ts"` khỏi include array

---

## HIGH - Nên fix sớm

### 5. Atoms không theme-aware → Dark mode broken

Các component dùng `palette` trực tiếp (static, không react to theme change):

- Button, Input, Card, Text, Avatar, Badge

Các component dùng `useTheme()` (dynamic, hoạt động đúng):

- Toast, BottomSheet

**Impact:** Khi toggle dark mode, Button/Input/Card/Text **không đổi màu**

**Fix:** Migrate atoms sang `useThemeColors()` hoặc `useTheme()`

### 6. 20+ hardcoded values thay vì dùng tokens

| File                       | Hardcoded                | Nên dùng               |
| -------------------------- | ------------------------ | ---------------------- |
| `Card.tsx:25`              | `'#fff'`                 | `palette.white`        |
| `Card.tsx:33`              | `'#000'`                 | `palette.black`        |
| `AppScreen.tsx:32`         | `'#fff'`                 | theme background color |
| `LoadingOverlay.tsx:29`    | `'rgba(0,0,0,0.5)'`      | theme scrim token      |
| `AnimatedFlatList.tsx:273` | `'#7C3AED'`              | `palette.violet600`    |
| `AnimatedFlatList.tsx:318` | `'#E4E4E7'`              | `palette.zinc200`      |
| `AnimatedFlatList.tsx:330` | `'#71717A'`              | `palette.zinc500`      |
| `_layout.tsx (tabs)`       | `"#ec1334"`, `"#94a3b8"` | palette tokens         |
| `Button.tsx:62`            | `"#fff"`                 | `palette.white`        |
| `Button.tsx:82`            | `borderRadius: 12`       | `radius.lg` (14)       |
| `Card.tsx:26`              | `borderRadius: 16`       | `radius.xl` (20)       |
| `Card.tsx:33-37`           | shadow values            | `tokens.shadow.md`     |
| `BottomSheet.tsx:355-359`  | shadow values            | `tokens.shadow.xl`     |
| `Toast.tsx:449-453`        | shadow values            | `tokens.shadow.lg`     |
| `Button.tsx:81`            | `gap: 8`                 | `space[2]`             |
| `Input.tsx:50`             | `gap: 8`                 | `space[2]`             |
| `Input.tsx:64-65`          | padding values           | `space[4]`             |
| `Badge.tsx:37-41`          | padding/gaps             | space tokens           |
| `AnimatedFlatList.tsx:316` | `gap: 12`                | `space[3]`             |

### 7. Accessibility rất yếu

**Có a11y:** Toast (`accessibilityRole="alert"`), BottomSheet (`accessibilityRole="adjustable"`), Switch (`accessibilityRole="switch"`)

**Không có a11y:**

| Component        | Thiếu                                     |
| ---------------- | ----------------------------------------- |
| Button           | `accessibilityLabel`, `accessibilityHint` |
| Input            | `accessibilityLabel` cho semantic meaning |
| Avatar           | `accessibilityLabel` cho tên              |
| Badge            | semantic role                             |
| Text             | h1-h3 không map sang semantic roles       |
| AnimatedFlatList | list semantics                            |
| AppScreen        | landmark role                             |
| LoadingOverlay   | `accessibilityLiveRegion="polite"`        |

**Note:** a11y utilities đã viết đầy đủ (`useFocusTrap`, `getHitSlop`, `checkContrast`, `useScreenReader` trong `src/hooks/a11y.ts`) nhưng **không component nào import/sử dụng**.

### 8. Import pattern không thống nhất

Codebase có 3 import patterns khác nhau:

```typescript
// Pattern A - Mới, đúng
import { palette } from "@/src/theme/tokens";
import { AppText } from "@/src/components/atoms/Text";

// Pattern B - Cũ, backward compat
import { AppText, PressableScale } from "@/src/ui-kit";
import { palette } from "@/src/theme";

// Pattern C - Raw React Native
import { Text, View } from "react-native";
```

**Cần chuẩn hóa toàn bộ sang Pattern A.**

### 9. Styling approach không thống nhất

| Approach              | Dùng ở đâu      |
| --------------------- | --------------- |
| `StyleSheet.create()` | Budget, Care    |
| `tws()` utility       | Home, Timeline  |
| Inline styles         | Pairing         |
| Mixed                 | Profile Details |

**Cần chọn 1 approach chính (recommend `StyleSheet.create()` + tokens).**

---

## MEDIUM - Polish

### 10. `JSON.stringify(props)` trong useMemo dependency

**File:** `src/core/variants.ts:51`

```typescript
return useMemo(() => {
  // ...
}, [theme, JSON.stringify(props)]); // Anti-pattern
```

- Tạo string mới mỗi render → defeat memoization purpose
- **Fix:** Dùng shallow comparison hoặc extract relevant props

### 11. Race condition trong theme switcher

**File:** `src/theme/switcher.tsx:83-89`

```typescript
setTimeout(() => {
  fn();
  fadeAnim.value = withTiming(1, { duration: 180 });
}, 120); // Hardcoded timing assumption
```

- Giả định animation hoàn thành đúng 120ms
- Trên device chậm có thể gây visual glitch
- **Fix:** Dùng `runOnJS` callback từ animation completion

### 12. Profile screens không dùng design system components

| Screen                              | Vấn đề                                              |
| ----------------------------------- | --------------------------------------------------- |
| `profile-details/personal-info.tsx` | Dùng raw `TextInput` thay vì `Input` component      |
| `profile-details/notifications.tsx` | Dùng native `Switch` thay vì design system `Switch` |
| `profile-details/appearance.tsx`    | Inline styling thay vì tokens                       |

### 13. Type safety issues

| File                   | Vấn đề                                         |
| ---------------------- | ---------------------------------------------- |
| `add-expense.tsx`      | `mutationFn: (data: any) => ...`               |
| `MoodVibeCheck.tsx`    | Invalid Tailwind class `w-[SCREEN_WIDTH-44px]` |
| `AnimatedFlatList.tsx` | `style?: any` thay vì `ViewStyle`              |
| `Text.tsx:29`          | `palette[color]` không validate color exists   |

### 14. Unused/dead code

| Code                                             | File                                                    |
| ------------------------------------------------ | ------------------------------------------------------- |
| `registerTokenOverride()` / `useTokenOverride()` | `theme/engine.tsx:352-370` - defined nhưng không ai gọi |
| `itemExitAnimation` prop                         | `AnimatedFlatList.tsx` - declared nhưng không implement |
| Platform font override comment                   | `theme/tokens/index.ts:85-88` - TODO chưa làm           |

---

## Component Health Matrix

| Component        | API           | A11y    | Theme        | Animation     | Overall          |
| ---------------- | ------------- | ------- | ------------ | ------------- | ---------------- |
| Toast            | ⭐ Excellent  | ⚠️ Fair | ⭐ Excellent | ⭐ Excellent  | ⭐ **Excellent** |
| BottomSheet      | ✅ Good       | ⚠️ Fair | ✅ Good      | ⭐ Excellent  | ✅ **Good**      |
| Switch           | ✅ Good       | ⚠️ Fair | ✅ Good      | ✅ Good       | ✅ **Good**      |
| Button           | ✅ Good       | ❌ Poor | ✅ Good      | ❌ None       | ⚠️ Fair          |
| Avatar           | ✅ Good       | ❌ Poor | ✅ Good      | ❌ None       | ⚠️ Fair          |
| Badge            | ✅ Good       | ❌ Poor | ✅ Good      | ❌ None       | ⚠️ Fair          |
| Skeleton         | ✅ Good       | ⚠️ Fair | ✅ Good      | ⚠️ Basic      | ⚠️ Fair          |
| Card             | ⚠️ Minimal    | ⚠️ Fair | ❌ Poor      | ❌ None       | ⚠️ Fair          |
| AppScreen        | ✅ Good       | ⚠️ Fair | ❌ Poor      | ❌ None       | ⚠️ Fair          |
| LoadingOverlay   | ✅ Simple     | ❌ Poor | ❌ Poor      | ❌ None       | ⚠️ Fair          |
| Text             | ❌ **Broken** | ⚠️ Fair | ✅ Good      | ❌ None       | ❌ **Poor**      |
| Input            | ❌ **Broken** | ❌ Poor | ✅ Good      | ❌ None       | ❌ **Poor**      |
| AnimatedFlatList | ❌ **Broken** | ❌ Poor | ❌ Poor      | ⚠️ Incomplete | ❌ **Poor**      |

---

## Điểm tốt cần ghi nhận

- **Theme engine architecture** rất solid: context splitting cho performance, pre-built themes tránh runtime computation
- **Token hierarchy 3 tầng** đầy đủ: spacing (4pt grid), typography, radius, shadow, motion, z-index, breakpoints
- **5 brand themes** (ocean, rose, emerald, amber, highContrast) với light/dark variants
- **Toast component** chất lượng production: gesture-driven, animation, timer, theme-aware, accessibility
- **Auth hooks** clean: proper error handling, TanStack Query integration, session management
- **Tamagui removal** hoàn toàn sạch
- **Circular dependencies** đã được fix (theo commit history)
- **API context** có offline support (AsyncStorage persister), smart retry, network-aware queries

---

## Recommended Fix Order

1. **Text.tsx** - Thêm missing variant styles (`bodyBold`, `captionBold`)
2. **Input.tsx** - Fix size variant implementation
3. **tsconfig.json** - Remove `nativewind-env.d.ts` reference
4. **AnimatedFlatList.tsx** - Implement missing animations hoặc clean props
5. **Atoms theme-aware** - Migrate Button/Input/Card/Text sang `useThemeColors()`
6. **Hardcoded values** - Replace tất cả hex colors và magic numbers bằng tokens
7. **Import standardization** - Chuẩn hóa tất cả imports sang pattern mới
8. **Accessibility** - Thêm a11y attributes và integrate a11y utilities
9. **Styling approach** - Chọn và enforce 1 styling pattern
10. **Type safety** - Remove `any` types, fix type issues
