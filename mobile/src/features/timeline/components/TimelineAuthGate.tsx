import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";

export interface TimelineAuthGateProps {
  isAuthenticated: boolean;
}

export function TimelineAuthGate({ isAuthenticated }: TimelineAuthGateProps) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <AppScreen>
      <View style={styles.centerContainer}>
        <AppText style={[styles.centerText, { color: colors.text.tertiary }]}>
          {!isAuthenticated
            ? "Đăng nhập để xem dòng thời gian"
            : "Ghép đôi để xem kỷ niệm chung"}
        </AppText>
        <Button
          label={!isAuthenticated ? "Đăng nhập" : "Ghép đôi"}
          onPress={() =>
            router.push(!isAuthenticated ? "/login" : "/pairing")
          }
          style={styles.centerButton}
          accessibilityLabel={
            !isAuthenticated ? "Mở đăng nhập" : "Mở ghép đôi"
          }
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  centerButton: {
    marginTop: 20,
  },
  centerText: {
    fontSize: 15,
  },
});
