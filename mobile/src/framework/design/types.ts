/**
 * Core Theme System Types
 * Clean architecture with separation of concerns
 */

// ============================================================================
// Token Types
// ============================================================================

export type TokenCategory = 'color' | 'space' | 'size' | 'radius' | 'zIndex' | 'typography' | 'shadow' | 'breakpoint';

export interface Token<T = string | number> {
  value: T;
  type?: TokenCategory;
  description?: string;
  deprecated?: boolean;
}

export interface ColorToken extends Token<string> {
  value: string;
  type: 'color';
}

export interface SpaceToken extends Token<number> {
  value: number;
  type: 'spacing';
}

export interface SizeToken extends Token<number> {
  value: number;
  type: 'size';
}

export interface RadiusToken extends Token<number> {
  value: number;
  type: 'borderRadius';
}

export interface ZIndexToken extends Token<number> {
  value: number;
  type: 'zIndex';
}

export interface FontFamilyToken extends Token<string> {
  value: string;
  type: 'fontFamily';
}

export interface FontSizeToken extends Token<number> {
  value: number;
  type: 'fontSize';
}

export interface LineHeightToken extends Token<number> {
  value: number;
  type: 'lineHeight';
}

export interface FontWeightToken extends Token<string> {
  value: string;
  type: 'fontWeight';
}

export interface ShadowValue {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
  color: string;
}

export interface ShadowToken extends Token<ShadowValue> {
  value: ShadowValue;
  type: 'shadow';
}

export interface BreakpointToken extends Token<string> {
  value: string;
  type: 'breakpoint';
}

// ============================================================================
// Token Collections
// ============================================================================

export interface ColorTokens {
  primary: ColorToken;
  primaryDeep: ColorToken;
  primarySoft: ColorToken;
  accent: ColorToken;
  secondary: ColorToken;
  ink: ColorToken;
  muted: ColorToken;
  white: ColorToken;
  black: ColorToken;
  slate: Record<string, ColorToken>;
  semantic: {
    danger: ColorToken;
    success: ColorToken;
    warning: ColorToken;
    info: ColorToken;
  };
  glass: {
    glass: ColorToken;
    glassStrong: ColorToken;
    glassBorder: ColorToken;
  };
}

export interface SpaceTokens {
  none: SpaceToken;
  '3xs': SpaceToken;
  '2xs': SpaceToken;
  xs: SpaceToken;
  sm: SpaceToken;
  md: SpaceToken;
  lg: SpaceToken;
  xl: SpaceToken;
  '2xl': SpaceToken;
  '3xl': SpaceToken;
  '4xl': SpaceToken;
  true: SpaceToken;
}

export interface SizeTokens {
  xs: SizeToken;
  sm: SizeToken;
  md: SizeToken;
  lg: SizeToken;
  xl: SizeToken;
  true: SizeToken;
}

export interface RadiusTokens {
  none: RadiusToken;
  xs: RadiusToken;
  sm: RadiusToken;
  md: RadiusToken;
  lg: RadiusToken;
  xl: RadiusToken;
  '2xl': RadiusToken;
  pill: RadiusToken;
}

export interface ZIndexTokens {
  true: ZIndexToken;
  toast: ZIndexToken;
  modal: ZIndexToken;
}

export interface TypographyTokens {
  fontFamily: {
    heading: FontFamilyToken;
    body: FontFamilyToken;
    mono: FontFamilyToken;
  };
  fontSize: Record<string, FontSizeToken>;
  lineHeight: Record<string, LineHeightToken>;
  fontWeight: Record<string, FontWeightToken>;
}

export interface ShadowTokens {
  sm: ShadowToken;
  md: ShadowToken;
  lg: ShadowToken;
  xl: ShadowToken;
  '2xl': ShadowToken;
  inner: ShadowToken;
}

export interface BreakpointTokens {
  sm: BreakpointToken;
  md: BreakpointToken;
  lg: BreakpointToken;
  xl: BreakpointToken;
  '2xl': BreakpointToken;
}

// ============================================================================
// Complete Token Set
// ============================================================================

export interface Tokens {
  color: ColorTokens;
  space: SpaceTokens;
  size: SizeTokens;
  radius: RadiusTokens;
  zIndex: ZIndexTokens;
  typography: TypographyTokens;
  shadow: ShadowTokens;
  breakpoint: BreakpointTokens;
}

// ============================================================================
// Theme Types
// ============================================================================

export interface ThemeColors {
  background: string;
  backgroundStrong: string;
  backgroundMuted: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderMuted: string;
  primary: string;
  primaryMuted: string;
  accent: string;
  secondary: string;
  danger: string;
  dangerMuted: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  info: string;
  infoMuted: string;
}

export interface Theme {
  name: 'light' | 'dark';
  colors: ThemeColors;
}

export interface Themes {
  light: Theme;
  dark: Theme;
}

// ============================================================================
// Design System Config
// ============================================================================

export interface DesignSystemConfig {
  version: string;
  metadata: {
    name: string;
    description?: string;
    author?: string;
    lastUpdated: string;
  };
  tokens: Tokens;
  themes: Themes;
}

// ============================================================================
// Utility Types
// ============================================================================

export type TokenValue<T extends keyof Tokens, K extends keyof Tokens[T]> = Tokens[T][K] extends Token<infer V> ? V : never;
export type ColorValue = TokenValue<'color', 'primary'>;
export type SpaceValue = TokenValue<'space', 'md'>;
export type RadiusValue = TokenValue<'radius', 'md'>;

// Token reference string (e.g., '$color.primary', '$space.md')
export type TokenRef = `$${string}.${string}`;

// ============================================================================
// CSS Variable Types
// ============================================================================

export interface CSSVariables {
  [key: `--${string}`]: string;
}

export interface ThemeCSSVariables {
  [key: `--theme-${string}`]: string;
}
