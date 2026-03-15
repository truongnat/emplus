import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type MemoryItem } from "@/src/api";
import { useThemeColors, useThemeMode } from "@/src/theme";
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

const styles = StyleSheet.create({
  card: { borderRadius: 28, overflow: "hidden", marginBottom: 16 },
  cardContent: { padding: 18 },
  paymentCard: { padding: 18 },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  paymentLeft: { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentTextContainer: { flex: 1 },
  paymentAmount: { fontSize: 17, fontWeight: "bold" },
  paymentMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  taskCard: { padding: 18 },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  taskLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextContainer: { flex: 1 },
  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  imageCard: { borderRadius: 28, overflow: "hidden", marginBottom: 16 },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 200 },
  imageCountBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  imageCountText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  imageFooter: { padding: 14 },
  axisContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  axisLine: { flex: 1, height: 2 },
  axisTextContainer: { paddingHorizontal: 12, alignItems: "center" },
  axisText: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export const TimelineItem = React.memo(function TimelineItem({
  item,
  showAxis = false,
  onImagePress,
}: TimelineItemProps) {
  const colors = useThemeColors();
  const { colorScheme } = useThemeMode();
  const isDark = colorScheme === "dark";

  const mediaUrls = useMemo(
    () => parseMediaUrls(item.mediaUrls),
    [item.mediaUrls],
  );
  const isPayment = useMemo(() => item.tags?.includes("chi-phi"), [item.tags]);
  const isTask = useMemo(() => item.tags?.includes("nhiem-vu"), [item.tags]);
  const hasMultipleImages = mediaUrls.length > 1;
  const hasSingleImage = mediaUrls.length === 1;

  const handleImagePress = useCallback(
    (index: number) => {
      onImagePress?.(mediaUrls, index);
    },
    [onImagePress, mediaUrls],
  );

  const renderCardContent = useCallback(() => {
    if (isPayment) {
      return (
        <View style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentLeft}>
              <View
                style={[
                  styles.paymentIcon,
                  { backgroundColor: colors.surface.sunken },
                ]}
              >
                <Ionicons
                  name="card-outline"
                  size={22}
                  color={colors.brand.default}
                />
              </View>
              <View style={styles.paymentTextContainer}>
                <AppText
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: colors.text.primary,
                  }}
                >
                  {item.title}
                </AppText>
                <AppText
                  numberOfLines={1}
                  style={{ fontSize: 13, color: colors.text.tertiary }}
                >
                  Hoạt động thanh toán
                </AppText>
              </View>
            </View>
            <AppText
              style={{
                fontSize: 11,
                fontWeight: "bold",
                color: colors.text.tertiary,
                letterSpacing: -0.5,
                textTransform: "uppercase",
              }}
            >
              {getMemoryTime(item.createdAt)}
            </AppText>
          </View>
          {!!item.description && (
            <View
              style={{
                marginTop: 4,
                backgroundColor: colors.surface.sunken,
                padding: 14,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border.subtle,
              }}
            >
              <AppText
                style={{
                  fontSize: 13,
                  color: colors.text.secondary,
                  lineHeight: 19,
                }}
              >
                {item.description}
              </AppText>
            </View>
          )}
        </View>
      );
    }

    if (isTask) {
      return (
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View style={styles.taskLeft}>
              <View
                style={[
                  styles.taskIcon,
                  { backgroundColor: colors.surface.sunken },
                ]}
              >
                <Ionicons
                  name="checkmark-done"
                  size={22}
                  color={colors.status.success.text}
                />
              </View>
              <View style={styles.taskTextContainer}>
                <AppText
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: colors.text.primary,
                  }}
                >
                  {item.title}
                </AppText>
                <AppText
                  numberOfLines={1}
                  style={{ fontSize: 13, color: colors.text.tertiary }}
                >
                  Nhiệm vụ hoàn tất
                </AppText>
              </View>
            </View>
          </View>
          {!!item.description && (
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.text.tertiary}
              />
              <AppText
                numberOfLines={1}
                style={{ fontSize: 13, color: colors.text.secondary }}
              >
                {item.description}
              </AppText>
            </View>
          )}
        </View>
      );
    }

    if (hasSingleImage || hasMultipleImages) {
      return (
        <View style={styles.imageContainer}>
          <Image
            source={mediaUrls[0]}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
          <PressableScale
            onPress={() => handleImagePress(0)}
            style={{ position: "absolute", inset: 0 }}
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
          <View style={styles.imageFooter}>
            <AppText
              numberOfLines={2}
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: colors.text.primary,
                lineHeight: 22,
              }}
            >
              {item.title}
            </AppText>
            <View style={styles.taskMeta}>
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.text.tertiary}
              />
              <AppText style={{ fontSize: 13, color: colors.text.secondary }}>
                {item.description || getMemoryTime(item.createdAt)}
              </AppText>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.cardContent}>
        <AppText
          numberOfLines={2}
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: colors.text.primary,
            lineHeight: 22,
          }}
        >
          {item.title}
        </AppText>
        {!!item.description && (
          <AppText
            numberOfLines={3}
            style={{
              fontSize: 13,
              color: colors.text.secondary,
              lineHeight: 20,
              marginTop: 6,
            }}
          >
            {item.description}
          </AppText>
        )}
        <View style={styles.taskMeta}>
          <Ionicons
            name="time-outline"
            size={14}
            color={colors.text.tertiary}
          />
          <AppText style={{ fontSize: 13, color: colors.text.secondary }}>
            {getMemoryTime(item.createdAt)}
          </AppText>
        </View>
      </View>
    );
  }, [
    isPayment,
    isTask,
    hasMultipleImages,
    hasSingleImage,
    item,
    mediaUrls,
    handleImagePress,
    colors,
  ]);

  const gradientColors = useMemo<[string, string]>(() => {
    if (isPayment) {
      return [
        colors.brand.muted,
        isDark ? colors.background.default : "#FFFFFF",
      ];
    }
    if (isTask) {
      return [
        colors.status.success.bg,
        isDark ? colors.background.default : "#FFFFFF",
      ];
    }
    return [
      colors.surface.default,
      isDark ? colors.background.subtle : "#FFFFFF",
    ];
  }, [isPayment, isTask, colors, isDark]);

  return (
    <>
      {showAxis && (
        <View style={styles.axisContainer}>
          <View
            style={[styles.axisLine, { backgroundColor: colors.border.subtle }]}
          />
          <View style={styles.axisTextContainer}>
            <AppText style={[styles.axisText, { color: colors.text.tertiary }]}>
              {getAxisMonthYear(item)}
            </AppText>
          </View>
          <View
            style={[styles.axisLine, { backgroundColor: colors.border.subtle }]}
          />
        </View>
      )}

      <BlurView
        intensity={isDark ? 40 : 25}
        tint={isDark ? "dark" : "light"}
        style={styles.card}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderCardContent()}
        </LinearGradient>
      </BlurView>
    </>
  );
});
