import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton, Reveal, AppText, PressableScale } from "@/src/ui-kit";
import { useToast } from "@/src/toast-context";
import { palette } from "@/src/theme";

export interface FocusCardProps {
  focusTitle: string;
  focusSubtitle: string;
  showFocusCard: boolean;
  setShowFocusCard: (v: boolean) => void;
}

export const FocusCard = React.memo(function FocusCard({
  focusTitle,
  focusSubtitle,
  showFocusCard,
  setShowFocusCard,
}: FocusCardProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const handleDismiss = useCallback(() => {
    setShowFocusCard(false);
    showToast("Nhắc lại bạn vào ngày mai nhé 💛", "info");
  }, [setShowFocusCard, showToast]);

  const handleRecord = useCallback(() => {
    router.push("/(tabs)/care");
  }, [router]);

  if (!showFocusCard) return null;

  return (
    <Reveal delay={550}>
      <View style={styles.container}>
        <View style={styles.cardContent}>
          <View style={styles.backgroundCircle} />

          <View style={styles.headerRow}>
            <AppText variant="h3" color="slate-900">
              Trọng tâm hôm nay
            </AppText>
            <View style={styles.priorityBadge}>
              <AppText variant="captionBold" color="rose-600">
                Ưu tiên cao
              </AppText>
            </View>
          </View>

          <View style={styles.mainContentRow}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="mic-outline"
                size={24}
                color={(palette as any)["orange-500"]}
              />
            </View>
            <View style={styles.textContainer}>
              <AppText
                variant="h3"
                color="slate-800"
                style={styles.titleText}
              >
                {focusTitle}
              </AppText>
              <AppText variant="body" color="slate-500" style={styles.subtitleText}>
                {focusSubtitle}
              </AppText>
              <View style={styles.timeContainer}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={(palette as any)["slate-600"]}
                />
                <AppText variant="body" color="slate-600" style={styles.timeText}>
                  {" "}
                  Hôm nay
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.actionRow}>
            <AppButton
              label="Để sau"
              variant="ghost"
              fullWidth={false}
              style={styles.dismissButton}
              onPress={handleDismiss}
            />
            <AppButton
              label="Ghi lại tâm trạng"
              variant="primary"
              style={styles.recordButton}
              onPress={handleRecord}
            />
          </View>
        </View>
      </View>
    </Reveal>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 32,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },
  cardContent: {
    position: "relative",
    borderRadius: 32,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5F5F4",
    overflow: "hidden",
  },
  backgroundCircle: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 120,
    height: 120,
    borderRadius: 9999,
    backgroundColor: "rgba(225,29,72,0.03)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    zIndex: 10,
  },
  priorityBadge: {
    backgroundColor: "rgba(244,63,94,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mainContentRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    zIndex: 10,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    lineHeight: 24,
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1917", // taupe900
  },
  subtitleText: {
    marginTop: 6,
    color: "#A8A29E",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  timeText: {
    marginLeft: 4,
    color: "#A8A29E",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    zIndex: 10,
    width: "100%",
    marginTop: 16,
  },
  dismissButton: {
    minWidth: 80,
    paddingHorizontal: 0,
  },
  recordButton: {
    flex: 1,
  },
});
