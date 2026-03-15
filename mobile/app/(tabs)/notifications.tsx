import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { Text } from "@/src/components/atoms/Text";
import { Card } from "@/src/components/molecules/Card";
import { palette } from "@/src/theme/tokens";
import { useSession } from "@/src/session-context";

interface NotificationItem {
  id: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  time: string;
  action?: string;
  delay: number;
  opacity: number;
}

export default function NotificationsScreen() {
  const { session } = useSession();

  const partnerName = useMemo(() => {
    return !!session?.user?.coupleId ? "Leo" : "Bạn đồng hành";
  }, [!!session?.user?.coupleId]);

  const notifications: NotificationItem[] = [
    {
      id: "1",
      icon: "heart",
      iconColor: palette.violet600,
      iconBg: `${palette.violet600}15`,
      title: "Minh Anh đã gửi cho bạn một nhịp đập yêu thương",
      time: "Vừa xong",
      action: "Phản hồi",
      delay: 100,
      opacity: 1,
    },
    {
      id: "2",
      icon: "wallet",
      iconColor: palette.violet500,
      iconBg: `${palette.violet500}15`,
      title: "Thanh toán cho 'Tiền đặt cọc địa điểm' đã được phê duyệt",
      time: "2 giờ trước",
      delay: 200,
      opacity: 1,
    },
    {
      id: "3",
      icon: "checkbox-outline",
      iconColor: palette.blue500,
      iconBg: `${palette.blue500}15`,
      title: "Bạn có nhiệm vụ mới: 'Chọn thực đơn thử món'",
      time: "Hôm qua",
      delay: 300,
      opacity: 0.9,
    },
    {
      id: "4",
      icon: "gift-outline",
      iconColor: palette.amber500,
      iconBg: `${palette.amber500}15`,
      title: "Còn 142 ngày nữa đến ngày trọng đại!",
      time: "2 ngày trước",
      delay: 400,
      opacity: 0.9,
    },
    {
      id: "5",
      icon: "sparkles-outline",
      iconColor: palette.violet600,
      iconBg: `${palette.violet600}15`,
      title:
        "Gợi ý phong cách hoa cưới dựa trên cấu trúc pha lê của bạn đã sẵn sàng",
      time: "3 ngày trước",
      delay: 500,
      opacity: 0.8,
    },
  ];

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Thông báo</Text>
            <Text style={styles.subtitle}>NHỊP ĐẬP HÔM NAY</Text>
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons
                  name="person-circle-outline"
                  size={28}
                  color={palette.zinc400}
                />
              </View>
              <View style={styles.statusDot} />
            </View>
            <View style={styles.badgeTextContainer}>
              <Text style={styles.badgeLabel}>
                {partnerName.toUpperCase()} ĐANG
              </Text>
              <Text style={styles.badgeValue}>bình tĩnh</Text>
            </View>
          </View>
        </View>

        {/* Notifications List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Latest Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Mới nhất</Text>
            </View>

            {notifications.slice(0, 2).map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </View>

          {/* Previous Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, styles.sectionDotMuted]} />
              <Text style={[styles.sectionTitle, styles.sectionTitleMuted]}>
                Trước đó
              </Text>
            </View>

            {notifications.slice(2).map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
}

function NotificationCard({
  notification,
}: {
  notification: NotificationItem;
}) {
  return (
    <Card style={styles.notificationCard}>
      <View
        style={[styles.notificationContent, { opacity: notification.opacity }]}
      >
        <View
          style={[
            styles.notificationIcon,
            { backgroundColor: notification.iconBg },
          ]}
        >
          <Ionicons
            name={notification.icon as any}
            size={22}
            color={notification.iconColor}
          />
        </View>

        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle} numberOfLines={2}>
            {notification.title}
          </Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>

          {notification.action && (
            <View style={styles.notificationAction}>
              <Ionicons name="chatbubble-outline" size={14} color="#fff" />
              <Text style={styles.notificationActionText}>
                {notification.action}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: palette.zinc900,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc400,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 9999,
    paddingLeft: 4,
    paddingRight: 16,
    paddingVertical: 4,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#f1f5f9",
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
    borderColor: "#fff",
    backgroundColor: "#22c55e",
  },
  badgeTextContainer: {
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: palette.zinc400,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  badgeValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: palette.zinc800,
    marginTop: -4,
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
    paddingHorizontal: 4,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.violet600,
  },
  sectionDotMuted: {
    backgroundColor: palette.zinc400,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.violet600,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  sectionTitleMuted: {
    color: palette.zinc400,
  },
  notificationCard: {
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 16,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationTextContainer: {
    flex: 1,
    gap: 2,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc800,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc400,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  notificationAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: palette.violet600,
    borderRadius: 12,
    marginTop: 8,
  },
  notificationActionText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
});
