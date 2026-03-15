import { useState } from "react";
import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppScreen, AppText, AppButton } from "@/src/ui-kit";
import { palette } from "@/src/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: { marginTop: 24, marginBottom: 8, paddingHorizontal: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    textTransform: "uppercase" as "uppercase",
    letterSpacing: 1,
  },
  fieldContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
  },
  fieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.zinc50,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer2: { flex: 1 },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: palette.zinc500,
    marginBottom: 4,
  },
  fieldInput: { fontSize: 15, color: palette.zinc900, padding: 8 },
  divider: { height: 1, backgroundColor: palette.zinc100, marginVertical: 8 },
});

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+84 123 456 789");
  const [birthday, setBirthday] = useState("01/01/1990");

  return (
    <AppScreen>
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color={palette.violet600} />
        <AppText
          style={{ fontSize: 20, fontWeight: "bold", color: palette.zinc900 }}
        >
          Thông tin cá nhân
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <AppText style={styles.sectionLabel}>Thông tin cơ bản</AppText>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Ionicons
                name="person-outline"
                size={20}
                color={palette.zinc600}
              />
            </View>
            <View style={styles.fieldContainer2}>
              <AppText style={styles.fieldLabel}>Họ và tên</AppText>
              <TextInput
                style={styles.fieldInput}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Ionicons name="mail-outline" size={20} color={palette.zinc600} />
            </View>
            <View style={styles.fieldContainer2}>
              <AppText style={styles.fieldLabel}>Email</AppText>
              <TextInput
                style={styles.fieldInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Ionicons name="call-outline" size={20} color={palette.zinc600} />
            </View>
            <View style={styles.fieldContainer2}>
              <AppText style={styles.fieldLabel}>Số điện thoại</AppText>
              <TextInput
                style={styles.fieldInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={palette.zinc600}
              />
            </View>
            <View style={styles.fieldContainer2}>
              <AppText style={styles.fieldLabel}>Ngày sinh</AppText>
              <TextInput
                style={styles.fieldInput}
                value={birthday}
                onChangeText={setBirthday}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <AppButton label="Lưu thay đổi" onPress={() => {}} />
        </View>
      </ScrollView>
    </AppScreen>
  );
}
