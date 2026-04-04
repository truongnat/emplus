import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Tiêu đề màn ghép đôi — fill gradient đồng bộ brand (login wordmark).
 */
export function PairingGradientTitle() {
  return (
    <MaskedView
      style={styles.maskRoot}
      maskElement={
        <View style={styles.maskBox}>
          <Text style={styles.maskText}>Ghép đôi</Text>
        </View>
      }
    >
      <LinearGradient
        colors={["#FF6B81", "#C084FC", "#7B61FF"]}
        locations={[0, 0.45, 1]}
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
    alignSelf: "center",
  },
  maskBox: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  maskText: {
    fontFamily: "BeVietnamPro_800ExtraBold",
    fontSize: 28,
    fontWeight: "normal",
    letterSpacing: -0.5,
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "center",
    ...Platform.select({
      android: { includeFontPadding: false as const },
      default: {},
    }),
  },
  gradient: {
    flex: 1,
    minWidth: 200,
  },
});
