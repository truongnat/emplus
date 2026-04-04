import { useState } from "react";
import { View, ScrollView, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, AppText } from "@/src/ui-kit";
import { palette, useThemeColors } from "@/src/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 16, flex: 1 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingText: { fontSize: 15, fontWeight: "bold", color: palette.zinc700 },
  settingSubtext: { fontSize: 13, color: palette.zinc500, marginTop: 2 },
});

export default function NotificationsScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <AppScreen>
      <View style={styles.header}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.brand.default}
        />
        <AppText
          style={{ fontSize: 20, fontWeight: "bold", color: palette.zinc900 }}
        >
          Thông báo
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionLabel}>
          <AppText
            style={{
              fontSize: 13,
              fontWeight: "bold",
              color: palette.zinc500,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Tùy chọn
          </AppText>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color={palette.zinc600}
              />
            </View>
            <View>
              <AppText style={styles.settingText}>Thông báo đẩy</AppText>
              <AppText style={styles.settingSubtext}>
                Thông báo đẩy từ ứng dụng
              </AppText>
            </View>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: palette.zinc300, true: colors.brand.default }}
            thumbColor={colors.text.inverse}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={20} color={palette.zinc600} />
            </View>
            <View>
              <AppText style={styles.settingText}>Thông báo email</AppText>
              <AppText style={styles.settingSubtext}>
                Thông báo qua email
              </AppText>
            </View>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: palette.zinc300, true: colors.brand.default }}
            thumbColor={colors.text.inverse}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={20} color={palette.zinc600} />
            </View>
            <View>
              <AppText style={styles.settingText}>Nhắc nhở</AppText>
              <AppText style={styles.settingSubtext}>
                Nhắc nhở sự kiện quan trọng
              </AppText>
            </View>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: palette.zinc300, true: colors.brand.default }}
            thumbColor={colors.text.inverse}
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
}
