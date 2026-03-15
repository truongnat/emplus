# Dual Theme System - Telegram & Aura

## 🎨 Overview

App now supports **2 distinct design systems**:

### 1. **Telegram Theme** (Default)

- **Accent:** Blue `#2AABEE`
- **Background:** Cool white `#FFFFFF`
- **Feel:** Professional, clean, modern
- **Best for:** Chat, productivity, general use

### 2. **Aura Dating Theme**

- **Accent:** Rose `#E8547A`
- **Background:** Warm ivory `#FFFBF9`
- **Feel:** Romantic, warm, intimate
- **Best for:** Dating, relationships, social

---

## 🚀 How to Switch Themes

### Method 1: Theme Showcase Screen

```
Navigate to: /theme-showcase
Tap "Telegram" or "Aura Dating" button
```

### Method 2: Programmatic

```typescript
import { setThemeStyle } from "@/src/theme/theme-switcher";

// Switch to Aura
setThemeStyle("aura");

// Switch to Telegram
setThemeStyle("telegram");
```

---

## 📊 Differences

| Feature              | Telegram        | Aura            |
| -------------------- | --------------- | --------------- |
| **Accent Color**     | `#2AABEE` Blue  | `#E8547A` Rose  |
| **Background Light** | `#FFFFFF` White | `#FFFBF9` Ivory |
| **Background Dark**  | `#1C1C1E` Cold  | `#1C1014` Warm  |
| **Text Secondary**   | `#5C5C6B` Cool  | `#6B4751` Warm  |
| **Glass Tint**       | Neutral white   | Rose blush      |
| **Avatar Gradients** | Cool tones      | Warm romantic   |
| **Shadows**          | Neutral         | Rose-tinted     |
| **Feel**             | Professional    | Romantic        |

---

## 🎨 Color Tokens

### Telegram (Violet/Blue)

```typescript
accent: "#8B5CF6"; // Violet
accentDeep: "#7C3AED"; // Deep violet
bg: "#FFFFFF"; // Pure white
bg2: "#F5F5F5"; // Light gray
```

### Aura (Rose/Warm)

```typescript
accent: "#E8547A"; // Rose
accentDeep: "#C73D60"; // Deep rose
bg: "#FFFBF9"; // Ivory
bg2: "#FFF3F0"; // Blush
```

---

## 📱 Components Affected

When switching themes, these change automatically:

- ✅ **Colors** - All semantic colors
- ✅ **Backgrounds** - Page and surface colors
- ✅ **Text** - All text colors
- ✅ **Borders** - Border colors
- ✅ **Shadows** - Shadow tints
- ✅ **Glass** - Glass tint (neutral vs rose)
- ✅ **Avatars** - Gradient colors
- ✅ **Buttons** - Primary colors
- ✅ **Cards** - Background colors

---

## 💡 Usage Example

```tsx
import { useTheme } from "@/src/theme/theme-switcher";

function MyComponent() {
  const theme = useTheme();

  console.log("Current theme:", theme.name); // 'telegram' or 'aura'
  console.log("Accent color:", theme.colors.accent);
  console.log("Background:", theme.colors.bg);

  return (
    <View
      style={{
        backgroundColor: theme.colors.bg,
        padding: 16,
      }}
    >
      <Text style={{ color: theme.colors.accent }}>Themed text</Text>
    </View>
  );
}
```

---

## 🎯 When to Use Each

### Telegram Theme

- ✅ Professional apps
- ✅ Chat/messaging
- ✅ Productivity tools
- ✅ Business contexts
- ✅ Clean, minimal design

### Aura Theme

- ✅ Dating apps
- ✅ Romance/social
- ✅ Lifestyle apps
- ✅ Warm, friendly feel
- ✅ Emotional connection

---

## 🔧 Technical Details

### Architecture

- **Token-based:** Both themes share same token structure
- **Runtime switch:** Change theme instantly without reload
- **Type-safe:** Full TypeScript support
- **Performance:** No runtime overhead

### Files

```
src/theme/
├── theme-switcher.ts      ← Hook & switcher logic
├── aura-colors.ts         ← Aura color tokens
├── tokens/
│   └── semantic.ts        ← Telegram color tokens
```

---

## 🎨 Future Enhancements

- [ ] Add more themes (Ocean, Sunset, Emerald)
- [ ] User preference persistence
- [ ] Auto-switch based on time of day
- [ ] Custom theme builder
- [ ] Animation differences per theme

---

**Enjoy dual design systems! 🎉**
