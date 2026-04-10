---
title: "design-builder/src/components/token-category-list.tsx"
description: "A React functional component that renders a list of categories with their icons and labels."
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
  page: "reference/files/design-builder/src/components/token-category-list.tsx.md"
  relativePath: "design-builder/src/components/token-category-list.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/token-category-list.tsx"
  module: "design-builder/src/components"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/components/token-category-list.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/components](../../../../modules/design-builder/src/components.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/token-category-list.tsx`
- Lines: 59
- Symbols: 1

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

## AI Summary

A React functional component that renders a list of categories with their icons and labels.

## Public API

- `function TokenCategoryList()`

## Symbols

### function `TokenCategoryList`

- Signature: `function TokenCategoryList()`
- Lines: 30-58
- Exported: yes

```tsx
function TokenCategoryList() {
  const { activeCategory, setActiveCategory } = useBuilderStore();

  return (
    <Card className="border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-2 h-10 transition-all duration-200',
              activeCategory === category.id 
                ? 'bg-secondary font-semibold shadow-sm' 
                : 'hover:bg-muted hover:text-foreground'
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span className="font-medium">{category.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
```
