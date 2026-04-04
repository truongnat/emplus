import React, { lazy, Suspense } from "react";
import { View, StyleSheet } from "react-native";
import type { TimelineImageViewerProps } from "./TimelineImageViewer";

const TimelineImageViewer = lazy(() =>
  import("./TimelineImageViewer").then((m) => ({
    default: m.TimelineImageViewer,
  })),
);

/**
 * Tách chunk JS: chỉ tải viewer khi user mở ảnh (kết hợp điều kiện mount ở cha).
 */
export function TimelineImageViewerLazy(props: TimelineImageViewerProps) {
  return (
    <Suspense fallback={<View style={styles.fallback} pointerEvents="none" />}>
      <TimelineImageViewer {...props} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  fallback: {
    ...StyleSheet.absoluteFillObject,
  },
});
