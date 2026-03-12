import React, { memo } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { FILTERS } from "./constants";
import { palette } from "@/src/theme";
import { LinearGradient } from "expo-linear-gradient";
import { tws } from "@/src/utils/tws";
import { AppText } from "@/src/ui-kit";

const FilterPill = memo(({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
    <Pressable
        onPress={onPress}
        style={tws(
            "px-5 py-2.5 rounded-full border justify-center items-center",
            active ? "border-transparent shadow-md shadow-secondary/30" : "bg-white/40 border-white/60"
        )}
    >
        {active && (
            <LinearGradient
                colors={[(palette as any).secondary, '#9333ea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={tws("absolute inset-0 rounded-full")}
            />
        )}
        <AppText variant="bodyBold" color={active ? "white" : "slate-600"}>
            {label}
        </AppText>
    </Pressable>
));

export default function BudgetFilter({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (label: string) => void }) {
    return (
        <View style={tws("mt-5 mb-2")}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tws("gap-2 px-5")}
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