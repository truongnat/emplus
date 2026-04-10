---
title: "mobile/src/components/organisms/AppScreen.tsx"
description: "The AppScreen component is a reusable screen container that wraps other views with interactive effects"
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
  page: "reference/files/mobile/src/components/organisms/AppScreen.tsx.md"
  relativePath: "mobile/src/components/organisms/AppScreen.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/AppScreen.tsx"
  module: "mobile/src/components/organisms"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/components/organisms/AppScreen.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/components/organisms](../../../../../modules/mobile/src/components/organisms.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/components/organisms/AppScreen.tsx`
- Lines: 84
- Symbols: 2

## AI Summary

The AppScreen component is a reusable screen container that wraps other views with interactive effects

### Responsibilities

- wraps
- contains

## Public API

- `interface AppScreenProps`
- `function AppScreen({ children, style, contentContainerStyle, animatedEntrance = true, applyTopSafeAreaPadding = true, wrapWithKeyboardDismiss = true, }: AppScreenProps)`

## Symbols

### interface `AppScreenProps`

- Signature: `interface AppScreenProps`
- Lines: 13-30
- Exported: yes

```tsx
interface AppScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scroll?: boolean;
  /** Fade + slide nhẹ khi mount (tab / màn stack) */
  animatedEntrance?: boolean;
  /**
   * When false, content extends under the status bar (no paddingTop).
   * Use for full-bleed backgrounds; apply insets manually where needed.
   */
  applyTopSafeAreaPadding?: boolean;
  /**
   * When false, không bọc TouchableWithoutFeedback (Keyboard.dismiss).
   * Cần cho màn có ScrollView full màn — wrapper có thể chặn pan vuốt trên iOS/Android.
   */
  wrapWithKeyboardDismiss?: boolean;
}
```

### function `AppScreen`

- Signature: `function AppScreen({ children, style, contentContainerStyle, animatedEntrance = true, applyTopSafeAreaPadding = true, wrapWithKeyboardDismiss = true, }: AppScreenProps)`
- Lines: 32-74
- Exported: yes

```tsx
function AppScreen({
  children,
  style,
  contentContainerStyle,
  animatedEntrance = true,
  applyTopSafeAreaPadding = true,
  wrapWithKeyboardDismiss = true,
}: AppScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const entranceStyle = useEntranceAnimation();

  const inner = (
    <View
      style={[
        styles.container,
        {
          paddingTop: applyTopSafeAreaPadding ? insets.top : 0,
          backgroundColor: theme.colors.background.default,
        },
        style,
      ]}
    >
      {animatedEntrance ? (
        <Animated.View style={[styles.content, contentContainerStyle, entranceStyle]}>
          {children}
        </Animated.View>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </View>
  );

  if (!wrapWithKeyboardDismiss) {
    return inner;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {inner}
    </TouchableWithoutFeedback>
  );
}
```
