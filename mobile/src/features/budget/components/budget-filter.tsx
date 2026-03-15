import React, { memo } from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { FILTERS } from "./constants";
import { palette } from "@/src/theme";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "@/src/ui-kit";

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 8 },
  scrollContent: { gap: 8, paddingHorizontal: 20 },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pillActive: { borderColor: "transparent" },
  pillInactive: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderColor: "rgba(255,255,255,0.6)",
  },
  gradient: { position: "absolute", inset: 0, borderRadius: 9999 },
});

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
      {active && (
        <LinearGradient
          colors={[palette.violet500, "#9333ea"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      )}
      <AppText
        style={{ fontWeight: "bold", color: active ? "#fff" : palette.zinc600 }}
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
