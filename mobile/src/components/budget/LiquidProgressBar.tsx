import { tws } from "@/src/utils/tws";

import React, { memo, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const LiquidProgressBar = memo(({ progress }: { progress: number }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const target = Math.min(100, Math.max(0, progress || 0));
        Animated.timing(animatedWidth, {
            toValue: target,
            duration: 1000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false, // Width không hỗ trợ native driver
        }).start();
    }, [progress]);

    const widthStyle = {
        width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
        }),
    };

    return (
        <View style={tws("h-3 w-full bg-black/5 rounded-full overflow-hidden")}>
            <Animated.View
                style={tws("h-full rounded-full overflow-hidden", widthStyle)}
            >
                <LinearGradient
                    colors={["#ec1334", "#ff6b81", "#7B61FF"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
});
