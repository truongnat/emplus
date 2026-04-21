import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { useThemeColors } from "@/src/theme";
import { LoginGridAnimatedBackground } from "./LoginGridAnimatedBackground";
import { RegisterTopBar } from "./RegisterTopBar";
import { useAuthGridChrome } from "../hooks/useAuthGridChrome";
import {
  authGridScrollPaddingTop,
  AUTH_GRID_TOP_BAR_OFFSET,
} from "../authScreenLayout";
import { loginScreenStyles as styles } from "../loginScreen.styles";
import { registerScreenStyles as regStyles } from "../registerScreen.styles";

type AuthGridScreenShellProps = {
  children: ReactNode;
  /** Vertically center hero + form in the scroll area (e.g. forgot-password); register stays top-aligned. */
  centerContent?: boolean;
  compact?: boolean;
};

/**
 * Shared full-bleed auth chrome: grid, status bar sync, back + brand, keyboard-aware scroll.
 * Dùng cho register, forgot-password, v.v.
 */
export function AuthGridScreenShell({
  children,
  centerContent = false,
  compact = false,
}: AuthGridScreenShellProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  useAuthGridChrome(false, colors.background.default, true);

  const paddingTop = authGridScrollPaddingTop(insets.top) - (compact ? 18 : 0);

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
      <StatusBar style="dark" />
      <View style={styles.layerRoot}>
        <LoginGridAnimatedBackground isDark={false} />

        <RegisterTopBar
          top={insets.top + AUTH_GRID_TOP_BAR_OFFSET}
          left={insets.left + 12}
          right={insets.right + 12}
        />

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            regStyles.registerScrollContent,
            {
              paddingBottom: insets.bottom + 22,
              paddingTop,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={20}
          extraHeight={64}
          keyboardOpeningTime={0}
        >
          <View
            style={[
              regStyles.registerScrollInner,
              compact ? regStyles.registerScrollInnerCompact : null,
              centerContent && { justifyContent: "center" },
            ]}
          >
            {children}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
