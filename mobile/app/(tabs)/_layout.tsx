import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useSession } from "@/src/session-context";
import { LiveChannelProvider } from "@/src/features/live";
import { useThemeColors, useThemeMeta, useBlurTint } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { radius, borderWidth } from "@/src/theme/tokens";
import { BlurView } from "expo-blur";
import { useEffect, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { TabBarGridAnimatedBackground } from "@/src/components/molecules/TabBarGridAnimatedBackground";

/** Pill: home, timeline, care, profile — notifications chỉ truy cập gián tiếp (không hiện trên bar). */
const TAB_SLOTS = 4;
const PILL_PADDING = 10;
/** Lề ngang tab bar tới cạnh màn hình (cộng thêm safe area trong style). */
const NAV_HORIZONTAL_PAD = 24;
const PILL_HEIGHT = 62;
const ACTIVE_INDICATOR_HEIGHT = 46;
const INDICATOR_TOP = (PILL_HEIGHT - ACTIVE_INDICATOR_HEIGHT) / 2;

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

function CustomTabBar({ state, descriptors, navigation }: any) {
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
      <View style={styles.tabBarContainer}>
        <View
          style={[
            styles.pillOuter,
            elevation.raised,
            {
              width: pillWidth,
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
              width={pillWidth}
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
                    width: itemWidth,
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
        <Tabs.Screen name="care" options={{ title: "Cảm xúc" }} />
        <Tabs.Screen name="profile" options={{ title: "Tài khoản" }} />
        <Tabs.Screen
          name="notifications"
          options={{ title: "Thông báo", href: null }}
        />
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
    alignSelf: "stretch",
    justifyContent: "center",
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
});
