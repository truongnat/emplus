import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { typographyRoles } from "@/src/theme/typography-roles";

interface QuickActionsProps {
  cycleLabel: string;
  nextDateLabel: string;
}

export const QuickActions = React.memo(function QuickActions({
  cycleLabel,
  nextDateLabel,
}: QuickActionsProps) {
  const router = useRouter();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();

  const handleCarePress = useCallback(() => {
    router.push("/care");
  }, [router]);

  const handleTimelinePress = useCallback(() => {
    router.push("/timeline");
  }, [router]);

  const cardBase = {
    backgroundColor: colors.surface.raised,
    borderColor: colors.border.subtle,
  } as const;

  const iconBgCare = isDark ? "rgba(255, 107, 107, 0.14)" : "rgba(255, 107, 107, 0.12)";
  const iconBgTimeline = isDark ? "rgba(129, 140, 248, 0.16)" : "rgba(99, 102, 241, 0.1)";

  return (
    <Reveal delay={350}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText
            accessibilityRole="text"
            style={[
              styles.sectionEyebrow,
              {
                color: colors.text.tertiary,
                fontFamily: typographyRoles.caption.fontFamily,
              },
            ]}
          >
            Hôm nay
          </AppText>
          <AppText
            accessibilityRole="header"
            style={[
              styles.sectionTitle,
              {
                color: colors.text.primary,
                fontFamily: typographyRoles.titleSm.fontFamily,
              },
            ]}
          >
            Lối vào nhanh
          </AppText>
          <AppText
            style={[
              styles.sectionHint,
              {
                color: colors.text.secondary,
                fontFamily: typographyRoles.body.fontFamily,
              },
            ]}
          >
            Nhật ký chung hoặc dòng thời gian — chọn một bước nhỏ cho hai đứa.
          </AppText>
        </View>

        <View style={styles.stack}>
          <PressableScale
            scaleTo={0.98}
            style={[styles.actionCard, cardBase, elevation.raised]}
            onPress={handleCarePress}
            accessibilityRole="button"
            accessibilityLabel={`Chăm sóc & chu kỳ. ${cycleLabel}. Mở tab Chăm sóc.`}
          >
            <View style={[styles.iconWrap, { backgroundColor: iconBgCare }]}>
              <Ionicons name="heart-outline" size={22} color={colors.brand.default} />
            </View>
            <View style={styles.textCol}>
              <AppText
                style={[
                  styles.kicker,
                  {
                    color: colors.text.tertiary,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Chăm sóc & cảm xúc
              </AppText>
              <AppText
                numberOfLines={2}
                style={[
                  styles.primaryLine,
                  {
                    color: colors.text.primary,
                    fontFamily: typographyRoles.titleSm.fontFamily,
                  },
                ]}
              >
                {cycleLabel}
              </AppText>
              <AppText
                style={[
                  styles.hintLine,
                  {
                    color: colors.text.secondary,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Ghi nhật ký, tâm trạng và chu kỳ
              </AppText>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.brand.default}
            />
          </PressableScale>

          <View style={styles.connectorWrap} pointerEvents="none">
            <View
              style={[
                styles.connectorBar,
                { backgroundColor: colors.border.subtle },
              ]}
            />
          </View>

          <PressableScale
            scaleTo={0.98}
            style={[styles.actionCard, cardBase, elevation.raised]}
            onPress={handleTimelinePress}
            accessibilityRole="button"
            accessibilityLabel={`Dòng thời gian. ${nextDateLabel}. Mở lịch & kỷ niệm.`}
          >
            <View style={[styles.iconWrap, { backgroundColor: iconBgTimeline }]}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.secondary.default}
              />
            </View>
            <View style={styles.textCol}>
              <AppText
                style={[
                  styles.kicker,
                  {
                    color: colors.text.tertiary,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Lịch & kỷ niệm
              </AppText>
              <AppText
                numberOfLines={2}
                style={[
                  styles.primaryLine,
                  {
                    color: colors.text.primary,
                    fontFamily: typographyRoles.titleSm.fontFamily,
                  },
                ]}
              >
                {nextDateLabel}
              </AppText>
              <AppText
                style={[
                  styles.hintLine,
                  {
                    color: colors.text.secondary,
                    fontFamily: typographyRoles.caption.fontFamily,
                  },
                ]}
              >
                Xem sự kiện sắp tới và lịch sử đôi
              </AppText>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.secondary.default}
            />
          </PressableScale>
        </View>
      </View>
    </Reveal>
  );
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 2,
    gap: 6,
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  sectionHint: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  stack: {
    gap: 0,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textCol: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
    minWidth: 0,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  primaryLine: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  hintLine: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 1,
  },
  connectorWrap: {
    alignItems: "center",
    height: 14,
    justifyContent: "center",
  },
  connectorBar: {
    width: 2,
    height: 12,
    borderRadius: 1,
    opacity: 0.9,
  },
});
