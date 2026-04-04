import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Text } from "@/src/components/atoms/Text";
import { useSession } from "@/src/session-context";
import { useHomeData } from "@/src/features/home";
import {
  HomeChromeNotificationButton,
  HomeHeader,
  HeroCard,
  QuickActions,
  FocusCard,
  UpcomingEvents,
} from "@/src/features/home";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { LoginBrandGradientTitle } from "@/src/features/auth/components/LoginBrandGradientTitle";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import {
  authGridScrollPaddingTop,
  AUTH_LOGIN_BRAND_TOP_OFFSET,
  AUTH_LOGIN_SCROLL_EXTRA_TOP,
} from "@/src/features/auth/authScreenLayout";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles as styles } from "@/src/features/home/homeScreen.styles";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, clearSession, hydrated, isAuthenticated } = useSession();

  useAuthGridChrome(isDark, colors.background.default, true);

  const {
    isPaired,
    greetingInfo,
    loveDays,
    cycleLabel,
    upcomingEvents,
    nextDateLabel,
    focusTitle,
    focusSubtitle,
    showFocusCard,
    setShowFocusCard,
  } = useHomeData();

  useEffect(() => {
    if (isAuthenticated && isPaired) {
      router.prefetch("/care");
      router.prefetch("/timeline");
      router.prefetch("/notifications");
    }
  }, [isAuthenticated, isPaired, router]);

  function handleLogout(): void {
    clearSession();
    router.replace("/login");
  }

  const scrollPaddingTop =
    authGridScrollPaddingTop(insets.top) + AUTH_LOGIN_SCROLL_EXTRA_TOP;

  const authShell = (
    children: React.ReactNode,
    chromeTrailing?: React.ReactNode,
  ) => (
    <AppScreen
      applyTopSafeAreaPadding={false}
      wrapWithKeyboardDismiss={false}
      style={{
        ...loginScreenStyles.appScreenBase,
        backgroundColor: "transparent",
      }}
      contentContainerStyle={loginScreenStyles.appContent}
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
          accessibilityLabel="Em Plus"
        >
          <LoginBrandGradientTitle />
        </View>
        {chromeTrailing}
        {children}
      </View>
    </AppScreen>
  );

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return authShell(
      <View style={styles.centerContainer}>
        <EmplusLottie
          source={lottieInventory.empty}
          style={{ width: 140, height: 140 }}
          loop
        />
        <Text style={[styles.centerText, { color: colors.text.secondary }]}>
          Đăng nhập để tiếp tục
        </Text>
        <Button
          label="Đăng nhập"
          onPress={() => router.push("/login")}
          accessibilityLabel="Mở màn hình đăng nhập"
        />
      </View>,
    );
  }

  if (!isPaired) {
    return authShell(
      <View style={styles.centerContainer}>
        <EmplusLottie
          source={lottieInventory.careHeart}
          style={{ width: 140, height: 140 }}
          loop
          speed={0.9}
        />
        <Text style={[styles.centerText, { color: colors.text.secondary }]}>
          Ghép đôi với người ấy để dùng đầy đủ tính năng
        </Text>
        <Button
          label="Ghép đôi"
          onPress={() => router.push("/pairing")}
          accessibilityLabel="Mở màn hình ghép đôi"
        />
      </View>,
    );
  }

  return authShell(
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: scrollPaddingTop },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
    >
      <HomeHeader
        userInitial={session?.user?.email?.[0]?.toUpperCase() || "B"}
        greeting={greetingInfo.greeting}
        subGreeting={greetingInfo.subGreeting}
        iconName={greetingInfo.iconName}
      />

      <HeroCard loveDays={loveDays} />

      <QuickActions cycleLabel={cycleLabel} nextDateLabel={nextDateLabel} />

      {showFocusCard && (
        <FocusCard
          focusTitle={focusTitle}
          focusSubtitle={focusSubtitle}
          showFocusCard={showFocusCard}
          setShowFocusCard={setShowFocusCard}
        />
      )}

      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </ScrollView>,
    <View
      style={[
        styles.brandTopRight,
        {
          top: insets.top + AUTH_LOGIN_BRAND_TOP_OFFSET,
          right: insets.right + 20,
        },
      ]}
    >
      <HomeChromeNotificationButton />
    </View>,
  );
}
