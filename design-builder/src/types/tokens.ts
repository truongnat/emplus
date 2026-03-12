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

export interface RadiusToken extends Token<number> {
  value: number;
  type: 'borderRadius';
}

export interface Tokens {
  color: {
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
  };
  space: Record<string, SpaceToken>;
  size: Record<string, SpaceToken>;
  radius: Record<string, RadiusToken>;
  zIndex: Record<string, Token<number>>;
  typography: {
    fontFamily: Record<string, Token<string>>;
    fontSize: Record<string, Token<number>>;
    lineHeight: Record<string, Token<number>>;
    fontWeight: Record<string, Token<string>>;
  };
  shadow: Record<string, Token<any>>;
  breakpoint: Record<string, Token<string>>;
}

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
