import { tws } from "@/src/utils/tws";

import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { fonts } from "@/src/theme";
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
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
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
        tws("absolute w-8 h-8 rounded-full bg-primary"),
        {
          transform: [{ scale: pulseAnim }],
          opacity: pulseAnim.interpolate({
            inputRange: [1, 2],
            outputRange: [0.3, 0],
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
    <View style={tws("flex-row items-center mb-4 mt-8 mx-6")}>
      <View style={tws("w-12 items-center justify-center")}>
        {/* Continuous Axis Line segment for header */}
        <View
          style={tws("absolute top-0 bottom-[-16px] w-[2px] bg-slate-200/60")}
        />

        <PulsingRing />
        <View
          style={tws(
            "w-5 h-5 rounded-full bg-white border-[2.5px] border-primary/20 items-center justify-center z-10 shadow-sm",
          )}
        >
          <View style={tws("w-1.5 h-1.5 rounded-full bg-primary")} />
        </View>
      </View>
      <Text
        style={[
          { fontFamily: fonts.sans },
          tws(
            "text-[13px] font-bold uppercase tracking-widest ml-0.5",
            isToday ? "text-slate-900" : "text-slate-500",
          ),
        ]}
      >
        {formatGroupDate(dateString)}
      </Text>
    </View>
  );
}
