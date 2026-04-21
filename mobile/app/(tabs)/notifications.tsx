import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Button } from "@/src/components/atoms/Button";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotificationsList,
} from "@/src/presentation/hooks/notifications/useNotifications";
import type { NotificationModule } from "@/src/domain/entities/schemas";
import { syncExpoPushTokenToServer } from "@/src/lib/sync-expo-push-token";
import { useThemeColors } from "@/src/theme";
import { typographyRoles } from "@/src/theme/typography-roles";
import { fontSize } from "@/src/theme/tokens";
import type { SemanticColors } from "@/src/theme/tokens/semantic";
import { EmplusLottie } from "@/src/components/atoms/EmplusLottie";
import { lottieInventory } from "@/src/lottie/inventory";
import { useAuthGridChrome } from "@/src/features/auth/hooks/useAuthGridChrome";
import { loginScreenStyles } from "@/src/features/auth/loginScreen.styles";
import { homeScreenStyles } from "@/src/features/home/homeScreen.styles";
import { scrollPadBottomWithTabBar } from "@/src/core/common/core";
import {
  getPushNotificationsPreference,
} from "@/src/features/notifications/push-notifications-preference";
import {
  getSoloImportantDate,
  type SoloImportantDateDraft,
} from "@/src/features/home/solo-important-date";

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

function getSoloCountdown(iso: string) {
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

  const daysLeft = Math.round((next.getTime() - today.getTime()) / 86_400_000);
  if (daysLeft <= 0) return "Hôm nay";
  if (daysLeft === 1) return "Còn 1 ngày";
  return `Còn ${daysLeft} ngày`;
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
      paddingHorizontal: 20,
      paddingTop: 4,
      paddingBottom: 12,
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
      paddingVertical: 5,
      borderRadius: 12,
      backgroundColor: c.surface.default,
      borderWidth: 1,
      borderColor: c.border.subtle,
    },
    markAllText: {
      fontSize: 12,
      fontWeight: "500",
      color: c.text.secondary,
    },
    title: {
      color: c.text.primary,
    },
    subtitle: {
      color: c.text.tertiary,
      marginTop: 4,
      lineHeight: 18,
    },
    scrollContent: {
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 12,
      paddingHorizontal: 4,
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
      fontSize: 12,
      fontWeight: "500",
      color: c.text.secondary,
      letterSpacing: 0.1,
    },
    sectionTitleMuted: {
      color: c.text.tertiary,
    },
    cardContainer: {
      backgroundColor: c.surface.default,
      borderRadius: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.border.subtle,
      overflow: "hidden",
    },
    notificationRow: {
      flexDirection: "row",
      alignItems: "stretch",
      minHeight: 80,
    },
    leftAccent: {
      width: 4,
    },
    notificationBody: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 12,
    },
    notificationIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationTextContainer: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: c.text.primary,
      lineHeight: 19,
    },
    notificationTime: {
      fontSize: 11,
      fontWeight: "500",
      color: c.text.tertiary,
      letterSpacing: 0.1,
      marginTop: 3,
    },
    notificationAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: c.brand.muted,
      borderRadius: 999,
      marginTop: 8,
    },
    notificationActionText: {
      fontSize: 12,
      fontWeight: "500",
      color: c.brand.text,
    },
    centered: {
      paddingVertical: 40,
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
      fontWeight: "500",
    },
    /** Fills scroll area so cat + copy sit vertically centered when list is empty */
    emptyStateContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    /** Cat playing animation — source 1070×456 */
    emptyCatLottie: {
      width: 272,
      height: 116,
    },
    emptyTitle: {
      marginTop: 10,
      fontSize: 17,
      fontWeight: "500",
      color: c.text.primary,
      textAlign: "center",
    },
    emptySub: {
      marginTop: 8,
      fontSize: 14,
      color: c.text.tertiary,
      textAlign: "center",
      lineHeight: 20,
    },
    soloReminderCard: {
      width: "100%",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border.subtle,
      backgroundColor: c.surface.default,
      padding: 16,
      gap: 10,
      marginTop: 16,
    },
    soloReminderHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    soloReminderBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: c.brand.muted,
    },
    soloReminderBadgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: c.brand.text,
    },
    soloReminderTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: c.text.primary,
      lineHeight: 21,
    },
    soloReminderMeta: {
      fontSize: 13,
      fontWeight: "500",
      color: c.text.secondary,
    },
    soloReminderBody: {
      fontSize: 13,
      lineHeight: 19,
      color: c.text.secondary,
    },
  });
}

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, session } = useSession();
  const colors = useThemeColors();
  const styles = useMemo(() => createNotificationStyles(colors), [colors]);
  useAuthGridChrome(false, colors.background.default, true);
  const [soloImportantDate, setSoloImportantDate] =
    useState<SoloImportantDateDraft | null>(null);
  const [pushPreferenceEnabled, setPushPreferenceEnabled] = useState(true);
  const isPaired = Boolean(session?.user?.coupleId);

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

  useFocusEffect(
    useCallback(() => {
      let alive = true;

      void getPushNotificationsPreference().then((enabled) => {
        if (alive) {
          setPushPreferenceEnabled(enabled);
        }
      });

      if (!isAuthenticated || isPaired) {
        setSoloImportantDate(null);
        return () => {
          alive = false;
        };
      }

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
      <StatusBar style="dark" />
      <View style={homeScreenStyles.layerRoot}>
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
                { fontSize: fontSize.xs, fontFamily: typographyRoles.body.fontFamily },
              ]}
            >
              Những gì cần chú ý
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
            <AppText style={styles.hint}>Đang chuẩn bị thông báo…</AppText>
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
                  Chưa có gì mới
                </AppText>
                <AppText style={styles.emptySub}>
                  Khi có nhắc nhở hoặc cập nhật mới, bạn sẽ thấy ở đây.
                </AppText>

                {!isPaired && soloImportantDate ? (
                  <View style={styles.soloReminderCard}>
                    <View style={styles.soloReminderHeader}>
                      <View style={styles.soloReminderBadge}>
                        <AppText style={styles.soloReminderBadgeText}>
                          {getSoloCountdown(soloImportantDate.memoryDate) ?? "Sắp tới"}
                        </AppText>
                      </View>
                      <Ionicons
                        name={
                          pushPreferenceEnabled
                            ? "notifications-outline"
                            : "notifications-off-outline"
                        }
                        size={20}
                        color={colors.brand.default}
                      />
                    </View>

                    <AppText style={styles.soloReminderTitle}>
                      {soloImportantDate.title}
                    </AppText>
                    <AppText style={styles.soloReminderMeta}>
                      {new Date(soloImportantDate.memoryDate).toLocaleDateString("vi-VN")}
                    </AppText>
                    <AppText style={styles.soloReminderBody}>
                      {pushPreferenceEnabled
                        ? "Thông báo đã sẵn sàng. Giữ nó bật để Em+ nhắc bạn trước mốc này."
                        : "Bạn đã có một mốc quan trọng. Bật thông báo để Em+ có thể nhắc bạn đúng lúc."}
                    </AppText>

                    <Button
                      label={
                        pushPreferenceEnabled
                          ? "Xem cài đặt thông báo"
                          : "Bật thông báo"
                      }
                      fullWidth
                      variant={pushPreferenceEnabled ? "neutralOutline" : "primary"}
                      onPress={() => router.push("/profile-details/notifications")}
                      accessibilityLabel="Mở cài đặt thông báo"
                    />
                  </View>
                ) : null}
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
                      Gần đây
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
                        Cũ hơn
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
