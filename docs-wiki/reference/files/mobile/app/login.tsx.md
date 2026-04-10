---
title: "mobile/app/login.tsx"
description: "Login screen component for user authentication."
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
  page: "reference/files/mobile/app/login.tsx.md"
  relativePath: "mobile/app/login.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/login.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/login.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/login.tsx`
- Lines: 106
- Symbols: 1

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## AI Summary

Login screen component for user authentication.

### Responsibilities

- returns JSX elements representing the login screen.
- (not specified in code snippet but assumed for authentication flow.

### Usage Notes

- The `useAuthGridChrome` hook is used to customize the appearance of grid-based charts. In this case, it's used with the `isDark` and `isHydrated` props.
- If a user is not authenticated, a loading indicator is displayed until authentication is successful.

## Public API

- `function LoginScreen()`

## Symbols

### function `LoginScreen`

- Signature: `function LoginScreen()`
- Lines: 27-105
- Exported: yes

```tsx
function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useThemeMode();
  const { isAuthenticated, hydrated: isHydrated, session } = useSession();
  const colors = useThemeColors();

  useAuthGridChrome(
    isDark,
    colors.background.default,
    isHydrated && !isAuthenticated,
  );

  if (!isHydrated) {
    return <LoginScreenLoading />;
  }

  if (isAuthenticated) {
    const isPaired = Boolean(session?.user?.coupleId);
    return <Redirect href={isPaired ? "/(tabs)/home" : "/pairing"} />;
  }

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

        <View
          style={[
            styles.brandTopLeft,
            {
              top: insets.top + AUTH_LOGIN_BRAND_TOP_OFFSET,
              left: insets.left + 20,
            },
          ]}
          pointerEvents="none"
          accessible
          accessibilityRole="text"
          accessibilityLabel="Em+"
        >
          <LoginBrandGradientTitle />
        </View>

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + 28,
              paddingTop:
                authGridScrollPaddingTop(insets.top) + AUTH_LOGIN_SCROLL_EXTRA_TOP,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={24}
          extraHeight={72}
          keyboardOpeningTime={0}
        >
          <LoginHeroSection />
          <LoginAuthForm />
          <LoginSignUpFooter />
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
```
