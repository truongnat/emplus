import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useSession } from "@/src/session-context";
import { LiveChannelProvider } from "@/src/features/live";
import { useThemeColors, useThemeMeta, useBlurTint } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { radius, borderWidth } from "@/src/theme/tokens";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Reanimated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { TabBarGridAnimatedBackground } from "@/src/components/molecules/TabBarGridAnimatedBackground";

const { width } = Dimensions.get("window");

/** Pill holds 4 primary tabs (home, timeline, notifications, budget) — see filter in CustomTabBar. */
const TAB_SLOTS = 4;
const PILL_PADDING = 10;
const PILL_WIDTH = Math.min(width * 0.78, 340);
const ITEM_WIDTH = (PILL_WIDTH - PILL_PADDING * 2) / TAB_SLOTS;
const PILL_HEIGHT = 62;
const ACTIVE_INDICATOR_HEIGHT = 46;
const INDICATOR_TOP = (PILL_HEIGHT - ACTIVE_INDICATOR_HEIGHT) / 2;
const CARE_BUTTON_SIZE = 72;
const CARE_RADIUS = CARE_BUTTON_SIZE / 2;
/** Smaller than pill icons — detached FAB reads cleaner with a modest heart. */
const CARE_HEART_ICON_SIZE = 24;

function iconForRoute(
  route: string,
  focused: boolean,
): keyof typeof Ionicons.glyphMap {
  if (route === "home") return focused ? "home" : "home-outline";
  if (route === "timeline") return focused ? "apps" : "apps-outline";
  if (route === "notifications")
    return focused ? "notifications" : "notifications-outline";
  if (route === "care") return "heart";
  if (route === "budget") return focused ? "pie-chart" : "pie-chart-outline";
  if (route === "profile") return focused ? "person" : "person-outline";
  return "person-outline";
}

function labelForRoute(route: string): string {
  const labels: Record<string, string> = {
    home: "Trang chủ",
    timeline: "Kế hoạch",
    notifications: "Thông báo",
    care: "Cảm xúc",
    budget: "Ngân sách",
    profile: "Tài khoản",
  };
  return labels[route] || route;
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMeta();
  const reducedMotion = useReducedMotion();
  const carePressScale = useSharedValue(1);
  const blurTint = useBlurTint();
  const blurIntensity = isDark ? 70 : 88;

  // Routes for the pill (excluding care and notifications)
  const pillRoutes = state.routes.filter(
    (r: any) => r.name !== "care" && r.name !== "notifications",
  );
  const careRouteIndex = state.routes.findIndex((r: any) => r.name === "care");
  const careRoute = state.routes[careRouteIndex];
  const isCareFocused = state.index === careRouteIndex;

  const pillActiveIndex = pillRoutes.findIndex(
    (r: any) => r.name === state.routes[state.index].name,
  );
  const initialX =
    pillActiveIndex === -1
      ? PILL_PADDING
      : PILL_PADDING + pillActiveIndex * ITEM_WIDTH;

  const slideX = useSharedValue(initialX);

  useEffect(() => {
    const routes = state.routes.filter(
      (r: any) => r.name !== "care" && r.name !== "notifications",
    );
    const idx = routes.findIndex(
      (r: any) => r.name === state.routes[state.index].name,
    );
    if (idx === -1) return;
    const target = PILL_PADDING + idx * ITEM_WIDTH;
    slideX.value = withSpring(target, {
      damping: 18,
      stiffness: 200,
      mass: 0.9,
    });
  }, [state.index, state.routes]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const careBounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: carePressScale.value }],
  }));

  function playCareHeartBounce() {
    if (reducedMotion) return;
    // Timing for press-in avoids chained-spring “steps”; spring only on release. Icon-only scale
    // (not the BlurView chrome) keeps iOS blur from re-rasterizing every frame.
    carePressScale.value = withSequence(
      withTiming(0.9, { duration: 95, easing: Easing.out(Easing.cubic) }),
      withSpring(1, {
        damping: 19,
        stiffness: 340,
        mass: 0.55,
        overshootClamping: false,
      }),
    );
  }

  /** VISUAL_DESIGN_GUIDE §2.6 — glass primary + warm fallback for Android / low blur. */
  const glassBorder = isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.38)";
  const pillGlassFallback = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.52)";
  const pillTintUnderlay = isDark ? "rgba(26, 20, 22, 0.88)" : "rgba(252, 249, 248, 0.4)";
  const careGlassFallback = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(255, 255, 255, 0.58)";
  const careTintUnderlay = isDark ? "rgba(22, 18, 20, 0.9)" : "rgba(255, 248, 247, 0.45)";

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

  const handleCarePress = async () => {
    playCareHeartBounce();
    await handlePress(careRoute, careRouteIndex);
  };

  const isPillFocused = pillRoutes.some(
    (r: any) => r.name === state.routes[state.index].name,
  );

  const navPadH = 16;
  const navPadBottom = 18;

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: insets.bottom + navPadBottom,
          paddingLeft: navPadH + insets.left,
          paddingRight: navPadH + insets.right,
        },
      ]}
    >
      <View style={styles.tabBarContainer}>
        <View
          style={[
            styles.pillOuter,
            elevation.raised,
            {
              width: PILL_WIDTH,
              height: PILL_HEIGHT,
              borderRadius: radius["2xl"],
              borderWidth: borderWidth.sm,
              borderColor: glassBorder,
              backgroundColor: pillTintUnderlay,
            },
          ]}
        >
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: radius["2xl"], overflow: "hidden" },
            ]}
          >
            <TabBarGridAnimatedBackground
              variant="embed"
              patternIdSuffix="pill"
              isDark={isDark}
              width={PILL_WIDTH}
              height={PILL_HEIGHT}
            />
          </View>
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: radius["2xl"], backgroundColor: pillGlassFallback },
            ]}
          />
          <BlurView
            intensity={blurIntensity}
            tint={blurTint}
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: radius["2xl"],
                flexDirection: "row",
                paddingHorizontal: PILL_PADDING,
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            {isPillFocused && (
              <Reanimated.View
                style={[
                  styles.activeIndicator,
                  {
                    width: ITEM_WIDTH,
                    top: INDICATOR_TOP,
                    borderRadius: radius.xl,
                    backgroundColor: colors.brand.muted,
                    borderWidth: borderWidth.thin,
                    borderColor: isDark
                      ? "rgba(255, 182, 193, 0.12)"
                      : "rgba(255, 107, 129, 0.18)",
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
                      isFocused ? colors.brand.default : colors.text.tertiary
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </BlurView>
        </View>

        <TouchableOpacity
          onPress={handleCarePress}
          style={[
            elevation.floated,
            {
              shadowColor: colors.brand.default,
              shadowOpacity: isDark ? 0.35 : 0.28,
            },
          ]}
          activeOpacity={1}
          accessibilityRole="button"
          accessibilityState={{ selected: isCareFocused }}
          accessibilityLabel="Cảm xúc"
          accessibilityHint="Kiểm tra tâm trạng và kết nối với người ấy"
        >
          <View
            style={[
              styles.careOuter,
              {
                width: CARE_BUTTON_SIZE,
                height: CARE_BUTTON_SIZE,
                borderRadius: CARE_RADIUS,
                backgroundColor: careTintUnderlay,
              },
            ]}
          >
            {/*
              Active: single solid surface — avoids BlurView + solid tint sampling grid/veil (“double bg”).
              Inactive: glass + grid stack.
            */}
            {isCareFocused ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    borderRadius: CARE_RADIUS,
                    backgroundColor: colors.brand.default,
                    borderWidth: borderWidth.sm,
                    borderColor: colors.brand.strong,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Reanimated.View
                  style={[careBounceStyle, styles.careHeartWrap]}
                >
                  <Ionicons
                    name="heart"
                    size={CARE_HEART_ICON_SIZE}
                    color={colors.text.onBrand}
                  />
                </Reanimated.View>
              </View>
            ) : (
              <>
                <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
                  <TabBarGridAnimatedBackground
                    variant="embed"
                    patternIdSuffix="care"
                    isDark={isDark}
                    width={CARE_BUTTON_SIZE}
                    height={CARE_BUTTON_SIZE}
                  />
                </View>
                <View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: careGlassFallback },
                  ]}
                />
                <BlurView
                  intensity={blurIntensity}
                  tint={blurTint}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      borderRadius: CARE_RADIUS,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: borderWidth.thin,
                      borderColor: glassBorder,
                    },
                  ]}
                >
                  <Reanimated.View
                    style={[careBounceStyle, styles.careHeartWrap]}
                  >
                    <Ionicons
                      name="heart-outline"
                      size={CARE_HEART_ICON_SIZE}
                      color={colors.brand.default}
                    />
                  </Reanimated.View>
                </BlurView>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  let sessionValue;
  try {
    sessionValue = useSession();
  } catch (e: any) {
    console.error("Error in useSession:", e);
    throw e;
  }
  const { hydrated, isAuthenticated, session } = sessionValue;

  if (!hydrated) return null;
  if (!isAuthenticated || !!!session?.user.coupleId)
    return <Redirect href="/login" />;

  return (
    <LiveChannelProvider>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Trang chủ" }} />
        <Tabs.Screen name="timeline" options={{ title: "Kế hoạch" }} />
        <Tabs.Screen name="notifications" options={{ title: "Thông báo" }} />
        <Tabs.Screen name="care" options={{ title: "Cảm xúc" }} />
        <Tabs.Screen name="budget" options={{ title: "Ngân sách" }} />
        <Tabs.Screen name="profile" options={{ title: "Tài khoản" }} />
      </Tabs>
    </LiveChannelProvider>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  pillOuter: {
    position: "relative",
    overflow: "hidden",
  },
  activeIndicator: {
    position: "absolute",
    height: ACTIVE_INDICATOR_HEIGHT,
    left: 0,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    height: PILL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  careOuter: {
    position: "relative",
    overflow: "hidden",
  },
  careHeartWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
