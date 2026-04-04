/**
 * Input — form field (Em Plus design system, không RNUI).
 */

import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import {
  emplusFocusBorder,
  emplusFormSpacing,
  emplusInputHeight,
  emplusInputRadiusPx,
  type EmplusInputSize,
} from "@/src/theme/emplus-design-tokens";
import { useThemeColors } from "@/src/theme";
import { useThemeMode } from "@/src/theme/theme-mode-context";

export type InputSize = EmplusInputSize;

export type InputProps = Omit<TextInputProps, "onChange"> & {
  label?: string;
  error?: string;
  helperText?: string;
  /** Kích thước chiều cao field. */
  size?: InputSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  /** Alias cùng RNUI cũ. */
  leadingElement?: ReactNode;
  trailingElement?: ReactNode;
  containerStyle?: ViewStyle;
  /** Gọi khi user gõ lần đầu sau khi có lỗi (xoá trạng thái lỗi API). */
  onClearError?: () => void;
  /** RHF / RNUI: field.onChange nhận chuỗi — map sang onChangeText. */
  onChange?: (text: string) => void;
  /** Mặc định viền mảnh; soft = nền filled, không viền đến khi focus (form auth hiện đại). */
  variant?: "default" | "soft";
  /** Ghi đè màu label (vd. màn login Figma #2C3E50). */
  labelColor?: string;
  /** Ghi đè nền/viền idle cho variant soft (vd. rgba + viền mảnh). */
  softSurface?: {
    backgroundColor: string;
    borderColor?: string;
  };
  /** Bo góc ô nhập (mặc định `emplusInputRadiusPx`). */
  inputRadiusPx?: number;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    size = "md",
    leftElement,
    rightElement,
    leadingElement,
    trailingElement,
    containerStyle,
    style,
    onChange,
    onChangeText,
    onClearError,
    onFocus,
    onBlur,
    variant = "default",
    labelColor,
    softSurface,
    inputRadiusPx,
    ...rest
  },
  ref,
) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const [focused, setFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const lead = leadingElement ?? leftElement;
  const trail = trailingElement ?? rightElement;

  useEffect(() => {
    if (!error) setHasTyped(false);
  }, [error]);

  const focusColor = isDark ? emplusFocusBorder.dark : emplusFocusBorder.light;

  const { labelStyle, inputTextStyle, fieldHeight, fontSize } = useMemo(() => {
    const fs =
      size === "lg" ? 16 : size === "sm" ? 14 : 15;
    const labelFs = size === "lg" ? 15 : size === "sm" ? 14 : 15;
    return {
      labelStyle: {
        fontFamily: "BeVietnamPro_500Medium",
        fontSize: labelFs,
        fontWeight: "normal",
        color: labelColor ?? colors.text.secondary,
        letterSpacing: 0.15,
      } satisfies TextStyle,
      inputTextStyle: {
        fontFamily: "BeVietnamPro_400Regular",
        fontSize: fs,
        fontWeight: "normal",
        color: colors.text.primary,
        ...(Platform.OS === "android" ? { textAlignVertical: "center" as const } : {}),
      } satisfies TextStyle,
      /** Cố định chiều cao hàng — email và mật khẩu luôn bằng nhau. */
      fieldHeight: emplusInputHeight[size],
      fontSize: fs,
    };
  }, [colors.text.primary, colors.text.secondary, labelColor, size]);

  const ring = useMemo(() => {
    if (error) {
      return {
        borderColor: colors.status.error.border,
        borderWidth: 1.5,
      };
    }
    if (focused) {
      return {
        borderColor: focusColor,
        borderWidth: variant === "soft" ? 2 : 1.5,
      };
    }
    if (variant === "soft") {
      if (softSurface?.borderColor) {
        return {
          borderColor: softSurface.borderColor,
          borderWidth: 1,
        };
      }
      return {
        borderColor: "transparent",
        borderWidth: 0,
      };
    }
    return {
      borderColor: colors.border.default,
      borderWidth: 1.5,
    };
  }, [
    colors.border.default,
    colors.status.error.border,
    error,
    focused,
    focusColor,
    variant,
    softSurface?.borderColor,
  ]);

  const handleChangeText = useCallback(
    (text: string) => {
      if (!hasTyped && text.length > 0) {
        setHasTyped(true);
        onClearError?.();
      }
      onChangeText?.(text);
      onChange?.(text);
    },
    [hasTyped, onChange, onChangeText, onClearError],
  );

  const bg = useMemo(() => {
    if (variant === "soft") {
      if (softSurface?.backgroundColor) {
        return softSurface.backgroundColor;
      }
      return isDark ? "rgba(255, 255, 255, 0.07)" : "#F3F3F5";
    }
    return isDark ? colors.surface.sunken : colors.surface.default;
  }, [
    isDark,
    colors.surface.sunken,
    colors.surface.default,
    variant,
    softSurface?.backgroundColor,
  ]);

  const radiusPx = inputRadiusPx ?? emplusInputRadiusPx;

  return (
    <View style={[styles.container, containerStyle]} collapsable={false}>
      <View
        style={[
          styles.fieldBlock,
          { gap: emplusFormSpacing.labelToField },
        ]}
      >
        {label ? <Text style={labelStyle}>{label}</Text> : null}
        <View
          style={[
            styles.inputOuter,
            {
              backgroundColor: bg,
              borderRadius: radiusPx,
              height: fieldHeight,
              paddingVertical: 0,
              paddingHorizontal: 16,
            },
            ring,
          ]}
        >
          {lead ? <View style={styles.lead}>{lead}</View> : null}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              inputTextStyle,
              lead ? styles.inputPadLead : null,
              trail ? styles.inputPadTrail : null,
              style,
            ]}
            placeholderTextColor={
              isDark ? colors.text.tertiary : colors.text.secondary
            }
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onChangeText={handleChangeText}
            accessibilityLabel={label ?? rest.accessibilityLabel}
            {...rest}
          />
          {trail ? <View style={styles.trail}>{trail}</View> : null}
        </View>
      </View>
      {error ? (
        <Text
          style={[
            styles.errorText,
            styles.messageBelowField,
            { color: colors.status.error.text },
          ]}
        >
          {error}
        </Text>
      ) : helperText ? (
        <Text
          style={[
            styles.helperText,
            styles.messageBelowField,
            { color: colors.text.tertiary },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  fieldBlock: {
    width: "100%",
  },
  messageBelowField: {
    marginTop: 6,
  },
  inputOuter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    padding: 0,
    margin: 0,
    ...(Platform.OS === "ios" ? { paddingVertical: 0 } : {}),
  },
  inputPadLead: {
    marginLeft: 8,
  },
  inputPadTrail: {
    marginRight: 8,
  },
  lead: {
    justifyContent: "center",
    alignItems: "center",
  },
  trail: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 13,
    fontWeight: "500",
  },
  helperText: {
    fontSize: 13,
  },
});
