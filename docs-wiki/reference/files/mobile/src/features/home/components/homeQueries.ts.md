---
title: "mobile/src/features/home/components/homeQueries.ts"
description: "Provides a mobile home queries feature that retrieves data from the dashboard using an API with user's access token."
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
  page: "reference/files/mobile/src/features/home/components/homeQueries.ts.md"
  relativePath: "mobile/src/features/home/components/homeQueries.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/homeQueries.ts"
  module: "mobile/src/features/home/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/home/components/homeQueries.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/home/components](../../../../../../modules/mobile/src/features/home/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/home/components/homeQueries.ts`
- Lines: 23
- Symbols: 1

## AI Summary

Provides a mobile home queries feature that retrieves data from the dashboard using an API with user's access token.

### Responsibilities

- uses the useHomeQuery function, and returns a query object

### Usage Notes

- Should be used within focus effects on screens displaying the dashboard to refetch relevant data after login or authorization

## Public API

- `function useHomeQuery()`

## Symbols

### function `useHomeQuery`

- Signature: `function useHomeQuery()`
- Lines: 7-22
- Exported: yes

```ts
function useHomeQuery() {
  const { withAccessToken } = useSession();

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => withAccessToken(getDashboard),
  });

  useFocusEffect(
    useCallback(() => {
      void query.refetch();
    }, [query.refetch]),
  );

  return query;
}
```
