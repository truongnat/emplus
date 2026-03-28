import React, { useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

export default function NotificationsScreen() {
  const { session, isAuthenticated } = useSession();
  const { data, isPending, isError, error, refetch } = useNotificationsList();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  useEffect(() => {
    if (!isAuthenticated) return;
    void syncExpoPushTokenToServer().catch(() => {});
  }, [isAuthenticated]);

  const partnerName = useMemo(() => {
    return !!session?.user?.coupleId ? "Leo" : "Bạn đồng hành";
  }, [session?.user?.coupleId]);

  const items = data?.items ?? [];
  const hasUnread = items.some((n) => !n.readAt);

  const latest = items.slice(0, 2);
  const previous = items.slice(2);

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AppText style={styles.title}>Thông báo</AppText>
            <AppText style={styles.subtitle}>NHỊP ĐẬP HÔM NAY</AppText>
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
            <View style={styles.statusBadge}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    color="#A8A29E"
                  />
                </View>
                <View style={styles.statusDot} />
              </View>
              <View style={styles.badgeTextContainer}>
                <AppText style={styles.badgeLabel}>
                  {partnerName.toUpperCase()} ĐANG
                </AppText>
                <AppText style={styles.badgeValue}>bình tĩnh</AppText>
              </View>
            </View>
          </View>
        </View>

        {isPending && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#E48B9B" />
            <AppText style={styles.hint}>Đang tải thông báo…</AppText>
          </View>
        )}

        {isError && (
          <View style={styles.centered}>
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
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {items.length === 0 ? (
              <View style={styles.centered}>
                <Ionicons
                  name="notifications-off-outline"
                  size={48}
                  color="#D6D3D1"
                />
                <AppText style={styles.emptyTitle}>Chưa có thông báo</AppText>
                <AppText style={styles.emptySub}>
                  Khi có hoạt động mới, bạn sẽ thấy tại đây.
                </AppText>
              </View>
            ) : (
              <>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionDot} />
                    <AppText style={styles.sectionTitle}>Mới nhất</AppText>
                  </View>
                  {latest.map((n) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
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
                        style={[styles.sectionTitle, styles.sectionTitleMuted]}
                      >
                        Trước đó
                      </AppText>
                    </View>
                    {previous.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
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
    </AppScreen>
  );
}

function NotificationCard({
  notification,
  onOpen,
}: {
  notification: NotificationModule.InAppNotification;
  onOpen: () => void;
}) {
  const iconName = (notification.iconName || "heart") as keyof typeof Ionicons.glyphMap;
  const iconColor = notification.iconColor ?? "#E48B9B";
  const iconBg = notification.iconBg ?? "#FAF0F2";
  const opacity = notification.readAt ? 0.85 : 1;

  return (
    <PressableScale
      style={styles.cardContainer}
      onPress={onOpen}
    >
      <View
        style={[styles.notificationContent, { opacity }]}
      >
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
              <Ionicons name="chatbubble-outline" size={12} color="#FFFFFF" />
              <AppText style={styles.notificationActionText}>
                {notification.actionLabel}
              </AppText>
            </View>
          ) : null}
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  markAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#FFF1F2",
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#E48B9B",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1C1917",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#A8A29E",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingLeft: 4,
    paddingRight: 16,
    paddingVertical: 4,
    gap: 10,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FAF7F6",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#10B981",
  },
  badgeTextContainer: {
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#A8A29E",
    letterSpacing: 1,
  },
  badgeValue: {
    fontSize: 11,
    fontWeight: "900",
    color: "#44403C",
    textTransform: "lowercase",
    marginTop: -2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 160,
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
    backgroundColor: "#E48B9B",
  },
  sectionDotMuted: {
    backgroundColor: "#D6D3D1",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#E48B9B",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sectionTitleMuted: {
    color: "#A8A29E",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F5F5F4",
    shadowColor: "#1C1917",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  notificationContent: {
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
    color: "#1C1917",
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 11,
    fontWeight: "800",
    color: "#A8A29E",
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
    backgroundColor: "#E48B9B",
    borderRadius: 12,
    marginTop: 10,
  },
  notificationActionText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  centered: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    marginTop: 12,
    color: "#A8A29E",
    fontSize: 14,
  },
  errorText: {
    color: "#B91C1C",
    textAlign: "center",
    marginBottom: 12,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E48B9B",
    borderRadius: 16,
  },
  retryText: {
    color: "#fff",
    fontWeight: "800",
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: "#44403C",
  },
  emptySub: {
    marginTop: 8,
    fontSize: 14,
    color: "#A8A29E",
    textAlign: "center",
  },
});
