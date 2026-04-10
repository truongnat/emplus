---
title: "mobile/src/features/budget/components/BudgetActionMenu.tsx"
description: "A component rendering a budget action menu that provides context to the user."
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
  page: "reference/files/mobile/src/features/budget/components/BudgetActionMenu.tsx.md"
  relativePath: "mobile/src/features/budget/components/BudgetActionMenu.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/BudgetActionMenu.tsx"
  module: "mobile/src/features/budget/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/budget/components/BudgetActionMenu.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/budget/components](../../../../../../modules/mobile/src/features/budget/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/BudgetActionMenu.tsx`
- Lines: 150
- Symbols: 2

## Related Features

- [Search Create](../../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.

## AI Summary

A component rendering a budget action menu that provides context to the user.

### Responsibilities

- # Show/hide the menu
- # Close the menu

### Usage Notes

- # This component is used as a child in forms to add new expenses.

## Public API

- `function BudgetActionMenu({ showMenu, closeMenu, openAddModal, handleSeed, seeding, }: BudgetActionMenuProps)`

## Symbols

### function `BudgetActionMenu`

- Signature: `function BudgetActionMenu({ showMenu, closeMenu, openAddModal, handleSeed, seeding, }: BudgetActionMenuProps)`
- Lines: 15-116
- Exported: yes

```tsx
function BudgetActionMenu({
  showMenu,
  closeMenu,
  openAddModal,
  handleSeed,
  seeding,
}: BudgetActionMenuProps) {
  const colors = useThemeColors();

  if (!showMenu) return null;

  return (
    <View style={styles.overlay}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.scrim }]}
        onPress={closeMenu}
        accessibilityLabel="Đóng menu"
      />
      <View style={styles.menuContainer}>
        <BlurView intensity={90} tint="light" style={styles.menuContent}>
          <PressableScale
            style={[
              styles.menuItem,
              { borderBottomColor: colors.border.subtle },
            ]}
            onPress={openAddModal}
            accessibilityRole="button"
            accessibilityLabel="Thêm chi tiêu mới"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.brand.muted },
              ]}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={colors.brand.default}
              />
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Chi tiêu mới
            </AppText>
          </PressableScale>
          <PressableScale
            style={[
              styles.menuItem,
              { borderBottomColor: colors.border.subtle },
            ]}
            onPress={() => handleSeed()}
            disabled={seeding}
            accessibilityRole="button"
            accessibilityLabel="Tạo dữ liệu mẫu"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.surface.sunken },
              ]}
            >
              {seeding ? (
                <ActivityIndicator size="small" color={colors.brand.default} />
              ) : (
                <Ionicons
                  name="flask-outline"
                  size={20}
                  color={colors.brand.default}
                />
              )}
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Seed dữ liệu
            </AppText>
          </PressableScale>
          <PressableScale
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={closeMenu}
            accessibilityRole="button"
            accessibilityLabel="Đóng"
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.surface.sunken },
              ]}
            >
              <Ionicons
                name="settings-outline"
                size={20}
                color={colors.text.secondary}
              />
            </View>
            <AppText style={[styles.menuLabel, { color: colors.text.primary }]}>
              Cài đặt
            </AppText>
          </PressableScale>
        </BlurView>
      </View>
    </View>
  );
}
```

### interface `BudgetActionMenuProps`

- Signature: `interface BudgetActionMenuProps`
- Lines: 7-13
- Exported: no

```tsx
interface BudgetActionMenuProps {
  showMenu: boolean;
  closeMenu: () => void;
  openAddModal: () => void;
  handleSeed: () => void;
  seeding: boolean;
}
```
