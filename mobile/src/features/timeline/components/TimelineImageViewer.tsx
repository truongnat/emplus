import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  InteractionManager,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts } from "@/src/theme";

export interface TimelineImageViewerProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function TimelineImageViewer({
  images,
  initialIndex = 0,
  onClose,
}: TimelineImageViewerProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<string>>(null);

  const safeImages = useMemo(
    () =>
      images.filter(
        (u) => typeof u === "string" && u.trim().length > 0,
      ) as string[],
    [images],
  );

  const startIndex = Math.min(
    Math.max(0, initialIndex),
    Math.max(0, safeImages.length - 1),
  );

  const [visibleIndex, setVisibleIndex] = useState(startIndex);
  useEffect(() => {
    setVisibleIndex(startIndex);
  }, [startIndex]);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: { index: number | null }[] }) => {
      const idx = info.viewableItems[0]?.index;
      if (idx != null) setVisibleIndex(idx);
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 55,
  }).current;

  const scrollToStart = useCallback(() => {
    if (safeImages.length === 0 || startIndex <= 0) return;
    listRef.current?.scrollToIndex({
      index: startIndex,
      animated: false,
    });
  }, [safeImages.length, startIndex]);

  useEffect(() => {
    if (safeImages.length === 0 || startIndex <= 0) return;
    const task = InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(scrollToStart);
    });
    return () => task.cancel();
  }, [safeImages.length, startIndex, scrollToStart]);

  if (!safeImages.length) return null;

  const pageH = height - insets.top - insets.bottom;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.root,
          {
            width,
            height,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.closeBtn, { top: insets.top + 8 }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Đóng xem ảnh"
        >
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>

        <FlatList
          ref={listRef}
          data={safeImages}
          keyExtractor={(uri, index) => `${index}-${uri.slice(0, 48)}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={[styles.list, { width }]}
          removeClippedSubviews={false}
          initialNumToRender={Math.min(safeImages.length, 8)}
          windowSize={Math.min(safeImages.length + 1, 11)}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              listRef.current?.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: false,
              });
            }, 120);
          }}
          renderItem={({ item: uri }) => (
            <View style={[styles.page, { width, height: pageH }]}>
              <Image
                source={{ uri }}
                style={[styles.image, { width: width - 24, height: pageH - 32 }]}
                contentFit="contain"
                transition={200}
                accessibilityLabel="Ảnh kỷ niệm phóng to"
              />
            </View>
          )}
        />

        {safeImages.length > 1 ? (
          <View style={[styles.counter, { bottom: insets.bottom + 16 }]}>
            <Text style={[styles.counterText, { fontFamily: fonts.sans }]}>
              {visibleIndex + 1} / {safeImages.length}
            </Text>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  counter: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
