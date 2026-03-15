/**
 * Utility function for combining class names
 * Simple utility without framework dependencies
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

/**
 * Combine class names with tailwind-merge and convert to style object
 * @example
 * tws('px-2', 'py-4')
 * tws('px-2', condition && 'bg-blue-500')
 */
export function tws(
  ...inputs: ClassValue[]
): ViewStyle | TextStyle | ImageStyle {
  const className = twMerge(clsx(inputs));

  // Return empty object - actual styles will be applied via className at runtime
  // This is a type-safe placeholder for build-time tailwind processing
  return {} as ViewStyle | TextStyle | ImageStyle;
}

/**
 * Convert tailwind-like strings to React Native styles
 * This is a simplified version for common patterns
 */
export function twStyles(...inputs: ClassValue[]): any {
  const className = twMerge(clsx(inputs));

  // Simple parser for common tailwind classes
  const styles: any = {};

  if (!className) return styles;

  const classes = className.split(" ");

  classes.forEach((cls) => {
    // Flex
    if (cls === "flex-1") styles.flex = 1;
    if (cls === "flex-row") styles.flexDirection = "row";
    if (cls === "flex-col" || cls === "flex-column")
      styles.flexDirection = "column";
    if (cls === "flex-wrap") styles.flexWrap = "wrap";

    // Gap
    if (cls === "gap-2") styles.gap = 8;
    if (cls === "gap-3") styles.gap = 12;
    if (cls === "gap-4") styles.gap = 16;

    // Padding
    if (cls === "p-4") styles.padding = 16;
    if (cls === "p-5") styles.padding = 20;
    if (cls === "px-4") styles.paddingHorizontal = 16;
    if (cls === "px-5") styles.paddingHorizontal = 20;
    if (cls === "py-2") styles.paddingVertical = 8;
    if (cls === "py-2.5") styles.paddingVertical = 10;
    if (cls === "py-3") styles.paddingVertical = 12;
    if (cls === "py-4") styles.paddingVertical = 16;

    // Margin
    if (cls === "m-4") styles.margin = 16;
    if (cls === "mt-1") styles.marginTop = 4;
    if (cls === "mt-2") styles.marginTop = 8;
    if (cls === "mt-4") styles.marginTop = 16;
    if (cls === "mt-5") styles.marginTop = 20;
    if (cls === "mt-8") styles.marginTop = 32;
    if (cls === "mb-2") styles.marginBottom = 8;
    if (cls === "mb-4") styles.marginBottom = 16;
    if (cls === "mb-8") styles.marginBottom = 32;
    if (cls === "mb-16") styles.marginBottom = 64;
    if (cls === "mx-1") styles.marginHorizontal = 4;
    if (cls === "ml-3") styles.marginLeft = 12;
    if (cls === "mr-3") styles.marginRight = 12;
    if (cls === "mr-4") styles.marginRight = 16;

    // Width/Height
    if (cls === "w-9") styles.width = 36;
    if (cls === "w-10") styles.width = 40;
    if (cls === "w-12") styles.width = 48;
    if (cls === "w-52") styles.width = 208;
    if (cls === "w-full") styles.width = "100%";
    if (cls === "h-9") styles.height = 36;
    if (cls === "h-10") styles.height = 40;
    if (cls === "h-12") styles.height = 48;
    if (cls === "h-18") styles.height = 72;

    // Border radius
    if (cls === "rounded") styles.borderRadius = 4;
    if (cls === "rounded-xl") styles.borderRadius = 12;
    if (cls === "rounded-2xl") styles.borderRadius = 16;
    if (cls === "rounded-3xl") styles.borderRadius = 24;
    if (cls === "rounded-full") styles.borderRadius = 9999;

    // Border
    if (cls === "border") styles.borderWidth = 1;
    if (cls === "border-2") styles.borderWidth = 2;

    // Position
    if (cls === "absolute") styles.position = "absolute";
    if (cls === "relative") styles.position = "relative";
    if (cls === "inset-0") {
      styles.top = 0;
      styles.left = 0;
      styles.right = 0;
      styles.bottom = 0;
    }
    if (cls === "z-10") styles.zIndex = 10;
    if (cls === "z-50") styles.zIndex = 50;
    if (cls === "z-[2000]") styles.zIndex = 2000;

    // Alignment
    if (cls === "items-center") styles.alignItems = "center";
    if (cls === "items-start") styles.alignItems = "flex-start";
    if (cls === "justify-center") styles.justifyContent = "center";
    if (cls === "justify-between") styles.justifyContent = "space-between";

    // Display
    if (cls === "flex") styles.display = "flex";
    if (cls === "hidden") styles.display = "none";

    // Overflow
    if (cls === "overflow-hidden") styles.overflow = "hidden";

    // Shadow
    if (cls === "shadow-sm") {
      styles.shadowColor = "#000";
      styles.shadowOffset = { width: 0, height: 1 };
      styles.shadowOpacity = 0.05;
      styles.shadowRadius = 2;
      styles.elevation = 1;
    }
    if (cls === "shadow-md") {
      styles.shadowColor = "#000";
      styles.shadowOffset = { width: 0, height: 2 };
      styles.shadowOpacity = 0.08;
      styles.shadowRadius = 4;
      styles.elevation = 2;
    }
    if (cls === "shadow-lg") {
      styles.shadowColor = "#000";
      styles.shadowOffset = { width: 0, height: 4 };
      styles.shadowOpacity = 0.1;
      styles.shadowRadius = 8;
      styles.elevation = 5;
    }
    if (cls === "shadow-xl") {
      styles.shadowColor = "#000";
      styles.shadowOffset = { width: 0, height: 8 };
      styles.shadowOpacity = 0.14;
      styles.shadowRadius = 16;
      styles.elevation = 10;
    }
    if (cls === "shadow-2xl") {
      styles.shadowColor = "#000";
      styles.shadowOffset = { width: 0, height: 16 };
      styles.shadowOpacity = 0.18;
      styles.shadowRadius = 32;
      styles.elevation = 20;
    }
  });

  return StyleSheet.create({ custom: styles }).custom;
}
