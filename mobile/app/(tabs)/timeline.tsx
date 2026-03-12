import { tws } from "@/src/utils/tws";

import React, { useMemo, useCallback, useRef } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  SectionListData,
} from "react-native";
import { palette } from "../../src/theme";
import { AppButton, AppScreen, GlassCard, Reveal } from "../../src/ui-kit";
import { useTimelineData } from "../../src/components/timeline/useTimelineData";
import { TimelineHeader } from "../../src/components/timeline/TimelineHeader";
import { TimelineDateGroupHeader } from "../../src/components/timeline/TimelineDateGroupHeader";
import { TimelineItem } from "../../src/components/timeline/TimelineItem";
import { TimelineImageViewer } from "../../src/components/timeline/TimelineImageViewer";
import { type MemoryItem } from "../../src/api";

interface TimelineSection extends SectionListData<MemoryItem> {
  title: string;
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
    page,
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

  const renderSectionHeader = useCallback(({ section }: { section: TimelineSection }) => (
    <TimelineDateGroupHeader dateString={section.title} />
  ), []);

  const renderItem = useCallback(({ item, index }: { item: MemoryItem; index: number }) => (
    <TimelineItem
      item={item}
      showAxis={index === 0}
      onImagePress={openViewer}
    />
  ), [openViewer]);

  const ListFooter = useMemo(() => {
    return () => (
      <View style={tws("pb-40")}>
        {loadingMore && (
          <View style={tws("py-6 items-center")}>
            <ActivityIndicator color={palette.primary} />
          </View>
        )}
        {hasNext && !loadingMore && (
          <View style={tws("ml-12 mt-3")}>
            <AppButton
              label="Tải thêm"
              variant="ghost"
              onPress={fetchNextPage}
            />
          </View>
        )}
      </View>
    );
  }, [loadingMore, hasNext, fetchNextPage]);

  const ListEmpty = useMemo(() => {
    return () => {
      if (loading && items.length === 0) {
        return (
          <View style={tws("py-20 items-center")}>
            <ActivityIndicator color={palette.primary} />
          </View>
        );
      }
      if (items.length === 0) {
        return (
          <View style={tws("ml-12 mt-10")}>
            <Text style={tws("font-body text-slate-400 text-[13px]")}>
              Chưa có mục nào trong dòng thời gian.
            </Text>
          </View>
        );
      }
      return null;
    };
  }, [loading, items.length]);

  const listRef = useRef<SectionList<MemoryItem, TimelineSection>>(null);

  React.useEffect(() => {
    if (sections.length > 0) {
      listRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
        viewOffset: 0,
      });
    }
  }, [activeFilter, sections.length]);

  // Virtualization optimization props
  const virtualizationConfig = {
    initialNumToRender: 6,
    maxToRenderPerBatch: 6,
    windowSize: 10,
    updateCellsBatchingPeriod: 50,
    removeClippedSubviews: true,
  };

  return (
    <AppScreen scroll={false}>
      <TimelineHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <View style={tws("flex-1")}>
        <SectionList<MemoryItem, TimelineSection>
          ref={listRef}
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ListHeaderComponent={() => <View style={tws("h-4")} />}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingBottom: 140 }}
          {...virtualizationConfig}
        />
      </View>

      {viewerImages.length > 0 && (
        <TimelineImageViewer
          images={viewerImages}
          initialIndex={viewerIndex}
          onClose={closeViewer}
        />
      )}
    </AppScreen>
  );
}
