import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText } from "@/src/ui-kit";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { useTimelineData } from "../hooks/useTimelineData";
import { useTimelineDeleteMemory } from "../hooks/useTimelineDeleteMemory";
import { TimelineHeader } from "../components/TimelineHeader";
import {
  TimelineMemorySectionList,
  type TimelineSection,
} from "../components/TimelineMemorySectionList";
import { TimelineImageViewerLazy } from "../components/TimelineImageViewerLazy";

export function TimelineAuthenticatedBody() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { promptDeleteMemory } = useTimelineDeleteMemory();

  const {
    loading,
    loadingMore,
    activeFilter,
    setActiveFilter,
    groupedItems,
    hasNext,
    items,
    fetchNextPage,
    viewerImages,
    viewerIndex,
    openViewer,
    closeViewer,
  } = useTimelineData();

  useAuthGridChrome(isDark, colors.background.default, true);

  const topPad = insets.top + 10;
  const scrollPadBottom = Math.max(128, insets.bottom + 100);

  const sections: TimelineSection[] = useMemo(
    () =>
      groupedItems.map(([dateString, data]) => ({
        title: dateString,
        data,
      })),
    [groupedItems],
  );

  const onTitlePressById = useCallback(
    (id: string) => {
      router.push(`/memory/${id}`);
    },
    [router],
  );

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNext) {
      void fetchNextPage();
    }
  }, [loadingMore, hasNext, fetchNextPage]);

  return (
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

        <View style={[styles.container, { paddingTop: topPad, flex: 1 }]}>
          <TimelineHeader
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {loading && items.length === 0 ? (
            <View style={styles.centerContainer}>
              <EmplusLottie
                source={lottieInventory.loader}
                style={{ width: 120, height: 120 }}
                loop
              />
              <AppText
                style={[styles.loadingText, { color: colors.text.tertiary }]}
              >
                Đang tải kỷ niệm...
              </AppText>
            </View>
          ) : items.length === 0 ? (
            <View style={styles.centerContainer}>
              <EmplusLottie
                source={lottieInventory.timelineEmptyLove}
                style={{ width: 200, height: 200 }}
                loop
                speed={0.9}
              />
              <AppText
                style={[styles.emptyText, { color: colors.text.tertiary }]}
              >
                Chưa có kỷ niệm nào
              </AppText>
            </View>
          ) : (
            <TimelineMemorySectionList
              sections={sections}
              scrollPadBottom={scrollPadBottom}
              loadingMore={loadingMore}
              onEndReached={loadMore}
              onOpenViewer={openViewer}
              onTitlePressById={onTitlePressById}
              onDeleteItem={promptDeleteMemory}
            />
          )}

          {viewerImages.length > 0 ? (
            <TimelineImageViewerLazy
              key={viewerImages.join("\x1e")}
              images={viewerImages}
              initialIndex={viewerIndex}
              onClose={closeViewer}
            />
          ) : null}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  loadingText: {
    fontSize: 15,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 15,
  },
});
