# Em Plus — Visual Design Guide

Single source of truth for the Em Plus design system. Canonical token values live in `mobile/src/theme/tokens/` — do not duplicate hex in new docs.

---

## 1. Design philosophy

**Liquid Glass Morphism** — soft, warm, emotional, mature.

The app accompanies users across the lifecycle of a relationship. It should feel like a gentle companion, never an alarm clock.

### Principles

- **Soft depth** — Glass blur layers, large radii, no sharp edges.
- **Warm emotion** — Colors lean pink/coral, neutrals lean warm taupe (never cold gray).
- **Mature restraint** — Motion is slow and deliberate; copy is suggestive, never imperative.
- **Privacy first** — Sensitive data (care/cycle) is handled with non-clinical language and user-controlled sharing.

> "Look at it and feel love — use it for years without fatigue."

---

## 2. Color system

### 2.1 Core palette

| Role | Token name | Light | Dark | Meaning |
|------|-----------|-------|------|---------|
| **Primary** | `coral500` | `#FF6B81` | `#FF8FA3` | Love, warmth |
| **Secondary** | `indigo500` | `#7B61FF` | `#8E7CFF` | Connection, trust |
| **Accent** | `teal500` | `#4FD1C5` | `#2DD4BF` | Freshness, hope |

### 2.2 Primary scale (coral)

| Token | Hex |
|-------|-----|
| `coral50` | `#FFF1F2` |
| `coral100` | `#FFE4E6` |
| `coral200` | `#FECDD3` |
| `coral300` | `#FDA4AF` |
| `coral400` | `#FF8FA3` |
| `coral500` | `#FF6B81` |
| `coral600` | `#E5556B` |
| `coral700` | `#CC3F55` |
| `coral800` | `#B3293F` |
| `coral900` | `#991329` |

### 2.3 Secondary scale (indigo)

| Token | Hex |
|-------|-----|
| `indigo50` | `#EEF2FF` |
| `indigo100` | `#E0E7FF` |
| `indigo200` | `#C7D2FE` |
| `indigo300` | `#A5B4FC` |
| `indigo400` | `#8E7CFF` |
| `indigo500` | `#7B61FF` |
| `indigo600` | `#6D4AE6` |
| `indigo700` | `#5F33CC` |
| `indigo800` | `#5126B3` |
| `indigo900` | `#431999` |

### 2.4 Accent scale (teal)

| Token | Hex |
|-------|-----|
| `teal50` | `#F0FDFA` |
| `teal100` | `#CCFBF1` |
| `teal200` | `#99F6E4` |
| `teal300` | `#5EEAD4` |
| `teal400` | `#2DD4BF` |
| `teal500` | `#4FD1C5` |
| `teal600` | `#0D9488` |
| `teal700` | `#0F766E` |
| `teal800` | `#115E59` |
| `teal900` | `#134E4A` |

### 2.5 Neutrals (warm taupe)

Warm-shifted neutrals eliminate cold gray eye strain.

| Token | Hex |
|-------|-----|
| `taupe50` | `#FAFAF9` |
| `taupe100` | `#F5F5F4` |
| `taupe200` | `#E7E5E4` |
| `taupe300` | `#D6D3D1` |
| `taupe400` | `#A8A29E` |
| `taupe500` | `#78716C` |
| `taupe600` | `#57534E` |
| `taupe700` | `#44403C` |
| `taupe800` | `#292524` |
| `taupe900` | `#1C1917` |

Backgrounds: light `#FCF9F8` (cashmere off-white), dark `#1A1416` (warm cocoa).

### 2.6 Glass surface colors

| Token | Light | Dark |
|-------|-------|------|
| Glass/Primary | `rgba(255,255,255,0.55)` | `rgba(255,255,255,0.08)` |
| Glass/Secondary | `rgba(255,255,255,0.35)` | `rgba(255,255,255,0.04)` |

Glass surfaces always require a 1px border (`rgba(255,255,255,0.2)`) and a soft shadow.

### 2.7 Status colors

| Status | Bg | Text | Border | Icon |
|--------|----|------|--------|------|
| Error | `#FFF1F2` | `#E11D48` | `#FDA4AF` | `#E11D48` |
| Warning | `#FFFBEB` | `#D97706` | `#FCD34D` | `#D97706` |
| Success | `#ECFDF5` | `#047857` | `#A7F3D0` | `#10B981` |
| Info | `#EEF2FF` | `#6D4AE6` | `#A5B4FC` | `#7B61FF` |

Info uses the secondary indigo scale for visual cohesion.

### 2.8 Semantic token mapping

| Semantic path | Light value | Dark value |
|---------------|-------------|------------|
| `brand.default` | `coral500` `#FF6B81` | `coral500` `#FF6B81` |
| `brand.subtle` | `coral100` `#FFE4E6` | `coral800` `#B3293F` |
| `brand.muted` | `coral50` `#FFF1F2` | `coral900` `#991329` |
| `brand.strong` | `coral800` `#B3293F` | `coral300` `#FDA4AF` |
| `brand.text` | `coral600` `#E5556B` | `coral400` `#FF8FA3` |
| `secondary.default` | `indigo500` `#7B61FF` | `indigo400` `#8E7CFF` |
| `secondary.subtle` | `indigo100` `#E0E7FF` | `indigo800` `#5126B3` |
| `secondary.muted` | `indigo50` `#EEF2FF` | `indigo900` `#431999` |
| `secondary.text` | `indigo600` `#6D4AE6` | `indigo300` `#A5B4FC` |
| `accent.default` | `teal500` `#4FD1C5` | `teal400` `#2DD4BF` |
| `accent.subtle` | `teal100` `#CCFBF1` | `teal800` `#115E59` |
| `accent.muted` | `teal50` `#F0FDFA` | `teal900` `#134E4A` |
| `accent.text` | `teal600` `#0D9488` | `teal300` `#5EEAD4` |
| `interactive.primary` | `coral500` | `coral500` |
| `interactive.primaryHovered` | `coral400` | `coral400` |
| `interactive.primaryPressed` | `coral600` | `coral600` |
| `text.link` | `coral600` | `coral400` |
| `text.tertiary` | `indigo400` `#8E7CFF` | `indigo400` `#8E7CFF` |

### 2.9 Focus ring

Focus borders use **indigo** (`#6366F1` light / `#818CF8` dark), intentionally separated from the coral brand to meet a11y contrast requirements. Defined in `emplus-design-tokens.ts`.

---

## 3. Typography

### 3.1 Font stack

- **Primary:** Be Vietnam Pro (400 Regular, 500 Medium, 600 SemiBold, 700 Bold, 800 ExtraBold)
- **Monospace:** Roboto Mono (400 Regular, 700 Bold)

Fonts are loaded in `app/_layout.tsx`.

### 3.2 Type roles

| Role | Font | Size | Line height | Letter spacing | Usage |
|------|------|------|-------------|----------------|-------|
| `display` | Be Vietnam Pro 800 | 36 | 1.2x | -0.4 | Hero numbers, splash |
| `title` | Be Vietnam Pro 700 | 24 | 1.375x | -0.4 | Screen titles |
| `titleSm` | Be Vietnam Pro 600 | 20 | 1.375x | 0 | Section headers |
| `body` | Be Vietnam Pro 400 | 15 | 1.5x | 0 | Body text |
| `bodyMedium` | Be Vietnam Pro 500 | 15 | 1.5x | 0 | Emphasized body |
| `caption` | Be Vietnam Pro 400 | 13 | 1.5x | 0.4 | Labels, hints |
| `numeric` | Roboto Mono 700 | 20 | 1.2x | 0 | Day counters, stats |
| `numericSm` | Roboto Mono 400 | 15 | 1.5x | 0 | Small numbers |

### 3.3 Copy rules

- No ALL CAPS.
- Prefer short sentences.
- Use suggestion tone: "Maybe today is a day to care a little more" instead of "Send a message now."

---

## 4. Spacing and sizing

### 4.1 Space scale (4pt grid)

Values in `mobile/src/theme/tokens/index.ts`:

| Key | px |
|-----|-----|
| 0.5 | 2 |
| 1 | 4 |
| 2 | 8 |
| 3 | 12 |
| 4 | 16 |
| 5 | 20 |
| 6 | 24 |
| 8 | 32 |
| 10 | 40 |
| 12 | 48 |
| 16 | 64 |
| 20 | 80 |
| 24 | 96 |

### 4.2 Component heights

| Component | Height (px) |
|-----------|-------------|
| Input (sm) | 36 |
| Input (md) | 48 |
| Input (lg) | 56 |
| Button (sm) | 32 |
| Button (md) | 44 |
| Button (lg) | 52 |
| Tab bar | 56 |
| Header | 56 |

### 4.3 Touch targets

Minimum 44pt per Apple HIG. All interactive elements must meet this.

---

## 5. Shape

### 5.1 Radius scale

| Token | px | Usage |
|-------|-----|-------|
| `xs` | 4 | Tags, small chips |
| `sm` | 6 | Badges |
| `md` | 10 | Inputs, standard cards |
| `lg` | 14 | Auth inputs, emphasized cards |
| `xl` | 20 | Glass cards, feature cards |
| `2xl` | 28 | Hero banners, modals |
| `full` | 9999 | Pills, avatars, primary buttons |

### 5.2 Glass card shape

Glass cards use radius 20-28px (`xl` to `2xl`). No sharp corners anywhere in the app.

---

## 6. Elevation

Semantic elevation maps to shadow tokens (iOS shadow + Android elevation):

| Level | Shadow | Usage |
|-------|--------|-------|
| `rest` | sm | Default cards |
| `raised` | md | Elevated sections, action cards |
| `floated` | lg | FABs, floating elements |
| `modal` | xl | Modals, bottom sheets |
| `overlay` | 2xl | Full overlays |

---

## 7. Motion

### 7.1 Spring presets

| Preset | Damping | Stiffness | Mass | Usage |
|--------|---------|-----------|------|-------|
| `snappy` | 20 | 400 | 0.8 | Button press, toggle |
| `smooth` | 28 | 350 | 0.9 | Layout transitions, sheets |
| `gentle` | 32 | 280 | 1.0 | Bottom sheet close, large movements |
| `bouncy` | 12 | 500 | 0.7 | Micro-interactions, success checkmark |
| `stiff` | 50 | 400 | 1.0 | No-bounce, strict transitions |

### 7.2 Duration scale

| Token | ms | Usage |
|-------|-----|-------|
| `fast` | 150 | Micro-feedback |
| `normal` | 250 | Standard transitions |
| `slow` | 400 | Emphasized transitions |
| `slower` | 600 | Hero reveals |

### 7.3 Rules

- Ease-out curve for all transitions (180-280ms range for most UI).
- Press scale: 0.96 (buttons and interactive cards).
- Respect `prefers-reduced-motion` via the app's `useReducedMotion` hook — collapse all spring/timing to instant.
- No jitter, no harsh vibration in visual motion.
- Haptic feedback is allowed for *important actions* (pairing, submitting) but must be light.

---

## 8. Glass treatment

### 8.1 Rules

- Maximum **3 stacked blur layers** on any screen.
- Blur amount: 12-20 (expo-blur `blurAmount`).
- Every glass surface must include:
  - 1px border at `rgba(255,255,255,0.2)`
  - Soft shadow (elevation `rest` or `raised`)
- Text on glass must pass **WCAG AA** contrast against the blurred background.

### 8.2 Do not

- Use glass to obscure important text.
- Stack glass on glass on glass — legibility degrades.
- Use glass for functional/data-heavy screens (budget lists, timelines) — reserve for emotional surfaces (home hero, care cards, suggestions).

---

## 9. Component catalog

### 9.1 Atoms

| Component | Path | Notes |
|-----------|------|-------|
| `Button` | `src/components/atoms/Button.tsx` | Pill shape primary, outline/ghost/soft/danger variants |
| `Input` | `src/components/atoms/Input.tsx` | Glass surface, focus glow with indigo ring |
| `Text` | `src/components/atoms/Text.tsx` | Wraps typography roles |
| `Avatar` | `src/components/atoms/Avatar.tsx` | Gradient rings from avatar gradient set |
| `Badge` | `src/components/atoms/Badge.tsx` | Status variants (error/warning/success/info/default) |
| `Switch` | `src/components/atoms/Switch.tsx` | |
| `Checkbox` | `src/components/atoms/Checkbox.tsx` | |
| `Skeleton` | `src/components/atoms/Skeleton.tsx` | Shimmer loading placeholder |
| `Toast` | `src/components/atoms/Toast.tsx` | |
| `BottomSheet` | `src/components/atoms/BottomSheet.tsx` | |
| `EmplusLottie` | `src/components/atoms/EmplusLottie.tsx` | Lottie animation wrapper |

### 9.2 Molecules

| Component | Path | Notes |
|-----------|------|-------|
| `Card` | `src/components/molecules/Card.tsx` | Standard content card |
| `LottieHero` | `src/components/molecules/LottieHero.tsx` | Hero section with Lottie background |

### 9.3 Glass components

| Component | Path | Notes |
|-----------|------|-------|
| `GlassCard` | `src/components/glass/GlassCard.tsx` | Primary glass container |
| `LiquidGlassView` | `src/components/glass/LiquidGlassView.tsx` | Full liquid glass effect |

### 9.4 Organisms

| Component | Path | Notes |
|-----------|------|-------|
| `AppScreen` | `src/components/organisms/AppScreen.tsx` | Screen wrapper with safe area |
| `AnimatedFlatList` | `src/components/organisms/AnimatedFlatList.tsx` | Performant animated list |
| `LoadingOverlay` | `src/components/organisms/LoadingOverlay.tsx` | Full-screen loading state |

---

## 10. Emotional UX rules

These rules are non-negotiable for maintaining the app's emotional tone.

### 10.1 Language

- **No imperative commands.** Use "Maybe..." / "How about..." / "You might want to..." instead of "Do this now."
- **No alarm red for gentle prompts.** Reserve status error colors for actual errors. Care suggestions use brand coral at low opacity or muted backgrounds.
- **No clinical/medical language** on care/cycle screens. Use metaphors: "A sensitive phase" not "Menstrual phase."

### 10.2 Visual tone

- Suggestions appear as soft glass cards, not alert banners.
- Empty states use warm illustrations and encouraging copy: "A journey of a thousand miles begins with a single step. Save today's photo."
- Error states use empathetic metaphors: icon of two hands releasing, "The connection is interrupted, but feelings are not."

### 10.3 Care/cycle sensitivity (section 5.2 from product vision)

- Female view: horizontal 7-day calendar + cycle reporting button. Sharing to partner is opt-in.
- Male view: **no calendar, no clinical data.** Glass card with emotional phase text ("A day to be a little gentler") + affiliate suggestions framed as "Ideas for you."
- All data ownership belongs to the female partner. Male sees only what is shared.

---

## 11. Information architecture

### 11.1 Tab bar (vision)

| Tab | Name | Status | Description |
|-----|------|--------|-------------|
| 1 | Home | **Implemented** | Dashboard: greeting, hero love counter, upcoming events carousel, FAB for story, memories feed |
| 2 | Timeline | **Implemented** | Chronological activity feed with date groups |
| 3 | Care | **Implemented** | Gender-specific mood/cycle view with glass orb and suggestions |
| 4 | Experience | **Planned** | Custom-styled map with cafe/cinema/workshop pins, bottom sheet details |
| 5 | Budget | **Implemented** | Couple budget tracking: summary, expenses, filters |
| 6 | Profile | **Implemented** | Settings, personal info, appearance, privacy, help |

Notifications are accessible from the tab bar (implemented).

### 11.2 Auth flow

1. **Splash** — token check; if valid, go to Home
2. **Login** — email/password form (Google/Apple OAuth planned per PRD)
3. **Register** — new account with gender selection
4. **Verify OTP** — email/SMS code
5. **Forgot/Reset password** — standard recovery flow

### 11.3 Pairing flow

1. **Select Role** — gender selection (post-registration)
2. **Connection** — split screen: "Your code" (generate) + "Enter partner's code" (input)
3. **Loading** — avatars with socket-driven join; haptic feedback on successful pair

### 11.4 Profile sub-screens

- Personal info
- Appearance / theme selection (Aura / Telegram)
- Notification preferences
- Privacy settings
- Help / FAQ

---

## 12. Screen gradients

| Screen | Light stops | Dark stops |
|--------|------------|------------|
| Hero / onboarding | `coral50` → warm white → `taupe50` | `taupe900` → `darkBg` → `darkBg` |
| Care / mood | `coral100` → `coral50` → warm white | `coral900` → `taupe900` → `darkBg` |
| Budget | `#F0FDFA` → `taupe50` | `taupe900` → `#0F1A18` |
| Subtle section | `taupe50` → white | `darkBg` → `taupe900` |

---

## 13. Dark / light mode

| Aspect | Light | Dark |
|--------|-------|------|
| Mood | Romantic, shareable | Private, mature |
| Background | Warm off-white `#FCF9F8` | Warm cocoa `#1A1416` |
| Text primary | `taupe900` `#1C1917` | Warm ivory `#F4F0E6` |
| Brand | `coral500` at full saturation | `coral500` at full saturation |
| Glass | Higher opacity (0.55) | Lower opacity (0.08) |
| Transition | Fade + blur — no hard snap | Fade + blur — no hard snap |

---

## 14. Accessibility

- **Contrast:** All text on all surfaces must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- **Font weight:** No weight below 400 Regular. Caption at 13px/400 is the lightest allowed combination.
- **Focus indicators:** Indigo ring (`#6366F1` / `#818CF8`), 2px, clearly visible in both modes.
- **Reduced motion:** All animations collapse to instant via `useReducedMotion` hook.
- **Screen readers:** All interactive elements have accessible labels. Glass decorations are marked `accessibilityElementsHidden`.
- **Touch targets:** Minimum 44pt on all interactive surfaces.

---

## 15. Token file reference

| What | File |
|------|------|
| Primitive palette | `mobile/src/theme/tokens/palette.ts` |
| Spacing, radius, shadow, motion, sizing | `mobile/src/theme/tokens/index.ts` |
| Semantic colors + component tokens | `mobile/src/theme/tokens/semantic.ts` |
| Aura brand palette | `mobile/src/theme/aura-colors.ts` |
| Theme definitions (Aura, Telegram) | `mobile/src/theme/themes.ts` |
| Screen gradients | `mobile/src/theme/gradients.ts` |
| Elevation | `mobile/src/theme/elevation.ts` |
| Typography roles | `mobile/src/theme/typography-roles.ts` |
| Product tokens (focus, form, motion) | `mobile/src/theme/emplus-design-tokens.ts` |
| Theme engine + hooks | `mobile/src/theme/engine.tsx` |
| Public barrel | `mobile/src/theme/index.ts` |
