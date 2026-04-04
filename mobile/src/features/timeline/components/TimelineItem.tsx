import React, { useMemo, useCallback, useRef } from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type MemoryItem } from "@/src/api";
import { PressableScale, AppText } from "@/src/ui-kit";
import {
  parseMediaUrls,
  getMemoryTime,
  getAxisMonthYear,
} from "@/src/utils/timeline-helpers";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  homeDarkGridCard,
  homeDarkGridInset,
} from "@/src/theme/emplus-design-tokens";

interface TimelineItemProps {
  item: MemoryItem;
  /** Nhãn tháng/năm trên trục — thường bật cho phần tử đầu mỗi nhóm ngày */
  showAxis?: boolean;
  /** Ẩn cột trục — dùng khi thẻ nằm trong layout xen kẽ trái/phải */
  omitAxis?: boolean;
  onImagePress?: (images: string[], index: number) => void;
  /** Chạm tiêu đề → màn chi tiết */
  onTitlePress?: () => void;
  /** Vuốt trái hiện nút Xoá; gọi khi user chạm Xoá (parent hiện xác nhận). */
  onDeleteActionPress?: () => void;
}

export const TimelineItem = React.memo(function TimelineItem({
  item,
  showAxis = false,
  omitAxis = false,
  onImagePress,
  onTitlePress,
  onDeleteActionPress,
}: TimelineItemProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const swipeRef = useRef<Swipeable>(null);
  const mediaUrls = useMemo(
    () => parseMediaUrls(item.mediaUrls),
    [item.mediaUrls],
  );
  const isPayment = useMemo(() => item.tags?.includes("chi-phi"), [item.tags]);
  const isTask = useMemo(() => item.tags?.includes("nhiem-vu"), [item.tags]);
  const hasImages = mediaUrls.length > 0;

  const handleImagePress = useCallback(
    (index: number) => {
      onImagePress?.(mediaUrls, index);
    },
    [onImagePress, mediaUrls],
  );

  const renderImageCell = useCallback(
    (
      uri: string,
      index: number,
      cellStyle: ViewStyle,
      showMoreOverlay?: number,
    ) => (
      <View key={`${index}-${uri.slice(0, 32)}`} style={cellStyle}>
        <Image
          source={uri}
          style={styles.mainImage}
          contentFit="cover"
          transition={200}
          pointerEvents="none"
        />
        {showMoreOverlay != null && showMoreOverlay > 0 ? (
          <View style={styles.gridMoreOverlay} pointerEvents="none">
            <AppText style={styles.gridMoreText}>+{showMoreOverlay}</AppText>
          </View>
        ) : null}
        <PressableScale
          onPress={() => handleImagePress(index)}
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel={
            showMoreOverlay != null && showMoreOverlay > 0
              ? `Xem ảnh, còn ${showMoreOverlay} ảnh khác`
              : `Xem ảnh ${index + 1}`
          }
        >
          <View style={{ flex: 1 }} />
        </PressableScale>
      </View>
    ),
    [handleImagePress],
  );

  const renderMediaLayout = () => {
    const n = mediaUrls.length;
    if (n === 0) return null;

    if (n === 1) {
      return (
        <>
          <Image
            source={mediaUrls[0]}
            style={styles.mainImage}
            contentFit="cover"
            transition={200}
            pointerEvents="none"
          />
          <PressableScale
            onPress={() => handleImagePress(0)}
            style={StyleSheet.absoluteFill}
            accessibilityRole="button"
            accessibilityLabel="Xem ảnh"
          >
            <View style={{ flex: 1 }} />
          </PressableScale>
        </>
      );
    }

    if (n === 2) {
      return (
        <View style={styles.gridRow}>
          {renderImageCell(mediaUrls[0], 0, styles.gridHalf)}
          {renderImageCell(mediaUrls[1], 1, styles.gridHalf)}
        </View>
      );
    }

    if (n === 3) {
      return (
        <View style={styles.gridRow}>
          <View style={styles.gridHalf}>
            {renderImageCell(mediaUrls[0], 0, styles.gridFill)}
          </View>
          <View style={styles.gridHalfCol}>
            {renderImageCell(mediaUrls[1], 1, styles.gridStackCell)}
            {renderImageCell(mediaUrls[2], 2, styles.gridStackCell)}
          </View>
        </View>
      );
    }

    const moreCount = n - 4;
    return (
      <View style={styles.gridQuad}>
        <View style={styles.gridRowHalf}>
          {renderImageCell(mediaUrls[0], 0, styles.gridCellQuad)}
          {renderImageCell(mediaUrls[1], 1, styles.gridCellQuad)}
        </View>
        <View style={styles.gridRowHalf}>
          {renderImageCell(mediaUrls[2], 2, styles.gridCellQuad)}
          {renderImageCell(
            mediaUrls[3],
            3,
            styles.gridCellQuad,
            moreCount > 0 ? moreCount : undefined,
          )}
        </View>
      </View>
    );
  };

  const renderRightActions = useCallback(() => {
    if (!onDeleteActionPress) return null;
    return (
      <View style={styles.deleteTray}>
        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor: colors.status.error.bg }]}
          onPress={() => {
            swipeRef.current?.close();
            onDeleteActionPress();
          }}
          accessibilityRole="button"
          accessibilityLabel="Xoá mục"
        >
          <AppText
            style={[styles.deleteBtnText, { color: colors.status.error.text }]}
          >
            Xoá
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }, [colors.status.error.bg, colors.status.error.text, onDeleteActionPress]);

  const renderIcon = () => {
    if (isPayment) {
      return (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.brand.muted },
          ]}
        >
          <Ionicons
            name="card-outline"
            size={24}
            color={colors.brand.default}
          />
        </View>
      );
    }
    if (isTask) {
      return (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.status.success.bg },
          ]}
        >
          <Ionicons
            name="checkmark-done"
            size={24}
            color={colors.status.success.icon}
          />
        </View>
      );
    }
    return (
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.surface.sunken },
        ]}
      >
        <Ionicons
          name="heart-outline"
          size={24}
          color={colors.text.tertiary}
        />
      </View>
    );
  };

  return (
    <View
      style={[styles.outerContainer, omitAxis && styles.outerContainerOmitAxis]}
    >
      {!omitAxis ? (
        <View style={styles.axisContainer}>
          <View
            style={[styles.axisLine, { backgroundColor: colors.border.subtle }]}
          />
          {showAxis ? (
            <View
              style={[
                styles.axisLabelContainer,
                { backgroundColor: colors.border.subtle },
              ]}
            >
              <AppText
                style={[styles.axisText, { color: colors.text.tertiary }]}
              >
                {getAxisMonthYear(item)}
              </AppText>
            </View>
          ) : null}
        </View>
      ) : null}

      <Swipeable
        ref={swipeRef}
        renderRightActions={onDeleteActionPress ? renderRightActions : undefined}
        overshootRight={false}
        enabled={!!onDeleteActionPress}
        dragOffsetFromRightEdge={28}
        dragOffsetFromLeftEdge={28}
        failOffsetY={[-12, 12]}
        containerStyle={
          omitAxis ? styles.swipeableRootOmitAxis : styles.swipeableRootWithAxis
        }
        childrenContainerStyle={
          omitAxis
            ? styles.swipeableChildrenOmitAxis
            : styles.swipeableChildrenWithAxis
        }
      >
        <View
          style={[
            styles.card,
            omitAxis && styles.cardOmitAxis,
            isDark
              ? {
                  backgroundColor: homeDarkGridCard.backgroundColor,
                  borderColor: homeDarkGridCard.borderColor,
                  shadowColor: "#0A0809",
                }
              : {
                  backgroundColor: colors.surface.default,
                  borderColor: colors.border.subtle,
                  shadowColor: colors.text.primary,
                },
          ]}
        >
        {hasImages ? (
          <View style={styles.imageSection}>{renderMediaLayout()}</View>
        ) : null}

        <View style={styles.contentSection}>
          <View style={styles.headerRow}>
            {renderIcon()}
            <View style={styles.titleContainer}>
              {onTitlePress ? (
                <PressableScale
                  onPress={onTitlePress}
                  accessibilityRole="button"
                  accessibilityLabel={`Chi tiết: ${item.title}`}
                  style={styles.titlePressable}
                >
                  <AppText
                    numberOfLines={4}
                    android_hyphenationFrequency="none"
                    textBreakStrategy="simple"
                    style={[styles.title, { color: colors.text.primary }]}
                  >
                    {item.title}
                  </AppText>
                </PressableScale>
              ) : (
                <AppText
                  numberOfLines={4}
                  android_hyphenationFrequency="none"
                  textBreakStrategy="simple"
                  style={[styles.title, { color: colors.text.primary }]}
                >
                  {item.title}
                </AppText>
              )}
              <AppText style={[styles.timeLabel, { color: colors.text.tertiary }]}>
                {getMemoryTime(item.createdAt)} •{" "}
                {isPayment ? "Thanh toán" : isTask ? "Nhiệm vụ" : "Kỷ niệm"}
              </AppText>
            </View>
          </View>

          {!!item.description ? (
            <View
              style={[
                styles.descriptionContainer,
                isPayment && [
                  styles.paymentDescription,
                  isDark
                    ? {
                        backgroundColor: homeDarkGridInset.backgroundColor,
                        borderColor: homeDarkGridInset.borderColor,
                      }
                    : {
                        backgroundColor: colors.surface.sunken,
                        borderColor: colors.border.subtle,
                      },
                ],
              ]}
            >
              <AppText
                numberOfLines={5}
                style={[styles.description, { color: colors.text.primary }]}
              >
                {item.description}
              </AppText>
            </View>
          ) : null}
        </View>
        </View>
      </Swipeable>
    </View>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 22,
    marginBottom: 18,
    width: "100%",
  },
  outerContainerOmitAxis: {
    flexDirection: "column",
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  /**
   * Swipeable bọc PanGestureHandler + Animated.View — mặc định không flex.
   * Trong hàng [trục | Swipeable], phải ép giãn ngang nếu không thẻ co ~intrinsic width.
   */
  swipeableRootWithAxis: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
  },
  swipeableChildrenWithAxis: {
    flex: 1,
    alignSelf: "stretch",
  },
  swipeableRootOmitAxis: {
    width: "100%",
    alignSelf: "stretch",
  },
  swipeableChildrenOmitAxis: {
    width: "100%",
  },
  axisContainer: {
    width: 32,
    alignItems: "center",
  },
  axisLine: {
    position: "absolute",
    top: -24,
    bottom: -18,
    width: 2,
  },
  axisLabelContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: -40,
    zIndex: 20,
  },
  axisText: {
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: 28,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
  },
  cardOmitAxis: {
    flex: 0,
    flexGrow: 0,
    width: "100%",
    alignSelf: "stretch",
  },
  imageSection: {
    height: 220,
    width: "100%",
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  gridRow: {
    flexDirection: "row",
    width: "100%",
    height: 220,
    gap: 2,
  },
  gridHalf: {
    flex: 1,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  gridHalfCol: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    gap: 2,
  },
  gridStackCell: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  gridFill: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    overflow: "hidden",
    position: "relative",
  },
  gridQuad: {
    width: "100%",
    height: 220,
    flexDirection: "column",
    gap: 2,
  },
  gridRowHalf: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
    minHeight: 0,
  },
  gridCellQuad: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
  },
  gridMoreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridMoreText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },
  contentSection: {
    padding: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    minWidth: 0,
  },
  /** TouchableOpacity mặc định co theo nội dung — cần giãn full cột để title xuống dòng đúng chỗ từ. */
  titlePressable: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 24,
    width: "100%",
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  descriptionContainer: {
    marginTop: 14,
  },
  paymentDescription: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  deleteTray: {
    flexDirection: "row",
    alignItems: "stretch",
    marginLeft: 8,
  },
  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    borderRadius: 20,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
