import React, { useCallback, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Text } from "@/src/components/atoms/Text";
import { useSession } from "@/src/session-context";
import { useHomeData } from "@/src/features/home";
import {
  HomeHeader,
  HeroCard,
  QuickActions,
  FocusCard,
  UpcomingEvents,
} from "@/src/features/home";
import { palette } from "@/src/theme/tokens";

export default function HomeScreen() {
  const router = useRouter();
  const { session, clearSession, hydrated, isAuthenticated } = useSession();

  const {
    isPaired,
    greetingInfo,
    loveDays,
    startDateLabel,
    cycleLabel,
    upcomingEvents,
    nextDateLabel,
    focusTitle,
    focusSubtitle,
    showFocusCard,
    setShowFocusCard,
  } = useHomeData();

  // Prefetch likely navigation targets on mount
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

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.centerText}>Please log in to continue</Text>
          <Button label="Login" onPress={() => router.push("/login")} />
        </View>
      </AppScreen>
    );
  }

  if (!isPaired) {
    return (
      <AppScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.centerText}>
            You need to pair with your partner first
          </Text>
          <Button label="Pair Now" onPress={() => router.push("/pairing")} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <HomeHeader
          userInitial={session?.user?.email?.[0]?.toUpperCase() || "B"}
          greeting={greetingInfo.greeting}
          subGreeting={greetingInfo.subGreeting}
          iconName={greetingInfo.iconName}
        />

        {/* Hero Card - Love Days Counter */}
        <HeroCard loveDays={loveDays} startDateLabel={startDateLabel} />

        {/* Quick Actions - Cycle & Next Date */}
        <QuickActions cycleLabel={cycleLabel} nextDateLabel={nextDateLabel} />

        {/* Focus Card - Mood Check-in */}
        {showFocusCard && (
          <FocusCard
            focusTitle={focusTitle}
            focusSubtitle={focusSubtitle}
            showFocusCard={showFocusCard}
            setShowFocusCard={setShowFocusCard}
          />
        )}

        {/* Upcoming Events */}
        <UpcomingEvents upcomingEvents={upcomingEvents} />

        {/* Logout Button */}
        <View style={styles.footer}>
          <Button
            label="Đăng xuất"
            onPress={handleLogout}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 128,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  centerText: {
    fontSize: 16,
    color: palette.zinc500,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    marginTop: 32,
    marginBottom: 20,
  },
});
