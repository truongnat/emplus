import { useMemo } from "react";
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
import { useThemeColors } from "@/src/theme";
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
      textTransform: "uppercase" as const,
      letterSpacing: 1,
      paddingHorizontal: 4,
      marginBottom: 16,
    },
    previewCard: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
      padding: 20,
      gap: 14,
    },
    previewHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    previewBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: c.brand.muted,
    },
    previewBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: c.brand.text,
    },
    previewTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: c.text.primary,
    },
    previewBody: {
      fontSize: 14,
      lineHeight: 21,
      color: c.text.secondary,
    },
    previewFrame: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.background.default,
      padding: 16,
      gap: 10,
    },
    previewLineStrong: {
      width: "58%",
      height: 8,
      borderRadius: 999,
      backgroundColor: c.text.primary,
      opacity: 0.12,
    },
    previewLineSoft: {
      width: "42%",
      height: 8,
      borderRadius: 999,
      backgroundColor: c.text.secondary,
      opacity: 0.12,
    },
    previewSurface: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
      padding: 14,
      gap: 8,
    },
    previewSurfaceTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: c.text.primary,
    },
    previewSurfaceBody: {
      fontSize: 13,
      lineHeight: 19,
      color: c.text.secondary,
    },
  });
}

export default function AppearanceScreen() {
  const themeColors = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  useAuthGridChrome(false, themeColors.background.default, true);
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

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
      <StatusBar style="dark" />
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={false} />
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
            <AppText style={styles.sectionLabel}>Theme mặc định</AppText>

            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <View>
                  <View style={styles.previewBadge}>
                    <AppText style={styles.previewBadgeText}>
                      LookAway-inspired
                    </AppText>
                  </View>
                </View>
                <Ionicons
                  name="sunny-outline"
                  size={20}
                  color={themeColors.brand.default}
                />
              </View>

              <AppText style={styles.previewTitle}>
                Em+ hiện dùng một theme sáng duy nhất
              </AppText>
              <AppText style={styles.previewBody}>
                Để giữ trải nghiệm calm, rõ ràng, và nhất quán hơn cho release
                v1, Em+ không còn chuyển giữa sáng và tối. Toàn bộ app dùng cùng
                một theme sáng theo hướng nhẹ, yên, và dễ đọc.
              </AppText>

              <View style={styles.previewFrame}>
                <View style={styles.previewLineStrong} />
                <View style={styles.previewLineSoft} />
                <View style={styles.previewSurface}>
                  <AppText style={styles.previewSurfaceTitle}>
                    Nhớ đúng lúc
                  </AppText>
                  <AppText style={styles.previewSurfaceBody}>
                    Một giao diện sáng, ổn định và dễ nhìn giúp những điều quan
                    trọng nổi bật hơn.
                  </AppText>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
