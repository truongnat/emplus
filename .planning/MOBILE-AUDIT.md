# Mobile App Audit Report -- emplus

**Date:** 2026-04-05
**Scope:** mobile/src/ + mobile/app/ (full mobile app -- 174 src files, 24 route files)
**Stack:** React Native, Expo Router, NativeWind-free (StyleSheet-based), TanStack Query, Reanimated, Expo SDK

## Overall Score: 20/24

| Dimension | Score | Status |
|-----------|-------|--------|
| Clean Code | 3/4 | Good |
| Performance | 3/4 | Good |
| UI/UX Design | 4/4 | Excellent |
| Architecture | 4/4 | Excellent |
| Theme System | 3/4 | Good |
| Experience Design | 3/4 | Good |

## Scoring Guide
- 4 = Excellent -- production-ready, follows best practices
- 3 = Good -- minor issues, mostly solid
- 2 = Needs Work -- significant gaps to address
- 1 = Critical -- fundamental issues requiring immediate attention

---

## 1. Clean Code (3/4)

### What's Done Well

- **Atomic design hierarchy is well-structured.** Components are cleanly organized into atoms (`Button`, `Text`, `Input`, `Skeleton`, `Badge`, `Switch`, `Avatar`, `Toast`, `BottomSheet`), molecules (`Card`, `LottieHero`, `TabBarGridAnimatedBackground`), and organisms (`AppScreen`, `AnimatedFlatList`, `LoadingOverlay`). This promotes reuse and testability.

- **Feature-based module organization is exemplary.** Each feature (`auth`, `home`, `timeline`, `budget`, `care`, `mood`, `pairing`, `live`) has its own directory with components, hooks, styles, and query definitions colocated. Example: `src/features/timeline/` contains `components/`, `hooks/`, `screens/`, and an `index.ts` barrel.

- **Custom hooks extract logic cleanly.** `useHomeData` (src/features/home/hooks/useHomeData.ts), `useTimelineData` (src/features/timeline/hooks/useTimelineData.ts), and presentation hooks like `useLogin`, `useRegister`, `useForgotPasswordRequest` each encapsulate a single concern. `useHomeData` composes `useHomeQuery` + `mapDashboardData` to separate data fetching from transformation.

- **Form validation is centralized.** `src/forms.ts` defines all Zod schemas (`AuthFlowSchema`, `RegisterSchema`, `ForgotPasswordSchema`, `ResetPasswordSchema`, `OtpSchema`) with Vietnamese error messages in a single file. Clean, DRY, and i18n-ready.

- **Import organization is consistent.** Files follow a pattern: React imports, then Expo/RN imports, then internal imports with `@/src/` alias. No circular dependency issues observed.

- **Route files are thin.** `app/register.tsx` (16 lines), `app/forgot-password.tsx` (16 lines), and `app/(tabs)/timeline.tsx` (18 lines) delegate all logic to feature components. This is best practice for Expo Router.

### Issues Found

- **`src/api.ts` compatibility layer uses 37 `any` types.** Functions like `loginWithEmail(data: any)`, `createMemory(token: any, data: any)`, `listBudgetExpenses(token: any, data: any)` bypass the type-safe domain layer. The `token: any` parameter is vestigial -- the `ApiClient` singleton now handles tokens internally via `TokenManager`, making these parameters dead code that adds confusion.
  - File: `src/api.ts` lines 11-48
  - Impact: Consumers can pass arbitrary data, defeating the purpose of the typed schema layer.
  - Fallback types `MaleSuggestionsPayload = any` and `DashboardPayload = any` at lines 85-86 are explicitly lazy.

- **Triple negation in auth guard.** `app/(tabs)/_layout.tsx` line 332: `!!!session?.user.coupleId` -- triple `!` is confusing. This should be `!session?.user.coupleId`.

- **Large screen components with inline `createStyles` functions.** `app/(tabs)/care.tsx` defines `createCareStyles` (280 lines of StyleSheet) inline alongside 730 lines of component code. Similarly, `app/(tabs)/profile.tsx` defines `createProfileStyles` (230 lines) inline alongside 680 lines of component. These should be extracted to colocated `.styles.ts` files, matching the pattern already used by `homeScreen.styles.ts` and `loginScreen.styles.ts`.

- **`app/(tabs)/_layout.tsx` CustomTabBar props typed as `any`.** Line 63: `function CustomTabBar({ state, descriptors, navigation }: any)`. This loses all type safety for the tab bar integration. Expo Router provides `BottomTabBarProps` from `@react-navigation/bottom-tabs`.

- **Magic numbers in spacing.** `app/(tabs)/home.tsx` uses `paddingBottom: Math.max(128, insets.bottom + 100)` -- the `128` and `100` are unexplained constants repeated across multiple screens (`care.tsx`, `notifications.tsx`, `add-memory.tsx`). These should be extracted to a shared constant like `SCROLL_BOTTOM_TAB_CLEARANCE`.

- **Dead import: `Reveal` component is a no-op.** `src/ui-kit.tsx` line 68-74: `Reveal` renders `<>{children}</>` with no animation or logic. It is imported in `app/index.tsx` wrapping a View, providing zero functionality.

### Recommendations

1. **Retire `src/api.ts` compatibility layer.** Have consumers import directly from `dependencies` or create properly typed thin wrappers. Remove dead `token` parameters.
2. **Extract inline `createStyles` from `care.tsx` and `profile.tsx`** into `careScreen.styles.ts` and `profileScreen.styles.ts`.
3. **Create `SCROLL_PAD_BOTTOM` constant** in a shared layout config, referenced by all screens.
4. **Type the CustomTabBar props** using `@react-navigation/bottom-tabs` types.
5. **Remove the dead `Reveal` component** from `ui-kit.tsx`.

---

## 2. Performance (3/4)

### What's Done Well

- **Memoization is thorough and well-applied.** 137 uses of `useMemo`/`useCallback`/`memo` across 41 component files. The `ThemeProvider` in `src/theme/engine.tsx` is wrapped in `React.memo` and splits context into 4 separate providers (`ThemeColorsCtx`, `ThemeComponentsCtx`, `ThemeSpaceCtx`, `ThemeMetaCtx`) to prevent unnecessary re-renders when only one aspect of the theme changes.

- **Theme style caching uses `WeakMap`.** `useThemedStyles` (engine.tsx:159-179) caches style objects per theme instance, preventing re-computation on every render. This is a sophisticated optimization.

- **TanStack Query is well-configured.** `ApiProvider` (`src/framework/ctx/api-context.tsx`) sets up:
  - `staleTime: 5 min` default to reduce refetches
  - `gcTime: 30 min` for cache retention
  - Intelligent retry logic: `error.shouldRetry() && count < 2`
  - Network-aware with `NetInfo` integration via `onlineManager`
  - Selective persistence: timeline and dashboard queries are excluded from AsyncStorage dehydration to prevent stale data on cold start
  - `refetchOnWindowFocus: false` (correct for mobile)

- **Timeline uses `useInfiniteQuery`.** `src/features/timeline/components/timelineQueries.ts` implements pagination correctly with `getNextPageParam` pattern. The `AnimatedFlatList` organism provides virtualized rendering.

- **Image loading uses `expo-image`.** Profile (`app/(tabs)/profile.tsx`), memory detail, and add-memory screens use `expo-image`'s `Image` component with `contentFit="cover"`, `cachePolicy="memory-disk"`, and `priority="high"` for thumbnails. This provides built-in caching and progressive loading.

- **WebSocket reconnection has exponential backoff.** `src/features/live/live-channel-context.tsx` implements `Math.min(1000 * 2 ** (attempt - 1), 30_000)` for reconnection delays, capped at 30 seconds.

- **Token refresh is concurrency-safe.** `ApiClient` (src/core/api/index.ts:141-153) uses a singleton `refreshPromise` pattern to prevent concurrent refresh requests. Automatic retry on 401 ensures seamless token rotation.

### Issues Found

- **`ScrollView` instead of `FlatList` for care suggestions.** `app/(tabs)/care.tsx` lines 624-683 renders suggestions via `suggestions.map(...)` inside a `ScrollView`. If the API returns many suggestions, this renders all items at once. Should use `FlatList` with `keyExtractor`.

- **Date picker on iOS uses Modal with `TouchableOpacity` nesting.** `app/add-memory.tsx` lines 464-501 nests two `TouchableOpacity` components (one for overlay dismiss, one for content) with `e.stopPropagation()`. This is a known pattern that can cause touch handling issues on some iOS versions. Consider using `Pressable` or a purpose-built modal component.

- **`care.tsx` MoodOrb uses `Animated.API` (old) instead of Reanimated.** Lines 38-86 use `React Native Animated.timing` and `Animated.loop` with `useRef(new Animated.Value(1))`. The rest of the codebase uses `react-native-reanimated` worklet-based animations. Mixing animation systems adds JS thread pressure and increases bundle size.

- **Notifications screen renders all items at once.** `app/(tabs)/notifications.tsx` uses `ScrollView` with `items.map()` (lines 401-436) instead of a virtualized list. With many notifications, this will degrade scroll performance.

- **`createProfileStyles` and `createCareStyles` recompute full StyleSheet on every theme color change.** While wrapped in `useMemo`, these functions call `StyleSheet.create()` with 30+ styles each. The engine's `useThemedStyles` with `WeakMap` caching would be more efficient.

- **No image compression before upload.** `app/(tabs)/profile.tsx` `onChangeAvatar` (line 315-334) and `onChangeBanner` (line 337-357) upload raw `ImagePickerAsset` without resizing or compressing. Large photos will cause slow uploads and high bandwidth usage. `expo-image-manipulator` should be used to resize before upload.

### Recommendations

1. **Replace `ScrollView` + `.map()` with `FlatList`** in notifications and care suggestions.
2. **Migrate `MoodOrb` animation to Reanimated** for consistency and performance.
3. **Add image compression** using `expo-image-manipulator` before upload in profile and memory flows.
4. **Use `useThemedStyles` for profile and care screen styles** instead of inline `createStyles` + `useMemo`.

---

## 3. UI/UX Design (4/4)

### What's Done Well

- **Consistent visual language across all screens.** Every screen uses the same `AppScreen` organism as base, `LoginGridAnimatedBackground` for background treatment, and `useAuthGridChrome` for status bar/navigation bar chrome. This creates an immediately recognizable visual identity.

- **Glass morphism system is production-grade.** The app implements a dual-path rendering strategy:
  - `LiquidGlassView` (native component) when available on iOS 26+
  - `BlurView` + `LinearGradient` fallback with dark/light gradient overlays for all other devices
  - Both paths in `GlassCard`, `GlassButton`, and the tab bar provide equivalent visual output
  - Tab bar pill (`app/(tabs)/_layout.tsx`) implements animated active indicator with spring physics, haptic feedback, and proper glass borders

- **Typography hierarchy is well-defined.** `src/theme/typography-roles.ts` defines 8 semantic roles (`display`, `title`, `titleSm`, `body`, `bodyMedium`, `caption`, `numeric`, `numericSm`) using Be Vietnam Pro (5 weights) and Roboto Mono (2 weights). Usage in screens is consistent -- headers use `typographyRoles.title`, body text uses the `Text` atom's `body` variant, uppercase labels use `caption` with letter-spacing.

- **Component reuse is high.** The `Button` atom (5 variants, 3 sizes, loading state, icon slots) is used across all forms. The `Input` atom (2 variants: `default` and `soft`, 3 sizes, error/helper text, leading/trailing elements) handles all form fields consistently. `Card` molecule, `Badge`, `Avatar`, `Switch`, `Skeleton` -- all themed and reused.

- **Vietnamese copy is natural and contextual.** Labels like "Chăm sóc cô ấy" (care for her) vs "Góc của em" (my corner) adapt based on user gender. Empty states use friendly language: "Chưa có thông báo -- Khi có hoạt động mới, bạn sẽ thấy tại đây." Error messages from forms use natural Vietnamese: "Mật khẩu phải có ít nhất 8 ký tự."

- **Empty states are lovingly designed.** Each empty state uses Lottie animations:
  - Notifications: animated cat playing (`lottieInventory.notificationsEmptyCat`)
  - Home unpaired: animated heart (`lottieInventory.careHeart`)
  - Timeline empty: dedicated empty animation
  - Care no suggestions: cafe icon with copy "Chưa có gợi ý nào cho hôm nay"

- **Color palette is systematic.** The Aura theme uses a warm coral/indigo/teal triad with taupe neutrals. Dark mode uses `#1A1416` (darkBg) and `#261C20` (darkSurf) -- warm dark backgrounds that match the brand personality.

### Minor Notes

- Profile screen logout action at line 672-678 has no confirmation dialog. For a destructive action (clearing session), a confirmation alert would be appropriate.
- The `MoodVibeCheck` component is the only female-specific UI element; the male view has substantially more content (mood orb, partner mood card, status card, suggestions). Consider enriching the female experience.

---

## 4. Architecture (4/4)

### What's Done Well

- **Clean Architecture layers are properly separated.**
  - **Domain:** `src/domain/entities/schemas.ts` (auto-generated from OpenAPI), `src/domain/repositories/` (interfaces), `src/domain/usecases/` (UseCase abstract class + concrete implementations)
  - **Data:** `src/data/repositories/` (implementations of domain interfaces using `ApiClient`)
  - **Presentation:** `src/presentation/hooks/` (React hooks consuming use cases), `src/features/*/hooks/` (feature-specific query hooks)
  - **Framework:** `src/framework/di/dependencies.ts` (manual DI container), `src/framework/ctx/` (React contexts)

- **Dependency Injection is centralized and clean.** `src/framework/di/dependencies.ts` instantiates all repositories as singletons and wires them into use cases. The `dependencies` object provides a typed, tree-shakeable entry point. Every API call flows through: `dependencies.feature.useCase.execute(params)`.

- **UseCase pattern is consistent.** `src/domain/usecases/base.ts` defines `abstract class UseCase<Params, Result>` with `abstract execute(params: Params): Promise<Result>`. All 18 concrete use cases follow this contract.

- **Repository pattern properly abstracts data access.** `AuthRepository` interface (src/domain/repositories/auth.repository.ts) defines 9 methods; `AuthRepositoryImpl` implements them using `ApiClient`. This means switching from REST to GraphQL or a local database would require changing only the Data layer.

- **Session management is robust.** `SessionProvider` handles:
  - Hydration from SecureStore (tokens) + AsyncStorage (user metadata)
  - Automatic silent refresh before token expiry (`expiresIn * 1000 - bufferMs`)
  - App-state-aware refresh (re-refreshes on foreground resume)
  - Token synchronization to `TokenManager` singleton in render phase (not just effects) to prevent race conditions
  - Graceful error handling: network errors keep session alive, auth errors clear session

- **Navigation architecture is well-structured.** Root `_layout.tsx` wraps providers in correct order: `GestureHandlerRootView` > `ThemeModeProvider` > `ThemeProvider` > `ToastProvider` > `SessionProvider` > `ApiProvider`. Tab layout guards against unauthenticated/unpaired users with `Redirect`. Stack screens declare `contentStyle: { backgroundColor: "transparent" }` for auth flows to allow animated backgrounds.

- **API client is production-grade.** `src/core/api/index.ts` implements:
  - Singleton pattern
  - Automatic `Authorization` header injection via `TokenManager`
  - `AbortController` timeout with configurable duration
  - Multipart form detection (skips `Content-Type` header for `FormData`)
  - Concurrency-safe 401 token refresh with retry
  - Development logging
  - Typed response parsing

### Minor Notes

- `src/core/factory.tsx` exists but appears underutilized -- the `createVariants` utility in `src/core/variants.ts` is well-designed but not widely adopted yet.
- The `src/framework/ctx/api-context.tsx` correctly excludes large/volatile query keys from persistence, showing thoughtful cache design.

---

## 5. Theme System (3/4)

### What's Done Well

- **Token-based design system is comprehensive.** `src/theme/tokens/index.ts` defines 11 token categories:
  1. **Palette:** 80+ primitive colors (coral, zinc, indigo, teal, status colors)
  2. **Spacing:** 4pt grid scale (0-128px, 22 values)
  3. **Typography:** 10 font sizes (10-48px), 7 weights, 6 line heights, 6 letter spacings
  4. **Radius:** 8 values (0-9999)
  5. **Border width:** 6 values (0-3)
  6. **Shadow:** 7 presets with iOS + Android elevation parity
  7. **Motion:** 5 spring presets (`snappy`, `smooth`, `gentle`, `bouncy`, `stiff`) + 6 duration values
  8. **Z-index:** 10 semantic levels
  9. **Breakpoints:** 5 responsive breakpoints (375-1280)
  10. **Size scale:** Touch targets, input/button/nav/avatar sizes (Apple HIG compliant: min 44pt)
  11. **Icon size:** 5 scale values

- **Semantic color layer is complete.** `src/theme/tokens/semantic.ts` maps every UI role to palette primitives:
  - `background` (3 roles), `surface` (4 roles), `border` (4 roles), `text` (7 roles)
  - `brand` (5 roles), `secondary` (4 roles), `accent` (4 roles)
  - `status` (4 categories x 4 tokens each)
  - `interactive` (6 roles including disabled, hover, pressed states)
  - Both `lightColors` and `darkColors` are defined

- **Component tokens provide a third abstraction layer.** `buildComponentTokens` (semantic.ts:203-293) derives button, input, card, badge, avatar, bottom sheet, toast, tab bar, and skeleton tokens from semantic colors. This means components never reference raw palette values.

- **Multiple theme support is production-ready.** `themeRegistry` (src/theme/themes.ts) defines `aura` (premium romantic) and `telegram` (classic blue) themes via `createThemePair`. The `ThemeModeProvider` stores the active theme name. `extendTheme` and `deepMerge` utilities make creating new themes trivial.

- **Dark mode is a first-class citizen.** Every semantic token has dark mode values. The Aura dark theme uses warm tones (`#1A1416` bg, `#261C20` surface, `#F4F0E6` primary text) that match the romantic brand personality rather than defaulting to cold grays.

- **Elevation system maps to platform-appropriate shadows.** `src/theme/elevation.ts` provides 5 semantic levels (`rest`, `raised`, `floated`, `modal`, `overlay`) that map to iOS shadows + Android elevation values.

- **Typography roles bridge tokens and components.** `src/theme/typography-roles.ts` defines 8 ready-to-use `TextStyle` objects (`display`, `title`, `titleSm`, `body`, `bodyMedium`, `caption`, `numeric`, `numericSm`) using loaded font families.

### Issues Found

- **60+ hardcoded hex colors in component files.** Despite the comprehensive token system, grep reveals 60 occurrences of inline hex strings in `.tsx` files under `src/`. Examples:
  - `src/components/atoms/Button.tsx` line 169: `"#FFFFFF"` instead of `theme.colors.text.onBrand`
  - `src/features/auth/components/LoginBrandGradientTitle.tsx`: hardcoded gradient colors
  - `src/components/organisms/AnimatedFlatList.tsx`: 6 hardcoded colors
  - `src/features/mood/components/MoodVibeCheck.tsx`: 7 hardcoded colors

  Many of these are rgba values for glass effects and overlays. While some are inherently view-specific (blur tint overlays), others like `"#FFFFFF"`, `"#000000"`, and status colors should use tokens.

- **`Text` atom hardcodes palette colors in static styles.** `src/components/atoms/Text.tsx` lines 104-143 define variant styles with `color: palette.zinc900`, `color: palette.zinc700`, `color: palette.zinc500`. These are overridden by the dynamic `dynamicStyles.text` style, but the static defaults don't respond to theme changes -- if the dynamic override is removed or a new variant is added without the dynamic layer, it would break dark mode.

- **Spacing tokens are defined but not consistently consumed.** Screens use literal numbers for padding/margin (e.g., `paddingHorizontal: 24`, `gap: 16`, `marginBottom: 32`) instead of `theme.space[6]`, `theme.space[4]`, `theme.space[8]`. While the values happen to align with the 4pt grid, they are not referencing the tokens, making global spacing changes impossible.

- **`useBreakpoint` hook exists but is unused.** `src/theme/engine.tsx` lines 193-235 define a responsive breakpoint system, but no screen or component references it. All layouts assume phone dimensions.

### Recommendations

1. **Audit and replace hardcoded hex values.** Create a lint rule or code review checklist. Focus first on the ~20 instances that have direct token equivalents (`#FFFFFF` -> `palette.white` or `colors.text.onBrand`).
2. **Fix `Text` atom static styles** to use `'inherit'` pattern or remove hardcoded color defaults in favor of fully dynamic styles.
3. **Adopt spacing tokens in screens.** Replace `paddingHorizontal: 24` with `paddingHorizontal: theme.space[6]`. This enables future spacing scale adjustments.
4. **Use `useBreakpoint`** in the tab bar and home screen to adapt for iPad layouts.

---

## 6. Experience Design (3/4)

### What's Done Well

- **Reduced motion support is exceptional.** 41 reduced-motion references across 20 files. The system is multi-layered:
  - `useReducedMotion()` hook (src/animations/hooks.ts) uses singleton cache with system `AccessibilityInfo.isReduceMotionEnabled()`
  - `useReducedMotionShared()` provides a Reanimated `SharedValue` for worklet-based animation skipping
  - `withSpringRM`, `withTimingRM`, `withDelayRM` wrappers automatically skip animations when reduced motion is enabled
  - `enteringPresets`/`exitingPresets`/`layoutPresets` provide reduced-motion-aware Reanimated entering/exiting animations
  - `EmplusLottie` component checks reduced motion to skip Lottie animations

- **Accessibility is comprehensive.** 209 accessibility attribute references across 52 files:
  - All tab bar items have `accessibilityRole="tab"`, `accessibilityState={{ selected: isFocused }}`, `accessibilityLabel`, and `accessibilityHint`
  - Buttons universally have `accessibilityRole="button"` and labels
  - Headers use `accessibilityRole="header"`
  - `Skeleton` has `accessibilityRole="progressbar"` and `accessibilityState={{ busy: true }}`
  - `BottomSheet` handle has `accessibilityRole="adjustable"`
  - Dedicated `src/hooks/a11y.ts` provides: `useFocusTrap`, `getModalA11yProps`, `checkContrast` (WCAG contrast ratio calculator), `getHitSlop` (minimum touch target enforcer with platform-specific minimums: 48pt Android, 44pt iOS), `useScreenReader`

- **Loading states are present everywhere.** Loading indicators use branded Lottie animations (`lottieInventory.loader`) instead of generic spinners. Font loading shows a branded `FontLoadingScreen` with localized text. Session hydration shows the Em+ splash icon. Individual form submissions show `ActivityIndicator` inside buttons with disabled state.

- **Error handling flows are well-designed.** Global error handling in `ApiProvider` catches network errors ("Mất kết nối Internet"), server errors ("Hệ thống đang gặp sự cố"), and permission errors. Per-screen error states use Lottie error animations with retry buttons. Form validation errors show inline below fields with error icon.

- **Haptic feedback is integrated.** Tab bar presses trigger `Haptics.impactAsync(ImpactFeedbackStyle.Light)` (src/app/(tabs)/_layout.tsx:123). Care suggestion actions also use haptics.

- **Animation system is production-grade.** The `src/animations/` directory provides:
  - `usePressAnimation` -- 100% UI-thread press feedback with worklet-based scale + opacity
  - `useEntranceAnimation` -- standard fade+slide for screen transitions
  - `motionPresets` for reusable animation configurations
  - All animations use spring physics from the theme's spring tokens

- **Push notifications are bootstrapped.** `NotificationBootstrap` component in root layout registers for push notifications. `syncExpoPushTokenToServer` sends the Expo push token to the backend. Notifications screen handles display and mark-as-read.

- **WebSocket live channel provides real-time updates.** `LiveChannelProvider` manages WebSocket connection lifecycle with reconnection, error states, and couple-scoped subscriptions.

### Issues Found

- **No confirmation for destructive actions.** Profile logout (`app/(tabs)/profile.tsx` line 672-678) calls `clearSession()` + `router.replace("/login")` directly on press without any confirmation dialog. Memory delete also lacks confirmation. These are data-loss actions that should require explicit user confirmation per platform HIG.

- **No offline support or optimistic updates.** While TanStack Query's `networkMode: "always"` and `onlineManager` are configured, there is no offline queue for mutations. Creating a memory or expense while offline will fail silently (the error toast shows, but the data is lost). Optimistic updates are not implemented for any mutation.

- **No deep linking configuration.** `app.json` and route structure suggest Expo Router's file-based routing, but there is no `scheme` configuration or universal link handling visible. The `memory/[id].tsx` dynamic route could support deep links but is not configured.

- **Form handling does not use React Hook Form consistently.** While Zod schemas are defined in `src/forms.ts`, some screens (e.g., `add-memory.tsx`) use `useState` for each field instead of `useForm` + `zodResolver`. This means no field-level validation, no `isDirty` tracking, and no unified submission handling.

- **No skeleton loading states for data screens.** While the `Skeleton` atom component exists and is well-built, the home screen and care screen show nothing while data loads (they rely on the full-screen Lottie loader). A skeleton layout matching the content structure would provide better perceived performance.

### Recommendations

1. **Add confirmation dialogs for logout and delete actions** using `Alert.alert` with "Cancel" and "Confirm" options.
2. **Implement optimistic updates for mood changes and notification mark-as-read** using TanStack Query's `onMutate`/`onError`/`onSettled` pattern.
3. **Add offline mutation queue** using `@tanstack/react-query`'s `useMutation` with `onlineMutation` or a custom retry queue.
4. **Adopt React Hook Form consistently** for the add-memory and add-expense screens.
5. **Add skeleton loading states** for home, care, and timeline screens using the existing `Skeleton` component.

---

## Summary

### Achievements (What's been done well)

- Clean Architecture with proper domain/data/presentation layer separation and DI container
- Comprehensive token-based design system with 11 token categories, semantic colors, component tokens, and multi-theme support
- Production-grade accessibility: 209 a11y attributes, reduced motion support across 20 files, WCAG contrast checker, touch target enforcer, screen reader detection, focus trap
- Sophisticated theme engine with split contexts for performance, WeakMap style caching, and responsive breakpoint system
- Glass morphism system with LiquidGlass native path and BlurView fallback
- TanStack Query integration with network-aware caching, selective persistence, and global error handling
- Concurrency-safe token refresh with automatic retry on 401
- WebSocket live channel with exponential backoff reconnection
- Branded empty states with Lottie animations and contextual Vietnamese copy
- Feature-based module organization with thin route files

### Gaps (What's missing)

- No ErrorBoundary wrapping screens or feature modules
- No offline mutation queue or optimistic updates
- No deep linking / universal link configuration
- No skeleton loading states for main content screens
- No confirmation dialogs for destructive actions (logout, delete)
- No React Hook Form adoption in add-memory/add-expense forms
- No image compression before upload
- `useBreakpoint` is defined but unused (no tablet adaptation)

### Priority Improvements (What needs fixing)

1. **Replace `src/api.ts` compatibility layer** -- Remove all `any` types and dead `token` parameters. Have consumers use `dependencies` directly or create properly typed wrapper hooks. This is the single largest type-safety gap in the codebase.

2. **Add destructive action confirmations** -- Logout and delete operations must prompt the user. This is a UX standard violation that could cause data loss.

3. **Replace `ScrollView` + `.map()` with `FlatList`** in notifications and care suggestions -- These will degrade with volume. The `AnimatedFlatList` organism already exists for this purpose.

4. **Add image compression before upload** -- Profile avatar/banner and memory photo uploads send raw camera images. Use `expo-image-manipulator` to resize to max 1200px and compress to 80% quality.

5. **Adopt spacing tokens consistently** -- Replace literal `paddingHorizontal: 24` with `theme.space[6]` across all screens to enable global spacing adjustments.

6. **Extract large inline StyleSheet functions** -- Move `createCareStyles` and `createProfileStyles` to dedicated `.styles.ts` files, matching the existing pattern.

### Quick Wins (Low effort, high impact)

1. **Fix triple negation** in `app/(tabs)/_layout.tsx` line 332: `!!!session?.user.coupleId` -> `!session?.user.coupleId` (30 seconds)

2. **Remove dead `Reveal` component** from `ui-kit.tsx` and its import in `app/index.tsx` (2 minutes)

3. **Add `Alert.alert` confirmation for logout** in `app/(tabs)/profile.tsx` line 672 (5 minutes)

4. **Replace `"#FFFFFF"` with `theme.colors.text.onBrand`** in `Button.tsx` line 169 (1 minute)

5. **Type `CustomTabBar` props** using `BottomTabBarProps` from `@react-navigation/bottom-tabs` (5 minutes)

6. **Extract repeated scroll padding constant**: `const SCROLL_PAD_BOTTOM = (insets: EdgeInsets) => Math.max(128, insets.bottom + 100)` into `src/core/common/core.ts` (10 minutes)
