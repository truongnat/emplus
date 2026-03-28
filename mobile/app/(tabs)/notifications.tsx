import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppScreen } from "@/src/components/organisms/AppScreen";
import { AppText, PressableScale } from "@/src/ui-kit";
import { useSession } from "@/src/session-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
      iconColor: "#E48B9B",
      iconBg: "#FAF0F2",
      title: "Minh Anh đã gửi cho bạn một nhịp đập yêu thương",
      time: "Vừa xong",
      action: "Phản hồi",
      delay: 100,
      opacity: 1,
    },
    {
      id: "2",
      icon: "wallet",
      iconColor: "#7C3AED",
      iconBg: "#F5F3FF",
      title: "Thanh toán cho 'Tiền đặt cọc địa điểm' đã được phê duyệt",
      time: "2 giờ trước",
      delay: 200,
      opacity: 1,
    },
    {
      id: "3",
      icon: "checkbox-outline",
      iconColor: "#3B82F6",
      iconBg: "#EFF6FF",
      title: "Bạn có nhiệm vụ mới: 'Chọn thực đơn thử món'",
      time: "Hôm qua",
      delay: 300,
      opacity: 0.9,
    },
    {
      id: "4",
      icon: "gift-outline",
      iconColor: "#F59E0B",
      iconBg: "#FFFBEB",
      title: "Còn 142 ngày nữa đến ngày trọng đại!",
      time: "2 ngày trước",
      delay: 400,
      opacity: 0.9,
    },
    {
      id: "5",
      icon: "sparkles-outline",
      iconColor: "#E48B9B",
      iconBg: "#FAF0F2",
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
        {/* Premium Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <AppText style={styles.title}>Thông báo</AppText>
            <AppText style={styles.subtitle}>NHỊP ĐẬP HÔM NAY</AppText>
          </View>

          {/* Refined Status Badge */}
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

        {/* Notifications List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Latest Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <AppText style={styles.sectionTitle}>Mới nhất</AppText>
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
              <AppText style={[styles.sectionTitle, styles.sectionTitleMuted]}>
                Trước đó
              </AppText>
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
    <PressableScale style={styles.cardContainer}>
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
          <AppText style={styles.notificationTitle} numberOfLines={2}>
            {notification.title}
          </AppText>
          <AppText style={styles.notificationTime}>{notification.time}</AppText>

          {notification.action && (
            <View style={styles.notificationAction}>
              <Ionicons name="chatbubble-outline" size={12} color="#FFFFFF" />
              <AppText style={styles.notificationActionText}>
                {notification.action}
              </AppText>
            </View>
          )}
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
});
