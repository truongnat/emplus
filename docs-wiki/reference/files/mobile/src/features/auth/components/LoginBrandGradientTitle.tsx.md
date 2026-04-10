---
title: "mobile/src/features/auth/components/LoginBrandGradientTitle.tsx"
description: "A React functional component that implements a login brand gradient title with a mask."
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
  page: "reference/files/mobile/src/features/auth/components/LoginBrandGradientTitle.tsx.md"
  relativePath: "mobile/src/features/auth/components/LoginBrandGradientTitle.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginBrandGradientTitle.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/src/features/auth/components/LoginBrandGradientTitle.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/LoginBrandGradientTitle.tsx`
- Lines: 57
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

A React functional component that implements a login brand gradient title with a mask.

## Public API

- `function LoginBrandGradientTitle()`

## Symbols

### function `LoginBrandGradientTitle`

- Signature: `function LoginBrandGradientTitle()`
- Lines: 9-28
- Exported: yes

```tsx
function LoginBrandGradientTitle() {
  return (
    <MaskedView
      style={styles.maskRoot}
      maskElement={
        <View style={styles.maskBox}>
          <Text style={styles.maskText}>Em+</Text>
        </View>
      }
    >
      <LinearGradient
        colors={["#FF6B81", "#C084FC", "#7B61FF"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.gradient}
      />
    </MaskedView>
  );
}
```
