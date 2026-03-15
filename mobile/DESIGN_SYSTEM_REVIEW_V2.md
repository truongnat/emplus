# Design System Review V2 - Post-Fix

**Ngày review:** 2026-03-15
**Scope:** Review lại toàn bộ sau khi agent thứ 2 đã fix

---

## So sánh với Review V1

| Hạng mục                | V1               | V2               | Thay đổi  |
| ----------------------- | ---------------- | ---------------- | --------- |
| Theme Engine            | ⭐ Excellent     | ⭐ Excellent     | Không đổi |
| Token system            | ⭐ Comprehensive | ⭐ Comprehensive | Không đổi |
| Component library       | ⚠️ Fair          | ✅ Good          | Cải thiện |
| Feature/screen adoption | ⚠️ ~60%          | ✅ ~80%          | Cải thiện |
| Tamagui removal         | ✅ Complete      | ✅ Complete      | Không đổi |
| NativeWind removal      | ⚠️ 95%           | ✅ Complete      | Fixed     |

---

## CRITICAL Issues - Trạng thái

### 1. Text.tsx - bodyBold/captionBold thiếu style ✅ FIXED

- `bodyBold`: fontSize 15, fontWeight '600', color palette.zinc700
- `captionBold`: fontSize 13, fontWeight '600', color palette.zinc500
- **Lưu ý:** Vẫn dùng static palette thay vì theme-aware colors (xem mục còn tồn tại)

### 2. Input.tsx - size prop broken ✅ FIXED

- `sizeStyles` map đúng 'sm' | 'md' | 'lg' sang container và input styles
- Style definitions cho `inputContainerSm/Md/Lg` đã có với padding và height đúng
- Đã thêm `useTheme()` - component giờ theme-aware
- Đã thêm accessibility props (accessibilityLabel, accessibilityHint, accessibilityState)

### 3. AnimatedFlatList - animations chưa implement ❌ CHƯA FIX

- `slide-left`, `slide-right`, `zoom` vẫn return `undefined`
- `itemExitAnimation` vẫn declared nhưng không implement
- `style?: any` và `contentContainerStyle?: any` vẫn chưa đổi sang `ViewStyle`
- Hardcoded colors vẫn còn: `#7C3AED`, `#E4E4E7`, `#71717A`, `#fff`

### 4. tsconfig.json - nativewind-env.d.ts reference ✅ FIXED

- Đã xóa `"nativewind-env.d.ts"` khỏi include array
- Thêm `"src/types/**/*.d.ts"` thay thế

---

## HIGH Issues - Trạng thái

### 5. Atoms theme-aware ⚠️ MỘT PHẦN

| Component      | V1                  | V2                          | Status      |
| -------------- | ------------------- | --------------------------- | ----------- |
| Button         | Static palette      | `useTheme()`                | ✅ Fixed    |
| Input          | Static palette      | `useTheme()`                | ✅ Fixed    |
| Card           | Hardcoded #fff/#000 | `useTheme()` + theme.colors | ✅ Fixed    |
| Text           | Static palette      | Static palette              | ❌ Chưa fix |
| Switch         | Static palette      | Static palette              | ❌ Chưa fix |
| Avatar         | Static palette      | Static palette              | ❌ Chưa fix |
| Badge          | Static palette      | Static palette              | ❌ Chưa fix |
| Skeleton       | Static palette      | Static palette              | ❌ Chưa fix |
| AppScreen      | Hardcoded #fff      | `useTheme()`                | ✅ Fixed    |
| LoadingOverlay | Hardcoded rgba      | Hardcoded rgba              | ❌ Chưa fix |
| Toast          | `useTheme()`        | `useTheme()`                | ✅ Đã tốt   |
| BottomSheet    | `useTheme()`        | `useTheme()`                | ✅ Đã tốt   |

**Kết luận:** 6/12 components theme-aware → Dark mode vẫn broken ở Switch, Avatar, Badge, Skeleton, Text, LoadingOverlay

### 6. Hardcoded values ⚠️ MỘT PHẦN

**Đã fix:**

| File          | Trước              | Sau                             |
| ------------- | ------------------ | ------------------------------- |
| Card.tsx      | `'#fff'`, `'#000'` | theme.colors.surface/border     |
| AppScreen.tsx | `'#fff'`           | theme.colors.background.default |

**Chưa fix:**

| File                 | Hardcoded                             | Nên dùng                 |
| -------------------- | ------------------------------------- | ------------------------ |
| LoadingOverlay.tsx   | `'rgba(0,0,0,0.5)'`, `"#fff"`         | theme scrim token        |
| AnimatedFlatList.tsx | `'#7C3AED'`, `'#E4E4E7'`, `'#71717A'` | palette tokens           |
| Button.tsx           | `borderRadius: 12`                    | token `radius.lg`        |
| Input.tsx            | `borderRadius: 12`                    | token `radius.lg`        |
| Card.tsx             | `borderRadius: 16`, shadow values     | `radius.xl`, `shadow.md` |
| BottomSheet.tsx      | shadow values                         | `shadow.xl`              |
| Toast.tsx            | shadow values                         | `shadow.lg`              |
| Badge.tsx            | padding/gap values                    | space tokens             |
| \_layout.tsx (tabs)  | `"#ec1334"`, `"#94a3b8"`              | palette tokens           |

### 7. Accessibility ⚠️ MỘT PHẦN

**Đã thêm a11y:**

| Component   | Thêm gì                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| Button      | accessibilityRole="button", accessibilityLabel, accessibilityHint, accessibilityState |
| Input       | accessibilityLabel, accessibilityHint, accessibilityState                             |
| Switch      | accessibilityRole="switch", accessibilityState, accessibilityLabel                    |
| Card        | accessibilityRole, accessibilityLabel                                                 |
| Toast       | accessibilityRole="alert", announceForAccessibility()                                 |
| BottomSheet | accessibilityRole="adjustable"                                                        |

**Vẫn thiếu a11y:**

| Component        | Thiếu                             |
| ---------------- | --------------------------------- |
| Text             | Không có semantic roles cho h1-h3 |
| Avatar           | Không có accessibilityLabel       |
| Badge            | Không có semantic role            |
| Skeleton         | Không có accessibilityLabel       |
| AnimatedFlatList | Không có list semantics           |
| LoadingOverlay   | Không có accessibilityLiveRegion  |
| AppScreen        | Không có landmark role            |

**a11y utilities** (`useFocusTrap`, `getHitSlop`, `checkContrast`, `useScreenReader`) vẫn chưa được integrate vào bất kỳ component nào.

### 8. Import pattern ⚠️ CẢI THIỆN NHƯNG CHƯA THỐNG NHẤT

**3 patterns vẫn tồn tại:**

| Pattern                               | Dùng ở đâu                                     | Nên giữ?         |
| ------------------------------------- | ---------------------------------------------- | ---------------- |
| `@/src/components/atoms/...`          | home, budget, login, care, timeline            | ✅ Chuẩn         |
| `@/src/ui-kit`                        | personal-info, notifications (profile-details) | ⚠️ Legacy        |
| `@/src/theme/tokens` vs `@/src/theme` | Mix trong nhiều files                          | ⚠️ Cần chuẩn hóa |

### 9. Styling approach ⚠️ KHÔNG ĐỔI

Vẫn 4 approaches: `StyleSheet.create()`, `tws()`, inline styles, mixed. Chưa chuẩn hóa.

---

## MEDIUM Issues - Trạng thái

### 10. JSON.stringify(props) anti-pattern ❌ CHƯA FIX

**File:** `src/core/variants.ts:51`

```typescript
}, [theme, JSON.stringify(props)]); // Vẫn còn
```

### 11. Race condition trong theme switcher ❌ CHƯA FIX

**File:** `src/theme/switcher.tsx:83-89`

- Vẫn hardcoded `setTimeout(fn, 120)`
- Không integrate `useReducedMotion()` hook
- Không respect system reduced motion settings

### 12. Profile screens design system adoption ⚠️ MỘT PHẦN

| Screen            | V1             | V2                      |
| ----------------- | -------------- | ----------------------- |
| personal-info.tsx | Raw TextInput  | ✅ Design system Input  |
| notifications.tsx | Native Switch  | ✅ Design system Switch |
| privacy.tsx       | Native Switch  | ❌ Vẫn native Switch    |
| profile.tsx (tab) | Native Switch  | ❌ Vẫn native Switch    |
| appearance.tsx    | Inline styling | ❌ Vẫn inline           |

### 13. Type safety ⚠️ MỘT PHẦN

| Issue                                               | Status      |
| --------------------------------------------------- | ----------- |
| add-expense.tsx: `data: any`                        | ❌ Chưa fix |
| add-expense.tsx: `err: any`                         | ❌ Chưa fix |
| MoodVibeCheck.tsx: `(palette as any)['orange-500']` | ❌ Chưa fix |
| MoodVibeCheck.tsx: invalid `w-[SCREEN_WIDTH-44px]`  | ❌ Chưa fix |
| AnimatedFlatList.tsx: `style?: any`                 | ❌ Chưa fix |

### 14. Dead/unused code ❌ CHƯA FIX

| Code                                             | File                                   |
| ------------------------------------------------ | -------------------------------------- |
| `registerTokenOverride()` / `useTokenOverride()` | theme/engine.tsx - không ai gọi        |
| Platform font override TODO                      | theme/tokens/index.ts - chưa implement |

---

## Thay đổi mới đáng chú ý

### Dependencies đã cleanup ✅

**Đã xóa:**

- `nativewind`, `react-native-css-interop`, `tailwindcss`, `prettier-plugin-tailwindcss`
- `react-native-keyboard-controller`, `react-native-worklets`

**Đã thêm:**

- `@shopify/flash-list`, `lucide-react-native`, `expo-haptics`, `expo-linking`

### ui-kit.tsx backward compat layer mở rộng ✅

Thêm exports: `Switch`, `Avatar`, `Badge`, `Skeleton` với types

### tsconfig restructured ✅

- Strict mode off nhưng có granular settings
- Thêm `tsconfig.components.json` cho component builds
- Proper excludes (node_modules, claude-docs, dist, build)

---

## Component Health Matrix V2

| Component        | API | A11y | Theme | Animation | V1           | V2                        |
| ---------------- | --- | ---- | ----- | --------- | ------------ | ------------------------- |
| Toast            | ⭐  | ✅   | ⭐    | ⭐        | ⭐ Excellent | ⭐ Excellent              |
| BottomSheet      | ✅  | ✅   | ✅    | ⭐        | ✅ Good      | ✅ Good                   |
| Switch           | ✅  | ✅   | ❌    | ✅        | ✅ Good      | ⚠️ Fair (theme regressed) |
| Button           | ✅  | ✅   | ✅    | ❌        | ⚠️ Fair      | ✅ Good ↑                 |
| Input            | ✅  | ✅   | ✅    | ❌        | ❌ Poor      | ✅ Good ↑↑                |
| Card             | ✅  | ✅   | ✅    | ❌        | ⚠️ Fair      | ✅ Good ↑                 |
| AppScreen        | ✅  | ⚠️   | ✅    | ❌        | ⚠️ Fair      | ✅ Good ↑                 |
| Text             | ✅  | ⚠️   | ❌    | ❌        | ❌ Poor      | ⚠️ Fair ↑                 |
| Avatar           | ✅  | ❌   | ❌    | ❌        | ⚠️ Fair      | ⚠️ Fair                   |
| Badge            | ✅  | ❌   | ❌    | ❌        | ⚠️ Fair      | ⚠️ Fair                   |
| Skeleton         | ✅  | ❌   | ❌    | ⚠️        | ⚠️ Fair      | ⚠️ Fair                   |
| LoadingOverlay   | ✅  | ❌   | ❌    | ❌        | ⚠️ Fair      | ⚠️ Fair                   |
| AnimatedFlatList | ❌  | ❌   | ❌    | ⚠️        | ❌ Poor      | ❌ Poor                   |

---

## Tổng kết

### Đã fix (7/14 issues)

1. ✅ Text bodyBold/captionBold styles
2. ✅ Input size prop implementation
3. ✅ tsconfig nativewind-env.d.ts reference
4. ✅ Button, Input, Card, AppScreen → theme-aware
5. ✅ Card hardcoded colors → theme colors
6. ✅ Button, Input, Card, Switch thêm accessibility
7. ✅ personal-info.tsx, notifications.tsx dùng design system components

### Chưa fix (7/14 issues)

1. ❌ AnimatedFlatList: animations, types, hardcoded colors
2. ❌ Switch, Avatar, Badge, Skeleton, Text, LoadingOverlay: không theme-aware
3. ❌ Hardcoded border-radius, shadows, spacing chưa dùng tokens
4. ❌ JSON.stringify anti-pattern trong variants.ts
5. ❌ Race condition trong theme switcher
6. ❌ Import/styling patterns chưa thống nhất
7. ❌ Type safety issues (any types, invalid tws class)

### Issues mới phát hiện

1. 🆕 privacy.tsx và profile.tsx (tab) vẫn dùng native Switch
2. 🆕 MoodVibeCheck.tsx dùng `(palette as any)['orange-500']` - unsafe type casting
3. 🆕 organisms/index.ts thiếu export AppScreen và LoadingOverlay

---

## Recommended Fix Order (còn lại)

| #   | Issue                                                    | Effort | Impact                    |
| --- | -------------------------------------------------------- | ------ | ------------------------- |
| 1   | Switch, Text, Avatar, Badge, Skeleton → useTheme()       | Medium | Dark mode hoạt động       |
| 2   | LoadingOverlay → useTheme() + a11y                       | Low    | Dark mode + accessibility |
| 3   | AnimatedFlatList: implement animations hoặc clean props  | Medium | API truthful              |
| 4   | AnimatedFlatList: replace hardcoded colors + fix types   | Low    | Consistency               |
| 5   | Replace hardcoded border-radius/shadows/spacing → tokens | Low    | Token adoption            |
| 6   | privacy.tsx, profile.tsx → design system Switch          | Low    | Consistency               |
| 7   | JSON.stringify → proper dependency comparison            | Low    | Performance               |
| 8   | Theme switcher → integrate useReducedMotion              | Low    | Accessibility             |
| 9   | Chuẩn hóa imports sang @/src/components pattern          | Medium | Maintainability           |
| 10  | Fix any types + invalid tws class                        | Low    | Type safety               |
| 11  | Thêm missing a11y cho Avatar, Badge, Skeleton, etc.      | Low    | Accessibility             |
| 12  | organisms/index.ts thêm missing exports                  | Low    | API completeness          |
