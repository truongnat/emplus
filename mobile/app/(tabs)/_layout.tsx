import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useSession } from "@/src/session-context";
import { LiveChannelProvider } from "@/src/features/live";
import { useThemeColors, useThemeMeta, useBlurTint } from "@/src/theme";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// Constants
const TAB_ITEM_COUNT = 4;
const PILL_PADDING = 8;
const PILL_WIDTH = width * 0.72;
const ITEM_WIDTH = (PILL_WIDTH - PILL_PADDING * 2) / TAB_ITEM_COUNT;
const PILL_HEIGHT = 72;
const ACTIVE_INDICATOR_HEIGHT = 56;
const CARE_BUTTON_SIZE = 80;

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
  const blurTint = useBlurTint();
  const blurIntensity = isDark ? 78 : 90;

  // Routes for the pill (excluding care and notifications)
  const pillRoutes = state.routes.filter(
    (r: any) => r.name !== "care" && r.name !== "notifications",
  );
  const careRouteIndex = state.routes.findIndex((r: any) => r.name === "care");
  const careRoute = state.routes[careRouteIndex];
  const isCareFocused = state.index === careRouteIndex;

  const PILL_PADDING_LOCAL = 8;
  const PILL_WIDTH_LOCAL = width * 0.72;
  const ITEM_WIDTH_LOCAL = (PILL_WIDTH_LOCAL - PILL_PADDING_LOCAL * 2) / 4;

  const pillActiveIndex = pillRoutes.findIndex(
    (r: any) => r.name === state.routes[state.index].name,
  );
  const initialX =
    pillActiveIndex === -1
      ? PILL_PADDING_LOCAL
      : PILL_PADDING_LOCAL + pillActiveIndex * ITEM_WIDTH_LOCAL;

  const slideX = useSharedValue(initialX);

  useEffect(() => {
    const routes = state.routes.filter(
      (r: any) => r.name !== "care" && r.name !== "notifications",
    );
    const idx = routes.findIndex(
      (r: any) => r.name === state.routes[state.index].name,
    );
    if (idx === -1) return;
    const target = PILL_PADDING_LOCAL + idx * ITEM_WIDTH_LOCAL;
    slideX.value = withSpring(target, {
      damping: 16,
      stiffness: 180,
      mass: 0.85,
    });
  }, [state.index, state.routes]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  const pillOuterBg = isDark ? "rgba(38, 28, 32, 0.78)" : "rgba(255, 255, 255, 0.72)";
  const careOuterBg = isDark ? "rgba(32, 24, 28, 0.85)" : "rgba(255, 255, 255, 0.82)";

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

  return (
    <View style={[styles.tabBarWrapper, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.tabBarContainer}>
        {/* Main pill — blur theo theme */}
        <View style={[styles.pillOuter, { backgroundColor: pillOuterBg }]}>
          <BlurView
            intensity={blurIntensity}
            tint={blurTint}
            style={styles.pillContainer}
          >
            {isPillFocused && (
              <Reanimated.View
                style={[
                  styles.activeIndicator,
                  {
                    width: ITEM_WIDTH_LOCAL,
                    backgroundColor: colors.brand.muted,
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
                    size={24}
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
          onPress={() => handlePress(careRoute, careRouteIndex)}
          style={[
            styles.detachedButtonWrapper,
            { shadowColor: colors.brand.default },
          ]}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityState={{ selected: isCareFocused }}
          accessibilityLabel="Cảm xúc"
          accessibilityHint="Kiểm tra tâm trạng và kết nối với người ấy"
        >
          <View style={[styles.careOuter, { backgroundColor: careOuterBg }]}>
            <BlurView
              intensity={blurIntensity}
              tint={blurTint}
              style={[
                styles.careButton,
                isCareFocused && {
                  backgroundColor: colors.brand.default,
                  borderColor: colors.brand.default,
                },
              ]}
            >
              <Ionicons
                name={isCareFocused ? "heart" : "heart-outline"}
                size={30}
                color={
                  isCareFocused ? colors.text.onBrand : colors.brand.default
                }
              />
            </BlurView>
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
    gap: 12,
  },
  pillOuter: {
    borderRadius: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  pillContainer: {
    flexDirection: "row",
    height: PILL_HEIGHT,
    width: PILL_WIDTH,
    paddingHorizontal: PILL_PADDING,
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeIndicator: {
    position: "absolute",
    height: ACTIVE_INDICATOR_HEIGHT,
    borderRadius: 28,
    left: 0,
    top: PILL_PADDING,
  },
  tabItem: {
    flex: 1,
    height: PILL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  detachedButtonWrapper: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
  },
  careOuter: {
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  careButton: {
    width: CARE_BUTTON_SIZE,
    height: CARE_BUTTON_SIZE,
    borderRadius: CARE_BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
});
