# Mobile UI Rebuild (dating-app aesthetic, Emplus domain) — Research

**Researched:** 2026-03-28  
**Domain:** React Native (Expo SDK 55) UI system + product-appropriate “dating app” visual language  
**Confidence:** HIGH (stack from repo); MEDIUM (visual/motion recommendations — design judgment)

## Summary

Emplus mobile is **Expo Router**–based with a **custom token-driven theme** (no Tamagui). The “Aura” theme already uses romantic-adjacent palette naming (rose, taupe, champagne) and semantic colors; the product is a **couple/life OS** (budget, timeline, care), so the rebuild should borrow **motion, depth, and card-forward layouts** from modern dating apps while **avoiding matchmaking semantics and frivolous treatment of money/work data**.

**Primary recommendation:** Freeze an extended **design token layer** (gradient stops, elevation, motion duration/easing, hero image aspect ratios), then rebuild **root shell + tab bar + auth** on tokens before feature screens—incremental rollout with feature flags or screen-by-screen migration.

<user_constraints>
## User Constraints (from CONTEXT.md)

*Không có file CONTEXT.md cho phase này — không có locked decisions từ `/gsd:discuss-phase`.*
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| — | (Không có REQ-ID từ orchestrator) | Toàn bộ tài liệu dưới đây phục vụ plan “full UI rebuild” theo mô tả người dùng |
</phase_requirements>

---

## 1. Current stack summary

### Navigation
| Item | Detail |
|------|--------|
| Router | **expo-router** `~55.0.5` — file-based routes under `mobile/app/` |
| Root | `Stack` in `app/_layout.tsx` — `headerShown: false`, `animation: "slide_from_right"` |
| Main app | `app/(tabs)/_layout.tsx` — **custom `tabBar`** (blur pill + detached “care” button), **not** default Material tabs |
| Entry flow | `app/index.tsx` — session hydrate → redirect `/login`, `/pairing`, or `/(tabs)/home` |

### Theming (not Tamagui)
| Layer | Location | Notes |
|-------|----------|--------|
| Mode | `ThemeModeProvider` (`src/theme/theme-mode-context.tsx`) | System/light/dark preference |
| Engine | `ThemeProvider` + hooks in `src/theme/engine.tsx` | Splits `SemanticColors`, `ComponentTokens`, `Theme` (space/motion) |
| Registry | `src/theme/themes.ts` | **Aura** theme: `createThemePair` — rose/taupe semantic colors, light + dark |
| Primitives | `src/theme/tokens/index.ts` | `space` (4pt grid), `fontSize`, `radius`, etc. |
| Product tokens | `src/theme/emplus-design-tokens.ts` | Input radius, focus border (indigo), form spacing, `pressScale` |
| Fonts (root) | `app/_layout.tsx` | **Be Vietnam Pro** (400–800), **Roboto Mono** (400, 700) via `@expo-google-fonts/*` |

**Package.json note:** Nunito & Playfair listed in `package.json` but root layout currently loads Be Vietnam + Roboto Mono only—verify before “playful typography” direction.

### Key UI entry points

| Area | Paths |
|------|--------|
| App routes | `mobile/app/_layout.tsx`, `index.tsx`, `login.tsx`, `register.tsx`, `verify-otp.tsx`, `forgot-password.tsx`, `reset-password.tsx`, `pairing.tsx`, `policy.tsx`, `add-expense.tsx`, `theme-showcase.tsx` |
| Tabs | `mobile/app/(tabs)/home.tsx`, `timeline.tsx`, `notifications.tsx`, `care.tsx`, `budget.tsx`, `profile.tsx`, `_layout.tsx` |
| Profile stack | `mobile/app/profile-details/*.tsx` |
| Design system surface | `mobile/src/ui-kit.tsx` — re-exports atoms/molecules/organisms/glass |
| Components | `mobile/src/components/atoms/*`, `molecules/Card.tsx`, `organisms/AppScreen.tsx`, `glass/*` |
| Features | `mobile/src/features/home/*`, `budget/*`, `timeline/*`, `mood/*`, `auth/*`, etc. |
| Motion | `mobile/src/animations/presets.ts`, `hooks.ts` — **Reanimated** press + entrance |

### Already in stack (relevant to “dating UI”)
- **react-native-reanimated** `4.2.1` + **react-native-worklets** `0.7.2`
- **react-native-gesture-handler** `~2.30.0`
- **expo-blur**, **expo-linear-gradient**, **expo-haptics**, **expo-image**, **lottie-react-native**
- **@shopify/flash-list** for performant lists
- **zeego** (native menus)

---

## 2. “Dating app UI” patterns: map vs avoid (Emplus domain)

### Map sensibly (HIGH confidence — product fit)
| Pattern | Emplus use |
|---------|------------|
| **Card stacks / horizontal paging** | Home “focus” cards, budget summaries, upcoming events—**browsing**, not rejecting people |
| **Warm gradients & soft elevation** | Care/mood, onboarding, empty states—**emotional warmth** without “match” narrative |
| **Photo-forward hero** | Couple avatar, profile, shared moments—**identity**, not dating gallery |
| **Micro-interactions** | Tab pill slide (already Animated), button press (`usePressAnimation`), haptics on primary actions |
| **Rounded, floaty chrome** | Tab bar blur pill—align radius/shadow tokens app-wide |
| **Typography contrast** | Display line + supportive body (keep **legible** for Vietnamese labels) |

### Avoid or soften (credibility for workplace/life OS)
| Pattern | Why |
|---------|-----|
| **Swipe-to-dismiss as primary money action** | Budget/expense flows need **precision and undo**—swipe OK for low-stakes queues, not sole affordance |
| **“Match / Super Like” metaphors** | Undermines **trust** on budget and calendar |
| **Over-randomized layout** | HR-ish clarity: **consistent density** on lists (timeline, notifications) |
| **Hyper-casual copy on errors** | Keep **plain, reassuring** status for money/sync failures |
| **Excessive full-screen takeover animations** | Slows **task completion** on repeat visits |

---

## 3. Concrete visual system recommendations

### Color (light / dark)
- **Anchor:** Existing Aura `brand` (rose) + `background`/`surface` taupe system in `themes.ts`—extend, don’t replace wholesale.
- **Gradients:** Define **semantic gradient tokens** (e.g. `gradient.hero`, `gradient.care`) with **fixed stops**—avoid ad-hoc hex in screens. Light: warm off-white → rose mist; Dark: deep taupe → rose glow at low opacity.
- **Money UI:** Reserve **neutral or teal-adjacent** accents for currency (optional second semantic family) so budget doesn’t read as “romance only.”
- **Contrast:** Keep focus ring indigo pattern from `emplus-design-tokens.ts` for WCAG-friendly focus vs brand rose.

### Typography scale
- **Body:** Be Vietnam Pro (already loaded)—map `fontSize` keys (`xs`–`4xl` in `tokens/index.ts`) to **named roles**: `display`, `title`, `body`, `caption`, `numeric` (Roboto Mono for amounts).
- **Playful:** Use **weight + tracking** before adding a third display font; if adding display font, load in `_layout.tsx` and add **one** `fontFamily.display` token.

### Radius / shadows / spacing
- **Radius:** Product already uses soft inputs (`emplusInputRadius` ~14)—elevate **card radius** one step (`theme.radius` / `space` alignment) for “stack” cards; keep **list rows** slightly tighter for scanability.
- **Shadows:** Tokenize **elevation levels** (rest / hover / modal)—Android `elevation` + iOS `shadow*` together; avoid different ad-hoc values per screen (tab bar already uses custom shadow).
- **Spacing:** Continue **4pt grid** (`space`); define **section rhythm** (e.g. 24 between sections, 12 within) matching `emplusFormSpacing`.

### Motion principles
- **Spring presets** already in theme (`usePressAnimation`, `useEntranceAnimation`)—standardize **enter**: 200–350ms, **press**: scale 0.96, **tab**: keep spring but consider **Reanimated** for tab indicator to match other UI-thread motion.
- **Reduce motion:** Respect system “reduce motion” if exposed later (`AccessibilityInfo` or RN API)—prefer opacity over large parallax for budget.

---

## 4. Phased rollout strategy

| Phase | Scope | Rationale |
|-------|--------|-----------|
| **0** | Token audit + dark parity + gradient/elevation tokens | Prevents one-off screens |
| **1** | `app/_layout.tsx` + loading shell + `index` splash | First paint and font story |
| **2** | Auth + pairing (`login`, `register`, `verify-otp`, `pairing`) | High visibility, bounded screens |
| **3** | Tabs shell `app/(tabs)/_layout.tsx` + shared list/screen wrappers | Daily navigation |
| **4** | Tab content by priority: `home` → `budget`/`care` → `timeline`/`notifications` → `profile` | Value vs effort |
| **5** | `profile-details/*`, `add-expense`, modals | Deep forms |

**Big-bang vs incremental**

| Approach | Risk | Mitigation |
|----------|------|------------|
| **Big-bang** | Regression flood, long branch | Poor fit without strong visual regression tooling |
| **Incremental (recommended)** | Temporary visual inconsistency | **Token-first** + migrate screen-by-screen; optional theme version flag in `themeRegistry` |

---

## 5. File / module areas likely to touch

```
mobile/app/
  _layout.tsx, index.tsx
  (tabs)/_layout.tsx, home.tsx, timeline.tsx, budget.tsx, care.tsx, notifications.tsx, profile.tsx
  login.tsx, register.tsx, verify-otp.tsx, pairing.tsx, add-expense.tsx
  profile-details/*.tsx

mobile/src/theme/
  tokens/, themes.ts, theme-builder.ts, engine.tsx, emplus-design-tokens.ts, aura-colors.ts

mobile/src/components/
  atoms/{Button,Input,Text,Avatar,Skeleton,...}
  molecules/Card.tsx
  organisms/{AppScreen,AnimatedFlatList,LoadingOverlay}.tsx
  glass/*

mobile/src/features/**/components/

mobile/src/animations/
```

**Patterns:** Prefer consuming **`useThemeColors` / `useTokens` / `useThemedStyles`** over raw hex in features.

---

## 6. Dependencies — only if justified

| Need | Already present? | New lib? |
|------|------------------|----------|
| Gestures + physics | RNGH + Reanimated | **No** for most stacks |
| Card stack / deck | — | Usually **custom** with Reanimated + RNGH; add **library** only if team wants off-the-shelf maintenance (evaluate bundle + RN 0.83 compatibility first) |
| Bottom sheet | `BottomSheet.tsx` exists | **No** unless replacing with `@gorhom/bottom-sheet` — **cost:** new API surface |
| Icons | lucide + Ionicons + MCI | **No** — consolidate usage in plan |
| Blur / gradient | expo-blur, expo-linear-gradient | **No** |

**Verdict:** **No mandatory new dependencies** for the aesthetic direction; invest in **token completion + shared composed components** first.

---

## Standard Stack (mobile — verified from `mobile/package.json`)

### Core
| Library | Version | Purpose |
|---------|---------|---------|
| expo | 55.0.6 | SDK |
| expo-router | ~55.0.5 | Navigation |
| react-native | 0.83.2 | Runtime |
| react | 19.2.0 | UI |

### Supporting (UI rebuild)
| Library | Version | Purpose |
|---------|---------|---------|
| react-native-reanimated | 4.2.1 | Motion |
| react-native-gesture-handler | ~2.30.0 | Gestures |
| react-native-worklets | 0.7.2 | Reanimated 4 worklets |
| expo-blur | ~55.0.9 | Tab bar / glass |
| expo-linear-gradient | ~55.0.8 | Gradients |
| expo-haptics | ~55.0.8 | Feedback |
| lottie-react-native | ~7.3.4 | Celebratory/empty states |
| @shopify/flash-list | 2.0.2 | Lists |

---

## Don't Hand-Roll

| Problem | Use instead |
|---------|-------------|
| Theme spread across screens | `tokens` + `themes.ts` + hooks |
| List perf on long feeds | FlashList |
| Press feedback blocking JS thread | Existing Reanimated `usePressAnimation` pattern |

---

## Common Pitfalls

1. **Tab bar blur `tint="light"` hardcoded** — breaks dark mode parity; drive from `useThemeColors` / mode.
2. **Mixed animation APIs** — `(tabs)/_layout` uses RN `Animated`; elsewhere Reanimated—**standardize** for 60fps consistency.
3. **Font loading drift** — package.json fonts ≠ `_layout` loaded fonts—**align** before typography phase.
4. **“Dating” copy leaking into budget** — **content audit** separate from visual refresh.

---

## Validation Architecture

`.planning/config.json` không có trong repo; coi Nyquist như **chưa cấu hình**.

| Property | Value |
|----------|--------|
| Automated tests (mobile) | **None found** (`*.test.*` / `*.spec.*`) |
| Quick check | `cd mobile && bun run typecheck` (or `npm run typecheck`) |

**Wave 0 gap:** Thiết lập ít nhất smoke/typecheck trong CI + checklist thủ công cho các màn auth/tabs sau khi đổi token.

---

## Sources

### Primary (HIGH)
- `mobile/package.json` — dependency versions
- `mobile/app/_layout.tsx`, `mobile/app/(tabs)/_layout.tsx`, `mobile/app/index.tsx` — navigation and shell
- `mobile/src/theme/*` — theme architecture

### Secondary (MEDIUM)
- Industry patterns for dating-app UI (motion, cards) — design judgment, not single doc

---

## Metadata

**Confidence breakdown:**  
- Stack / paths: **HIGH**  
- Visual recommendations: **MEDIUM** (subjective, needs design review)  
- Pitfalls: **HIGH** (derived from code inspection)

**Valid until:** ~30 days (re-verify after major Expo bump)
