---
title: "mobile/app/index.tsx"
description: "The Index component displays a login or redirect UI based on user state"
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
  page: "reference/files/mobile/app/index.tsx.md"
  relativePath: "mobile/app/index.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/index.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/index.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/index.tsx`
- Lines: 58
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Login](../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The Index component displays a login or redirect UI based on user state

### Responsibilities

- UseSession hook
- ThemeColorProvider

## Public API

- `function Index()`

## Symbols

### function `Index`

- Signature: `function Index()`
- Lines: 6-41
- Exported: yes

```tsx
function Index() {
  const { hydrated, isAuthenticated, session } = useSession();
  const colors = useThemeColors();

  if (!hydrated) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background.default },
        ]}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <ActivityIndicator
          color={colors.brand.default}
          style={styles.loader}
          size="small"
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (!session?.user?.coupleId) {
    return <Redirect href="/pairing" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
```
