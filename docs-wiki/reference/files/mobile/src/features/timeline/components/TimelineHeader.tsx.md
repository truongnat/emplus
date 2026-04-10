---
title: "mobile/src/features/timeline/components/TimelineHeader.tsx"
description: "TSX component representing a timeline header."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineHeader.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineHeader.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineHeader.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 3
---

# mobile/src/features/timeline/components/TimelineHeader.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineHeader.tsx`
- Lines: 194
- Symbols: 3

## AI Summary

TSX component representing a timeline header.

## Public API

- `interface FilterChip`
- `interface TimelineHeaderProps`
- `function TimelineHeader({ activeFilter, setActiveFilter, filters = DEFAULT_FILTERS, }: TimelineHeaderProps)`

## Symbols

### interface `FilterChip`

- Signature: `interface FilterChip`
- Lines: 13-16
- Exported: yes

```tsx
interface FilterChip {
  id: string;
  label: string;
}
```

### interface `TimelineHeaderProps`

- Signature: `interface TimelineHeaderProps`
- Lines: 18-22
- Exported: yes

```tsx
interface TimelineHeaderProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  filters?: FilterChip[];
}
```

### function `TimelineHeader`

- Signature: `function TimelineHeader({ activeFilter, setActiveFilter, filters = DEFAULT_FILTERS, }: TimelineHeaderProps)`
- Lines: 31-144
- Exported: yes

```tsx
function TimelineHeader({
  activeFilter,
  setActiveFilter,
  filters = DEFAULT_FILTERS,
}: TimelineHeaderProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const router = useRouter();

  const handleAddMemory = () => {
    router.push("/add-memory");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <AppText
          accessibilityRole="header"
          style={[
            typographyRoles.title,
            styles.title,
            {
              color: colors.text.primary,
              fontFamily: typographyRoles.display.fontFamily,
            },
          ]}
        >
          Dòng thời gian
        </AppText>
        <PressableScale
          onPress={handleAddMemory}
          style={[
            styles.plusButton,
            isDark
              ? {
                  backgroundColor: homeDarkChromeButton.backgroundColor,
                  borderColor: homeDarkChromeButton.borderColor,
                  shadowColor: "#000",
                }
              : {
                  backgroundColor: colors.surface.default,
                  borderColor: colors.border.subtle,
                  shadowColor: colors.text.primary,
                },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Thêm kỷ niệm"
        >
          <Ionicons name="add" size={24} color={colors.text.primary} />
        </PressableScale>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      >
        {filters.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <PressableScale
              key={chip.id}
              style={[
                styles.filterChip,
                isActive
                  ? isDark
                    ? {
                        backgroundColor: colors.interactive.primary,
                        borderColor: "rgba(255, 255, 255, 0.22)",
                        shadowColor: "#000",
                      }
                    : {
                        backgroundColor: colors.background.inverse,
                        borderColor: colors.border.inverse,
                        shadowColor: colors.text.primary,
                      }
                  : isDark
                    ? {
                        backgroundColor: homeDarkGridCard.backgroundColor,
                        borderColor: homeDarkGridCard.borderColor,
                        shadowColor: "#000",
                      }
                    : {
                        backgroundColor: colors.surface.default,
                        borderColor: colors.border.subtle,
                      },
              ]}
              onPress={() => setActiveFilter(chip.id)}
              scaleTo={0.95}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Lọc ${chip.label}`}
            >
              <AppText
                style={[
                  styles.filterLabel,
                  {
                    color: isActive
                      ? isDark
                        ? colors.text.onBrand
                        : colors.text.inverse
                      : colors.text.tertiary,
                  },
                ]}
              >
                {chip.label}
              </AppText>
            </PressableScale>
          );
        })}
      </ScrollView>
    </View>
  );
}
```
