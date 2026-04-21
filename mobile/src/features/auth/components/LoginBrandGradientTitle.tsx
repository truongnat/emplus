import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Wordmark "Em+" với fill gradient (góc trên trái).
 */
export function LoginBrandGradientTitle() {
  return (
    <MaskedView
      style={styles.maskRoot}
      maskElement={
        <View style={styles.maskBox}>
          <Text style={styles.maskText}>Em+</Text>
        </View>
      }
    >
      <LinearGradient
        colors={["#A95E40", "#8F6A52"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.gradient}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskRoot: {
    height: 40,
    justifyContent: "center",
  },
  maskBox: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  maskText: {
    fontFamily: "BeVietnamPro_600SemiBold",
    fontSize: 30,
    fontWeight: "normal",
    letterSpacing: -0.3,
    color: "#000000",
    backgroundColor: "transparent",
    ...Platform.select({
      android: { includeFontPadding: false as const },
      default: {},
    }),
  },
  gradient: {
    flex: 1,
    minWidth: 120,
  },
});
