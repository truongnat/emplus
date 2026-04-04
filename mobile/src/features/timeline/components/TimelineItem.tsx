import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type MemoryItem } from "@/src/api";
import { PressableScale, AppText } from "@/src/ui-kit";
import {
  parseMediaUrls,
  getMemoryTime,
  getAxisMonthYear,
} from "@/src/utils/timeline-helpers";
import { useThemeColors } from "@/src/theme";

interface TimelineItemProps {
  item: MemoryItem;
  showAxis?: boolean;
  /** Lưới 2 cột: ẩn trục, thẻ co giãn theo cột */
  grid?: boolean;
  /** Ảnh thấp hơn một chút để tạo nhịp masonry */
  staggerShort?: boolean;
  onImagePress?: (images: string[], index: number) => void;
}

export const TimelineItem = React.memo(function TimelineItem({
  item,
  showAxis = false,
  grid = false,
  staggerShort = false,
  onImagePress,
}: TimelineItemProps) {
  const colors = useThemeColors();
  const mediaUrls = useMemo(
    () => parseMediaUrls(item.mediaUrls),
    [item.mediaUrls],
  );
  const isPayment = useMemo(() => item.tags?.includes("chi-phi"), [item.tags]);
  const isTask = useMemo(() => item.tags?.includes("nhiem-vu"), [item.tags]);
  const hasMultipleImages = mediaUrls.length > 1;
  const hasImages = mediaUrls.length > 0;

  const handleImagePress = useCallback(
    (index: number) => {
      onImagePress?.(mediaUrls, index);
    },
    [onImagePress, mediaUrls],
  );

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

  const imageSectionStyle = [
    styles.imageSection,
    grid && staggerShort && styles.imageSectionShort,
  ];

  return (
    <View style={[styles.outerContainer, grid && styles.outerContainerGrid]}>
      {!grid && (
        <View style={styles.axisContainer}>
          <View
            style={[styles.axisLine, { backgroundColor: colors.border.subtle }]}
          />
          {showAxis && (
            <View
              style={[
                styles.axisLabelContainer,
                { backgroundColor: colors.border.subtle },
              ]}
            >
              <AppText style={[styles.axisText, { color: colors.text.tertiary }]}>
                {getAxisMonthYear(item)}
              </AppText>
            </View>
          )}
        </View>
      )}

      <View
        style={[
          styles.card,
          grid && styles.cardGrid,
          {
            backgroundColor: colors.surface.default,
            borderColor: colors.border.subtle,
            shadowColor: colors.text.primary,
          },
        ]}
      >
        {hasImages ? (
          <View style={imageSectionStyle}>
            <Image
              source={mediaUrls[0]}
              style={styles.mainImage}
              contentFit="cover"
              transition={200}
            />
            <PressableScale
              onPress={() => handleImagePress(0)}
              style={StyleSheet.absoluteFill}
            >
              <View style={{ flex: 1 }} />
            </PressableScale>
            {hasMultipleImages && (
              <View style={styles.imageCountBadge}>
                <Ionicons name="images" size={14} color="#fff" />
                <AppText style={styles.imageCountText}>
                  {mediaUrls.length}
                </AppText>
              </View>
            )}
          </View>
        ) : null}

        <View style={styles.contentSection}>
          <View style={styles.headerRow}>
            {renderIcon()}
            <View style={styles.titleContainer}>
              <AppText
                numberOfLines={2}
                style={[styles.title, { color: colors.text.primary }]}
              >
                {item.title}
              </AppText>
              <AppText style={[styles.timeLabel, { color: colors.text.tertiary }]}>
                {getMemoryTime(item.createdAt)} •{" "}
                {isPayment ? "Thanh toán" : isTask ? "Nhiệm vụ" : "Kỷ niệm"}
              </AppText>
            </View>
          </View>

          {!!item.description && (
            <View
              style={[
                styles.descriptionContainer,
                isPayment && [
                  styles.paymentDescription,
                  {
                    backgroundColor: colors.surface.sunken,
                    borderColor: colors.border.subtle,
                  },
                ],
              ]}
            >
              <AppText
                numberOfLines={3}
                style={[styles.description, { color: colors.text.primary }]}
              >
                {item.description}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  outerContainerGrid: {
    flex: 1,
    paddingHorizontal: 0,
    marginBottom: 0,
    minWidth: 0,
  },
  axisContainer: {
    width: 32,
    alignItems: "center",
  },
  axisLine: {
    position: "absolute",
    top: -24,
    bottom: -20,
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
    borderRadius: 32,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
  },
  cardGrid: {
    borderRadius: 24,
    elevation: 4,
  },
  imageSection: {
    height: 200,
    width: "100%",
    position: "relative",
  },
  imageSectionShort: {
    height: 148,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageCountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  imageCountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  contentSection: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  paymentDescription: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
});
