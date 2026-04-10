---
title: "mobile/src/features/pairing/PairingGridShell.tsx"
description: "The PairingGridShell component is a wrapper around the AppScreen component, responsible for managing login and registration screens."
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
  page: "reference/files/mobile/src/features/pairing/PairingGridShell.tsx.md"
  relativePath: "mobile/src/features/pairing/PairingGridShell.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingGridShell.tsx"
  module: "mobile/src/features/pairing"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 2
---

# mobile/src/features/pairing/PairingGridShell.tsx

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/features/pairing](../../../../../modules/mobile/src/features/pairing.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/features/pairing/PairingGridShell.tsx`
- Lines: 94
- Symbols: 2

## Related Features

- [Authentication Login](../../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

The PairingGridShell component is a wrapper around the AppScreen component, responsible for managing login and registration screens.

### Responsibilities

- to display login and registration screens

### Usage Notes

- Called in React app startup

## Public API

- `function PairingGridShell({ children }: PairingGridShellProps)`

## Symbols

### function `PairingGridShell`

- Signature: `function PairingGridShell({ children }: PairingGridShellProps)`
- Lines: 28-93
- Exported: yes

```tsx
function PairingGridShell({ children }: PairingGridShellProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { clearSession } = useSession();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  useAuthGridChrome(isDark, colors.background.default, true);

  const paddingTop = authGridScrollPaddingTop(insets.top);
  const paddingBottom = Math.max(insets.bottom, 12) + 16;

  const handleBackToLogin = useCallback(() => {
    void (async () => {
      await clearSession();
      router.replace("/login");
    })();
  }, [clearSession, router]);

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
          showBrand={false}
          onBackPress={handleBackToLogin}
          accessibilityLabel="Về màn hình đăng nhập"
        />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop,
            paddingBottom,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={28}
          extraHeight={80}
          keyboardOpeningTime={0}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
```

### type `PairingGridShellProps`

- Signature: `type PairingGridShellProps = { children: ReactNode; };`
- Lines: 20-22
- Exported: no

```tsx
type PairingGridShellProps = {
  children: ReactNode;
};
```
