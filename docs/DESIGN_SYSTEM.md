# EmPlus Design System

A modern, performant design system with a custom theme builder for the EmPlus mobile application.

## 🎯 Overview

This design system provides:
- **Custom Theme System**: Complete light/dark mode support
- **Web-Based Builder**: Visual tool for creating and managing design tokens
- **Shadcn-Style Components**: Clean, accessible React Native components
- **Performance Optimized**: Memoized components and efficient re-renders
- **Clean Architecture**: Separation of concerns with clear boundaries

## 📦 Structure

```
emplus/
├── mobile/                      # React Native mobile app
│   └── src/
│       └── framework/
│           └── design/
│               ├── components/  # Shadcn-style UI components
│               ├── types.ts     # TypeScript type definitions
│               ├── tokens.ts    # Design token values
│               ├── themes.ts    # Light/dark theme definitions
│               ├── utils.ts     # Utility functions
│               ├── theme-provider.tsx  # Theme context provider
│               ├── ui-kit.tsx   # Core components (Box, Text, Button, etc.)
│               └── index.ts     # Public API exports
│
├── design-builder/              # Web-based token builder
│   └── src/
│       ├── components/
│       │   ├── ui/             # shadcn/ui components
│       │   └── builder/        # Builder-specific components
│       ├── store/              # Zustand state management
│       ├── types/              # TypeScript types
│       └── lib/                # Utilities
│
└── docs/
    └── DESIGN_SYSTEM.md        # This file
```

## 🎨 Design Tokens

Design tokens are the atomic values of the design system:

### Token Categories

1. **Colors**: Brand colors, semantic colors, neutrals
2. **Spacing**: Consistent spacing scale (0px to 64px)
3. **Sizing**: Component sizes (xs to xl)
4. **Radius**: Border radius values (0px to pill)
5. **Typography**: Font families, sizes, line heights, weights
6. **Shadows**: Elevation shadows
7. **Z-Index**: Layering order
8. **Breakpoints**: Responsive breakpoints

### Token Structure

```typescript
{
  value: string | number;
  type: TokenCategory;
  description?: string;
}
```

## 🛠️ Web Builder

The design builder is a web application for visually creating and managing design tokens.

### Getting Started

```bash
# Start the builder
bun run dev:builder

# Open http://localhost:3001
```

### Features

- **Visual Editor**: Edit tokens with real-time preview
- **Theme Toggle**: Preview light and dark modes
- **Color Picker**: Integrated color picker for color tokens
- **Component Preview**: See how tokens affect components
- **Export**: Download generated TypeScript files

### Workflow

1. **Edit Tokens**: Modify token values in the builder UI
2. **Preview**: See changes in real-time component preview
3. **Export**: Click "Save & Export" to download files
4. **Apply**: Copy downloaded files to `mobile/src/framework/design/`
5. **Rebuild**: Rebuild the mobile app to apply changes

## 🧩 Components

### Core Components (ui-kit)

```typescript
import { Box, AppText, Button, Input, Card, Spinner } from '@/src/ui-kit';
```

#### Box
Fundamental layout component with flexbox support.

```tsx
<Box
  flexDirection="row"
  alignItems="center"
  padding="md"
  gap="sm"
>
  <Text>Hello</Text>
</Box>
```

#### AppText
Typography component with variants.

```tsx
<AppText variant="h1">Heading</AppText>
<AppText variant="body">Body text</AppText>
<AppText variant="caption">Caption</AppText>
```

#### Button
Button with variants and sizes.

```tsx
<Button variant="primary" size="md" onPress={handlePress}>
  Click Me
</Button>
```

#### Input
Form input with label and error states.

```tsx
<Input
  label="Email"
  placeholder="Enter email"
  error={errors.email}
  value={email}
  onChangeText={setEmail}
/>
```

### Shadcn-Style Components

```typescript
import { Avatar, Badge, Alert, Separator, Skeleton, Switch } from '@/src/ui-kit';
```

#### Avatar
User avatar with fallback initials.

```tsx
<Avatar
  src="https://example.com/avatar.jpg"
  fallback="John Doe"
  size="md"
  shape="circle"
/>
```

#### Badge
Status or category badges.

```tsx
<Badge variant="success" size="sm" dot>
  Active
</Badge>
```

#### Alert
Alert messages with variants.

```tsx
<Alert
  variant="destructive"
  title="Error"
  description="Something went wrong"
/>
```

#### Skeleton
Loading placeholder.

```tsx
<Skeleton width={100} height={20} shape="rounded" />
```

#### Switch
Toggle switch.

```tsx
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  size="md"
/>
```

## 🎭 Theme System

### Light/Dark Mode

The theme system automatically detects and applies the system theme.

```typescript
import { useTheme, useIsDark, useThemedColor } from '@/src/ui-kit';

// Get full theme context
const { theme, themeName, isDark, toggleTheme, setTheme } = useTheme();

// Check if dark mode
const isDark = useIsDark();

// Get themed color
const background = useThemedColor('background');
```

### Manual Theme Override

```tsx
// Toggle theme
const { toggleTheme } = useTheme();
<Button onPress={toggleTheme}>Toggle Theme</Button>

// Set specific theme
const { setTheme } = useTheme();
<Button onPress={() => setTheme('dark')}>Dark Mode</Button>
```

### Theme Colors

```typescript
theme.colors = {
  // Backgrounds
  background: string;
  backgroundStrong: string;
  backgroundMuted: string;
  
  // Text
  text: string;
  textMuted: string;
  textInverse: string;
  
  // Borders
  border: string;
  borderMuted: string;
  
  // Brand
  primary: string;
  primaryMuted: string;
  accent: string;
  secondary: string;
  
  // Semantic
  danger: string;
  dangerMuted: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  info: string;
  infoMuted: string;
}
```

## ⚡ Performance

### Optimizations

1. **Memoization**: All components use `React.memo()`
2. **useMemo**: Expensive calculations are memoized
3. **Token Caching**: Token values are cached for fast access
4. **Debounced Updates**: Token edits are debounced to prevent excessive re-renders

### Best Practices

```tsx
// ✅ Good: Use provided components
<Box padding="md">Content</Box>

// ✅ Good: Use theme hooks
const { theme } = useTheme();

// ✅ Good: Use token references
const padding = tokens.space.md.value;

// ❌ Avoid: Hard-coded values
<View style={{ padding: 16 }}>Content</View>
```

## 📚 Architecture

### Clean Architecture Layers

```
Presentation Layer (Components)
    ↓
Design System Layer (Tokens, Themes)
    ↓
Core Layer (React Native Primitives)
```

### File Organization

```
src/
├── framework/
│   └── design/
│       ├── types.ts          # Type definitions
│       ├── tokens.ts         # Token values
│       ├── themes.ts         # Theme definitions
│       ├── utils.ts          # Utilities
│       ├── theme-provider.tsx # Context provider
│       ├── ui-kit.tsx        # Core components
│       ├── components/       # Shadcn components
│       └── index.ts          # Public API
│
├── components/               # Feature components
├── presentation/            # Screen components
├── domain/                  # Business logic
└── data/                    # Data layer
```

## 🚀 Migration from Tamagui

### Before (Tamagui)

```tsx
import { YStack, XStack, Button } from 'tamagui';

<YStack padding="$4">
  <Button theme="primary">Click</Button>
</YStack>
```

### After (New System)

```tsx
import { Box, Button } from '@/src/ui-kit';

<Box padding="md">
  <Button variant="primary">Click</Button>
</Box>
```

### Mapping

| Tamagui | New System |
|---------|------------|
| `YStack` | `Box` with `flexDirection="column"` |
| `XStack` | `Box` with `flexDirection="row"` |
| `$4` | `"md"` |
| `theme="primary"` | `variant="primary"` |
| `SizableText` | `AppText` |

## 📝 Usage Examples

### Screen Example

```tsx
import { Box, AppText, Button, Input, Card, useTheme } from '@/src/ui-kit';

export function LoginScreen() {
  const { theme } = useTheme();
  
  return (
    <Box flex={1} padding="lg" backgroundColor="$background">
      <Card variant="elevated" shadow="lg">
        <AppText variant="h1" marginBottom="lg">
          Welcome Back
        </AppText>
        
        <Input
          label="Email"
          placeholder="Enter email"
          marginBottom="md"
        />
        
        <Input
          label="Password"
          placeholder="Enter password"
          marginBottom="xl"
          secureTextEntry
        />
        
        <Button
          variant="primary"
          size="lg"
          onPress={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}
```

### Custom Styling

```tsx
import { Box, AppText, tokens } from '@/src/ui-kit';

<Box
  style={{
    padding: tokens.space.lg.value,
    borderRadius: tokens.radius.lg.value,
    backgroundColor: '#custom',
  }}
>
  <AppText
    style={{
      fontSize: tokens.typography.fontSize['4'].value,
      fontWeight: tokens.typography.fontWeight.bold.value,
    }}
  >
    Custom Styled
  </AppText>
</Box>
```

## 🔧 Development

### Adding New Tokens

1. Edit `mobile/src/framework/design/tokens.ts`
2. Add token to appropriate category
3. Update types in `types.ts` if needed
4. Use in components

### Adding New Components

1. Create component in `components/`
2. Follow shadcn patterns
3. Export from `index.ts`
4. Add documentation

### Builder Development

```bash
cd design-builder
bun install
bun run dev
```

## 📖 Additional Resources

- [Design Token Schema](./mobile/src/framework/design/tokens.schema.json)
- [Type Definitions](./mobile/src/framework/design/types.ts)
- [Builder README](./design-builder/README.md)

## 🎯 Future Enhancements

- [ ] Animation system
- [ ] Motion tokens
- [ ] Component variants editor in builder
- [ ] Theme presets
- [ ] Accessibility testing tools
- [ ] Performance monitoring dashboard

---

**Built with ❤️ for EmPlus**
