import React, { useMemo, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { useThemeColors } from "@/src/theme";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
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
  data: MemoryItem[][];
}

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function TimelineScreen() {
  const router = useRouter();
  const colors = useThemeColors();
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
      data: chunkPairs(data),
    }));
  }, [groupedItems]);

  const renderSectionHeader = useCallback(
    ({ section }: { section: TimelineSection }) => (
      <TimelineDateGroupHeader dateString={section.title} />
    ),
    [],
  );

  const renderItem = useCallback(
    ({
      item: row,
      index: rowIndex,
    }: {
      item: MemoryItem[];
      index: number;
    }) => (
      <View style={styles.masonryRow}>
        {row.map((mem, colIdx) => (
          <View key={mem.id} style={styles.masonryCell}>
            <TimelineItem
              item={mem}
              showAxis={rowIndex === 0 && colIdx === 0}
              grid
              staggerShort={colIdx % 2 === 1}
              onImagePress={openViewer}
            />
          </View>
        ))}
        {row.length === 1 ? <View style={styles.masonryCell} /> : null}
      </View>
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
          <Text style={[styles.centerText, { color: colors.text.tertiary }]}>
            {!isAuthenticated
              ? "Đăng nhập để xem dòng thời gian"
              : "Ghép đôi để xem kỷ niệm chung"}
          </Text>
          <Button
            label={!isAuthenticated ? "Đăng nhập" : "Ghép đôi"}
            onPress={() =>
              router.push(!isAuthenticated ? "/login" : "/pairing")
            }
            style={styles.centerButton}
            accessibilityLabel={
              !isAuthenticated ? "Mở đăng nhập" : "Mở ghép đôi"
            }
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

        {/* Loading State */}
        {loading && items.length === 0 ? (
          <View style={styles.centerContainer}>
            <EmplusLottie
              source={lottieInventory.loader}
              style={{ width: 120, height: 120 }}
              loop
            />
            <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>
              Đang tải kỷ niệm...
            </Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.centerContainer}>
            <EmplusLottie
              source={lottieInventory.empty}
              style={{ width: 140, height: 140 }}
              loop
            />
            <Text style={[styles.emptyText, { color: colors.text.tertiary }]}>
              Chưa có kỷ niệm nào
            </Text>
          </View>
        ) : (
          /* Timeline List */
          <SectionList<MemoryItem[], TimelineSection>
            sections={sections}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            keyExtractor={(row) => row.map((m) => m.id).join("-")}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loadingFooter}>
                  <ActivityIndicator color={colors.brand.default} />
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
  masonryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  masonryCell: {
    flex: 1,
    minWidth: 0,
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
  },
  loadingText: {
    fontSize: 15,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 15,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
