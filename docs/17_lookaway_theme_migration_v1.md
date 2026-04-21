# Em+ — LookAway Theme Migration V1

This document turns the latest LookAway analysis into a concrete theme migration for Em+.

It sits one layer below the style audit:

- [`16_lookaway_style_audit_v1.md`](./16_lookaway_style_audit_v1.md) explains what still feels off
- this file defines the base palette and surface language that future screens should inherit

---

## 1. Core Interpretation

LookAway is useful here because it is:

- quiet
- warm without being sentimental
- restrained
- credible

For Em+, the goal is not to copy LookAway literally.

The goal is to adapt its discipline to a product about relationships and memory.

That means:

- softer and warmer than productivity software
- clearer and calmer than romance-themed apps

---

## 2. Three Decisions

### 2.1 Cream, not pure white

Use `#FDF8F5` as the default light background reference.

Why:

- feels warmer and more personal than pure white
- hints at paper / journal / keepsake energy
- reduces the sterile feeling common in modern apps

### 2.2 One main accent only

Use **terracotta / burnt sienna** as the brand accent instead of bright romantic coral or multi-accent color play.

Why:

- warmer and more grounded
- less valentine-like
- more credible for a daily-use app
- matches the calm-care thesis better than high-energy pink or purple

### 2.3 Calm voice, not alert voice

All product copy should feel like a gentle reminder, never a stress source.

Prefer:

- "Sắp tới một ngày quan trọng"
- "Một điều nhỏ để chuẩn bị"
- "Bạn có thể bắt đầu một mình trước"

Avoid:

- urgent warning language
- over-romantic taglines
- emotionally inflated labels on utilitarian screens

---

## 3. Theme Rules

### 3.1 Backgrounds

- app background: warm cream
- card surfaces: slightly brighter cream/off-white, not stark white wherever possible
- section contrast should come from spacing and borders before shadow

### 3.2 Accent usage

Terracotta is for:

- primary CTA
- active emphasis
- small trust/detail highlights

Terracotta is **not** for:

- every chip
- every icon
- every card treatment

### 3.3 Secondary colors

Secondary and accent roles should become quieter support colors.

They may still exist in the system for:

- focus states
- links
- success/supportive moments

But they should stop competing with the main accent.

### 3.4 Borders and surfaces

Default visual separation should come from:

- thin warm borders
- subtle value shifts
- matte backgrounds

Not from:

- hard shadows
- heavy blur
- glossy glass layers

---

## 4. Typography Rules

The user explicitly wants a lighter, quieter typographic feel.

This should translate to:

- fewer heavy bold treatments
- fewer oversized emphatic numbers
- more reliance on spacing and grouping

For V1 migration:

- keep the current font family
- lower visual heaviness through color, contrast, and section density first
- do full typography-scale cleanup in a later phase if needed

---

## 5. What Migrates Now

This phase should migrate:

- mobile base palette
- mobile semantic theme roles
- mobile product token helpers used by auth/home/input surfaces
- web CSS root variables
- web default background noise levels

This phase should **not** try to finish:

- every screen-specific layout
- every dead theme branch
- every typography edge case

Those belong to later cleanup or screen passes.

---

## 6. Release Intent

After this migration, Em+ should feel closer to:

- a calm personal companion
- a private memory notebook with reminders
- a warm but disciplined product

And further away from:

- a glossy romance concept app
- a multi-accent premium demo
- a notification-heavy emotional dashboard

---

## 7. First Screen Pass

The first screen-specific migration pass starts with **login** and **register**.

Why auth first:

- it is one of the first brand impressions in the app
- it still carried visible aura-era signals such as strong gradients and showcase-like hero treatment
- it is the easiest place to make the new theme feel immediately real

What changed in the first pass:

- hero treatment became smaller and quieter
- CTA moved from gradient energy to a solid terracotta action
- auth card moved toward a matte cream surface instead of glossy glass energy
- brand wordmark was reduced to a calmer two-tone warm gradient
- register chips and auth form surfaces now follow the same matte, restrained treatment
