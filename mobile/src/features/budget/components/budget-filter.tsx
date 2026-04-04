import React, { memo } from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { FILTERS } from "./constants";
import { AppText } from "@/src/ui-kit";
import { useThemeColors } from "@/src/theme";

const FilterPill = memo(
  ({
    label,
    active,
    onPress,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
  }) => {
    const colors = useThemeColors();
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={`Lọc ${label}`}
        style={[
          styles.pill,
          active
            ? {
                backgroundColor: colors.brand.default,
                borderColor: colors.brand.default,
                shadowColor: colors.brand.default,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              }
            : {
                backgroundColor: colors.surface.default,
                borderColor: colors.border.subtle,
                shadowOpacity: 0,
                elevation: 0,
              },
        ]}
      >
        <AppText
          style={[
            styles.pillText,
            {
              color: active ? colors.text.onBrand : colors.text.tertiary,
            },
          ]}
        >
          {label}
        </AppText>
      </Pressable>
    );
  },
);

export default function BudgetFilter({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (label: string) => void;
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map((label) => (
          <FilterPill
            key={label}
            label={label}
            active={activeFilter === label}
            onPress={() => onFilterChange(label)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 8,
  },
  scrollContent: {
    gap: 10,
    paddingHorizontal: 24,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
  },
  pillText: {
    fontSize: 13,
    fontWeight: "800",
  },
});
