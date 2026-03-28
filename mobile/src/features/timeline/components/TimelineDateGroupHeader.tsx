import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { formatGroupDate } from "@/src/utils/timeline-helpers";

export interface TimelineDateGroupHeaderProps {
  dateString: string;
}

const PulsingRing = () => {
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
};

export function TimelineDateGroupHeader({
  dateString,
}: TimelineDateGroupHeaderProps) {
  const isToday = formatGroupDate(dateString) === "HÔM NAY";

  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        <View style={styles.axisLine} />
        <PulsingRing />
        <View style={styles.dotOuter}>
          <View style={[styles.dotInner, isToday && styles.dotInnerToday]} />
        </View>
      </View>
      <Text style={[styles.dateText, isToday && styles.dateTextToday]}>
        {formatGroupDate(dateString)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 24,
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
    backgroundColor: "#F5F5F4", // taupe100
  },
  pulseRing: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E48B9B", // rose (main Aura color)
  },
  dotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#F5F5F4",
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
    backgroundColor: "#E7E5E4", // taupe200
  },
  dotInnerToday: {
    backgroundColor: "#E48B9B", // rose
  },
  dateText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#A8A29E", // taupe400
    textTransform: "uppercase",
    letterSpacing: 2,
    marginLeft: 8,
  },
  dateTextToday: {
    color: "#1C1917", // taupe900
  },
});
