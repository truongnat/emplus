import React from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { AppText, PressableScale, pickImage } from "@/src/ui-kit";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/src/theme";

export interface FilterChip {
  id: string;
  label: string;
}

export interface TimelineHeaderProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  filters?: FilterChip[];
}

const DEFAULT_FILTERS: FilterChip[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "chi-phi", label: "Chi phí" },
  { id: "nhiem-vu", label: "Nhiệm vụ" },
  { id: "ky-niem", label: "Kỷ niệm" },
];

export function TimelineHeader({
  activeFilter,
  setActiveFilter,
  filters = DEFAULT_FILTERS,
}: TimelineHeaderProps) {
  const colors = useThemeColors();

  const handleAddMemory = async () => {
    try {
      const asset = await pickImage();
      if (asset) {
        Alert.alert(
          "Thành công",
          `Đã chọn ảnh: ${asset.fileName || "ảnh mới"}`,
        );
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <AppText style={[styles.title, { color: colors.text.primary }]}>
          Dòng thời gian
        </AppText>
        <PressableScale
          onPress={handleAddMemory}
          style={[
            styles.plusButton,
            {
              backgroundColor: colors.surface.default,
              borderColor: colors.border.subtle,
              shadowColor: colors.text.primary,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Thêm kỷ niệm"
        >
          <Ionicons name="add" size={24} color={colors.text.primary} />
        </PressableScale>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      >
        {filters.map((chip) => {
          const isActive = activeFilter === chip.id;
          return (
            <PressableScale
              key={chip.id}
              style={[
                styles.filterChip,
                isActive
                  ? {
                      backgroundColor: colors.background.inverse,
                      borderColor: colors.border.inverse,
                      shadowColor: colors.text.primary,
                    }
                  : {
                      backgroundColor: colors.surface.default,
                      borderColor: colors.border.subtle,
                    },
              ]}
              onPress={() => setActiveFilter(chip.id)}
              scaleTo={0.95}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Lọc ${chip.label}`}
            >
              <AppText
                style={[
                  styles.filterLabel,
                  {
                    color: isActive
                      ? colors.text.inverse
                      : colors.text.tertiary,
                  },
                ]}
              >
                {chip.label}
              </AppText>
            </PressableScale>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 4,
    paddingHorizontal: 20,
    gap: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -1,
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
  },
  filterList: {
    gap: 12,
    paddingRight: 20,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
});
