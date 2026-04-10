---
title: "design-builder/src/app/layout.tsx"
description: "The RootLayout component is a functional React component that returns an HTML template."
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
  page: "reference/files/design-builder/src/app/layout.tsx.md"
  relativePath: "design-builder/src/app/layout.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/app/layout.tsx"
  module: "design-builder/src/app"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/app/layout.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/app](../../../../modules/design-builder/src/app.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/app/layout.tsx`
- Lines: 27
- Symbols: 1

## AI Summary

The RootLayout component is a functional React component that returns an HTML template.

### Responsibilities

- .className

### Usage Notes

- .children

## Public API

- `function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>)`

## Symbols

### function `RootLayout`

- Signature: `function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>)`
- Lines: 13-26
- Exported: yes

```tsx
function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```
