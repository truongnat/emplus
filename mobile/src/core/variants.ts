import { useMemo } from "react";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useTheme } from "../theme";

type Style = ViewStyle | TextStyle | ImageStyle;

export type VariantConfig<V extends Record<string, string>> = {
  base?: Style;
  variants: { [K in keyof V]: { [Val in V[K]]: Style } };
  compoundVariants?: Array<Partial<V> & { style: Style }>;
  defaultVariants?: Partial<V>;
};

/**
 * createVariants — performance-critical variant resolver.
 * Merges base styles, active variants, and compound variants.
 * Output is a flattened StyleSheet object.
 */
export function createVariants<V extends Record<string, string>>(
  configFn: (theme: ReturnType<typeof useTheme>) => VariantConfig<V>,
) {
  return function useVariants(props: Partial<V>): Style {
    const theme = useTheme();

    return useMemo(() => {
      const config = configFn(theme);

      // Merge defaultVariants + props
      const resolved = { ...config.defaultVariants, ...props } as unknown as V;

      let styles: Style[] = [];
      if (config.base) styles.push(config.base);

      // Apply variant styles
      for (const [key, value] of Object.entries(resolved)) {
        const variantStyles = config.variants[key as keyof V];
        if (variantStyles && variantStyles[value as V[keyof V]]) {
          styles.push(variantStyles[value as V[keyof V]]);
        }
      }

      // Apply compound variants
      config.compoundVariants?.forEach(({ style, ...conditions }) => {
        const matches = Object.entries(conditions).every(
          ([k, v]) => resolved[k as keyof V] === v,
        );
        if (matches) styles.push(style);
      });

      return StyleSheet.flatten(styles);
    }, [theme, props]);
  };
}
