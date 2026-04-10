---
title: "mobile/src/components/atoms/Text.tsx"
description: "A React Native component for rendering text in various styles and sizes."
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
  page: "reference/files/mobile/src/components/atoms/Text.tsx.md"
  relativePath: "mobile/src/components/atoms/Text.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Text.tsx"
  module: "mobile/src/components/atoms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 6
---

# mobile/src/components/atoms/Text.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/atoms](../../../../../modules/mobile/src/components/atoms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/atoms/Text.tsx`
- Lines: 148
- Symbols: 6

## AI Summary

A React Native component for rendering text in various styles and sizes.

## Public API

- `interface TextProps extends Partial<TextAccessibilityProps>, Partial<TextAndroidProps>`
- `Text`

```tsx
function Text({ children, variant = "body", color, style, numberOfLines, onPress, accessible, accessibilityRole, accessibilityLabel, accessibilityHint, importantForAccessibility, accessibilityElementsHidden, android_hyphenationFrequency, textBreakStrategy, }: TextProps)
```


## Symbols

### interface `TextProps`

- Signature: `interface TextProps extends Partial<TextAccessibilityProps>, Partial<TextAndroidProps>`
- Lines: 42-51
- Exported: yes

```tsx
interface TextProps
  extends Partial<TextAccessibilityProps>,
    Partial<TextAndroidProps> {
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  onPress?: () => void;
}
```

### function `Text`

- Signature:

```tsx
function Text({ children, variant = "body", color, style, numberOfLines, onPress, accessible, accessibilityRole, accessibilityLabel, accessibilityHint, importantForAccessibility, accessibilityElementsHidden, android_hyphenationFrequency, textBreakStrategy, }: TextProps)
```
- Lines: 53-101
- Exported: yes

```tsx
function Text({
  children,
  variant = "body",
  color,
  style,
  numberOfLines,
  onPress,
  accessible,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  importantForAccessibility,
  accessibilityElementsHidden,
  android_hyphenationFrequency,
  textBreakStrategy,
}: TextProps) {
  const theme = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        text: {
          color:
            color && color in palette
              ? palette[color as keyof typeof palette]
              : theme.colors.text.primary,
        },
      }),
    [theme.colors, color],
  );

  return (
    <RNText
      style={[styles[variant], dynamicStyles.text, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
      android_hyphenationFrequency={android_hyphenationFrequency}
      textBreakStrategy={textBreakStrategy}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      importantForAccessibility={importantForAccessibility}
      accessibilityElementsHidden={accessibilityElementsHidden}
    >
      {children}
    </RNText>
  );
}
```

### type `TextVariant`

- Signature: `type TextVariant = | "h1" | "h2" | "h3" | "body" | "caption" | "label" | "bodyBold" | "captionBold";`
- Lines: 16-24
- Exported: no

```tsx
type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "label"
  | "bodyBold"
  | "captionBold";
```

### type `TextColor`

- Signature: `type TextColor = keyof typeof palette | string;`
- Lines: 25-25
- Exported: no

```tsx
type TextColor = keyof typeof palette | string;
```

### type `TextAccessibilityProps`

- Signature:

```tsx
type TextAccessibilityProps = Pick< AccessibilityProps, | "accessible" | "accessibilityRole" | "accessibilityLabel" | "accessibilityHint" | "importantForAccessibility" | "accessibilityElementsHidden" >;
```
- Lines: 27-35
- Exported: no

```tsx
type TextAccessibilityProps = Pick<
  AccessibilityProps,
  | "accessible"
  | "accessibilityRole"
  | "accessibilityLabel"
  | "accessibilityHint"
  | "importantForAccessibility"
  | "accessibilityElementsHidden"
>;
```

### type `TextAndroidProps`

- Signature: `type TextAndroidProps = Pick< RNTextProps, "android_hyphenationFrequency" | "textBreakStrategy" >;`
- Lines: 37-40
- Exported: no

```tsx
type TextAndroidProps = Pick<
  RNTextProps,
  "android_hyphenationFrequency" | "textBreakStrategy"
>;
```
