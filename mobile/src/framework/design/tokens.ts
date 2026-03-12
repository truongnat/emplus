import { createTokens } from 'tamagui'

export const tokens = createTokens({
  color: {
    primary: "#ec1334",
    primaryDeep: "#9f1239",
    primarySoft: "#ffe4e6",
    accent: "#2563eb",
    secondary: "#7B61FF",
    
    // Neutrals
    ink: "#0f172a",
    muted: "#64748b",
    white: "#ffffff",
    black: "#000000",
    transparent: "transparent",
    
    // Slates
    slate50: "#f8fafc",
    slate100: "#f1f5f9",
    slate200: "#e2e8f0",
    slate300: "#cbd5e1",
    slate400: "#94a3b8",
    slate500: "#64748b",
    slate600: "#475569",
    slate700: "#334155",
    slate800: "#1e293b",
    slate900: "#0f172a",

    // Semantic
    danger: "#ef4444",
    success: "#10b981",
    warning: "#f59e0b",
    info: "#3b82f6",
    
    // Glassmorphism (Mapped to tokens for consistency)
    glass: "rgba(255, 255, 255, 0.4)",
    glassStrong: "rgba(255, 255, 255, 0.6)",
    glassBorder: "rgba(255, 255, 255, 0.5)",
  },
  
  space: {
    true: 16, // Default
    none: 0,
    "3xs": 2,
    "2xs": 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48,
    "4xl": 64,
  },
  
  size: {
    true: 44, // Default button/input height
    xs: 28,
    sm: 36,
    md: 44,
    lg: 52,
    xl: 64,
  },
  
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    "2xl": 32,
    pill: 9999,
  },
  
  zIndex: {
    true: 1,
    toast: 999999,
    modal: 1000,
  },
})
