---
title: "mobile/app/(tabs)/timeline.tsx"
description: "Defines and manages the state for a timeline screen in an authentication gate."
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
  page: "reference/files/mobile/app/tabs--7761ed0d/timeline.tsx.md"
  relativePath: "mobile/app/(tabs)/timeline.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/timeline.tsx"
  module: "mobile/app/(tabs)"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/(tabs)/timeline.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/(tabs)](../../../../modules/mobile/app/tabs--7761ed0d.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/timeline.tsx`
- Lines: 19
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Defines and manages the state for a timeline screen in an authentication gate.

### Responsibilities

- const isAuthenticated,
savedSession =
- const isPaired =
- if !isAuthenticated || !isPaired =
- ,
return &lt;
- TimelineAuthGate

### Usage Notes

- The TimelineScreen uses the useSession hook to access authentication state and determine if the user is paired.

## Public API

- `function TimelineScreen()`

## Symbols

### function `TimelineScreen`

- Signature: `function TimelineScreen()`
- Lines: 9-18
- Exported: yes

```tsx
function TimelineScreen() {
  const { isAuthenticated, session } = useSession();
  const isPaired = Boolean(session?.user?.coupleId);

  if (!isAuthenticated || !isPaired) {
    return <TimelineAuthGate isAuthenticated={isAuthenticated} />;
  }

  return <TimelineAuthenticatedBody />;
}
```
