import React, { forwardRef, ReactElement } from "react";
import { useTheme, Theme } from "../theme";
import { createVariants, VariantConfig } from "./variants";

export type VariantConfigFn<V extends Record<string, string>> = (
  theme: Theme,
) => VariantConfig<V>;

export interface ComponentConfig<
  BaseProps extends object,
  V extends Record<string, string> = {},
> {
  displayName: string;
  variantsFn?: VariantConfigFn<V>;
  defaultProps?: Partial<BaseProps & Partial<V>>;
  render: (
    props: BaseProps & V & { theme: Theme; variantStyle?: any },
    ref: any,
  ) => ReactElement;
}

/**
 * createComponent — Factory pattern for building design system components.
 * Supports variants, themes, and easy extension via .extend().
 */
export function createComponent<
  BaseProps extends object,
  V extends Record<string, string> = {},
>(config: ComponentConfig<BaseProps, V>) {
  const useVariants = config.variantsFn
    ? createVariants(config.variantsFn)
    : null;

  const Component: any = forwardRef<any, BaseProps & Partial<V>>(
    (props, ref) => {
      const theme = useTheme();
      const mergedProps = { ...config.defaultProps, ...props } as BaseProps &
        Partial<V>;

      // Resolve variants if config exists
      const variantStyle = useVariants
        ? useVariants(mergedProps as Partial<V>)
        : undefined;

      return config.render({ ...mergedProps, theme, variantStyle } as any, ref);
    },
  );

  Component.displayName = config.displayName;

  /**
   * .extend() — Create a new component based on this one with different default props.
   */
  Component.extend = (overrideConfig: Partial<ComponentConfig<BaseProps, V>>) =>
    createComponent({ ...config, ...overrideConfig } as ComponentConfig<
      BaseProps,
      V
    >);

  return Component;
}
