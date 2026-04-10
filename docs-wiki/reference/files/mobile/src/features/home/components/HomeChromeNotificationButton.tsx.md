---
title: "mobile/src/features/home/components/HomeChromeNotificationButton.tsx"
description: "The HomeChromeNotificationButton component is a reusable button for displaying Chrome notifications."
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
  page: "reference/files/mobile/src/features/home/components/HomeChromeNotificationButton.tsx.md"
  relativePath: "mobile/src/features/home/components/HomeChromeNotificationButton.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeChromeNotificationButton.tsx"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/home/components/HomeChromeNotificationButton.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/HomeChromeNotificationButton.tsx`
- Lines: 56
- Symbols: 1

## AI Summary

The HomeChromeNotificationButton component is a reusable button for displaying Chrome notifications.

### Responsibilities

- returns the string 'Mở thông báo'

## Public API

- `function HomeChromeNotificationButton()`

## Symbols

### function `HomeChromeNotificationButton`

- Signature: `function HomeChromeNotificationButton()`
- Lines: 12-40
- Exported: yes

```tsx
function HomeChromeNotificationButton() {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const router = useRouter();

  const onPress = useCallback(() => {
    router.push("/notifications");
  }, [router]);

  return (
    <PressableScale
      style={[
        styles.button,
        isDark
          ? {
              backgroundColor: homeDarkChromeButton.backgroundColor,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: homeDarkChromeButton.borderColor,
            }
          : { backgroundColor: colors.surface.default },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Mở thông báo"
    >
      <RingingBell />
    </PressableScale>
  );
}
```
