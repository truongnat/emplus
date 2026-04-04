import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppText } from "@/src/ui-kit";
import { getEventIcon } from "@/src/utils/home-helpers";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { elevation } from "@/src/theme/elevation";
import { typographyRoles } from "@/src/theme/typography-roles";
import {
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";

export interface UpcomingEventItem {
  id: string;
  category?: string;
  title: string;
  daysLeft: number;
}

export interface UpcomingEventsProps {
  upcomingEvents: UpcomingEventItem[];
}

function formatCountdown(days: number): string {
  if (days <= 0) return "Hôm nay hoặc đã qua";
  if (days === 1) return "Còn 1 ngày nữa";
  return `Còn ${days} ngày nữa`;
}

export const UpcomingEvents = React.memo(function UpcomingEvents({
  upcomingEvents,
}: UpcomingEventsProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const router = useRouter();

  const visibleEvents = useMemo(
    () => upcomingEvents.slice(0, 3),
    [upcomingEvents],
  );

  const handleOpenTimeline = useCallback(() => {
    router.push("/timeline");
  }, [router]);

  const renderEventItem = useCallback(
    (event: UpcomingEventItem) => {
      const iconDisplay = getEventIcon(event.category);
      const tint = `${iconDisplay.color}${isDark ? "30" : "16"}`;

      return (
        <PressableScale
          key={event.id}
          scaleTo={0.98}
          style={[
            styles.eventCard,
            isDark
              ? {
                  backgroundColor: homeDarkGridCard.backgroundColor,
                  borderColor: homeDarkGridCard.borderColor,
                }
              : {
                  backgroundColor: colors.surface.raised,
                  borderColor: colors.border.subtle,
                },
            elevation.raised,
          ]}
          onPress={handleOpenTimeline}
          accessibilityRole="button"
          accessibilityLabel={`${event.title}. ${formatCountdown(event.daysLeft)}. Mở dòng thời gian.`}
        >
          <View style={[styles.eventIcon, { backgroundColor: tint }]}>
            <Ionicons
              name={iconDisplay.name}
              size={20}
              color={iconDisplay.color}
            />
          </View>
          <View style={styles.eventText}>
            <AppText
              numberOfLines={2}
              style={[
                styles.eventTitle,
                {
                  color: colors.text.primary,
                  fontFamily: typographyRoles.titleSm.fontFamily,
                },
              ]}
            >
              {event.title}
            </AppText>
            <AppText
              style={[
                styles.eventMeta,
                {
                  color: colors.text.tertiary,
                  fontFamily: typographyRoles.caption.fontFamily,
                },
              ]}
            >
              {formatCountdown(event.daysLeft)}
            </AppText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={iconDisplay.color}
          />
        </PressableScale>
      );
    },
    [colors, handleOpenTimeline, isDark],
  );

  return (
    <Reveal delay={680}>
      <View style={styles.section}>
        <View style={styles.header}>
          <AppText
            accessibilityRole="text"
            style={[
              styles.headerEyebrow,
              {
                color: colors.text.tertiary,
                fontFamily: typographyRoles.caption.fontFamily,
              },
            ]}
          >
            Sắp tới
          </AppText>
          <AppText
            accessibilityRole="header"
            style={[
              styles.headerTitle,
              {
                color: colors.text.primary,
                fontFamily: typographyRoles.titleSm.fontFamily,
              },
            ]}
          >
            Kỷ niệm & mốc quan trọng
          </AppText>
          <AppText
            style={[
              styles.headerSub,
              {
                color: colors.text.secondary,
                fontFamily: typographyRoles.body.fontFamily,
              },
            ]}
          >
            Những ngày đáng nhớ đang đến gần — chạm để xem trên dòng thời gian.
          </AppText>
        </View>

        <View style={styles.list}>
          {visibleEvents.length > 0 ? (
            visibleEvents.map(renderEventItem)
          ) : (
            <View
              style={[
                styles.empty,
                isDark
                  ? {
                      backgroundColor: homeDarkGridCard.backgroundColor,
                      borderColor: homeDarkGridCard.borderColor,
                    }
                  : {
                      backgroundColor: colors.surface.raised,
                      borderColor: colors.border.subtle,
                    },
              ]}
            >
              <View
                style={[
                  styles.emptyIcon,
                  isDark
                    ? {
                        backgroundColor: homeDarkGridInset.backgroundColor,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: homeDarkGridInset.borderColor,
                      }
                    : { backgroundColor: colors.surface.sunken },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={26}
                  color={colors.secondary.default}
                />
              </View>
              <AppText
                style={[
                  styles.emptyTitle,
                  {
                    color: colors.text.primary,
                    fontFamily: typographyRoles.titleSm.fontFamily,
                  },
                ]}
              >
                Chưa có mốc sắp tới
              </AppText>
              <AppText
                style={[
                  styles.emptyBody,
                  {
                    color: colors.text.secondary,
                    fontFamily: typographyRoles.body.fontFamily,
                  },
                ]}
              >
                Thêm sự kiện trong dòng thời gian để hai đứa cùng đếm ngược.
              </AppText>
            </View>
          )}
        </View>
      </View>
    </Reveal>
  );
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 2,
    gap: 6,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  list: {
    flexDirection: "column",
    gap: 12,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  eventText: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
    minWidth: 0,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.15,
  },
  eventMeta: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  empty: {
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyBody: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 280,
  },
});
