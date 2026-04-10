---
title: "mobile/src/features/budget/components/BudgetHeader.tsx"
description: "A reusable budget header component that displays a title and customizable button to toggle menu visibility."
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
  page: "reference/files/mobile/src/features/budget/components/BudgetHeader.tsx.md"
  relativePath: "mobile/src/features/budget/components/BudgetHeader.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/BudgetHeader.tsx"
  module: "mobile/src/features/budget/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/budget/components/BudgetHeader.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/budget/components](../../../../../../modules/mobile/src/features/budget/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/BudgetHeader.tsx`
- Lines: 93
- Symbols: 2

## AI Summary

A reusable budget header component that displays a title and customizable button to toggle menu visibility.

## Public API

- `function BudgetHeader({ showMenu, onToggleMenu, }: BudgetHeaderProps)`

## Symbols

### function `BudgetHeader`

- Signature: `function BudgetHeader({ showMenu, onToggleMenu, }: BudgetHeaderProps)`
- Lines: 12-58
- Exported: yes

```tsx
function BudgetHeader({
  showMenu,
  onToggleMenu,
}: BudgetHeaderProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <AppText style={[styles.title, { color: colors.text.primary }]}>
        Ngân sách
      </AppText>
      <PressableScale
        onPress={onToggleMenu}
        style={[
          styles.button,
          showMenu
            ? {
                backgroundColor: colors.background.inverse,
                borderColor: colors.border.inverse,
              }
            : {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
                shadowColor: colors.text.primary,
              },
        ]}
        accessibilityRole="button"
        accessibilityLabel={showMenu ? "Đóng menu quản lý" : "Mở menu quản lý"}
        accessibilityState={{ expanded: showMenu }}
      >
        <Ionicons
          name={showMenu ? "close" : "options-outline"}
          size={20}
          color={showMenu ? colors.text.inverse : colors.text.primary}
        />
        <AppText
          style={[
            styles.buttonText,
            { color: showMenu ? colors.text.inverse : colors.text.primary },
          ]}
        >
          {showMenu ? "Đóng" : "Quản lý"}
        </AppText>
      </PressableScale>
    </View>
  );
}
```

### interface `BudgetHeaderProps`

- Signature: `interface BudgetHeaderProps`
- Lines: 7-10
- Exported: no

```tsx
interface BudgetHeaderProps {
  showMenu: boolean;
  onToggleMenu: () => void;
}
```
