import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { Text } from "@/src/components/atoms/Text";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
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
import {
  getSoloImportantDate,
  type SoloImportantDateDraft,
} from "@/src/features/home/solo-important-date";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { lottieInventory } from "@/src/lottie/inventory";
import { LoginBrandGradientTitle } from "@/src/features/auth/components/LoginBrandGradientTitle";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import {
  authGridScrollPaddingTop,
  AUTH_LOGIN_BRAND_TOP_OFFSET,
  AUTH_LOGIN_SCROLL_EXTRA_TOP,
} from "@/src/features/auth/authScreenLayout";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles as styles } from "@/src/features/home/homeScreen.styles";
import { scrollPadBottomWithTabBar } from "@/src/core/common/core";
import { formatSoloDate, getSoloCountdown } from "@/src/utils/home-helpers";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const { session, hydrated, isAuthenticated } = useSession();
  const [soloImportantDate, setSoloImportantDate] =
    useState<SoloImportantDateDraft | null>(null);
  const [showHeaderOverlay, setShowHeaderOverlay] = useState(false);

  useAuthGridChrome(isDark, colors.background.default, true);

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

  useEffect(() => {
    if (isAuthenticated && isPaired) {
      router.prefetch("/care");
      router.prefetch("/timeline");
      router.prefetch("/notifications");
    }
  }, [isAuthenticated, isPaired, router]);

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated || isPaired) {
        setSoloImportantDate(null);
        return;
      }

      let alive = true;
      void getSoloImportantDate().then((draft) => {
        if (alive) {
          setSoloImportantDate(draft);
        }
      });

      return () => {
        alive = false;
      };
    }, [isAuthenticated, isPaired]),
  );

  const scrollPaddingTop =
    authGridScrollPaddingTop(insets.top) + AUTH_LOGIN_SCROLL_EXTRA_TOP;
  /** Floating tab bar (~72px) + wrapper padding + home indicator — never clip last section. */
  const scrollPaddingBottom = scrollPadBottomWithTabBar(insets.bottom);

  const formatSoloDate = (iso: string) => {
    const [year, month, day] = iso.split("-");
    if (!year || !month || !day) {
      return iso;
    }
    return `${day}/${month}/${year}`;
  };

  const getSoloCountdown = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    if (!year || !month || !day) {
      return null;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let next = new Date(today.getFullYear(), month - 1, day);

    if (next.getTime() < today.getTime()) {
      next = new Date(today.getFullYear() + 1, month - 1, day);
    }

    const diffMs = next.getTime() - today.getTime();
    const daysLeft = Math.round(diffMs / 86_400_000);

    if (daysLeft <= 0) {
      return {
        label: "Hôm nay",
        suggestion: "Đây là lúc tốt để nhắn một câu ngắn hoặc chuẩn bị một cử chỉ nhỏ.",
      };
    }

    if (daysLeft === 1) {
      return {
        label: "Còn 1 ngày",
        suggestion: "Ngày này ở rất gần rồi. Nếu cần, hãy bật thông báo để Em+ nhắc sớm hơn một chút.",
      };
    }

    if (daysLeft <= 7) {
      return {
        label: `Còn ${daysLeft} ngày`,
        suggestion: "Đây là khoảng thời gian đẹp để chuẩn bị sớm và tránh quên vào phút cuối.",
      };
    }

    return {
      label: `Còn ${daysLeft} ngày`,
      suggestion: "Bạn đã có một mốc để Em+ bắt đầu đếm ngược và nhắc bạn đúng lúc hơn.",
    };
  };

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
        {showHeaderOverlay && (
          <View
            style={[
              styles.headerOverlay,
              {
                top: 0,
                left: 0,
                right: 0,
                height: insets.top + 50,
                backgroundColor: colors.background.default,
              },
            ]}
          />
        )}
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
    const soloCountdown = soloImportantDate
      ? getSoloCountdown(soloImportantDate.memoryDate)
      : null;

    return authShell(
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          soloStyles.unpairedScrollContent,
          {
            paddingTop: scrollPaddingTop,
            paddingBottom: scrollPaddingBottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          setShowHeaderOverlay(y > 50);
        }}
        scrollEventThrottle={16}
      >
        <View
          style={[
            soloStyles.soloCard,
            {
              backgroundColor: colors.surface.raised,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <View
            style={[
              soloStyles.soloIconWrap,
              { backgroundColor: colors.brand.muted },
            ]}
          >
            <EmplusLottie
              source={lottieInventory.homeLoveBunnies}
              style={soloStyles.soloLottie}
              loop
            />
          </View>

          <View style={soloStyles.soloCopy}>
            <Text
              style={[
                soloStyles.soloEyebrow,
                { color: colors.text.tertiary },
              ]}
            >
              Bắt đầu một mình trước
            </Text>
            <Text
              style={[
                soloStyles.soloTitle,
                { color: colors.text.primary },
              ]}
            >
              Em+ vẫn hữu ích ngay cả khi bạn chưa ghép đôi
            </Text>
            <Text
              style={[
                soloStyles.soloBody,
                { color: colors.text.secondary },
              ]}
            >
              Dùng Em+ để nhớ dịp quan trọng, chuẩn bị sớm hơn một chút, và
              ghép đôi sau khi hai bạn đã sẵn sàng đồng bộ cùng nhau.
            </Text>
          </View>

          <View style={soloStyles.soloChecklist}>
            {[
              "Giữ một nơi riêng cho những điều bạn không muốn quên.",
              "Thêm ngày quan trọng đầu tiên để Em+ bắt đầu có ngữ cảnh.",
              "Ghép đôi sau để mở trải nghiệm chung cho cả hai.",
            ].map((item) => (
              <View key={item} style={soloStyles.soloChecklistRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.brand.default}
                />
                <Text
                  style={[
                    soloStyles.soloChecklistText,
                    { color: colors.text.secondary },
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={soloStyles.soloActions}>
            <Button
              label={
                soloImportantDate
                  ? "Cập nhật ngày quan trọng"
                  : "Thêm ngày quan trọng đầu tiên"
              }
              fullWidth
              onPress={() => router.push("/add-memory")}
              accessibilityLabel="Mở màn hình thêm ngày quan trọng"
              accessibilityHint="Lưu ngày đầu tiên trước khi ghép đôi"
            />
            <Button
              label="Ghép đôi khi sẵn sàng"
              variant="neutralOutline"
              fullWidth
              onPress={() => router.push("/pairing")}
              accessibilityLabel="Mở màn hình ghép đôi"
              accessibilityHint="Kết nối với người ấy sau khi bạn đã bắt đầu dùng Em+"
            />
          </View>

          {soloImportantDate ? (
            <View style={soloStyles.savedDateStack}>
              <View
                style={[
                  soloStyles.savedDateCard,
                  {
                    backgroundColor: colors.surface.default,
                    borderColor: colors.border.subtle,
                  },
                ]}
              >
                <View style={soloStyles.savedDateIcon}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={18}
                    color={colors.brand.default}
                  />
                </View>
                <View style={soloStyles.savedDateText}>
                  <Text
                    style={[
                      soloStyles.savedDateEyebrow,
                      { color: colors.text.tertiary },
                    ]}
                  >
                    Đã lưu gần đây
                  </Text>
                  <Text
                    style={[
                      soloStyles.savedDateTitle,
                      { color: colors.text.primary },
                    ]}
                  >
                    {soloImportantDate.title}
                  </Text>
                  <Text
                    style={[
                      soloStyles.savedDateMeta,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {formatSoloDate(soloImportantDate.memoryDate)}
                  </Text>
                  {soloImportantDate.description ? (
                    <Text
                      style={[
                        soloStyles.savedDateBody,
                        { color: colors.text.secondary },
                      ]}
                    >
                      {soloImportantDate.description}
                    </Text>
                  ) : null}
                </View>
              </View>

              {soloCountdown ? (
                <View
                  style={[
                    soloStyles.reminderCard,
                    {
                      backgroundColor: colors.surface.default,
                      borderColor: colors.border.subtle,
                    },
                  ]}
                >
                  <View style={soloStyles.reminderHeader}>
                    <View
                      style={[
                        soloStyles.reminderBadge,
                        { backgroundColor: colors.brand.muted },
                      ]}
                    >
                      <Text
                        style={[
                          soloStyles.reminderBadgeText,
                          { color: colors.brand.text },
                        ]}
                      >
                        {soloCountdown.label}
                      </Text>
                    </View>
                    <Ionicons
                      name="notifications-outline"
                      size={18}
                      color={colors.brand.default}
                    />
                  </View>

                  <Text
                    style={[
                      soloStyles.reminderTitle,
                      { color: colors.text.primary },
                    ]}
                  >
                    Em+ đã có một mốc để nhắc bạn
                  </Text>
                  <Text
                    style={[
                      soloStyles.reminderBody,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {soloCountdown.suggestion}
                  </Text>

                  <Button
                    label="Mở thông báo để chuẩn bị nhắc"
                    variant="neutralOutline"
                    fullWidth
                    onPress={() => router.push("/notifications")}
                    accessibilityLabel="Mở cài đặt thông báo"
                    accessibilityHint="Chuẩn bị nhắc cho ngày quan trọng vừa lưu"
                  />
                </View>
              ) : null}
            </View>
          ) : null}
        </View>

        <View
          style={[
            soloStyles.soloNote,
            {
              backgroundColor: colors.surface.default,
              borderColor: colors.border.subtle,
            },
          ]}
        >
          <Text
            style={[soloStyles.soloNoteTitle, { color: colors.text.primary }]}
          >
            Pairing bây giờ mở thêm gì?
          </Text>
          <Text
            style={[
              soloStyles.soloNoteBody,
              { color: colors.text.secondary },
            ]}
          >
            Khi ghép đôi, Em+ mới bắt đầu đồng bộ các mốc chung, gợi ý theo nhịp
            của hai bạn, và nhắc theo bối cảnh chung. Hãy xem nó như một lớp nâng
            cấp, không phải bước bắt buộc đầu tiên.
          </Text>
        </View>
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

  return authShell(
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: scrollPaddingTop,
          paddingBottom: scrollPaddingBottom,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      onScroll={(event) => {
        const y = event.nativeEvent.contentOffset.y;
        setShowHeaderOverlay(y > 50);
      }}
      scrollEventThrottle={16}
    >
      <HomeHeader
        userInitial={session?.user?.email?.[0]?.toUpperCase() || "B"}
        greeting={greetingInfo.greeting}
        subGreeting={greetingInfo.subGreeting}
        iconName={greetingInfo.iconName}
      />

      <HeroCard
        loveDays={loveDays}
        startDateLabel={startDateLabel}
        nextDateLabel={nextDateLabel}
      />

      {showFocusCard && (
        <FocusCard
          focusTitle={focusTitle}
          focusSubtitle={focusSubtitle}
          showFocusCard={showFocusCard}
          setShowFocusCard={setShowFocusCard}
        />
      )}

      <QuickActions cycleLabel={cycleLabel} nextDateLabel={nextDateLabel} />

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

const soloStyles = StyleSheet.create({
  unpairedScrollContent: {
    gap: 18,
  },
  soloCard: {
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    gap: 18,
  },
  soloIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  soloLottie: {
    width: 64,
    height: 64,
  },
  soloCopy: {
    gap: 8,
  },
  soloEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  soloTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "500",
    letterSpacing: -0.3,
  },
  soloBody: {
    fontSize: 15,
    lineHeight: 22,
  },
  soloChecklist: {
    gap: 12,
  },
  soloChecklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  soloChecklistText: {
    fontSize: 14,
    lineHeight: 20,
  },
  soloActions: {
    gap: 12,
  },
  savedDateStack: {
    gap: 12,
  },
  savedDateCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
  },
  savedDateIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(184,106,74,0.08)",
  },
  savedDateText: {
    gap: 4,
  },
  savedDateEyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  savedDateTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  savedDateMeta: {
    fontSize: 13,
    lineHeight: 18,
  },
  savedDateBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  reminderCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reminderBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
  },
  reminderBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  soloNote: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 8,
  },
  soloNoteTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  soloNoteBody: {
    fontSize: 14,
    lineHeight: 21,
  },
});
