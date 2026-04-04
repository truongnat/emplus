import React, { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, View, ScrollView, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import {
  TOAST_DEFAULT_DURATION_MS,
  TOAST_TAB_BAR_OFFSET,
} from "@/src/components/atoms/Toast";
import { Card } from "@/src/components/molecules/Card";
import { MoodVibeCheck } from "@/src/features/mood";
import {
  getCoupleMood,
  getMaleSuggestions,
  toDisplayError,
} from "@/src/api";
import { MOOD_BAND_LABEL_VI, moodBandFromValue } from "@/src/features/mood";
import { useSession } from "@/src/session-context";
import { palette } from "@/src/theme/tokens";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import {
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";

function MoodOrb({ color }: { color: string }) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const breathe = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1.06,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breathe]);

  return (
    <View style={orbStyles.wrap}>
      <Animated.View
        style={[
          orbStyles.shadow,
          {
            transform: [{ scale: breathe }],
            shadowColor: colors.text.primary,
          },
        ]}
      >
        <LinearGradient
          colors={[
            color,
            `${color}66`,
            isDark ? "rgba(255,245,247,0.22)" : palette.white,
          ]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={orbStyles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const orbStyles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  shadow: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    shadowColor: "#1C1917",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});

interface CareSuggestion {
  text: string;
  callToAction?: { label: string };
}

interface ExtendedMaleSuggestions {
  emotionalStatusContext?: string;
  suggestions?: CareSuggestion[];
  badge?: string;
}

function createCareStyles(c: SemanticColors, isDark: boolean) {
  const surf = isDark ? homeDarkGridCard.backgroundColor : c.surface.default;
  const bord = isDark ? homeDarkGridCard.borderColor : c.border.subtle;
  const sunk = isDark ? homeDarkGridInset.backgroundColor : c.surface.sunken;
  const sunkBord = isDark ? homeDarkGridInset.borderColor : c.border.subtle;
  const shadowClr = isDark ? "#0A0809" : c.text.primary;

  return StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 32,
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: "900",
      color: c.text.primary,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      color: c.text.secondary,
      marginTop: 4,
      fontWeight: "500",
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: surf,
      borderRadius: 24,
      paddingLeft: 6,
      paddingRight: 16,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: bord,
      shadowColor: shadowClr,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 2,
    },
    avatarContainer: {
      position: "relative",
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: surf,
      backgroundColor: sunk,
      alignItems: "center",
      justifyContent: "center",
    },
    statusDot: {
      position: "absolute",
      bottom: -1,
      right: -1,
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: surf,
      backgroundColor: c.status.success.icon,
    },
    badgeTextContainer: {
      marginLeft: 10,
      justifyContent: "center",
    },
    badgeLabel: {
      fontSize: 8,
      fontWeight: "800",
      color: c.text.tertiary,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    badgeValue: {
      fontSize: 12,
      fontWeight: "900",
      color: c.text.primary,
      marginTop: -2,
    },
    maleContent: {
      gap: 20,
    },
    statusCard: {
      backgroundColor: surf,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: bord,
      shadowColor: shadowClr,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.05,
      shadowRadius: 20,
      elevation: 4,
    },
    statusCardContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      padding: 20,
    },
    statusIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDark ? sunk : c.brand.muted,
      alignItems: "center",
      justifyContent: "center",
    },
    statusTextContainer: {
      flex: 1,
    },
    statusText: {
      fontSize: 17,
      fontWeight: "800",
      color: c.text.primary,
    },
    statusSubtext: {
      fontSize: 13,
      color: c.text.secondary,
      marginTop: 2,
      fontWeight: "500",
    },
    suggestionsContainer: {
      gap: 16,
      marginTop: 8,
    },
    suggestionsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 4,
    },
    suggestionsTitle: {
      fontSize: 18,
      fontWeight: "900",
      color: c.text.primary,
      letterSpacing: -0.3,
    },
    suggestionCard: {
      backgroundColor: surf,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: bord,
      shadowColor: shadowClr,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 12,
      elevation: 2,
    },
    suggestionText: {
      fontSize: 15,
      color: c.text.primary,
      lineHeight: 24,
      fontWeight: "500",
      marginBottom: 16,
    },
    suggestionAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: sunk,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: sunkBord,
    },
    suggestionActionText: {
      fontSize: 14,
      fontWeight: "800",
      color: c.brand.text,
    },
    emptySuggestions: {
      paddingVertical: 60,
      alignItems: "center",
    },
    emptySuggestionsText: {
      fontSize: 16,
      color: c.text.tertiary,
      marginTop: 12,
      fontWeight: "600",
    },
    partnerMoodCard: {
      backgroundColor: surf,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: bord,
      padding: 18,
      shadowColor: shadowClr,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.04,
      shadowRadius: 14,
      elevation: 3,
    },
    partnerMoodLabel: {
      fontSize: 10,
      fontWeight: "800",
      color: c.text.tertiary,
      letterSpacing: 1.2,
      marginBottom: 6,
    },
    partnerMoodTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: c.text.primary,
    },
    partnerMoodSub: {
      fontSize: 13,
      color: c.text.secondary,
      marginTop: 4,
      fontWeight: "500",
    },
    femaleContent: {
      alignItems: "center",
    },
    screenRoot: {
      flex: 1,
      zIndex: 1,
    },
    noticeContainer: {
      position: "absolute",
      left: 24,
      right: 24,
      zIndex: 2000,
    },
    noticeContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: c.background.inverse,
      padding: 16,
      borderRadius: 20,
      shadowColor: c.text.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
    noticeText: {
      fontSize: 14,
      color: c.text.inverse,
      fontWeight: "700",
      flex: 1,
    },
    errorContainer: {
      position: "absolute",
      left: 24,
      right: 24,
      zIndex: 2001,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: c.status.error.bg,
      padding: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.status.error.border,
    },
    errorText: {
      fontSize: 14,
      color: c.status.error.text,
      fontWeight: "700",
      flex: 1,
    },
    centerContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      zIndex: 1,
    },
    centerText: {
      fontSize: 16,
      color: c.text.secondary,
      textAlign: "center",
      fontWeight: "600",
    },
  });
}

export default function CareScreen() {
  const { session } = useSession();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const insets = useSafeAreaInsets();
  useAuthGridChrome(isDark, colors.background.default, true);
  const styles = useMemo(
    () => createCareStyles(colors, isDark),
    [colors, isDark],
  );
  const [notice, setNotice] = useState<string | null>(null);
  const isAuthenticated = !!session;

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), TOAST_DEFAULT_DURATION_MS);
    return () => clearTimeout(id);
  }, [notice]);

  const user = session?.user;
  const isMale = user?.gender === "NAM";

  const { data, error } = useQuery({
    queryKey: ["maleSuggestions"],
    queryFn: async () => {
      const result = await getMaleSuggestions();
      return result as ExtendedMaleSuggestions;
    },
    enabled: isMale,
    retry: false,
  });

  const { data: coupleMood } = useQuery({
    queryKey: ["coupleMood"],
    queryFn: getCoupleMood,
    enabled: isAuthenticated && isMale,
    staleTime: 15_000,
    refetchInterval: 20_000,
  });

  const emotionalContext = data?.emotionalStatusContext ?? "";
  const suggestions = data?.suggestions ?? [];
  const badge = data?.badge ?? "Tâm trạng ổn định";

  const contextLabel = (context?: string) => {
    if (!context || context === "" || context === "bình tĩnh")
      return "BÌNH TĨNH";
    if (context === "KY_KINH") return "NHẠY CẢM";
    if (context === "GIAI_DOAN_NANG_LUONG") return "NĂNG LƯỢNG";
    if (context === "RUNG_TRUNG") return "KẾT NỐI";
    return context.toUpperCase();
  };

  const statusColor = useMemo(() => {
    if (emotionalContext === "KY_KINH") return colors.status.error.icon;
    if (emotionalContext === "GIAI_DOAN_NANG_LUONG")
      return colors.status.success.icon;
    if (emotionalContext === "RUNG_TRUNG") return colors.brand.default;
    return colors.brand.strong;
  }, [emotionalContext, colors]);

  const toastBottom = insets.bottom + TOAST_TAB_BAR_OFFSET;
  const scrollPadTop = insets.top + 10;
  const scrollPadBottom = Math.max(128, insets.bottom + 100);

  const appShell = (body: React.ReactNode) => (
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
        {body}
      </View>
    </AppScreen>
  );

  if (!isAuthenticated) {
    return appShell(
      <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
        <EmplusLottie
          source={lottieInventory.careHeart}
          style={{ width: 160, height: 160 }}
          loop
          speed={0.85}
        />
        <Text style={styles.centerText}>
          Đăng nhập để xem màn Cảm xúc
        </Text>
      </View>,
    );
  }

  return appShell(
    <View style={styles.screenRoot}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: scrollPadTop, paddingBottom: scrollPadBottom },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {isMale ? "Chăm sóc cô ấy" : "Góc của em"}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
              {isMale
                ? "Thấu hiểu để yêu thương hơn"
                : "Lắng nghe cảm xúc cơ thể"}
            </Text>
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons
                  name="person-circle-outline"
                  size={28}
                  color={colors.text.tertiary}
                />
              </View>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.badgeTextContainer}>
              <Text style={[styles.badgeLabel, { color: colors.text.tertiary }]}>
                {isMale ? "CÔ ẤY ĐANG" : "BẢN THÂN"}
              </Text>
              <Text style={[styles.badgeValue, { color: colors.text.primary }]}>
                {isMale ? contextLabel(emotionalContext) : "TUYỆT VỜI"}
              </Text>
            </View>
          </View>
        </View>

        {isMale ? (
          /* Male View - Suggestions */
          <View style={styles.maleContent}>
            <MoodOrb color={statusColor} />
            {coupleMood?.partner ? (
              <Card style={styles.partnerMoodCard}>
                <Text style={styles.partnerMoodLabel}>TÂM TRẠNG CÔ ẤY</Text>
                {typeof coupleMood.partner.value === "number" ? (
                  <>
                    <Text style={styles.partnerMoodTitle}>
                      {MOOD_BAND_LABEL_VI[moodBandFromValue(coupleMood.partner.value)]}
                    </Text>
                    <Text style={styles.partnerMoodSub}>
                      Điểm {coupleMood.partner.value}/100 — để bạn thấu hiểu hơn hôm nay.
                    </Text>
                  </>
                ) : (
                  <Text style={styles.partnerMoodSub}>
                    {coupleMood.partner.fullName} chưa kéo thanh tâm trạng hôm nay.
                  </Text>
                )}
              </Card>
            ) : (
              <Card style={styles.partnerMoodCard}>
                <Text style={styles.partnerMoodLabel}>TÂM TRẠNG CÔ ẤY</Text>
                <Text style={styles.partnerMoodSub}>
                  Ghép đôi trong app để xem tâm trạng khi cô ấy chia sẻ.
                </Text>
              </Card>
            )}
            {/* Status Card */}
            <Card style={styles.statusCard}>
              <View style={styles.statusCardContent}>
                <View style={styles.statusIconContainer}>
                  <MaterialCommunityIcons
                    name="heart-pulse"
                    size={24}
                    color={statusColor}
                  />
                </View>
                <View style={styles.statusTextContainer}>
                  <Text style={[styles.statusText, { color: colors.text.primary }]}>
                    {badge}
                  </Text>
                  <Text style={[styles.statusSubtext, { color: colors.text.secondary }]}>
                    Dựa trên chu kỳ cảm xúc
                  </Text>
                </View>
              </View>
            </Card>

            {/* Suggestions List */}
            <View style={styles.suggestionsContainer}>
              <View style={styles.suggestionsHeader}>
                <Text style={[styles.suggestionsTitle, { color: colors.text.primary }]}>
                  Lời khuyên chăm sóc
                </Text>
                <Ionicons
                  name="sparkles"
                  size={16}
                  color={colors.brand.default}
                  opacity={0.6}
                />
              </View>

              {suggestions.length > 0 ? (
                suggestions.map((s, idx) => (
                  <Card
                    key={idx}
                    style={StyleSheet.flatten([
                      styles.suggestionCard,
                      {
                        borderLeftWidth: 4,
                        borderLeftColor: colors.brand.default,
                      },
                    ])}
                  >
                    <Text style={[styles.suggestionText, { color: colors.text.primary }]}>
                      {s.text}
                    </Text>
                    {s.callToAction?.label && (
                      <Pressable
                        style={styles.suggestionAction}
                        onPress={() => {
                          void Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                          setNotice(`Gợi ý: ${s.callToAction?.label}`);
                        }}
                        accessibilityRole="button"
                        accessibilityLabel={s.callToAction?.label}
                      >
                        <Ionicons
                          name="arrow-forward-circle-outline"
                          size={18}
                          color={colors.brand.default}
                        />
                        <Text
                          style={[
                            styles.suggestionActionText,
                            { color: colors.brand.text },
                          ]}
                        >
                          {s.callToAction.label}
                        </Text>
                      </Pressable>
                    )}
                  </Card>
                ))
              ) : (
                <View style={styles.emptySuggestions}>
                  <Ionicons
                    name="cafe-outline"
                    size={48}
                    color={colors.text.tertiary}
                  />
                  <Text
                    style={[
                      styles.emptySuggestionsText,
                      { color: colors.text.tertiary },
                    ]}
                  >
                    Chưa có gợi ý nào cho hôm nay
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* Female View - Mood Tracking */
          <View style={styles.femaleContent}>
            <MoodVibeCheck
              onMoodChange={() => {
                setNotice("Đã đồng bộ tâm trạng — người ấy có thể thấy.");
              }}
            />
          </View>
        )}
      </ScrollView>

      {isMale && error ? (
        <View style={[styles.errorContainer, { bottom: toastBottom }]}>
          <Ionicons
            name="alert-circle"
            size={20}
            color={colors.status.error.icon}
          />
          <Text style={styles.errorText}>{toDisplayError(error)}</Text>
        </View>
      ) : notice ? (
        <Pressable
          style={[styles.noticeContainer, { bottom: toastBottom }]}
          onPress={() => setNotice(null)}
          accessibilityRole="alert"
          accessibilityLabel={notice}
          accessibilityHint="Nhấn để đóng"
        >
          <View style={styles.noticeContent}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.status.success.icon}
            />
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>,
  );
}
