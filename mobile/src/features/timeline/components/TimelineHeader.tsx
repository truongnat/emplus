import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AppText, PressableScale } from "@/src/ui-kit";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors, useThemeMode } from "@/src/theme";
import {
  homeDarkChromeButton,
  homeDarkGridCard,
} from "@/src/theme/emplus-design-tokens";
import { typographyRoles } from "@/src/theme/typography-roles";

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
  const { isDark } = useThemeMode();
  const router = useRouter();

  const handleAddMemory = () => {
    router.push("/add-memory");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <AppText
          accessibilityRole="header"
          style={[
            typographyRoles.title,
            styles.title,
            {
              color: colors.text.primary,
              fontFamily: typographyRoles.display.fontFamily,
            },
          ]}
        >
          Dòng thời gian
        </AppText>
        <PressableScale
          onPress={handleAddMemory}
          style={[
            styles.plusButton,
            isDark
              ? {
                  backgroundColor: homeDarkChromeButton.backgroundColor,
                  borderColor: homeDarkChromeButton.borderColor,
                  shadowColor: "#000",
                }
              : {
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
                  ? isDark
                    ? {
                        backgroundColor: colors.interactive.primary,
                        borderColor: "rgba(255, 255, 255, 0.22)",
                        shadowColor: "#000",
                      }
                    : {
                        backgroundColor: colors.background.inverse,
                        borderColor: colors.border.inverse,
                        shadowColor: colors.text.primary,
                      }
                  : isDark
                    ? {
                        backgroundColor: homeDarkGridCard.backgroundColor,
                        borderColor: homeDarkGridCard.borderColor,
                        shadowColor: "#000",
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
                      ? isDark
                        ? colors.text.onBrand
                        : colors.text.inverse
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
  /** Safe area top do màn tab bọc ngoài; giữ sát với Thông báo. */
  container: {
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 22,
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    letterSpacing: -0.5,
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
    paddingRight: 22,
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
