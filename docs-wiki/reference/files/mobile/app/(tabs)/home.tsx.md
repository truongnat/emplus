---
title: "mobile/app/(tabs)/home.tsx"
description: "TypeScript source file with 1 symbol."
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
  generatedAt: "2026-04-09T11:58:30.095Z"
  page: "reference/files/mobile/app/(tabs)/home.tsx.md"
  relativePath: "mobile/app/(tabs)/home.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/home.tsx"
  module: "mobile/app/(tabs)"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 1
---

# mobile/app/(tabs)/home.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/(tabs)](../../../../modules/mobile/app/(tabs).md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/home.tsx`
- Lines: 201
- Symbols: 1

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Order Management Login](../../../../../features/order-login.md) - Order Management Login captures the login workflow inside order management. It spans 2 workspaces. Key flows include Auth login, Auth login, Auth login.

## Public API

- `function HomeScreen()`

## Symbols

### function `HomeScreen`

- Signature: `function HomeScreen()`
- Lines: 34-200
- Exported: yes

```tsx
function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, hydrated, isAuthenticated } = useSession();

  useAuthGridChrome(isDark, colors.background.default, true);

  const {
    isPaired,
    greetingInfo,
    loveDays,
    cycleLabel,
    upcomingEvents,
    nextDateLabel,
    focusTitle,
    focusSubtitle,
    showFocusCard,
    setShowFocusCard,
  } = useHomeData();

  useEffect(() => {
    if (isAuthenticated && isPaired) {
      router.prefetch("/care");
      router.prefetch("/timeline");
      router.prefetch("/notifications");
    }
  }, [isAuthenticated, isPaired, router]);

  const scrollPaddingTop =
    authGridScrollPaddingTop(insets.top) + AUTH_LOGIN_SCROLL_EXTRA_TOP;
  /** Floating tab bar (~72px) + wrapper padding + home indicator — never clip last section. */
  const scrollPaddingBottom = scrollPadBottomWithTabBar(insets.bottom);

  const authShell = (
    children: React.ReactNode,
    chromeTrailing?: React.ReactNode,
  ) => (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.layerRoot}>
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
        {chromeTrailing}
        {children}
      </View>
    </AppScreen>
  );

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return authShell(
      <View style={styles.centerContainer}>
        <EmplusLottie
          source={lottieInventory.empty}
          style={{ width: 140, height: 140 }}
          loop
        />
        <Text style={[styles.centerText, { color: colors.text.secondary }]}>
          Đăng nhập để tiếp tục
        </Text>
        <Button
          label="Đăng nhập"
          onPress={() => router.push("/login")}
          accessibilityLabel="Mở màn hình đăng nhập"
        />
      </View>,
    );
  }

  if (!isPaired) {
    return authShell(
      <View style={styles.centerContainer}>
        <EmplusLottie
          source={lottieInventory.careHeart}
          style={{ width: 140, height: 140 }}
          loop
          speed={0.9}
        />
        <Text style={[styles.centerText, { color: colors.text.secondary }]}>
          Ghép đôi với người ấy để dùng đầy đủ tính năng
        </Text>
        <Button
          label="Ghép đôi"
          onPress={() => router.push("/pairing")}
          accessibilityLabel="Mở màn hình ghép đôi"
        />
      </View>,
    );
  }

  return authShell(
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: scrollPaddingTop,
          paddingBottom: scrollPaddingBottom,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
    >
      <HomeHeader
        userInitial={session?.user?.email?.[0]?.toUpperCase() || "B"}
        greeting={greetingInfo.greeting}
        subGreeting={greetingInfo.subGreeting}
        iconName={greetingInfo.iconName}
      />

      <HeroCard loveDays={loveDays} />

      <QuickActions cycleLabel={cycleLabel} nextDateLabel={nextDateLabel} />

      {showFocusCard && (
        <FocusCard
          focusTitle={focusTitle}
          focusSubtitle={focusSubtitle}
          showFocusCard={showFocusCard}
          setShowFocusCard={setShowFocusCard}
        />
      )}

      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </ScrollView>,
    <View
      style={[
        styles.brandTopRight,
        {
          top: insets.top + AUTH_LOGIN_BRAND_TOP_OFFSET,
          right: insets.right + 20,
        },
      ]}
    >
      <HomeChromeNotificationButton />
    </View>,
  );
}
```
