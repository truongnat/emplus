# Quick Start Guide

## 🎯 What Was Built

A complete design system replacement for Tamagui with:

1. **Custom Theme System** - Light/dark mode support
2. **Web Builder** - Visual tool for managing design tokens
3. **Component Library** - Shadcn-style React Native components
4. **Clean Architecture** - Separated concerns, type-safe

## 📁 Project Structure

```
emplus/
├── mobile/              # React Native app (Tamagui removed)
├── design-builder/      # Web-based token builder (NEW)
└── docs/                # Documentation (NEW)
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Root
bun install

# Mobile app
cd mobile && bun install

# Design builder
cd ../design-builder && bun install
```

### 2. Run the Mobile App

```bash
# From project root
bun run dev:mobile
```

### 3. Run the Design Builder

```bash
# From project root
bun run dev:builder

# Open http://localhost:3001
```

## 🎨 Using the Design Builder

### Edit Tokens

1. Open http://localhost:3001
2. Select a token category (Colors, Spacing, etc.)
3. Click a token to edit
4. Modify the value (use color picker for colors)
5. See changes in real-time preview

### Export Tokens

1. Click "Export" button in header
2. Review generated files
3. Click "Download" for each file
4. Copy to `mobile/src/framework/design/`

### Available Token Categories

- **Colors**: Brand colors, semantic colors, neutrals
- **Spacing**: 0px to 64px scale
- **Sizing**: Component heights
- **Radius**: Border radius values
- **Typography**: Fonts, sizes, weights
- **Shadows**: Elevation shadows
- **Z-Index**: Layering order
- **Breakpoints**: Responsive breakpoints

## 📱 Using Components in Mobile App

### Import Components

```typescript
import {
  Box,
  AppText,
  Button,
  Input,
  Card,
  Avatar,
  Badge,
  Alert,
  Switch,
  useTheme,
} from '@/src/ui-kit';
```

### Basic Example

```tsx
import { Box, AppText, Button, useTheme } from '@/src/ui-kit';

export function MyScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Box flex={1} padding="lg" backgroundColor="$background">
      <AppText variant="h1" marginBottom="md">
        Hello World
      </AppText>
      
      <Button
        variant="primary"
        onPress={toggleTheme}
        marginBottom="md"
      >
        Toggle Theme
      </Button>
      
      <Card variant="elevated" shadow="md">
        <AppText variant="body" color="$text">
          Card content with themed text
        </AppText>
      </Card>
    </Box>
  );
}
```

### Theme Hook

```tsx
import { useTheme } from '@/src/ui-kit';

function MyComponent() {
  const {
    theme,        // Current theme object
    themeName,    // 'light' | 'dark'
    isDark,       // boolean
    toggleTheme,  // () => void
    setTheme,     // (name) => void
    getColor,     // (key) => string
    cssVariables, // CSS variables object
  } = useTheme();
}
```

## 🎭 Theme System

### Light/Dark Mode

The system automatically detects system theme:

```tsx
import { useIsDark } from '@/src/ui-kit';

function ThemedComponent() {
  const isDark = useIsDark();
  // Automatically updates when system theme changes
}
```

### Manual Override

```tsx
import { useTheme } from '@/src/ui-kit';

function ThemeToggle() {
  const { setTheme, toggleTheme } = useTheme();
  
  return (
    <>
      <Button onPress={() => setTheme('light')}>Light</Button>
      <Button onPress={() => setTheme('dark')}>Dark</Button>
      <Button onPress={toggleTheme}>Toggle</Button>
    </>
  );
}
```

## 🧩 Component Examples

### Box (Layout)

```tsx
<Box
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between"
  padding="md"
  gap="sm"
>
  <AppText>Left</AppText>
  <AppText>Right</AppText>
</Box>
```

### Button

```tsx
<Button variant="primary" size="md" onPress={handlePress}>
  Primary Button
</Button>

<Button variant="outline" size="md" onPress={handlePress}>
  Outline Button
</Button>

<Button variant="ghost" size="sm" onPress={handlePress}>
  Ghost Button
</Button>
```

### Input

```tsx
<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  leftIcon="mail"
/>
```

### Badge

```tsx
<Badge variant="success" size="sm" dot>
  Active
</Badge>

<Badge variant="warning" size="md">
  Pending
</Badge>
```

### Alert

```tsx
<Alert
  variant="destructive"
  title="Error"
  description="Something went wrong"
  icon="alert-circle"
/>
```

### Skeleton (Loading)

```tsx
<Skeleton width={200} height={20} shape="rounded" />
```

## 📊 Token Usage

### Access Tokens Directly

```tsx
import { tokens } from '@/src/ui-kit';

const padding = tokens.space.md.value; // 16
const primaryColor = tokens.color.primary.value; // '#ec1334'
const borderRadius = tokens.radius.lg.value; // 18
```

### Use Hooks

```tsx
import { useColor, useSpace, useRadius } from '@/src/ui-kit';

function MyComponent() {
  const primary = useColor('primary');
  const md = useSpace('md');
  const lg = useRadius('lg');
}
```

### CSS Variables

```tsx
import { useCSSVariables } from '@/src/ui-kit';

function StyledComponent() {
  const cssVars = useCSSVariables();
  
  return (
    <View style={cssVars}>
      {/* Use CSS variables */}
    </View>
  );
}
```

## 🔄 Migration from Tamagui

### Before

```tsx
import { YStack, XStack, SizableText, Button } from 'tamagui';

<YStack padding="$4" gap="$2">
  <SizableText size="$4">Hello</SizableText>
  <Button theme="primary">Click</Button>
</YStack>
```

### After

```tsx
import { Box, AppText, Button } from '@/src/ui-kit';

<Box flexDirection="column" padding="md" gap="sm">
  <AppText variant="body">Hello</AppText>
  <Button variant="primary">Click</Button>
</Box>
```

### Mapping Table

| Tamagui | New System | Notes |
|---------|------------|-------|
| `YStack` | `Box` | Set `flexDirection="column"` |
| `XStack` | `Box` | Set `flexDirection="row"` |
| `SizableText` | `AppText` | Use `variant` prop |
| `Button theme` | `Button variant` | Similar API |
| `$4` | `"md"` | Token names changed |
| `gap="$2"` | `gap="sm"` | Token names changed |

## 🛠️ Development Workflow

### 1. Design Tokens

1. Run builder: `bun run dev:builder`
2. Edit tokens visually
3. Preview in real-time
4. Export files

### 2. Apply to App

1. Download `tokens.ts` and `themes.ts`
2. Replace in `mobile/src/framework/design/`
3. Rebuild app: `bun run dev:mobile`

### 3. Use in Components

```tsx
import { tokens, themes } from '@/src/ui-kit';

// Use new token values automatically
```

## 📖 Documentation

- [Design System Docs](./docs/DESIGN_SYSTEM.md) - Full documentation
- [Builder README](./design-builder/README.md) - Builder usage
- [Token Schema](./mobile/src/framework/design/tokens.schema.json) - JSON schema

## ⚡ Performance Tips

1. **Use Memoized Components**: All components are memoized
2. **Minimize Re-renders**: Use proper keys in lists
3. **Lazy Load**: Split large components
4. **Use Hooks**: `useTheme`, `useColor`, etc. are optimized

## 🎯 Next Steps

1. ✅ Run the mobile app
2. ✅ Try the design builder
3. ✅ Customize some tokens
4. ✅ Export and apply changes
5. ✅ Build your UI with new components

## 🆘 Troubleshooting

### Builder Not Starting

```bash
cd design-builder
rm -rf node_modules
bun install
bun run dev
```

### Mobile App Errors

```bash
cd mobile
rm -rf node_modules
bun install
bun run dev
```

### Type Errors

```bash
# Run typecheck
bun run typecheck:mobile
bun run typecheck:builder
```

---

**Need Help?** Check the [full documentation](./docs/DESIGN_SYSTEM.md)
