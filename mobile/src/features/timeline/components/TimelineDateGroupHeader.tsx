import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { formatGroupDate } from "@/src/utils/timeline-helpers";
import { useThemeColors } from "@/src/theme";
import { AppText } from "@/src/ui-kit";

export interface TimelineDateGroupHeaderProps {
  dateString: string;
}

function PulsingRing({ brandColor }: { brandColor: string }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        { backgroundColor: brandColor },
        {
          transform: [{ scale: pulseAnim }],
          opacity: pulseAnim.interpolate({
            inputRange: [1, 1.5],
            outputRange: [0.2, 0],
          }),
        },
      ]}
    />
  );
}

export const TimelineDateGroupHeader = React.memo(function TimelineDateGroupHeader({
  dateString,
}: TimelineDateGroupHeaderProps) {
  const colors = useThemeColors();
  const isToday = formatGroupDate(dateString) === "HÔM NAY";

  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <View
          style={[styles.axisLine, { backgroundColor: colors.border.subtle }]}
        />
        <PulsingRing brandColor={colors.brand.default} />
        <View
          style={[
            styles.dotOuter,
            {
              backgroundColor: colors.surface.default,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <View
            style={[
              styles.dotInner,
              {
                backgroundColor: isToday
                  ? colors.brand.default
                  : colors.border.default,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.titleBlock}>
        <AppText
          accessibilityRole="header"
          numberOfLines={1}
          style={[
            styles.dateText,
            { color: isToday ? colors.text.primary : colors.text.tertiary },
          ]}
        >
          {formatGroupDate(dateString)}
        </AppText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 22,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  markerContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  axisLine: {
    position: "absolute",
    top: 0,
    bottom: -24,
    width: 2,
  },
  pulseRing: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginLeft: 8,
  },
});
