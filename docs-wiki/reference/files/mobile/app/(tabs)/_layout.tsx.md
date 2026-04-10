---
title: "mobile/app/(tabs)/_layout.tsx"
description: "TypeScript source file with 4 symbols."
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
  page: "reference/files/mobile/app/(tabs)/_layout.tsx.md"
  relativePath: "mobile/app/(tabs)/_layout.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/_layout.tsx"
  module: "mobile/app/(tabs)"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 4
---

# mobile/app/(tabs)/_layout.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/app/(tabs)](../../../../modules/mobile/app/(tabs).md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/app/(tabs)/_layout.tsx`
- Lines: 403
- Symbols: 4

## Related Features

- [Authentication Login](../../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

## Public API

- `function TabsLayout()`

## Symbols

### function `TabsLayout`

- Signature: `function TabsLayout()`
- Lines: 323-368
- Exported: yes

```tsx
function TabsLayout() {
  let sessionValue;
  try {
    sessionValue = useSession();
  } catch (e: any) {
    console.error("Error in useSession:", e);
    throw e;
  }
  const { hydrated, isAuthenticated, session } = sessionValue;
  const { isDark } = useThemeMeta();

  if (!hydrated) return null;
  if (!isAuthenticated || !session?.user.coupleId)
    return <Redirect href="/login" />;

  return (
    <LiveChannelProvider>
      <View style={{ flex: 1, overflow: "visible" }}>
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}
        >
          <LoginGridAnimatedBackground isDark={isDark} />
        </View>
        <View style={{ flex: 1, zIndex: 1 }}>
          <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
              headerShown: false,
              sceneStyle: { backgroundColor: "transparent" },
            }}
          >
            <Tabs.Screen name="home" options={{ title: "Trang chủ" }} />
            <Tabs.Screen name="timeline" options={{ title: "Kế hoạch" }} />
            <Tabs.Screen name="care" options={{ title: "Cảm xúc" }} />
            <Tabs.Screen name="profile" options={{ title: "Tài khoản" }} />
            <Tabs.Screen
              name="notifications"
              options={{ title: "Thông báo", href: null }}
            />
          </Tabs>
        </View>
      </View>
    </LiveChannelProvider>
  );
}
```

### function `iconForRoute`

- Signature: `function iconForRoute( route: string, focused: boolean, ): keyof typeof Ionicons.glyphMap`
- Lines: 41-52
- Exported: no

```tsx
function iconForRoute(
  route: string,
  focused: boolean,
): keyof typeof Ionicons.glyphMap {
  if (route === "home") return focused ? "home" : "home-outline";
  if (route === "timeline") return focused ? "apps" : "apps-outline";
  if (route === "notifications")
    return focused ? "notifications" : "notifications-outline";
  if (route === "care") return focused ? "heart" : "heart-outline";
  if (route === "profile") return focused ? "person" : "person-outline";
  return "person-outline";
}
```

### function `labelForRoute`

- Signature: `function labelForRoute(route: string): string`
- Lines: 54-63
- Exported: no

```tsx
function labelForRoute(route: string): string {
  const labels: Record<string, string> = {
    home: "Trang chủ",
    timeline: "Kế hoạch",
    notifications: "Thông báo",
    care: "Cảm xúc",
    profile: "Tài khoản",
  };
  return labels[route] || route;
}
```

### function `CustomTabBar`

- Signature: `function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps)`
- Lines: 65-321
- Exported: no

```tsx
function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMeta();
  const blurTint = useBlurTint();
  const blurIntensity = isDark ? 70 : 88;

  // Routes shown in the pill (hide notifications on the tab bar)
  const pillRoutes = state.routes.filter((r: any) => r.name !== "notifications");

  const pillWidth = useMemo(() => {
    const rowUsable =
      windowWidth - NAV_HORIZONTAL_PAD * 2 - insets.left - insets.right;
    return Math.max(240, rowUsable);
  }, [windowWidth, insets.left, insets.right]);

  const itemWidth = useMemo(
    () => (pillWidth - PILL_PADDING * 2) / TAB_SLOTS,
    [pillWidth],
  );
  const pillActiveIndex = pillRoutes.findIndex(
    (r: any) => r.name === state.routes[state.index].name,
  );
  const initialX =
    pillActiveIndex === -1
      ? PILL_PADDING
      : PILL_PADDING + pillActiveIndex * itemWidth;

  const slideX = useSharedValue(initialX);

  useEffect(() => {
    const routes = state.routes.filter((r: any) => r.name !== "notifications");
    const idx = routes.findIndex(
      (r: any) => r.name === state.routes[state.index].name,
    );
    if (idx === -1) return;
    const target = PILL_PADDING + idx * itemWidth;
    slideX.value = withSpring(target, {
      damping: 18,
      stiffness: 200,
      mass: 0.9,
    });
  }, [state.index, state.routes, itemWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  /** VISUAL_DESIGN_GUIDE §2.6 — glass primary + warm fallback for Android / low blur. */
  const glassBorder = isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.38)";
  const pillGlassFallback = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.52)";
  const pillTintUnderlay = isDark ? "rgba(26, 20, 22, 0.88)" : "rgba(252, 249, 248, 0.4)";
  const barBackdropColors = isDark
    ? (["rgba(26, 20, 22, 0)", "rgba(26, 20, 22, 0.52)", "rgba(26, 20, 22, 0.94)"] as const)
    : (["rgba(252, 249, 248, 0)", "rgba(252, 249, 248, 0.42)", "rgba(252, 249, 248, 0.92)"] as const);
  const handlePress = async (route: any, index: number) => {
    // Trigger haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const isPillFocused = pillRoutes.some(
    (r: any) => r.name === state.routes[state.index].name,
  );

  const navPadBottom = 18;
  const barBackdropHeight =
    insets.bottom + navPadBottom + PILL_HEIGHT + 56;

  const pillRadius = radius["2xl"];
  const pillShellStyle = {
    width: pillWidth,
    height: PILL_HEIGHT,
    borderRadius: pillRadius,
    overflow: "hidden" as const,
    borderWidth: borderWidth.sm,
    borderColor: glassBorder,
  };

  const gridUnderPill = (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius: pillRadius, overflow: "hidden" },
      ]}
    >
      <TabBarGridAnimatedBackground
        variant="embed"
        patternIdSuffix="pill"
        isDark={isDark}
        width={pillWidth}
        height={PILL_HEIGHT}
      />
    </View>
  );

  const pillFrostOverlay = (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { borderRadius: pillRadius, backgroundColor: pillGlassFallback },
      ]}
    />
  );

  const tabTrack = (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: PILL_PADDING,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {isPillFocused && (
        <Reanimated.View
          style={[
            styles.activeIndicator,
            {
              width: itemWidth,
              top: INDICATOR_TOP,
              borderRadius: radius.xl,
              backgroundColor: colors.interactive.primary,
              borderWidth: borderWidth.thin,
              borderColor: "rgba(255, 255, 255, 0.22)",
            },
            indicatorStyle,
          ]}
        />
      )}

      {pillRoutes.map((route: any) => {
        const routeIndex = state.routes.findIndex(
          (r: any) => r.key === route.key,
        );
        const isFocused = state.index === routeIndex;
        const label = labelForRoute(route.name);
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(route, routeIndex)}
            style={styles.tabItem}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}
            accessibilityHint={`Chuyển đến ${label.toLowerCase()}`}
          >
            <Ionicons
              name={iconForRoute(route.name, isFocused)}
              size={isFocused ? 25 : 23}
              color={
                isFocused
                  ? colors.text.onBrand
                  : isDark
                    ? "#FFFFFF"
                    : "#000000"
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: insets.bottom + navPadBottom,
          paddingLeft: NAV_HORIZONTAL_PAD + insets.left,
          paddingRight: NAV_HORIZONTAL_PAD + insets.right,
        },
      ]}
    >
      <LinearGradient
        pointerEvents="none"
        colors={[...barBackdropColors]}
        locations={[0, 0.38, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: barBackdropHeight,
        }}
      />

      <View style={styles.tabBarContainer}>
        {isLiquidGlassSupported ? (
          <LiquidGlassView
            style={[styles.pillOuter, elevation.raised, pillShellStyle]}
            glassStyle="regular"
            colorScheme={isDark ? "dark" : "light"}
            tintColor={
              isDark
                ? "rgba(255, 255, 255, 0.12)"
                : "rgba(255, 255, 255, 0.38)"
            }
            isInteractive
          >
            {gridUnderPill}
            {pillFrostOverlay}
            {tabTrack}
          </LiquidGlassView>
        ) : (
          <View
            style={[
              styles.pillOuter,
              elevation.raised,
              pillShellStyle,
              { backgroundColor: pillTintUnderlay },
            ]}
          >
            {gridUnderPill}
            {pillFrostOverlay}
            <BlurView
              intensity={blurIntensity}
              tint={blurTint}
              style={[
                StyleSheet.absoluteFillObject,
                { borderRadius: pillRadius, overflow: "hidden" },
              ]}
            >
              <LinearGradient
                pointerEvents="none"
                colors={
                  isDark
                    ? ["rgba(38, 28, 32, 0.58)", "rgba(26, 20, 22, 0.48)"]
                    : ["rgba(255, 255, 255, 0.58)", "rgba(255, 255, 255, 0.4)"]
                }
                style={StyleSheet.absoluteFillObject}
              />
              {tabTrack}
            </BlurView>
          </View>
        )}
      </View>
    </View>
  );
}
```
