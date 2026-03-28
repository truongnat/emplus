import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pressable, View, ScrollView, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { Card } from "@/src/components/molecules/Card";
import { MoodVibeCheck } from "@/src/features/mood";
import {
  getMaleSuggestions,
  toDisplayError,
  MaleSuggestionsPayload,
} from "@/src/api";
import { useSession } from "@/src/session-context";
import { palette } from "@/src/theme/tokens";

interface ExtendedMaleSuggestions {
  emotionalStatusContext?: string;
  suggestions?: any[];
  badge?: string;
}

export default function CareScreen() {
  const { session } = useSession();
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
    if (emotionalContext === "KY_KINH") return palette.red500;
    if (emotionalContext === "GIAI_DOAN_NANG_LUONG") return palette.green500;
    if (emotionalContext === "RUNG_TRUNG") return palette.violet500;
    return palette.violet600;
  }, [emotionalContext]);

  if (!isAuthenticated) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.centerText}>Please log in to continue</Text>
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
            <Text style={styles.title}>
              {isMale ? "Chăm sóc cô ấy" : "Góc của em"}
            </Text>
            <Text style={styles.subtitle}>
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
                  color={palette.zinc400}
                />
              </View>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.badgeTextContainer}>
              <Text style={styles.badgeLabel}>
                {isMale ? "CÔ ẤY ĐANG" : "BẢN THÂN"}
              </Text>
              <Text style={styles.badgeValue}>
                {isMale ? contextLabel(emotionalContext) : "TUYỆT VỜI"}
              </Text>
            </View>
          </View>
        </View>

        {isMale ? (
          /* Male View - Suggestions */
          <View style={styles.maleContent}>
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
                  <Text style={styles.statusText}>{badge}</Text>
                  <Text style={styles.statusSubtext}>
                    Dựa trên chu kỳ cảm xúc
                  </Text>
                </View>
              </View>
            </Card>

            {/* Suggestions List */}
            <View style={styles.suggestionsContainer}>
              <View style={styles.suggestionsHeader}>
                <Text style={styles.suggestionsTitle}>Lời khuyên chăm sóc</Text>
                <Ionicons
                  name="sparkles"
                  size={16}
                  color={palette.red600}
                  opacity={0.6}
                />
              </View>

              {suggestions.length > 0 ? (
                suggestions.map((s: any, idx: number) => (
                  <Card key={idx} style={styles.suggestionCard}>
                    <Text style={styles.suggestionText}>{s.text}</Text>
                    {s.callToAction?.label && (
                      <Pressable
                        style={styles.suggestionAction}
                        onPress={() =>
                          setNotice(`Gợi ý: ${s.callToAction?.label}`)
                        }
                      >
                        <Ionicons
                          name="arrow-forward-circle-outline"
                          size={18}
                          color={palette.red600}
                        />
                        <Text style={styles.suggestionActionText}>
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
                    color={palette.zinc400}
                  />
                  <Text style={styles.emptySuggestionsText}>
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
              partnerName={isMale ? "người ấy" : "leo"}
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
                color={palette.green500}
              />
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          </View>
        )}

        {/* Error Banner */}
        {error && isMale && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={palette.red500} />
            <Text style={styles.errorText}>{toDisplayError(error)}</Text>
          </View>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
    color: "#1C1917", // taupe900
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#78716C", // taupe500
    marginTop: 4,
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingLeft: 6,
    paddingRight: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#000",
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
    borderColor: "#fff",
    backgroundColor: "#F5F5F4",
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
    borderColor: "#fff",
    backgroundColor: "#10B981", // emerald500
  },
  badgeTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#A8A29E", // taupe400
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  badgeValue: {
    fontSize: 12,
    fontWeight: "900",
    color: "#44403C", // taupe700
    marginTop: -2,
  },
  maleContent: {
    gap: 20,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#1C1917",
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
    backgroundColor: "#FAF7F6",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTextContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1C1917",
  },
  statusSubtext: {
    fontSize: 13,
    color: "#78716C",
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
    color: "#1C1917",
    letterSpacing: -0.3,
  },
  suggestionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 15,
    color: "#44403C",
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
    backgroundColor: "#FAF7F6",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  suggestionActionText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#E48B9B",
  },
  emptySuggestions: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptySuggestionsText: {
    fontSize: 16,
    color: "#A8A29E",
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
    backgroundColor: "#1C1917",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  noticeText: {
    fontSize: 14,
    color: "#FFFFFF",
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
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  errorText: {
    fontSize: 14,
    color: "#B91C1C",
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
    color: "#78716C",
    textAlign: "center",
    fontWeight: "600",
  },
});
