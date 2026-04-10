---
title: "mobile/src/features/budget/components/budget-filter.tsx"
description: "BudgetFilter component"
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
  page: "reference/files/mobile/src/features/budget/components/budget-filter.tsx.md"
  relativePath: "mobile/src/features/budget/components/budget-filter.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/budget-filter.tsx"
  module: "mobile/src/features/budget/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/budget/components/budget-filter.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/budget/components](../../../../../../modules/mobile/src/features/budget/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/budget/components/budget-filter.tsx`
- Lines: 109
- Symbols: 1

## AI Summary

BudgetFilter component

### Responsibilities

- renders budget filter UI
- calls onFilterChange callback with active filter label

### Usage Notes

- (activeFilter, onFilterChange) syntax must be used to use this component

## Public API

- `function BudgetFilter({ activeFilter, onFilterChange, }: { activeFilter: string; onFilterChange: (label: string) => void; })`

## Symbols

### function `BudgetFilter`

- Signature: `function BudgetFilter({ activeFilter, onFilterChange, }: { activeFilter: string; onFilterChange: (label: string) => void; })`
- Lines: 59-84
- Exported: yes

```tsx
function BudgetFilter({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (label: string) => void;
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map((label) => (
          <FilterPill
            key={label}
            label={label}
            active={activeFilter === label}
            onPress={() => onFilterChange(label)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
```
