---
title: "design-builder/src/components/ui/sonner.tsx"
description: "The Toaster component constructor in Sonner UI."
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
  page: "reference/files/design-builder/src/components/ui/sonner.tsx.md"
  relativePath: "design-builder/src/components/ui/sonner.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/ui/sonner.tsx"
  module: "design-builder/src/components/ui"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 2
---

# design-builder/src/components/ui/sonner.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [design-builder/src/components/ui](../../../../../modules/design-builder/src/components/ui.md)
- Workspace: [@emplus/design-builder](../../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/ui/sonner.tsx`
- Lines: 26
- Symbols: 2

## Related Features

- [Design](../../../../../../features/design.md) - Design captures the main design behavior discovered in the codebase. Key flows include Design operations flow, Design operations flow.

## AI Summary

The Toaster component constructor in Sonner UI.

## Symbols

### type `ToasterProps`

- Signature: `type ToasterProps = React.ComponentProps<typeof Sonner>`
- Lines: 3-3
- Exported: no

```tsx
type ToasterProps = React.ComponentProps<typeof Sonner>
```

### function `Toaster`

- Signature: `Toaster = ({ ...props }: ToasterProps) => { return ( <Sonner className="toaste`
- Lines: 5-23
- Exported: no

```tsx
Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}
```
