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

interface TimelineItemProps {
  item: MemoryItem;
  showAxis?: boolean;
  onImagePress?: (images: string[], index: number) => void;
}

export const TimelineItem = React.memo(function TimelineItem({
  item,
  showAxis = false,
  onImagePress,
}: TimelineItemProps) {
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
        <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
          <Ionicons name="card-outline" size={24} color="#E48B9B" />
        </View>
      );
    }
    if (isTask) {
      return (
        <View style={[styles.iconContainer, { backgroundColor: "#ECFDF5" }]}>
          <Ionicons name="checkmark-done" size={24} color="#10B981" />
        </View>
      );
    }
    return (
      <View style={[styles.iconContainer, { backgroundColor: "#F5F5F4" }]}>
        <Ionicons name="heart-outline" size={24} color="#A8A29E" />
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.axisContainer}>
        <View style={styles.axisLine} />
        {showAxis && (
          <View style={styles.axisLabelContainer}>
            <AppText style={styles.axisText}>{getAxisMonthYear(item)}</AppText>
          </View>
        )}
      </View>

      <View style={styles.card}>
        {hasImages ? (
          <View style={styles.imageSection}>
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
              <AppText numberOfLines={2} style={styles.title}>
                {item.title}
              </AppText>
              <AppText style={styles.timeLabel}>
                {getMemoryTime(item.createdAt)} •{" "}
                {isPayment ? "Thanh toán" : isTask ? "Nhiệm vụ" : "Kỷ niệm"}
              </AppText>
            </View>
          </View>

          {!!item.description && (
            <View
              style={[
                styles.descriptionContainer,
                isPayment && styles.paymentDescription,
              ]}
            >
              <AppText numberOfLines={3} style={styles.description}>
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
  axisContainer: {
    width: 32,
    alignItems: "center",
  },
  axisLine: {
    position: "absolute",
    top: -24,
    bottom: -20,
    width: 2,
    backgroundColor: "#F5F5F4",
  },
  axisLabelContainer: {
    backgroundColor: "#F5F5F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: -40,
    zIndex: 20,
  },
  axisText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#A8A29E",
    textTransform: "uppercase",
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  imageSection: {
    height: 200,
    width: "100%",
    position: "relative",
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
    color: "#1C1917",
    lineHeight: 22,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A8A29E",
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  paymentDescription: {
    backgroundColor: "#FCF9F8",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F5F5F4",
  },
  description: {
    fontSize: 14,
    color: "#44403C",
    lineHeight: 20,
    fontWeight: "500",
  },
});
