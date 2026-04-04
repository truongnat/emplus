import React, { useCallback, useMemo } from "react";
import {
  SectionList,
  StyleSheet,
  View,
  ActivityIndicator,
  type ScrollViewProps,
} from "react-native";
import { ScrollView as GHScrollView } from "react-native-gesture-handler";
import { type MemoryItem } from "@/src/api";
import { useThemeColors } from "@/src/theme";
import { TimelineDateGroupHeader } from "./TimelineDateGroupHeader";
import { TimelineMemoryRow } from "./TimelineMemoryRow";

export interface TimelineSection {
  title: string;
  data: MemoryItem[];
}

export interface TimelineMemorySectionListProps {
  sections: TimelineSection[];
  scrollPadBottom: number;
  loadingMore: boolean;
  onEndReached: () => void;
  onOpenViewer: (images: string[], index: number) => void;
  onTitlePressById: (id: string) => void;
  onDeleteItem: (item: MemoryItem) => void;
}

export const TimelineMemorySectionList = React.memo(
  function TimelineMemorySectionList({
    sections,
    scrollPadBottom,
    loadingMore,
    onEndReached,
    onOpenViewer,
    onTitlePressById,
    onDeleteItem,
  }: TimelineMemorySectionListProps) {
    const colors = useThemeColors();

    const renderSectionHeader = useCallback(
      ({ section }: { section: TimelineSection }) => (
        <TimelineDateGroupHeader dateString={section.title} />
      ),
      [],
    );

    const renderItem = useCallback(
      ({ item }: { item: MemoryItem }) => (
        <TimelineMemoryRow
          item={item}
          onOpenViewer={onOpenViewer}
          onTitlePressById={onTitlePressById}
          onDeleteItem={onDeleteItem}
        />
      ),
      [onOpenViewer, onTitlePressById, onDeleteItem],
    );

    const keyExtractor = useCallback((mem: MemoryItem) => mem.id, []);

    const footer = useMemo(
      () =>
        loadingMore ? (
          <View style={styles.loadingFooter}>
            <ActivityIndicator color={colors.brand.default} />
          </View>
        ) : null,
      [loadingMore, colors.brand.default],
    );

    return (
      <SectionList<MemoryItem, TimelineSection>
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        renderScrollComponent={(scrollProps: ScrollViewProps) => (
          <GHScrollView {...scrollProps} />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: scrollPadBottom },
        ]}
        style={styles.sectionList}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footer}
      />
    );
  },
);

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
