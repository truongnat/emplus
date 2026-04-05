import { useMemo, useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText } from "@/src/ui-kit";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { palette, useThemeColors, useThemeMode } from "@/src/theme";
import type { SemanticColors } from "@/src/theme/tokens/semantic";

function createStyles(c: SemanticColors) {
  return StyleSheet.create({
    screenRoot: { flex: 1, zIndex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: c.text.primary },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "bold",
      color: c.text.tertiary,
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
      paddingHorizontal: 4,
      marginBottom: 16,
    },
    themeRow: { flexDirection: "row", gap: 16 },
    themeButton: { flex: 1 },
    themePreview: {
      width: "100%",
      height: 72,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.sunken,
      padding: 12,
      marginBottom: 8,
    },
    themeLine1: {
      width: "60%",
      height: 6,
      backgroundColor: c.border.subtle,
      borderRadius: 3,
      marginBottom: 6,
    },
    themeLine2: {
      width: "40%",
      height: 6,
      backgroundColor: c.border.subtle,
      borderRadius: 3,
    },
    themeLabel: {
      fontSize: 11,
      fontWeight: "bold",
      textTransform: "uppercase" as "uppercase",
      letterSpacing: 1,
    },
    themeLabelDefault: { color: c.text.tertiary },
    colorRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    colorButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    colorDot: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: c.surface.default,
    },
    colorDotSelected: { borderColor: c.text.primary },
  });
}

export default function AppearanceScreen() {
  const themeColors = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    colorScheme,
    setThemePreference,
    themePreference,
    isDark,
  } = useThemeMode();
  useAuthGridChrome(isDark, themeColors.background.default, true);
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  const [accentColor, setAccentColor] = useState("#ec1334");

  const lightSelected =
    themePreference === "light" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "light");
  const darkSelected =
    themePreference === "dark" ||
    ((themePreference === "system" || themePreference === "daylight") &&
      colorScheme === "dark");

  const accentSwatches = [
    "#ec1334",
    "#f43f5e",
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

  const scrollPadBottom = Math.max(insets.bottom + 32, 48);

  return (
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
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />
        <View style={styles.screenRoot}>
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Quay lại"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={themeColors.text.primary}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle}>Giao diện</AppText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1, backgroundColor: "transparent" }}
            contentContainerStyle={{ padding: 20, paddingBottom: scrollPadBottom }}
            showsVerticalScrollIndicator={false}
          >
            <>
              <AppText style={styles.sectionLabel}>Chế độ hiển thị</AppText>
              <View style={styles.themeRow}>
                <TouchableOpacity
                  style={styles.themeButton}
                  onPress={() => setThemePreference("light")}
                  accessibilityRole="button"
                  accessibilityLabel="Chế độ sáng"
                  accessibilityState={{ selected: lightSelected }}
                >
                  <View
                    style={[
                      styles.themePreview,
                      lightSelected && {
                        borderColor: themeColors.brand.default,
                      },
                    ]}
                  >
                    <View style={styles.themeLine1} />
                    <View style={styles.themeLine2} />
                  </View>
                  <AppText
                    style={[
                      styles.themeLabel,
                      lightSelected
                        ? { color: themeColors.brand.default }
                        : styles.themeLabelDefault,
                    ]}
                  >
                    Sáng
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.themeButton}
                  onPress={() => setThemePreference("dark")}
                  accessibilityRole="button"
                  accessibilityLabel="Chế độ tối"
                  accessibilityState={{ selected: darkSelected }}
                >
                  <View
                    style={[
                      styles.themePreview,
                      {
                        backgroundColor: palette.zinc800,
                        borderColor: palette.zinc700,
                      },
                      darkSelected && {
                        borderColor: themeColors.brand.default,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "60%",
                        height: 6,
                        backgroundColor: palette.zinc600,
                        borderRadius: 3,
                        marginBottom: 6,
                      }}
                    />
                    <View
                      style={{
                        width: "40%",
                        height: 6,
                        backgroundColor: palette.zinc600,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <AppText
                    style={[
                      styles.themeLabel,
                      darkSelected
                        ? { color: themeColors.brand.default }
                        : styles.themeLabelDefault,
                    ]}
                  >
                    Tối
                  </AppText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 16,
                  rowGap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setThemePreference("system")}
                  style={{ paddingVertical: 8, paddingHorizontal: 4 }}
                  accessibilityRole="button"
                  accessibilityLabel="Theo cài đặt hệ thống"
                  accessibilityState={{ selected: themePreference === "system" }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        themePreference === "system"
                          ? themeColors.brand.default
                          : themeColors.text.tertiary,
                    }}
                  >
                    Theo hệ thống
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setThemePreference("daylight")}
                  style={{ paddingVertical: 8, paddingHorizontal: 4 }}
                  accessibilityRole="button"
                  accessibilityLabel="Theo ngày và đêm theo giờ địa phương"
                  accessibilityState={{ selected: themePreference === "daylight" }}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        themePreference === "daylight"
                          ? themeColors.brand.default
                          : themeColors.text.tertiary,
                    }}
                  >
                    Theo ngày / đêm
                  </AppText>
                </TouchableOpacity>
              </View>
              {themePreference === "daylight" ? (
                <AppText
                  style={{
                    marginTop: 6,
                    textAlign: "center",
                    fontSize: 12,
                    color: themeColors.text.tertiary,
                    paddingHorizontal: 12,
                  }}
                >
                  Tự động: sáng khoảng 6:00–19:00, tối các giờ còn lại (giờ máy).
                </AppText>
              ) : null}
            </>

            <>
              <AppText style={[styles.sectionLabel, { marginTop: 32 }]}>
                Màu nhấn
              </AppText>
              <View style={styles.colorRow}>
                {accentSwatches.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={styles.colorButton}
                    onPress={() => setAccentColor(color)}
                  >
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: color },
                        accentColor === color && styles.colorDotSelected,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
