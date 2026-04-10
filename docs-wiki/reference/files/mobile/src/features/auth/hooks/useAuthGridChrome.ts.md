---
title: "mobile/src/features/auth/hooks/useAuthGridChrome.ts"
description: "The `useAuthGridChrome` hook provides a customized background color for the login grid based on Chrome preferences."
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
  page: "reference/files/mobile/src/features/auth/hooks/useAuthGridChrome.ts.md"
  relativePath: "mobile/src/features/auth/hooks/useAuthGridChrome.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/hooks/useAuthGridChrome.ts"
  module: "mobile/src/features/auth/hooks"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/hooks/useAuthGridChrome.ts

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/hooks](../../../../../../modules/mobile/src/features/auth/hooks.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/hooks/useAuthGridChrome.ts`
- Lines: 33
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The `useAuthGridChrome` hook provides a customized background color for the login grid based on Chrome preferences.

### Responsibilities

- To apply a customized background color to the login grid

### Usage Notes

- This hook must be used inside a FocusEffect to ensure proper synchronization with the UI state.

## Public API

- `function useAuthGridChrome( isDark: boolean, backgroundDefault: string, syncChrome: boolean, )`

## Symbols

### function `useAuthGridChrome`

- Signature: `function useAuthGridChrome( isDark: boolean, backgroundDefault: string, syncChrome: boolean, )`
- Lines: 16-32
- Exported: yes

```ts
function useAuthGridChrome(
  isDark: boolean,
  backgroundDefault: string,
  syncChrome: boolean,
) {
  useFocusEffect(
    useCallback(() => {
      if (syncChrome) {
        const chrome = isDark ? LOGIN_GRID_TOP_DARK : LOGIN_GRID_TOP_LIGHT;
        void SystemUI.setBackgroundColorAsync(chrome);
      }
      return () => {
        void SystemUI.setBackgroundColorAsync(backgroundDefault);
      };
    }, [syncChrome, isDark, backgroundDefault]),
  );
}
```
