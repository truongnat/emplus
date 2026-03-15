import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./Text";
import { useThemeColors } from "@/src/theme";

export interface CheckboxProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    label?: string;
    style?: ViewStyle;
}

export function Checkbox({ value, onValueChange, label, style }: CheckboxProps) {
    const colors = useThemeColors();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onValueChange(!value)}
            style={[styles.container, style]}
        >
            <View
                style={[
                    styles.checkbox,
                    {
                        borderColor: value ? colors.brand.default : colors.border.default,
                        backgroundColor: value ? colors.brand.default : "transparent",
                    },
                ]}
            >
                {value && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            {label && (
                <Text style={[styles.label, { color: colors.text.secondary }]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 14,
    },
});
