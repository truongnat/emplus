import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";
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

  const handleCarePress = useCallback(() => {
    router.push("/care");
  }, [router]);

  const handleTimelinePress = useCallback(() => {
    router.push("/timeline");
  }, [router]);

  const cardBase = {
    backgroundColor: colors.surface.raised,
    borderColor: colors.border.subtle,
  };

  const actions = [
    {
      id: "care",
      kicker: "Quan tâm đúng lúc",
      title: cycleLabel,
      hint: "Ghi lại điều nên nhớ hoặc xem gợi ý cho hôm nay.",
      icon: "heart-outline" as const,
      accent: colors.brand.default,
      accentBg: colors.brand.muted,
      onPress: handleCarePress,
    },
    {
      id: "timeline",
      kicker: "Kỷ niệm sắp tới",
      title: nextDateLabel,
      hint: "Xem các mốc đang đến gần và chuẩn bị sớm hơn.",
      icon: "calendar-outline" as const,
      accent: colors.text.tertiary,
      accentBg: colors.surface.sunken,
      onPress: handleTimelinePress,
    },
  ];

  return (
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
          Mở tiếp
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
          Hai nơi nên xem tiếp
        </AppText>
      </View>

      <View style={styles.stack}>
        {actions.map((action) => (
          <PressableScale
            key={action.id}
            scaleTo={0.985}
            style={[styles.actionCard, cardBase]}
            onPress={action.onPress}
            accessibilityRole="button"
            accessibilityLabel={`${action.title}. ${action.hint}`}
          >
            <View style={[styles.iconWrap, { backgroundColor: action.accentBg }]}>
              <Ionicons name={action.icon} size={22} color={action.accent} />
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
                {action.kicker}
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
                {action.title}
              </AppText>
              <AppText
                style={[
                  styles.hintLine,
                  {
                    color: colors.text.secondary,
                    fontFamily: typographyRoles.body.fontFamily,
                  },
                ]}
              >
                {action.hint}
              </AppText>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.text.tertiary}
            />
          </PressableScale>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 12,
    paddingHorizontal: 2,
    gap: 2,
  },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
  stack: {
    gap: 10,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textCol: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  primaryLine: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.1,
    lineHeight: 21,
  },
  hintLine: {
    fontSize: 12,
    lineHeight: 18,
  },
});
