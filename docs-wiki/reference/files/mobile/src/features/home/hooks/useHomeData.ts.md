---
title: "mobile/src/features/home/hooks/useHomeData.ts"
description: "UseHomeData hooks the mobile app's home data management system."
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
  page: "reference/files/mobile/src/features/home/hooks/useHomeData.ts.md"
  relativePath: "mobile/src/features/home/hooks/useHomeData.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/hooks/useHomeData.ts"
  module: "mobile/src/features/home/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/home/hooks/useHomeData.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/hooks](../../../../../../modules/mobile/src/features/home/hooks.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/hooks/useHomeData.ts`
- Lines: 40
- Symbols: 2

## AI Summary

UseHomeData hooks the mobile app's home data management system.

### Responsibilities

- useHomeData method
- dataloader loading logic

### Usage Notes

- Demonstrates usage of useHomeData hook to fetch and configure home data, including dashboard layout and active couple status.

## Public API

- `type BusyAction = "dashboard" | null;`
- `function useHomeData()`

## Symbols

### type `BusyAction`

- Signature: `type BusyAction = "dashboard" | null;`
- Lines: 7-7
- Exported: yes

```ts
type BusyAction = "dashboard" | null;
```

### function `useHomeData`

- Signature: `function useHomeData()`
- Lines: 9-39
- Exported: yes

```ts
function useHomeData() {
  const { session, isAuthenticated } = useSession();
  const [showFocusCard, setShowFocusCard] = useState(true);

  const isPaired = Boolean(!!session?.user?.coupleId);

  const {
    data: dashboard = null,
    isPending,
    error: queryError,
    refetch: loadDashboard,
  } = useHomeQuery();

  const busy: BusyAction =
    isPending && isAuthenticated && isPaired ? "dashboard" : null;
  const error = queryError ? toDisplayError(queryError) : null;

  // 1. Static/Getter logic has been moved to homeMap
  const mappedData = useMemo(() => mapDashboardData(dashboard), [dashboard]);

  return {
    ...mappedData,
    dashboard,
    busy,
    error,
    showFocusCard,
    setShowFocusCard,
    isPaired,
    loadDashboard,
  };
}
```
