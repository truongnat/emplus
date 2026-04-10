---
title: "mobile/app/_layout.tsx"
description: "ErrorBoundary component handles error situations and provides an optional fallback screen"
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
  page: "reference/files/mobile/app/_layout.tsx.md"
  relativePath: "mobile/app/_layout.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/_layout.tsx"
  module: "mobile/app"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 5
---

# mobile/app/_layout.tsx

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/app](../../../modules/mobile/app.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/_layout.tsx`
- Lines: 221
- Symbols: 5

## Related Features

- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Notifications Read / List](../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.

## AI Summary

ErrorBoundary component handles error situations and provides an optional fallback screen

### Responsibilities

- ErrorBoundary
- RootLayoutInner

### Usage Notes

- The ErrorBoundary component is responsible for handling errors in the application and providing a fallback screen when an error occurs.

## Public API

- `function RootLayout()`

## Symbols

### function `RootLayout`

- Signature: `function RootLayout()`
- Lines: 208-220
- Exported: yes

```tsx
function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <ThemeModeProvider>
          <ThemeProvider>
            <RootLayoutInner />
          </ThemeProvider>
        </ThemeModeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
```

### class `ErrorBoundary`

- Signature: `class ErrorBoundary extends React.Component< { children: React.ReactNode }, { hasError: boolean; error: Error | null } >`
- Lines: 32-59
- Exported: no

```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.emoji}>😟</Text>
          <Text style={errorStyles.title}>Đã xảy ra lỗi</Text>
          <Text style={errorStyles.message}>
            Vui lòng khởi động lại ứng dụng.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={errorStyles.detail}>{this.state.error.message}</Text>
          )}
        </View>
      );
    }
    return this.props.children;
  }
}
```

### method `getDerivedStateFromError`

- Signature: `static getDerivedStateFromError(error: Error)`
- Lines: 38-40
- Exported: no

```tsx
static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
```

### method `render`

- Signature: `render()`
- Lines: 42-58
- Exported: no

```tsx
render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.emoji}>😟</Text>
          <Text style={errorStyles.title}>Đã xảy ra lỗi</Text>
          <Text style={errorStyles.message}>
            Vui lòng khởi động lại ứng dụng.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={errorStyles.detail}>{this.state.error.message}</Text>
          )}
        </View>
      );
    }
    return this.props.children;
  }
```

### function `RootLayoutInner`

- Signature: `function RootLayoutInner()`
- Lines: 87-206
- Exported: no

```tsx
function RootLayoutInner() {
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
    BeVietnamPro_800ExtraBold,
    RobotoMono_400Regular,
    RobotoMono_700Bold,
  });
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true);
  }, []);

  if (!splashDone) {
    return (
      <AnimatedSplashScreen
        isReady={fontsLoaded}
        onFinish={handleSplashFinish}
      />
    );
  }

  return (
    <ToastProvider>
      <AlertDialogProvider>
        <SessionProvider>
          <ApiProvider>
          <>
            <NotificationBootstrap />
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen
                name="(tabs)"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="login"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="register"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="forgot-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="reset-password"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="pairing"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen
                name="verify-otp"
                options={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen name="policy" />
              <Stack.Screen name="add-expense" />
              <Stack.Screen name="add-memory" />
              <Stack.Screen name="memory/[id]" />
              <Stack.Screen
                name="profile-details/personal-info"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/notifications"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/appearance"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/privacy"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
              <Stack.Screen
                name="profile-details/help"
                options={{ contentStyle: { backgroundColor: "transparent" } }}
              />
            </Stack>
          </>
          </ApiProvider>
        </SessionProvider>
      </AlertDialogProvider>
    </ToastProvider>
  );
}
```
