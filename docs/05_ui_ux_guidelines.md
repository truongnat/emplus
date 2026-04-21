# Em Plus - UI/UX Style Guide

> **Comprehensive spec:** See [`VISUAL_DESIGN_GUIDE.md`](VISUAL_DESIGN_GUIDE.md) for the full design system (tokens, semantic mapping, motion, glass rules, emotional UX, IA).
>
> **Current direction for user-facing surfaces:** See [`10_calm_care_ui_direction.md`](10_calm_care_ui_direction.md) for the "calm romantic utility" shift now being applied to landing, onboarding, and home.
>
> **Mobile-first implementation checklist:** See [`11_mobile_calm_care_refactor.md`](11_mobile_calm_care_refactor.md) for the next mobile refactor slice and screen-level priorities.
>
> **Canonical token values** live in `mobile/src/theme/tokens/palette.ts` and semantic theme files. Do not duplicate hex in new docs.

## 1. Design principles

- **Emotional:** Warm, soft tones that feel intimate and caring.
- **Minimalism:** Remove unnecessary elements; focus on memories and content.
- **Glassmorphism:** Liquid glass layers for depth and modernity.
- **Intuitive:** Key actions (pairing, add memory) are immediately accessible.

## 2. Color palette

| Name | Value | Meaning |
| :--- | :--- | :--- |
| **Primary** | `#FF6B81` (coral500) | Love, warmth |
| **Secondary** | `#7B61FF` (indigo500) | Connection, trust |
| **Accent** | `#4FD1C5` (teal500) | Freshness, hope |
| **Text primary** | `#1C1917` (taupe900) | Main text (light mode) |
| **Text secondary** | `#78716C` (taupe500) | Supporting text |
| **Success** | `#10B981` | Completion, positive state |
| **Error** | `#E11D48` | Error state |
| **Warning** | `#D97706` | Caution state |
| **Info** | `#7B61FF` (indigo) | Informational state |

## 3. Typography

Font: **Be Vietnam Pro** for Vietnamese support and modern feel. **Roboto Mono** for numeric data.

- **Body:** `BeVietnamPro_400Regular` (15px)
- **Medium:** `BeVietnamPro_500Medium` (15px)
- **SemiBold:** `BeVietnamPro_600SemiBold` (20px)
- **Bold:** `BeVietnamPro_700Bold` (24px)
- **ExtraBold:** `BeVietnamPro_800ExtraBold` (36px display)
- **Mono:** `RobotoMono_400Regular` / `RobotoMono_700Bold`

## 4. UI components

### 4.1 Glass cards

Background `rgba(255, 255, 255, 0.55)` (light) / `rgba(255, 255, 255, 0.08)` (dark) with blur 12-20 and 1px white border at 20% opacity.

### 4.2 Radii (border radius)

- **xs:** 4px -- tags, chips
- **sm:** 6px -- badges
- **md:** 10px -- inputs, standard cards
- **lg:** 14px -- auth inputs, emphasized cards
- **xl:** 20px -- glass cards
- **2xl:** 28px -- hero banners, modals
- **full:** 9999px -- pills, avatars, primary buttons

## 5. UX patterns

- **Haptic feedback:** Light vibration for important actions on mobile.
- **Skeleton loading:** Shimmer placeholders during data fetch.
- **Zero state:** Warm illustrations with encouraging copy for empty screens.
- **Reduced motion:** All animations collapse when the user prefers reduced motion.

---

*This guide summarizes key decisions. For the full design system spec, see [`VISUAL_DESIGN_GUIDE.md`](VISUAL_DESIGN_GUIDE.md).*
