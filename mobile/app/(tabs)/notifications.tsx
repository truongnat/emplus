import React, { useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotificationsList,
} from "@/src/presentation/hooks/notifications/useNotifications";
import type { NotificationModule } from "@/src/domain/entities/schemas";
import { syncExpoPushTokenToServer } from "@/src/lib/sync-expo-push-token";
import { useThemeColors, useThemeMode } from "@/src/theme";
import { typographyRoles } from "@/src/theme/typography-roles";
import { fontSize } from "@/src/theme/tokens";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { LoginGridAnimatedBackground } from "@/src/features/auth/components/LoginGridAnimatedBackground";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { scrollPadBottomWithTabBar } from "@/src/core/common/core";

function formatRelativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Vừa xong";
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} giờ trước`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} ngày trước`;
  return new Date(iso).toLocaleDateString("vi-VN");
}

function createNotificationStyles(c: SemanticColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      paddingTop: 4,
      paddingBottom: 16,
    },
    /** flexShrink: 0 — tránh co cột trái khi nút “Đọc hết” hiện (tiêu đề một dòng). */
    headerLeft: {
      flexGrow: 1,
      flexShrink: 0,
      marginRight: 8,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flexShrink: 0,
    },
    markAllBtn: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: c.brand.muted,
    },
    markAllText: {
      fontSize: 12,
      fontWeight: "800",
      color: c.brand.text,
    },
    title: {
      color: c.text.primary,
    },
    subtitle: {
      color: c.text.tertiary,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginTop: 4,
    },
    scrollContent: {
      paddingHorizontal: 22,
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    sectionDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: c.brand.default,
    },
    sectionDotMuted: {
      backgroundColor: c.border.default,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "900",
      color: c.brand.text,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    sectionTitleMuted: {
      color: c.text.tertiary,
    },
    cardContainer: {
      backgroundColor: c.surface.default,
      borderRadius: 24,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border.subtle,
      shadowColor: c.text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 2,
      overflow: "hidden",
    },
    notificationRow: {
      flexDirection: "row",
      alignItems: "stretch",
      minHeight: 88,
    },
    leftAccent: {
      width: 4,
    },
    notificationBody: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      gap: 16,
    },
    notificationIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationTextContainer: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: c.text.primary,
      lineHeight: 20,
    },
    notificationTime: {
      fontSize: 11,
      fontWeight: "800",
      color: c.text.tertiary,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: 4,
    },
    notificationAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: c.brand.default,
      borderRadius: 12,
      marginTop: 10,
    },
    notificationActionText: {
      fontSize: 12,
      fontWeight: "900",
      color: c.text.onBrand,
    },
    centered: {
      paddingVertical: 48,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    hint: {
      marginTop: 12,
      color: c.text.tertiary,
      fontSize: 14,
    },
    errorText: {
      color: c.status.error.text,
      textAlign: "center",
      marginBottom: 12,
    },
    retryBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: c.brand.default,
      borderRadius: 16,
    },
    retryText: {
      color: c.text.onBrand,
      fontWeight: "800",
    },
    /** Fills scroll area so cat + copy sit vertically centered when list is empty */
    emptyStateContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 32,
      paddingHorizontal: 24,
    },
    /** Cat playing animation — source 1070×456 */
    emptyCatLottie: {
      width: 300,
      height: 128,
    },
    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: "800",
      color: c.text.primary,
      textAlign: "center",
    },
    emptySub: {
      marginTop: 8,
      fontSize: 14,
      color: c.text.tertiary,
      textAlign: "center",
    },
  });
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useSession();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => createNotificationStyles(colors), [colors]);
  useAuthGridChrome(isDark, colors.background.default, true);

  /** Title row directly under status bar (no Em+ wordmark on this tab). */
  const topPad = insets.top + 10;
  const scrollPadBottom = scrollPadBottomWithTabBar(insets.bottom);

  const { data, isPending, isError, error, refetch } = useNotificationsList();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  useEffect(() => {
    if (!isAuthenticated) return;
    void syncExpoPushTokenToServer().catch(() => {});
  }, [isAuthenticated]);

  const items = data?.items ?? [];
  const hasUnread = items.some((n) => !n.readAt);

  const latest = items.slice(0, 2);
  const previous = items.slice(2);

  return (
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
      <View style={homeScreenStyles.layerRoot}>
        <LoginGridAnimatedBackground isDark={isDark} />

        <View style={[styles.container, { paddingTop: topPad }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AppText
              accessibilityRole="header"
              numberOfLines={1}
              style={[
                typographyRoles.title,
                styles.title,
                { fontFamily: typographyRoles.display.fontFamily },
              ]}
            >
              Thông báo
            </AppText>
            <AppText
              accessibilityRole="text"
              style={[
                typographyRoles.caption,
                styles.subtitle,
                {
                  fontSize: fontSize["2xs"],
                  fontFamily: typographyRoles.titleSm.fontFamily,
                },
              ]}
            >
              NHỊP ĐẬP HÔM NAY
            </AppText>
          </View>

          <View style={styles.headerRight}>
            {hasUnread && items.length > 0 && (
              <TouchableOpacity
                onPress={() => markAll.mutate()}
                disabled={markAll.isPending}
                style={styles.markAllBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <AppText style={styles.markAllText}>
                  {markAll.isPending ? "…" : "Đọc hết"}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isPending && (
          <View
            style={[styles.centered, { paddingBottom: scrollPadBottom }]}
          >
            <EmplusLottie
              source={lottieInventory.loader}
              style={{ width: 120, height: 120 }}
              loop
            />
            <AppText style={styles.hint}>Đang tải thông báo…</AppText>
          </View>
        )}

        {isError && (
          <View
            style={[styles.centered, { paddingBottom: scrollPadBottom }]}
          >
            <EmplusLottie
              source={lottieInventory.error}
              style={{ width: 120, height: 120 }}
              loop={false}
            />
            <AppText style={styles.errorText}>
              {(error as Error)?.message ?? "Không tải được danh sách."}
            </AppText>
            <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
              <AppText style={styles.retryText}>Thử lại</AppText>
            </TouchableOpacity>
          </View>
        )}

        {!isPending && !isError && (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: scrollPadBottom,
                ...(items.length === 0 ? { flexGrow: 1 } : {}),
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
          >
            {items.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <EmplusLottie
                  source={lottieInventory.notificationsEmptyCat}
                  style={styles.emptyCatLottie}
                  loop
                  speed={0.95}
                />
                <AppText
                  accessibilityRole="header"
                  style={styles.emptyTitle}
                >
                  Chưa có thông báo
                </AppText>
                <AppText style={styles.emptySub}>
                  Khi có hoạt động mới, bạn sẽ thấy tại đây.
                </AppText>
              </View>
            ) : (
              <>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionDot} />
                    <AppText
                      accessibilityRole="header"
                      style={styles.sectionTitle}
                    >
                      Mới nhất
                    </AppText>
                  </View>
                  {latest.map((n) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
                      styles={styles}
                      onOpen={() => {
                        if (!n.readAt) markRead.mutate(n.id);
                      }}
                    />
                  ))}
                </View>

                {previous.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View
                        style={[styles.sectionDot, styles.sectionDotMuted]}
                      />
                      <AppText
                        accessibilityRole="header"
                        style={[styles.sectionTitle, styles.sectionTitleMuted]}
                      >
                        Trước đó
                      </AppText>
                    </View>
                    {previous.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        styles={styles}
                        onOpen={() => {
                          if (!n.readAt) markRead.mutate(n.id);
                        }}
                      />
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        )}
        </View>
      </View>
    </AppScreen>
  );
}

function NotificationCard({
  notification,
  styles,
  onOpen,
}: {
  notification: NotificationModule.InAppNotification;
  styles: ReturnType<typeof createNotificationStyles>;
  onOpen: () => void;
}) {
  const colors = useThemeColors();
  const iconName = (notification.iconName || "heart") as keyof typeof Ionicons.glyphMap;
  const iconColor = notification.iconColor ?? colors.brand.default;
  const iconBg = notification.iconBg ?? colors.brand.muted;
  const opacity = notification.readAt ? 0.85 : 1;

  const accentColor = notification.readAt
    ? colors.border.subtle
    : colors.brand.default;

  return (
    <PressableScale
      style={[styles.cardContainer, { opacity }]}
      onPress={onOpen}
    >
      <View style={styles.notificationRow}>
        <View
          style={[styles.leftAccent, { backgroundColor: accentColor }]}
        />
        <View style={styles.notificationBody}>
          <View
            style={[
              styles.notificationIcon,
              { backgroundColor: iconBg },
            ]}
          >
            <Ionicons name={iconName} size={22} color={iconColor} />
          </View>

          <View style={styles.notificationTextContainer}>
            <AppText style={styles.notificationTitle} numberOfLines={2}>
              {notification.title}
            </AppText>
            <AppText style={styles.notificationTime}>
              {formatRelativeTime(notification.createdAt)}
            </AppText>

            {notification.actionLabel ? (
              <View style={styles.notificationAction}>
                <Ionicons
                  name="chatbubble-outline"
                  size={12}
                  color={colors.text.onBrand}
                />
                <AppText style={styles.notificationActionText}>
                  {notification.actionLabel}
                </AppText>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </PressableScale>
  );
}
