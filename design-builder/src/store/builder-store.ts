import { create } from 'zustand';
import type { DesignSystemConfig, TokenCategory } from '../types/tokens';

interface BuilderStore {
  config: DesignSystemConfig;
  activeCategory: TokenCategory;
  selectedToken: string | null;
  isDirty: boolean;
  previewTheme: 'light' | 'dark';
  setConfig: (config: DesignSystemConfig) => void;
  setActiveCategory: (category: TokenCategory) => void;
  setSelectedToken: (tokenPath: string | null) => void;
  updateToken: (path: string, value: any, description?: string) => void;
  deleteToken: (path: string) => void;
  resetToDefaults: () => void;
  setPreviewTheme: (theme: 'light' | 'dark') => void;
  markClean: () => void;
}

const defaultConfig: DesignSystemConfig = {
  version: '1.0.0',
  metadata: {
    name: 'EmPlus Design System',
    description: 'Custom design tokens for EmPlus mobile app',
    author: 'EmPlus Team',
    lastUpdated: new Date().toISOString(),
  },
  tokens: {
    color: {
      primary: { value: '#ec1334', type: 'color' },
      primaryDeep: { value: '#9f1239', type: 'color' },
      primarySoft: { value: '#ffe4e6', type: 'color' },
      accent: { value: '#2563eb', type: 'color' },
      secondary: { value: '#7B61FF', type: 'color' },
      ink: { value: '#0f172a', type: 'color' },
      muted: { value: '#64748b', type: 'color' },
      white: { value: '#ffffff', type: 'color' },
      black: { value: '#000000', type: 'color' },
      slate: {
        '50': { value: '#f8fafc', type: 'color' },
        '100': { value: '#f1f5f9', type: 'color' },
        '200': { value: '#e2e8f0', type: 'color' },
        '300': { value: '#cbd5e1', type: 'color' },
        '400': { value: '#94a3b8', type: 'color' },
        '500': { value: '#64748b', type: 'color' },
        '600': { value: '#475569', type: 'color' },
        '700': { value: '#334155', type: 'color' },
        '800': { value: '#1e293b', type: 'color' },
        '900': { value: '#0f172a', type: 'color' },
      },
      semantic: {
        danger: { value: '#ef4444', type: 'color' },
        success: { value: '#10b981', type: 'color' },
        warning: { value: '#f59e0b', type: 'color' },
        info: { value: '#3b82f6', type: 'color' },
      },
      glass: {
        glass: { value: 'rgba(255, 255, 255, 0.4)', type: 'color' },
        glassStrong: { value: 'rgba(255, 255, 255, 0.6)', type: 'color' },
        glassBorder: { value: 'rgba(255, 255, 255, 0.5)', type: 'color' },
      },
    },
    space: {
      none: { value: 0, type: 'spacing' },
      '3xs': { value: 2, type: 'spacing' },
      '2xs': { value: 4, type: 'spacing' },
      xs: { value: 8, type: 'spacing' },
      sm: { value: 12, type: 'spacing' },
      md: { value: 16, type: 'spacing' },
      lg: { value: 24, type: 'spacing' },
      xl: { value: 32, type: 'spacing' },
      '2xl': { value: 40, type: 'spacing' },
      '3xl': { value: 48, type: 'spacing' },
      '4xl': { value: 64, type: 'spacing' },
      true: { value: 16, type: 'spacing' },
    },
    size: {
      xs: { value: 28, type: 'spacing' },
      sm: { value: 36, type: 'spacing' },
      md: { value: 44, type: 'spacing' },
      lg: { value: 52, type: 'spacing' },
      xl: { value: 64, type: 'spacing' },
      true: { value: 44, type: 'spacing' },
    },
    radius: {
      none: { value: 0, type: 'borderRadius' },
      xs: { value: 4, type: 'borderRadius' },
      sm: { value: 8, type: 'borderRadius' },
      md: { value: 12, type: 'borderRadius' },
      lg: { value: 18, type: 'borderRadius' },
      xl: { value: 24, type: 'borderRadius' },
      '2xl': { value: 32, type: 'borderRadius' },
      pill: { value: 9999, type: 'borderRadius' },
    },
    zIndex: {
      true: { value: 1 },
      toast: { value: 999999 },
      modal: { value: 1000 },
    },
    typography: {
      fontFamily: {
        heading: { value: 'BeVietnamPro_700Bold' },
        body: { value: 'BeVietnamPro_400Regular' },
        mono: { value: 'RobotoMono_400Regular' },
      },
      fontSize: {
        '1': { value: 12 },
        '2': { value: 14 },
        '3': { value: 16 },
        '4': { value: 18 },
        '5': { value: 22 },
        '6': { value: 28 },
        '7': { value: 34 },
      },
      lineHeight: {
        '1': { value: 16 },
        '2': { value: 20 },
        '3': { value: 24 },
        '4': { value: 26 },
        '5': { value: 30 },
        '6': { value: 36 },
        '7': { value: 42 },
      },
      fontWeight: {
        regular: { value: '400' },
        medium: { value: '500' },
        semiBold: { value: '600' },
        bold: { value: '700' },
        extraBold: { value: '800' },
      },
    },
    shadow: {
      sm: { value: { offsetX: 0, offsetY: 1, blur: 2, color: 'rgba(0, 0, 0, 0.05)' } },
      md: { value: { offsetX: 0, offsetY: 4, blur: 6, color: 'rgba(0, 0, 0, 0.1)' } },
      lg: { value: { offsetX: 0, offsetY: 10, blur: 15, color: 'rgba(0, 0, 0, 0.1)' } },
      xl: { value: { offsetX: 0, offsetY: 20, blur: 25, color: 'rgba(0, 0, 0, 0.15)' } },
      '2xl': { value: { offsetX: 0, offsetY: 25, blur: 50, color: 'rgba(0, 0, 0, 0.25)' } },
      inner: { value: { offsetX: 0, offsetY: 2, blur: 4, color: 'rgba(0, 0, 0, 0.06)' } },
    },
    breakpoint: {
      sm: { value: '640px' },
      md: { value: '768px' },
      lg: { value: '1024px' },
      xl: { value: '1280px' },
      '2xl': { value: '1536px' },
    },
  },
  themes: {
    light: {
      name: 'light',
      colors: {
        background: '#ffffff',
        backgroundStrong: '#f8fafc',
        backgroundMuted: '#f1f5f9',
        text: '#0f172a',
        textMuted: '#64748b',
        textInverse: '#ffffff',
        border: '#e2e8f0',
        borderMuted: '#f1f5f9',
        primary: '#ec1334',
        primaryMuted: '#ffe4e6',
        accent: '#2563eb',
        secondary: '#7B61FF',
        danger: '#ef4444',
        dangerMuted: 'rgba(239, 68, 68, 0.1)',
        success: '#10b981',
        successMuted: 'rgba(16, 185, 129, 0.1)',
        warning: '#f59e0b',
        warningMuted: 'rgba(245, 158, 11, 0.1)',
        info: '#3b82f6',
        infoMuted: 'rgba(59, 130, 246, 0.1)',
      },
    },
    dark: {
      name: 'dark',
      colors: {
        background: '#0f172a',
        backgroundStrong: '#1e293b',
        backgroundMuted: '#334155',
        text: '#f1f5f9',
        textMuted: '#94a3b8',
        textInverse: '#0f172a',
        border: '#334155',
        borderMuted: '#1e293b',
        primary: '#ff4d5a',
        primaryMuted: 'rgba(255, 77, 90, 0.15)',
        accent: '#60a5fa',
        secondary: '#a78bfa',
        danger: '#f87171',
        dangerMuted: 'rgba(248, 113, 113, 0.15)',
        success: '#34d399',
        successMuted: 'rgba(52, 211, 153, 0.15)',
        warning: '#fbbf24',
        warningMuted: 'rgba(251, 191, 36, 0.15)',
        info: '#60a5fa',
        infoMuted: 'rgba(96, 165, 250, 0.15)',
      },
    },
  },
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  config: defaultConfig,
  activeCategory: 'color',
  selectedToken: null,
  isDirty: false,
  previewTheme: 'light',

  setConfig: (config) => set({ config, isDirty: true }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSelectedToken: (tokenPath) => set({ selectedToken: tokenPath }),
  
  updateToken: (path, value, description) => {
    const config = { ...get().config };
    const keys = path.split('.');
    let current: any = config.tokens;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (current[lastKey]) {
      current[lastKey] = {
        ...current[lastKey],
        value,
        description: description || current[lastKey].description
      };
    }

    config.metadata.lastUpdated = new Date().toISOString();
    set({ config, isDirty: true });
  },

  deleteToken: (path) => {
    const config = { ...get().config };
    const keys = path.split('.');
    let current: any = config.tokens;

    // Navigate to parent
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    // Delete the token
    const lastKey = keys[keys.length - 1];
    delete current[lastKey];

    config.metadata.lastUpdated = new Date().toISOString();
    set({ config, isDirty: true, selectedToken: null });
  },

  resetToDefaults: () => {
    set({ config: defaultConfig, isDirty: false, selectedToken: null });
  },
  
  setPreviewTheme: (theme) => set({ previewTheme: theme }),
  markClean: () => set({ isDirty: false }),
}));
