import { tws } from "@/src/utils/tws";

import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AppButton, AppScreen, GlassCard, Reveal, AppText } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";

import { useHomeData } from "@/src/components/home/useHomeData";
import { HomeHeader } from "@/src/components/home/HomeHeader";
import { HeroCard } from "@/src/components/home/HeroCard";
import { QuickActions } from "@/src/components/home/QuickActions";
import { FocusCard } from "@/src/components/home/FocusCard";
import { UpcomingEvents } from "@/src/components/home/UpcomingEvents";
import { useCallback, useEffect } from "react";

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

  const handleLoginPress = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handlePairingPress = useCallback(() => {
    router.push("/pairing");
  }, [router]);

  return (
    <AppScreen scroll={false}>
      {isAuthenticated && isPaired ? (
        <HomeHeader
          userInitial={session?.user?.email?.[0]?.toUpperCase() || "B"}
          greeting={(greetingInfo as any).greeting}
          subGreeting={(greetingInfo as any).subGreeting}
          iconName={(greetingInfo as any).iconName}
        />
      ) : null}

      <ScrollView
        contentContainerStyle={tws("px-5 pt-4 pb-32")}
        showsVerticalScrollIndicator={false}
      >
        {!hydrated ? (
          <Reveal delay={40}>
            <GlassCard title="Đang khôi phục phiên" subtitle="Ứng dụng đang nạp dữ liệu cục bộ.">
              <AppText variant="captionBold" color="slate-400">Vui lòng chờ trong giây lát.</AppText>
            </GlassCard>
          </Reveal>
        ) : null}

        {!isAuthenticated ? (
          <Reveal delay={64}>
            <GlassCard title="Bắt đầu hành trình" subtitle="Đăng nhập để mở không gian chung của hai bạn.">
              <AppText variant="captionBold" color="slate-400" style={tws("mb-4")}>
                Em Plus là nơi lưu giữ kỷ niệm và nhịp cảm xúc riêng tư của hai bạn.
              </AppText>
              <AppButton label="Đến màn đăng nhập" onPress={handleLoginPress} />
            </GlassCard>
          </Reveal>
        ) : null}

        {isAuthenticated && !isPaired ? (
          <Reveal delay={80}>
            <GlassCard title="Cần ghép đôi" subtitle="Kết nối với người ấy để mở Dashboard chung.">
              <AppText variant="captionBold" color="slate-400" style={tws("mb-4")}>
                Dùng Trung tâm kết nối để tạo hoặc nhập mã mời và ghép đôi tài khoản.
              </AppText>
              <AppButton label="Mở Trung tâm kết nối" onPress={handlePairingPress} />
              <AppButton label="Đăng xuất" variant="ghost" onPress={handleLogout} />
            </GlassCard>
          </Reveal>
        ) : null}

        {isAuthenticated && isPaired ? (
          <View style={tws("flex-1")}>
            <Reveal delay={150}>
              <HeroCard
                loveDays={loveDays}
                startDateLabel={startDateLabel}
              />
            </Reveal>

            <QuickActions
              cycleLabel={cycleLabel}
              nextDateLabel={nextDateLabel}
            />

            <FocusCard
              focusTitle={focusTitle}
              focusSubtitle={focusSubtitle}
              showFocusCard={showFocusCard}
              setShowFocusCard={setShowFocusCard}
            />

            <UpcomingEvents
              upcomingEvents={upcomingEvents}
            />
          </View>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}