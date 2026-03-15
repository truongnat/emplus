# Em Plus — Design Proposal

**Ngày:** 2026-03-15
**App:** Em Plus — Ứng dụng đôi lứa cho người Việt
**Phạm vi:** Thiết kế lại toàn bộ giao diện, nâng tầm visual + UX

---

## 1. Định hướng thiết kế

### Concept: **"Warm Intimacy"**

App dành cho cặp đôi → giao diện phải gợi cảm giác **ấm áp, riêng tư, tin tưởng**. Không lạnh lẽo như app tài chính, không ồn ào như mạng xã hội. Cảm giác như một cuốn nhật ký chung — mềm mại, cá nhân, dễ chịu.

### 3 nguyên tắc cốt lõi

| Nguyên tắc              | Ý nghĩa                                     | Hiện tại          |
| ----------------------- | ------------------------------------------- | ----------------- |
| **Soft & Warm**         | Màu sắc ấm, góc bo tròn lớn, shadow mềm     | Violet lạnh, cứng |
| **Depth without noise** | Glass morphism tinh tế, không rối mắt       | Glass overused    |
| **Emotional resonance** | Typography nói chuyện, animation có cảm xúc | Animation cứng    |

---

## 2. Hệ màu sắc mới

### Thay đổi chính: từ Violet lạnh → Rose-Warm làm primary

```
Lý do: Violet #7C3AED quá "tech-startup".
App đôi lứa cần màu có cảm xúc hơn.
```

### Primary — Rose (tình yêu, ấm áp)

```
rose-50:  #FFF1F2   ← backgrounds nhẹ
rose-100: #FFE4E6   ← surface tints
rose-200: #FECDD3   ← borders
rose-400: #FB7185   ← interactive hover
rose-500: #F43F5E   ← primary default ← BRAND COLOR
rose-600: #E11D48   ← primary press
rose-700: #BE123C   ← dark mode primary
```

### Surface — Warm Cream (không phải trắng lạnh)

```
Light mode:
  background:   #FFFBF9   ← kem trắng ấm (không phải #FFFFFF)
  surface:      #FFF5F0   ← card background
  surface-2:    #FFF0EA   ← input background
  border:       #F5E0D8   ← border nhẹ

Dark mode:
  background:   #1A1015   ← đen có hint rose (không phải #000)
  surface:      #261820   ← card dark
  surface-2:    #301E28   ← input dark
  border:       #3D2535   ← border dark
```

### Accent — Amber (kỷ niệm, đặc biệt)

```
amber-400: #FBBF24   ← highlights, "ngày đặc biệt"
amber-500: #F59E0B   ← badges, tags
```

### Semantic colors

```
success:  #10B981  (emerald — "mọi thứ ổn")
warning:  #F59E0B  (amber)
error:    #EF4444  (red)
info:     #6366F1  (indigo — nhẹ nhàng hơn blue)

Mood colors (Care screen):
  calm:       #A78BFA  (violet nhẹ)
  happy:      #34D399  (green tươi)
  sad:        #60A5FA  (blue mềm)
  anxious:    #FBBF24  (amber)
  irritable:  #F87171  (red nhẹ)
```

### Gradient signatures

```
Hero gradient:    rose-500 → rose-400 → pink-300   (ấm, sunrise)
Memory gradient:  amber-400 → rose-400             (golden hour)
Dark overlay:     rgba(26,16,21,0.7) → transparent (dark, romantic)
Glass light:      rgba(255,245,240,0.72)           (warm glass)
Glass dark:       rgba(48,30,40,0.65)              (dark glass)
```

---

## 3. Typography

### Thay đổi: thêm cảm xúc vào typography

**Hiện tại:** Chỉ dùng System font → generic, không có personality.

**Đề xuất:**

```
Display (tên người, love counter):
  font-family: italic system serif hoặc custom Display font
  → dùng cho "Tên Cô Ấy", "248 ngày", số đếm ngày yêu

Body:
  font-family: System (giữ nguyên, tối ưu readability)

Mono (số tiền, ngày giờ):
  font-family: Courier / Mono → numbers rõ ràng hơn
```

### Scale mới (8pt grid)

| Token        | Size | Weight | Line Height | Dùng cho             |
| ------------ | ---- | ------ | ----------- | -------------------- |
| `display-xl` | 40px | 800    | 48px        | Love counter, số lớn |
| `display-lg` | 32px | 700    | 40px        | Screen titles lớn    |
| `display-md` | 24px | 700    | 32px        | Card titles chính    |
| `title`      | 20px | 600    | 28px        | Section headers      |
| `body-lg`    | 17px | 400    | 26px        | Body text chính      |
| `body`       | 15px | 400    | 24px        | Body thứ cấp         |
| `label`      | 13px | 600    | 18px        | Labels, tags         |
| `caption`    | 12px | 400    | 16px        | Hints, timestamps    |
| `micro`      | 11px | 500    | 14px        | Badges, status pills |

### Khoảng cách chữ

```
display:  letter-spacing: -0.5px  (tight, impactful)
title:    letter-spacing: -0.2px
body:     letter-spacing: 0px     (natural)
label:    letter-spacing: 0.5px   (airy, readable)
micro:    letter-spacing: 0.8px   (ultra-legible)
```

---

## 4. Spacing & Shape

### Spacing — 4pt grid nghiêm túc

```
space-1:  4px
space-2:  8px
space-3:  12px
space-4:  16px
space-5:  20px
space-6:  24px
space-8:  32px
space-10: 40px
space-12: 48px
space-16: 64px

Screen horizontal padding: 20px (space-5) — thống nhất
Section vertical gap:       24px (space-6)
Card inner padding:         16px (space-4)
Item gap:                   12px (space-3)
```

### Border radius — chỉ 5 giá trị

```
radius-sm:   8px   ← tags, small chips
radius-md:  12px   ← buttons, inputs, small cards
radius-lg:  16px   ← cards, modals
radius-xl:  24px   ← large cards, hero areas
radius-2xl: 32px   ← bottom sheets, floating elements
radius-full: 9999  ← pills, avatars, badges
```

**Quy tắc:** Card → `radius-lg`. Modal/Sheet → `radius-2xl`. Button → `radius-md`. Không dùng giá trị ngoài 5 giá trị này.

### Shadow system — 3 mức

```
shadow-sm:
  iOS:     offset(0,2), blur 8, spread 0, opacity 0.06
  Android: elevation 2

shadow-md:
  iOS:     offset(0,4), blur 16, spread 0, opacity 0.10
  Android: elevation 6

shadow-lg:
  iOS:     offset(0,8), blur 32, spread 0, opacity 0.14
  Android: elevation 12

shadow-glow (cho active/brand elements):
  iOS:     offset(0,4), blur 20, color=rose500, opacity 0.25
  Android: elevation 10 + tint
```

---

## 5. Component Redesign

### Bottom Tab Bar

**Hiện tại:** Pill floating với blur background.
**Đề xuất:** Giữ concept, tinh chỉnh proportions.

```
┌─────────────────────────────────────────┐
│                                         │
│  [🏠]  [💰]  [  ❤️  ]  [📅]  [👤]   │  ← 72px height
│   ●                                     │  ← dot indicator bên dưới icon
└─────────────────────────────────────────┘

- Nền: warm glass rgba(255,245,240,0.85) + blur(20)
- Border top: rgba(245,224,216,0.6) 1px
- Active icon: rose-500, scale 1.1
- Inactive icon: zinc-400
- Active dot: rose-500, 4px circle, fade in
- Care button: gradient rose-500→pink-400, shadow-glow
- Animation: icon scale spring + dot slide
```

### Cards

**Hiện tại:** White bg + shadow.
**Đề xuất:** Warm surface + subtle texture.

```
Variant 1 — Default Card:
  background: surface (#FFF5F0)
  border: 1px solid border (#F5E0D8)
  border-radius: radius-lg (16px)
  shadow: shadow-sm
  padding: 16px

Variant 2 — Elevated Card:
  background: white
  border: none
  shadow: shadow-md
  border-radius: radius-lg

Variant 3 — Glass Card:
  background: rgba(255,245,240,0.72)
  border: 1px rgba(255,220,210,0.5)
  backdrop-filter: blur(16px)
  border-radius: radius-xl (24px)

Variant 4 — Gradient Hero Card:
  background: linear-gradient(135°, rose-500, rose-400, pink-300)
  border-radius: radius-xl
  padding: 20px
  → dùng cho love counter, hero moments
```

### Buttons

```
Primary:
  bg: rose-500
  text: white
  shadow: shadow-glow (rose tint)
  pressed: rose-600, scale 0.97
  height: 52px (lg), 44px (md), 36px (sm)
  border-radius: radius-md (12px)

Secondary:
  bg: rose-50
  text: rose-600
  border: 1.5px rose-200
  pressed: rose-100

Ghost:
  bg: transparent
  text: rose-500
  pressed: rose-50

Danger:
  bg: red-50
  text: red-600
  border: 1.5px red-200

Disabled:
  bg: zinc-100
  text: zinc-400
  opacity: 0.7
```

### Input Fields

**Đề xuất:** Underline style thay vì box style cho phần lớn forms — gọn hơn, không bị "nặng".

```
Default style (box):
  bg: surface-2 (#FFF0EA)
  border: 1.5px border (#F5E0D8)
  border-radius: radius-md (12px)
  height: 52px
  font-size: 16px
  focus: border rose-400, bg white, shadow-sm

Underline style (dùng trong forms nhiều field):
  border-bottom: 1.5px zinc-200
  bg: transparent
  padding: 12px 0
  focus: border-bottom rose-500

Amount input (add-expense):
  font-size: 48px, weight 700
  center-aligned
  color: rose-500 khi typing
  cursor: blinking rose dot
```

### Avatar

```
Sizes: 24 / 32 / 40 / 48 / 56 / 72px

Default: Gradient background (rose-400 → pink-300)
         Chữ cái đầu tên, white, fontWeight 700

Online dot:
  - 10px circle
  - bg: emerald-400
  - border: 2px white
  - position: bottom-right

Couple avatar pair:
  - 2 avatars overlap 8px
  - Connected bởi small heart icon ở giữa
```

### Notifications

**Đề xuất:** Dùng left-accent bar thay vì icon circle.

```
┌──────────────────────────────────────────┐
│ ▌ 💰  Chi tiêu mới                  2ph │
│    Em vừa thêm 85,000đ vào chi chung     │
└──────────────────────────────────────────┘

- Left accent bar: 3px, màu theo category
- Icon: 36px, bg tint nhẹ (rgba category color 0.12)
- Title: label (13px, 600)
- Body: caption (12px, zinc-500)
- Time: caption (12px, zinc-400, right)
- Unread: accent bar đậm + bg rose-50 nhẹ
```

---

## 6. Screen Redesign

### HOME SCREEN

**Vấn đề hiện tại:** Quá nhiều sections cạnh nhau, không có hierarchy rõ.

**Đề xuất layout:**

```
┌─────────────────────────────────────┐
│  Chào buổi sáng, Anh ☀️       [🔔] │  ← Header (safe area)
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ❤️ 248 ngày bên nhau        │  │  ← Hero Card (gradient)
│  │                               │  │    full-width, 180px
│  │  Em đang: 😌 Bình thản       │  │
│  │  Gặp nhau lần cuối: 2 ngày   │  │
│  └───────────────────────────────┘  │
│                                     │
│  Hôm nay                            │  ← Section title
│                                     │
│  [📸 Tạo kỷ niệm] [💰 Thêm chi tiêu]│  ← Quick actions 2-col
│                                     │
│  Sắp tới                            │
│  ┌─────────┐ ┌─────────┐           │  ← Events horizontal scroll
│  │ 14/3 💕 │ │ 20/3 🎂 │           │
│  └─────────┘ └─────────┘           │
│                                     │
│  Nhắc nhở hôm nay                   │
│  ┌───────────────────────────────┐  │
│  │ 💊 8:00 Uống thuốc tránh thai │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Chi tiết Hero Card:**

- Gradient: `rose-500 → rose-400 → pink-300` (135°)
- Love counter: `display-xl` (40px), white, center
- Status chip: glass pill với emoji trạng thái
- Subtle particle/sparkle animation (reanimated)

### BUDGET SCREEN

**Vấn đề:** Summary card quá đơn, category filters không engaging.

**Đề xuất:**

```
┌─────────────────────────────────────┐
│  Chi tiêu chung              [+ Thêm]│
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Tháng 3/2026                 │  │
│  │  Đã dùng                      │  │
│  │  2,450,000đ  ────────── 78%  │  │
│  │  Còn lại: 700,000đ           │  │
│  │                               │  │
│  │  [Em: 1.2M]      [Anh: 1.3M] │  │
│  └───────────────────────────────┘  │
│                                     │
│  🍔 Ăn uống  👗 Mua sắm  🏠 Nhà...│  ← Icon pills horizontal
│                                     │
│  ── Tháng 3 ──────────────────────  │
│                                     │
│  💰 Bữa tối lãng mạn    -285,000đ  │
│     Hôm nay • Em                   │
│                                     │
│  🛒 Siêu thị             -127,000đ  │
│     Hôm qua • Anh                  │
└─────────────────────────────────────┘
```

**Cải tiến:**

- Progress bar dạng gradient (rose → amber khi gần hết)
- Category pills dùng emoji + text, horizontal scroll, không phải text-only
- Expense items: amount right-aligned, avatar nhỏ cho thấy ai chi

### TIMELINE SCREEN

**Đề xuất:** Masonry grid cho memories thay vì linear list.

```
┌─────────────────────────────────────┐
│  Kỷ niệm                     [📅][🔍]│
│                                     │
│  [Tất cả] [Kỷ niệm] [Chi tiêu]     │
│                                     │
│  ── Tháng 3 ──────────────────────  │
│                                     │
│  ┌──────────┐  ┌──────────────────┐ │
│  │          │  │                  │ │
│  │  Photo   │  │    Wider photo   │ │
│  │  1:1     │  │    16:9          │ │
│  │          │  │                  │ │
│  └──────────┘  └──────────────────┘ │
│                                     │
│  ┌──────────────────┐  ┌──────────┐ │
│  │  Wider photo     │  │ Photo    │ │
│  └──────────────────┘  └──────────┘ │
│                                     │
│  ── Tháng 2 ──────────────────────  │
└─────────────────────────────────────┘
```

**Cải tiến:**

- Masonry/staggered grid (2 cột, cao thay đổi)
- Section header: tháng/năm với số kỷ niệm
- Image item: góc bo `radius-lg`, caption overlay gradient
- Tap để mở full-screen viewer với swipe

### CARE SCREEN

**Đây là screen có nhiều cảm xúc nhất — cần redesign kỹ nhất.**

**Nữ (mood tracking):**

```
┌─────────────────────────────────────┐
│  Hôm nay em thế nào?                │
│                                     │
│         ┌─────────────┐             │
│         │             │             │
│         │   😌 Ổn    │  ← Animated │
│         │   Day 14   │    mood orb  │
│         │             │             │
│         └─────────────┘             │
│                                     │
│  😄  😊  😌  😔  😤  😰  ← Mood pills   │
│            ●                        │
│                                     │
│  Ghi chú hôm nay...                 │  ← text input nhẹ
│                                     │
│  ── Xu hướng 7 ngày ──────────────  │
│  [sparkline chart mini]             │
└─────────────────────────────────────┘
```

**Nam (care suggestions):**

```
┌─────────────────────────────────────┐
│  Chăm sóc cô ấy hôm nay 💕         │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Em đang: 😔 Hơi buồn        │  │  ← Status card
│  │  Chu kỳ: Ngày 18             │  │    gradient rose nhẹ
│  │  Gặp nhau: 3 ngày trước      │  │
│  └───────────────────────────────┘  │
│                                     │
│  Anh có thể làm gì?                 │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 💌 Gửi tin nhắn ngọt ngào    │  │
│  │    "Chắc em đang nhớ anh..."  │  │  ← Suggestion cards
│  │                    [Làm ngay] │  │    với action button
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 🌸 Order hoa về cho em        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### LOGIN SCREEN

**Đề xuất:** Mang lại cảm giác "lần đầu gặp nhau".

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          ╭─────────────╮            │
│          │      ❤️      │            │  ← Logo, gradient bg
│          │   Em Plus   │            │    rose-500, radius-2xl
│          ╰─────────────╯            │
│                                     │
│   Chào mừng trở lại 👋             │
│   Đăng nhập để gặp nửa kia         │  ← Tagline
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 📧 Email                    │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 🔒 Mật khẩu            👁  │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │      Đăng nhập ❤️           │  │  ← Primary button, rose
│   └─────────────────────────────┘  │
│                                     │
│         Quên mật khẩu?             │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. Micro-interactions & Animations

### Nguyên tắc animation

```
Duration scale:
  instant:  100ms  ← feedback tức thì (button press)
  fast:     200ms  ← transitions nhỏ
  normal:   300ms  ← transitions màn hình
  slow:     500ms  ← hero animations
  scenic:   800ms  ← onboarding, special moments

Easing:
  enter:  cubic-bezier(0.0, 0.0, 0.2, 1)  ← decelerate
  exit:   cubic-bezier(0.4, 0.0, 1.0, 1)  ← accelerate
  spring: tension 180, friction 12         ← bouncy cho joy
  gentle: tension 120, friction 16         ← mềm cho cards
```

### Key animations

**Love Counter (Home hero):**

- Số đếm animate từ 0 → actual khi screen mount
- Subtle pulse mỗi 10 giây (heartbeat)
- Sparkle particles bay lên khi tap

**Mood Orb (Care screen - nữ):**

- Pulsing glow animation (scale 1.0 → 1.05, opacity 0.8 → 1.0)
- Màu orb thay đổi smooth theo mood selected
- Wave distortion effect (SVG path animation)

**Tab bar:**

- Active indicator: spring slide + color morph
- Icon: spring scale up khi active
- Care button: gentle float animation (translateY -2 → 0, loop)

**Screen transitions:**

- Push: slide from right (native)
- Modal: slide up với overshoot spring
- Back: slide to right

**Loading states:**

- Skeleton: shimmer từ trái sang phải (rose tint thay vì grey)
- Spinner: rose-500, smooth rotate
- Pull-to-refresh: heart icon spin thay vì generic

**Haptics:**

- Tab press: light impact
- Button primary: medium impact
- Error: error notification pattern (double buzz)
- Success: success notification (1 buzz)
- Love tap (hero card): heart beat pattern

---

## 8. Dark Mode

### Dark mode là first-class citizen, không phải afterthought

**Điều chỉnh màu dark mode:**

```
background:  #1A1015   (đen ấm, hint rose)
surface:     #261820   (card dark)
surface-2:   #301E28   (input dark)
border:      #3D2535   (border subtle dark)

text-primary:   #FFF0F3
text-secondary: #D4A0AE
text-tertiary:  #8C5F6E

brand:       #FB7185   (rose-400, sáng hơn trên dark)
brand-text:  #FECDD3   (rose-200)
```

**Nguyên tắc dark mode:**

- Không dùng pure black `#000000`
- Không dùng pure white text
- Gradient hero card: đậm hơn, mysterious hơn
- Glass morphism: dark glass `rgba(48,30,40,0.65)`

---

## 9. Accessibility

### Contrast ratios (WCAG AA)

```
text-primary on background:  ≥ 4.5:1  ✓
text-secondary on surface:   ≥ 3:1    ✓
brand on white:              ≥ 3:1    ✓ (rose-500: 3.2:1)
white text on rose-500:      ≥ 4.5:1  ✓
```

### Minimum touch targets

```
Tất cả interactive elements: min 44×44px
Tab icons: 48×48px hit slop
Small chips/pills: padding đủ để đạt 44px height
```

### Reduced motion

```
Nếu user bật "Reduce Motion":
- Tắt sparkles, floating, pulsing
- Giữ lại: slide transitions (giảm distance)
- Giữ lại: fade transitions (giảm opacity range)
- Bỏ: spring overshoot
```

---

## 10. Implementation Priority

### Phase 1 — Foundation (1 tuần)

1. Cập nhật `palette.ts`: thêm rose scale, warm cream surfaces
2. Cập nhật `semantic.ts`: map lại tokens theo hệ màu mới
3. Cập nhật `themes.ts`: default theme → warm rose
4. Cập nhật `tokens/index.ts`: radius, shadow, spacing
5. Update Button, Input → dùng tokens mới

### Phase 2 — Core Screens (1 tuần)

6. Login screen redesign
7. Home screen — hero card mới
8. Tab bar — indicator + care button animation
9. Budget screen — summary card + category pills

### Phase 3 — Feature Screens (1 tuần)

10. Care screen — mood orb + suggestion cards
11. Timeline screen — masonry grid
12. Notifications — left-accent style
13. Profile screen — visual refresh

### Phase 4 — Polish (3 ngày)

14. Micro-interactions: love counter, mood orb, haptics
15. Dark mode audit toàn bộ
16. Skeleton shimmer style mới
17. Accessibility audit cuối

---

## 11. Không thay đổi

Những gì đang **tốt**, giữ nguyên:

- Glass morphism concept cho tab bar
- Spring-based animations (chỉ tune lại values)
- 5 brand themes (chỉ cập nhật default)
- Semantic token architecture
- Context-split theme engine
- Gender-aware design (male/female flows)
- Vietnamese localization

---

## Tổng kết

| Thay đổi                        | Mức độ | Impact                     |
| ------------------------------- | ------ | -------------------------- |
| Primary color: violet → rose    | Lớn    | Cả app ấm hơn              |
| Surface: white → warm cream     | Nhỏ    | Subtle nhưng dễ chịu hơn   |
| Dark bg: pure black → warm dark | Nhỏ    | Dark mode dễ nhìn hơn      |
| Typography: thêm display scale  | Nhỏ    | Love counter, hero đẹp hơn |
| Cards: 5 variants rõ ràng       | Vừa    | Hierarchy tốt hơn          |
| Timeline: masonry grid          | Lớn    | UX khác biệt hơn           |
| Care screen: mood orb           | Lớn    | Feature điểm mạnh nhất     |
| Animations: heartbeat, sparkle  | Vừa    | Emotional resonance        |
| Radius: chuẩn hóa 5 values      | Nhỏ    | Consistency                |
| Shadow: chuẩn hóa 3 levels      | Nhỏ    | Consistency                |
