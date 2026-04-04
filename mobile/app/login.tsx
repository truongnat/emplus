import React from "react";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { useSession } from "@/src/framework/ctx/session-context";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  LoginGridAnimatedBackground,
} from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { LoginBrandGradientTitle } from "@/src/features/auth/components/LoginBrandGradientTitle";
import { LoginAuthForm } from "@/src/features/auth/components/LoginAuthForm";
import { LoginHeroSection } from "@/src/features/auth/components/LoginHeroSection";
import { LoginSignUpFooter } from "@/src/features/auth/components/LoginSignUpFooter";
import { LoginScreenLoading } from "@/src/features/auth/components/LoginScreenLoading";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import {
  authGridScrollPaddingTop,
  AUTH_LOGIN_BRAND_TOP_OFFSET,
  AUTH_LOGIN_SCROLL_EXTRA_TOP,
} from "@/src/features/auth/authScreenLayout";
import { loginScreenStyles as styles } from "@/src/features/auth/loginScreen.styles";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { isDark } = useThemeMode();
  const { isAuthenticated, hydrated: isHydrated, session } = useSession();
  const colors = useThemeColors();

  useAuthGridChrome(
    isDark,
    colors.background.default,
    isHydrated && !isAuthenticated,
  );

  if (!isHydrated) {
    return <LoginScreenLoading />;
  }

  if (isAuthenticated) {
    const isPaired = Boolean(session?.user?.coupleId);
    return <Redirect href={isPaired ? "/(tabs)/home" : "/pairing"} />;
  }

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

        <View
          style={[
            styles.brandTopLeft,
            {
              top: insets.top + AUTH_LOGIN_BRAND_TOP_OFFSET,
              left: insets.left + 20,
            },
          ]}
          pointerEvents="none"
          accessible
          accessibilityRole="text"
          accessibilityLabel="Em+"
        >
          <LoginBrandGradientTitle />
        </View>

        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + 28,
              paddingTop:
                authGridScrollPaddingTop(insets.top) + AUTH_LOGIN_SCROLL_EXTRA_TOP,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          enableOnAndroid
          enableAutomaticScroll
          automaticallyAdjustKeyboardInsets
          extraScrollHeight={24}
          extraHeight={72}
          keyboardOpeningTime={0}
        >
          <LoginHeroSection />
          <LoginAuthForm />
          <LoginSignUpFooter />
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
}
