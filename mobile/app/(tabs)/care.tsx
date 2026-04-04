import React, { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Pressable,
  View,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { Card } from "@/src/components/molecules/Card";
import { MoodVibeCheck } from "@/src/features/mood";
import { getMaleSuggestions, toDisplayError } from "@/src/api";
import { useSession } from "@/src/session-context";
import { palette } from "@/src/theme/tokens";
import { useThemeColors } from "@/src/theme";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import type { SemanticColors } from "@/src/theme/tokens/semantic";

function MoodOrb({ color }: { color: string }) {
  const colors = useThemeColors();
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
          colors={[color, `${color}66`, palette.white]}
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

interface ExtendedMaleSuggestions {
  emotionalStatusContext?: string;
  suggestions?: any[];
  badge?: string;
}

function createCareStyles(c: SemanticColors) {
  return StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 120,
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
      backgroundColor: c.surface.default,
      borderRadius: 24,
      paddingLeft: 6,
      paddingRight: 16,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: c.border.subtle,
      shadowColor: c.text.primary,
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
      borderColor: c.surface.default,
      backgroundColor: c.surface.sunken,
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
      borderColor: c.surface.default,
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
      backgroundColor: c.surface.default,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: c.border.subtle,
      shadowColor: c.text.primary,
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
      backgroundColor: c.surface.sunken,
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
      backgroundColor: c.surface.default,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: c.border.subtle,
      shadowColor: c.text.primary,
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
      backgroundColor: c.surface.sunken,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border.subtle,
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
    femaleContent: {
      alignItems: "center",
    },
    noticeContainer: {
      position: "absolute",
      bottom: 110,
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
      bottom: 110,
      left: 24,
      right: 24,
      zIndex: 2000,
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
  const styles = useMemo(() => createCareStyles(colors), [colors]);
  const [notice, setNotice] = useState<string | null>(null);
  const isAuthenticated = !!session;

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

  if (!isAuthenticated) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <EmplusLottie
            source={lottieInventory.careHeart}
            style={{ width: 160, height: 160 }}
            loop
            speed={0.85}
          />
          <Text style={styles.centerText}>
            Đăng nhập để xem màn Cảm xúc
          </Text>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
              },
            ]}
          >
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: colors.surface.sunken,
                    borderColor: colors.surface.default,
                  },
                ]}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={28}
                  color={colors.text.tertiary}
                />
              </View>
              <View
                style={[
                  styles.statusDot,
                  { borderColor: colors.surface.default },
                ]}
              />
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

        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <EmplusLottie
            source={lottieInventory.careHeart}
            style={{ width: 128, height: 128 }}
            loop
            speed={0.8}
          />
        </View>

        {isMale ? (
          /* Male View - Suggestions */
          <View style={styles.maleContent}>
            <MoodOrb color={statusColor} />
            {/* Status Card */}
            <Card style={styles.statusCard}>
              <View style={styles.statusCardContent}>
                <View
                  style={[
                    styles.statusIconContainer,
                    { backgroundColor: colors.brand.muted },
                  ]}
                >
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
                suggestions.map((s: any, idx: number) => (
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
                        style={[
                          styles.suggestionAction,
                          {
                            backgroundColor: colors.surface.sunken,
                            borderColor: colors.border.subtle,
                          },
                        ]}
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
              partnerName="người ấy"
              onMoodChange={(val) => {
                setNotice("Đã cập nhật tâm trạng của bạn!");
              }}
            />
          </View>
        )}

        {/* Notice Toast */}
        {notice && (
          <View style={styles.noticeContainer}>
            <View style={styles.noticeContent}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.status.success.icon}
              />
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          </View>
        )}

        {/* Error Banner */}
        {error && isMale && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle"
              size={20}
              color={colors.status.error.icon}
            />
            <Text style={styles.errorText}>{toDisplayError(error)}</Text>
          </View>
        )}
      </ScrollView>
    </AppScreen>
  );
}
