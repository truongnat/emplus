---
title: "mobile/src/features/auth/components/AuthGridScreenShell.tsx"
description: "AuthGridScreenShell component props"
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
  page: "reference/files/mobile/src/features/auth/components/AuthGridScreenShell.tsx.md"
  relativePath: "mobile/src/features/auth/components/AuthGridScreenShell.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/AuthGridScreenShell.tsx"
  module: "mobile/src/features/auth/components"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/auth/components/AuthGridScreenShell.tsx

- Overview: [emplus Docs Wiki](../../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../../features/index.md)
- Module: [mobile/src/features/auth/components](../../../../../../modules/mobile/src/features/auth/components.md)
- Workspace: [@emplus/mobile](../../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/auth/components/AuthGridScreenShell.tsx`
- Lines: 93
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Password Reset](../../../../../../../features/auth-reset.md) - Authentication Password Reset captures the password reset workflow inside authentication. It spans 3 workspaces. Key flows include Password reset, Password reset, Password reset.

## AI Summary

AuthGridScreenShell component props

### Responsibilities

- ,

## Public API

- `function AuthGridScreenShell({ children, centerContent = false, }: AuthGridScreenShellProps)`

## Symbols

### function `AuthGridScreenShell`

- Signature: `function AuthGridScreenShell({ children, centerContent = false, }: AuthGridScreenShellProps)`
- Lines: 29-92
- Exported: yes

```tsx
function AuthGridScreenShell({
  children,
  centerContent = false,
}: AuthGridScreenShellProps) {
  const insets = useSafeAreaInsets();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  useAuthGridChrome(isDark, colors.background.default, true);

  const paddingTop = authGridScrollPaddingTop(insets.top);

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      style={{
        ...styles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={styles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />

        <RegisterTopBar
          top={insets.top + AUTH_GRID_TOP_BAR_OFFSET}
          left={insets.left + 12}
          right={insets.right + 12}
        />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            regStyles.registerScrollContent,
            {
              paddingBottom: insets.bottom + 22,
              paddingTop,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={20}
          extraHeight={64}
          keyboardOpeningTime={0}
        >
          <View
            style={[
              regStyles.registerScrollInner,
              centerContent && { justifyContent: "center" },
            ]}
          >
            {children}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
```

### type `AuthGridScreenShellProps`

- Signature: `type AuthGridScreenShellProps = { children: ReactNode; /** Vertically center hero + form in the scroll area (e.g. forgot-password); register stays top-aligned. */ centerContent?: boolean; };`
- Lines: 19-23
- Exported: no

```tsx
type AuthGridScreenShellProps = {
  children: ReactNode;
  /** Vertically center hero + form in the scroll area (e.g. forgot-password); register stays top-aligned. */
  centerContent?: boolean;
};
```
