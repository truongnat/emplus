import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { authGridScrollPaddingTopPairing } from "@/src/features/auth/authScreenLayout";
import { loginScreenStyles as styles } from "@/src/features/auth/loginScreen.styles";

type PairingGridShellProps = {
  children: ReactNode;
};

/**
 * Post-auth pairing: grid + status-bar chrome + KeyboardAwareScrollView so the join
 * field scrolls above the keyboard (iOS + Android), matching auth shells.
 */
export function PairingGridShell({ children }: PairingGridShellProps) {
  const insets = useSafeAreaInsets();
  const { isDark } = useThemeMode();
  const colors = useThemeColors();

  useAuthGridChrome(isDark, colors.background.default, true);

  const paddingTop = authGridScrollPaddingTopPairing(insets.top);
  const paddingBottom = Math.max(insets.bottom, 12) + 16;

  return (
    <AppScreen
      applyTopSafeAreaPadding={false}
      style={{
        ...styles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={styles.appContent}
      animatedEntrance={false}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop,
            paddingBottom,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={28}
          extraHeight={80}
          keyboardOpeningTime={0}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
