/**
 * Input - Form input component
 */

import React, { forwardRef, ReactNode } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { palette } from "@/src/theme/tokens";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, leftElement, rightElement, containerStyle, style, ...props },
  ref,
) {
  return (
    <View style={[styles.container, containerStyle]} collapsable={false}>

      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
        <TextInput
          ref={ref}
          style={
            [
              styles.input,
              leftElement && styles.inputWithLeft,
              rightElement && styles.inputWithRight,
              style,
            ].filter(Boolean) as any
          }
          placeholderTextColor={palette.zinc400}
          {...props}
        />
        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: palette.zinc700,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.zinc50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.zinc200,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  inputError: {
    borderColor: palette.red500,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: palette.zinc900,
    padding: 0,
  },
  inputWithLeft: {
    marginLeft: 8,
  },
  inputWithRight: {
    marginRight: 8,
  },
  leftElement: {
    marginRight: 8,
  },
  rightElement: {
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 13,
    color: palette.red500,
  },
});
