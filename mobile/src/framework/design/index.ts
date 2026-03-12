/**
 * Design System Components Index
 * Re-exports all design system components, tokens, and utilities
 */

// Core Components
export { Box, AppText, Button, Input, Card, Spinner } from './ui-kit';
export type {
  BoxProps,
  AppTextProps,
  ButtonProps,
  InputProps,
  CardProps,
  SpinnerProps,
} from './ui-kit';

// Shadcn-style Components
export { Avatar } from './components/Avatar';
export { Badge } from './components/Badge';
export { Alert } from './components/Alert';
export { Separator } from './components/Separator';
export { Skeleton } from './components/Skeleton';
export { Switch } from './components/Switch';

// Theme System
export { ThemeProvider, useTheme, useIsDark, useThemedColor, useThemeVariables, withTheme } from './theme-provider';
export { DesignProvider } from './design-provider';

// Tokens & Themes
export { tokens } from './tokens';
export { themes, getTheme, getThemeCSSVariables } from './themes';

// Types
export type {
  Tokens,
  Token,
  ColorToken,
  SpaceToken,
  SizeToken,
  RadiusToken,
  Theme,
  Themes,
  ThemeColors,
  DesignSystemConfig,
} from './types';

// Utilities
export {
  getToken,
  getColor,
  getSpace,
  getRadius,
  getTokenCSSVar,
  generateTokenCSSVariables,
  generateThemeCSSVariables,
  getCSSVariablesStyle,
  getShadowStyle,
  getRadiusStyle,
  combineStyles,
  useToken,
  useColor,
  useSpace,
  useRadius,
  useCSSVariables,
} from './utils';
