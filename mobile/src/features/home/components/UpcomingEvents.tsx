import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppButton, AppText } from "@/src/ui-kit";
import { getEventIcon } from "@/src/utils/home-helpers";

export interface UpcomingEventItem {
  id: string;
  category?: string;
  title: string;
  daysLeft: number;
}

export interface UpcomingEventsProps {
  upcomingEvents: UpcomingEventItem[];
}

export const UpcomingEvents = React.memo(function UpcomingEvents({
  upcomingEvents,
}: UpcomingEventsProps) {
  const router = useRouter();

  const visibleEvents = useMemo(
    () => upcomingEvents.slice(0, 3),
    [upcomingEvents],
  );

  const handleEventPress = useCallback(() => {
    router.push("/timeline");
  }, [router]);

  const renderEventItem = useCallback(
    (event: UpcomingEventItem) => {
      const iconDisplay = getEventIcon(event.category);

      // We can use a trick to make a tinted background from hex color
      // Hex to RGBA utility is complex here, so we will just use a generic soft background 
      // or if we know the colors we could map them. We'll use a soft taupe tint.
      return (
        <PressableScale
          key={event.id}
          scaleTo={0.96}
          style={styles.eventCard as any}
          onPress={handleEventPress}
        >
          <View style={[styles.eventIconContainer, { backgroundColor: `${iconDisplay.color}15` }]}>
            <Ionicons
              name={iconDisplay.name}
              size={20}
              color={iconDisplay.color}
            />
          </View>
          <View style={styles.eventTextContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {event.title}
            </AppText>
            <AppText
              style={styles.subTitle}
            >
              CÒN {event.daysLeft} NGÀY
            </AppText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#D6D3D1"
          />
        </PressableScale>
      );
    },
    [handleEventPress],
  );

  return (
    <Reveal delay={750}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <AppText style={styles.headerTitle}>
            Kỷ niệm sắp tới
          </AppText>
        </View>

        <View style={styles.listContainer}>
          {visibleEvents.length > 0 ? (
            visibleEvents.map(renderEventItem)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#A8A29E"
              />
              <AppText style={{ color: "#A8A29E", fontSize: 13 }}>
                Chưa có sự kiện nào sắp tới
              </AppText>
            </View>
          )}
        </View>

        <AppButton
          label="Xem tất cả sự kiện"
          variant="outline"
          onPress={handleEventPress}
          style={styles.allEventsButton}
          fullWidth
        />
      </View>
    </Reveal>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C1917", // taupe900
  },
  listContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  eventIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  eventTextContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C1917", // taupe900
  },
  subTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#A8A29E", // taupe400
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  allEventsButton: {
    marginHorizontal: 4,
  },
});
