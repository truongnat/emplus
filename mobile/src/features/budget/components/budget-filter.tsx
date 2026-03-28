import React, { memo } from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { FILTERS } from "./constants";
import { AppText } from "@/src/ui-kit";

const FilterPill = memo(
  ({
    label,
    active,
    onPress,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
    >
      <AppText
        style={[styles.pillText, active ? styles.pillTextActive : styles.pillTextInactive]}
      >
        {label}
      </AppText>
    </Pressable>
  ),
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
  },
  pillActive: {
    backgroundColor: "#E48B9B", // rose
    borderColor: "#E48B9B",
    shadowColor: "#E48B9B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pillInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F5F5F4",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "800",
  },
  pillTextActive: {
    color: "#FFFFFF",
  },
  pillTextInactive: {
    color: "#A8A29E",
  },
});
