import React from "react";
import { View } from "react-native";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { useThemeColors } from "@/src/theme";
import { lottieInventory } from "@/src/lottie/inventory";

import { loginScreenStyles as styles } from "../loginScreen.styles";

export function LoginScreenLoading() {
  const colors = useThemeColors();

  return (
    <AppScreen animatedEntrance={false}>
      <View style={styles.loadingContainer}>
        <EmplusLottie
          source={lottieInventory.loader}
          style={{ width: 96, height: 96 }}
          loop
        />
        <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>
          Đang tải Em Plus...
        </Text>
      </View>
    </AppScreen>
  );
}
