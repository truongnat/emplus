import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/src/theme";
import { typographyRoles } from "@/src/theme/typography-roles";
import { AppText } from "@/src/ui-kit";

export interface HeroCardProps {
  loveDays: number;
  startDateLabel: string;
  nextDateLabel: string;
}

export const HeroCard = React.memo(function HeroCard({
  loveDays,
  startDateLabel,
  nextDateLabel,
}: HeroCardProps) {
  const colors = useThemeColors();
  const panelBase = {
    backgroundColor: colors.surface.raised,
    borderColor: colors.border.default,
  };

  return (
    <View style={[styles.container, panelBase]}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <AppText
            style={[
              styles.eyebrow,
              {
                color: colors.text.tertiary,
                fontFamily: typographyRoles.caption.fontFamily,
              },
            ]}
          >
            Quan trọng lúc này
          </AppText>
          <AppText
            style={[
              styles.headline,
              {
                color: colors.text.primary,
                fontFamily: typographyRoles.title.fontFamily,
              },
            ]}
          >
            {loveDays > 0 ? "Tiếp tục giữ nhịp của hai bạn" : "Bắt đầu từ một mốc đáng nhớ"}
          </AppText>
        </View>
      </View>

      <View style={styles.metricWrap}>
        <AppText
          style={[
            styles.metric,
            {
              color: colors.brand.default,
              fontFamily: typographyRoles.display.fontFamily,
            },
          ]}
          >
            {loveDays}
        </AppText>
        <AppText
          style={[
            styles.metricUnit,
            {
              color: colors.text.secondary,
              fontFamily: typographyRoles.bodyMedium.fontFamily,
            },
          ]}
          >
            ngày bên nhau
          </AppText>
      </View>

      <View style={styles.infoRow}>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.surface.default,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={18}
            color={colors.text.tertiary}
          />
          <View style={styles.infoText}>
            <AppText
              style={[
                styles.infoLabel,
                {
                  color: colors.text.tertiary,
                  fontFamily: typographyRoles.caption.fontFamily,
                },
              ]}
            >
              Bắt đầu từ
            </AppText>
            <AppText
              numberOfLines={2}
              style={[
                styles.infoValue,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.bodyMedium.fontFamily,
                },
              ]}
            >
              {startDateLabel}
            </AppText>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: colors.surface.default,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <Ionicons
            name="sparkles-outline"
            size={18}
            color={colors.brand.default}
          />
          <View style={styles.infoText}>
            <AppText
              style={[
                styles.infoLabel,
                {
                  color: colors.text.tertiary,
                  fontFamily: typographyRoles.caption.fontFamily,
                },
              ]}
            >
              Mốc gần nhất
            </AppText>
            <AppText
              numberOfLines={2}
              style={[
                styles.infoValue,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.bodyMedium.fontFamily,
                },
              ]}
            >
              {nextDateLabel}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
    borderRadius: 24,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 12,
    zIndex: 1,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  metricWrap: {
    zIndex: 1,
    alignItems: "flex-start",
    gap: 2,
  },
  metric: {
    fontSize: 36,
    fontWeight: "600",
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.1,
  },
  infoRow: {
    zIndex: 1,
    gap: 8,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderWidth: StyleSheet.hairlineWidth,
  },
  infoText: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 19,
  },
});
