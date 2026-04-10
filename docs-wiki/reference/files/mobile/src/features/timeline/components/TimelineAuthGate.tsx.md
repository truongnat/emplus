---
title: "mobile/src/features/timeline/components/TimelineAuthGate.tsx"
description: "The TimelineAuthGate component verifies user authentication and presents a login or pairing button."
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
  page: "reference/files/mobile/src/features/timeline/components/TimelineAuthGate.tsx.md"
  relativePath: "mobile/src/features/timeline/components/TimelineAuthGate.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineAuthGate.tsx"
  module: "mobile/src/features/timeline/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/timeline/components/TimelineAuthGate.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/timeline/components](../../../../../../modules/mobile/src/features/timeline/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/timeline/components/TimelineAuthGate.tsx`
- Lines: 54
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Login](../../../../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The TimelineAuthGate component verifies user authentication and presents a login or pairing button.

## Public API

- `interface TimelineAuthGateProps`
- `function TimelineAuthGate({ isAuthenticated }: TimelineAuthGateProps)`

## Symbols

### interface `TimelineAuthGateProps`

- Signature: `interface TimelineAuthGateProps`
- Lines: 9-11
- Exported: yes

```tsx
interface TimelineAuthGateProps {
  isAuthenticated: boolean;
}
```

### function `TimelineAuthGate`

- Signature: `function TimelineAuthGate({ isAuthenticated }: TimelineAuthGateProps)`
- Lines: 13-38
- Exported: yes

```tsx
function TimelineAuthGate({ isAuthenticated }: TimelineAuthGateProps) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <AppScreen>
      <View style={styles.centerContainer}>
        <AppText style={[styles.centerText, { color: colors.text.tertiary }]}>
          {!isAuthenticated
            ? "Đăng nhập để xem dòng thời gian"
            : "Ghép đôi để xem kỷ niệm chung"}
        </AppText>
        <Button
          label={!isAuthenticated ? "Đăng nhập" : "Ghép đôi"}
          onPress={() =>
            router.push(!isAuthenticated ? "/login" : "/pairing")
          }
          style={styles.centerButton}
          accessibilityLabel={
            !isAuthenticated ? "Mở đăng nhập" : "Mở ghép đôi"
          }
        />
      </View>
    </AppScreen>
  );
}
```
