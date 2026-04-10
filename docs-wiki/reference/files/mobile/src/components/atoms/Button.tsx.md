---
title: "mobile/src/components/atoms/Button.tsx"
description: "The Button component represents a button in React Native"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/components/atoms/Button.tsx.md"
  relativePath: "mobile/src/components/atoms/Button.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Button.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/src/components/atoms/Button.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Button.tsx`
- Lines: 265
- Symbols: 4

## AI Summary

The Button component represents a button in React Native

### Responsibilities

- represents a button
- contains children and props for customization

### Usage Notes

- Usage: import Button from '@shared/components/atoms/Button';
- Example usage:

## Public API

- `interface ButtonProps extends TouchableOpacityProps`
- `Button`

```tsx
function Button({ label, children, variant = "primary", size = "md", loading = false, disabled = false, fullWidth = false, leftIcon, rightIcon, style, accessibilityLabel, accessibilityHint, onPress, onPressIn, onPressOut, ...props }: ButtonProps)
```


## Symbols

### interface `ButtonProps`

- Signature: `interface ButtonProps extends TouchableOpacityProps`
- Lines: 27-42
- Exported: yes

```tsx
interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Accessibility hint for screen readers */
  accessibilityHint?: string;
}
```

### function `Button`

- Signature:

```tsx
function Button({ label, children, variant = "primary", size = "md", loading = false, disabled = false, fullWidth = false, leftIcon, rightIcon, style, accessibilityLabel, accessibilityHint, onPress, onPressIn, onPressOut, ...props }: ButtonProps)
```
- Lines: 44-220
- Exported: yes

```tsx
function Button({
  label,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(
    (e: any) => {
      if (!isDisabled) {
        Animated.spring(scaleAnim, {
          toValue: 0.96,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
      }
      onPressIn?.(e);
    },
    [isDisabled, scaleAnim, onPressIn],
  );

  const handlePressOut = useCallback(
    (e: any) => {
      if (!isDisabled) {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
      }
      onPressOut?.(e);
    },
    [isDisabled, scaleAnim, onPressOut],
  );

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        primary: {
          backgroundColor: theme.colors.brand.default,
          borderRadius: theme.radius.md,
          shadowColor: theme.colors.brand.default,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        },
        secondary: {
          backgroundColor: theme.colors.brand.muted,
          borderRadius: theme.radius.md,
          borderWidth: 1.5,
          borderColor: theme.colors.brand.subtle,
        },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: theme.colors.brand.default,
          borderRadius: theme.radius.md,
        },
        ghost: {
          backgroundColor: "transparent",
          borderRadius: theme.radius.md,
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        danger: {
          backgroundColor: theme.colors.status.error.icon,
          borderRadius: theme.radius.md,
          borderWidth: 0,
          shadowColor: theme.colors.status.error.icon,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
          elevation: 5,
        },
        neutralOutline: {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: theme.colors.border.default,
          borderRadius: theme.radius.md,
        },
        primaryLabel: {
          color: theme.colors.text.onBrand,
        },
        secondaryLabel: {
          color: theme.colors.brand.text,
        },
        outlineLabel: {
          color: theme.colors.brand.default,
        },
        ghostLabel: {
          color: theme.colors.brand.default,
        },
        dangerLabel: {
          color: theme.colors.text.onBrand,
        },
        neutralOutlineLabel: {
          color: theme.colors.text.secondary,
        },
      }),
    [theme.colors],
  );

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
      style={[
        styles.button,
        styles[size],
        dynamicStyles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "secondary" || variant === "ghost"
              ? theme.colors.brand.default
              : variant === "neutralOutline"
                ? theme.colors.text.secondary
                : theme.colors.text.onBrand
          }
          size="small"
        />
      ) : (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {leftIcon}
          <Text
            style={[
              styles.label,
              dynamicStyles[`${variant}Label` as keyof typeof dynamicStyles],
              styles[`${size}Label` as keyof typeof styles],
            ]}
          >
            {label || children}
          </Text>
          {rightIcon}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}
```

### type `ButtonVariant`

- Signature: `type ButtonVariant = | "primary" | "secondary" | "outline" | "ghost" | "danger" /** Secondary action: neutral border/text (e.g. dialog cancel) */ | "neutralOutline";`
- Lines: 17-24
- Exported: no

```tsx
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  /** Secondary action: neutral border/text (e.g. dialog cancel) */
  | "neutralOutline";
```

### type `ButtonSize`

- Signature: `type ButtonSize = "sm" | "md" | "lg";`
- Lines: 25-25
- Exported: no

```tsx
type ButtonSize = "sm" | "md" | "lg";
```
