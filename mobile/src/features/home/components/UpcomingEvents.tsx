import { tws } from "@/src/utils/tws";

import React, { useMemo, useCallback } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableScale, Reveal, AppButton, AppText } from "@/src/ui-kit";
import { getEventIcon } from "@/src/utils/home-helpers";
import { palette } from "@/src/theme";

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
      return (
        <PressableScale
          key={event.id}
          scaleTo={0.96}
          style={
            tws(
              "flex-row items-center bg-white/45 rounded-[32px] p-4 border border-white/60 shadow-glass",
            ) as any
          }
          onPress={handleEventPress}
        >
          <View
            style={tws(
              "w-11 h-11 rounded-full items-center justify-center mr-4 bg-white/60",
            )}
          >
            <Ionicons
              name={iconDisplay.name}
              size={18}
              color={iconDisplay.color}
            />
          </View>
          <View style={tws("flex-1 justify-center gap-0.5")}>
            <AppText variant="bodyBold" color="slate-800" numberOfLines={1}>
              {event.title}
            </AppText>
            <AppText
              variant="captionBold"
              color="slate-400"
              style={tws("uppercase tracking-wide")}
            >
              Còn {event.daysLeft} ngày nữa
            </AppText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={(palette as any)["slate-300"]}
          />
        </PressableScale>
      );
    },
    [handleEventPress],
  );

  return (
    <Reveal delay={750}>
      <View style={tws("mb-8")}>
        <View style={tws("flex-row items-center justify-between mb-4 px-1")}>
          <AppText variant="h3" color="slate-900">
            Kỷ niệm sắp tới
          </AppText>
        </View>

        <View style={tws("flex-col gap-y-3 mb-6")}>
          {visibleEvents.length > 0 ? (
            visibleEvents.map(renderEventItem)
          ) : (
            <View
              style={tws(
                "bg-white/60 rounded-[32px] p-8 items-center gap-2 border border-white/80",
              )}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={(palette as any)["slate-400"]}
              />
              <AppText variant="body" color="slate-400">
                Chưa có sự kiện nào sắp tới
              </AppText>
            </View>
          )}
        </View>

        <AppButton
          label="Xem tất cả sự kiện"
          variant="outline"
          onPress={handleEventPress}
          style={tws("mx-1")}
          fullWidth
        />
      </View>
    </Reveal>
  );
});
