import React, { useMemo, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  StyleSheet,
} from "react-native";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { palette } from "@/src/theme/tokens";
import { useTimelineData } from "@/src/features/timeline";
import {
  TimelineHeader,
  TimelineDateGroupHeader,
  TimelineItem,
  TimelineImageViewer,
} from "@/src/features/timeline";
import { type MemoryItem } from "@/src/api";

interface TimelineSection {
  title: string;
  data: MemoryItem[];
}

export default function TimelineScreen() {
  const {
    isAuthenticated,
    isPaired,
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

  const sections = useMemo(() => {
    return groupedItems.map(([dateString, data]) => ({
      title: dateString,
      data: data,
    }));
  }, [groupedItems]);

  const renderSectionHeader = useCallback(
    ({ section }: { section: TimelineSection }) => (
      <TimelineDateGroupHeader dateString={section.title} />
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: MemoryItem; index: number }) => (
      <TimelineItem
        item={item}
        showAxis={index === 0}
        onImagePress={openViewer}
      />
    ),
    [openViewer],
  );

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNext) {
      fetchNextPage();
    }
  }, [loadingMore, hasNext, fetchNextPage]);

  if (!isAuthenticated || !isPaired) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.centerText}>
            {!isAuthenticated
              ? "Đăng nhập để xem dòng thời gian"
              : "Ghép đôi để xem kỷ niệm chung"}
          </Text>
          <Button
            label={!isAuthenticated ? "Login" : "Pair Now"}
            onPress={() => {}}
            style={styles.centerButton}
          />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Header with Filters */}
        <TimelineHeader
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {["Tất cả", "Kỷ niệm", "Chi tiêu", "Nhắc nhở"].map((filter) => (
            <Button
              key={filter}
              label={filter}
              onPress={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "primary" : "outline"}
              size="sm"
              style={
                [
                  styles.filterButton,
                  activeFilter === filter
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive,
                ] as any
              }
            />
          ))}
        </View>

        {/* Loading State */}
        {loading && items.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator color={palette.violet600} size="large" />
            <Text style={styles.loadingText}>Đang tải kỷ niệm...</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>Chưa có kỷ niệm nào</Text>
          </View>
        ) : (
          /* Timeline List */
          <SectionList<MemoryItem, TimelineSection>
            sections={sections}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loadingFooter}>
                  <ActivityIndicator color={palette.violet600} />
                </View>
              ) : null
            }
          />
        )}

        {/* Image Viewer Modal */}
        {viewerImages.length > 0 && (
          <TimelineImageViewer images={viewerImages} onClose={closeViewer} />
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: palette.violet600,
    borderColor: palette.violet600,
  },
  filterButtonInactive: {
    backgroundColor: "rgba(255,255,255,0.45)",
    borderColor: "rgba(255,255,255,0.6)",
  },
  listContent: {
    paddingBottom: 120,
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  centerButton: {
    marginTop: 20,
  },
  centerText: {
    fontSize: 15,
    color: palette.zinc400,
  },
  loadingText: {
    fontSize: 15,
    color: palette.zinc400,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 15,
    color: palette.zinc400,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
