---
title: "mobile/src/theme/theme-mode-context.tsx"
description: "Class representing the context for theme modes."
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/theme/theme-mode-context.tsx.md"
  relativePath: "mobile/src/theme/theme-mode-context.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/theme-mode-context.tsx"
  module: "mobile/src/theme"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 8
---

# mobile/src/theme/theme-mode-context.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [mobile/src/theme](../../../../modules/mobile/src/theme.md)
- Workspace: [@emplus/mobile](../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/theme/theme-mode-context.tsx`
- Lines: 168
- Symbols: 8

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.

## AI Summary

Class representing the context for theme modes.

### Responsibilities

- Use ThemeModeProvider with 'system' theme preference or parse stored preferences directly

### Usage Notes

- [Usage guidelines in comments may provide additional context on how to use this context type].

## Public API

- `type ColorScheme = "light" | "dark" | null;`
- `type ThemeName = "aura" | "telegram";` — function:ThemeModeProvider
- `type ThemePreference = "system" | "daylight" | "light" | "dark";` — summary': 'Function creating {children} theme mode provider']
- `function isLocalDaylight( dayStartHour = 6, nightStartHour = 19, ): boolean`
- `function ThemeModeProvider({ children }: { children: ReactNode })`
- `function useThemeMode()`

## Symbols

### type `ColorScheme`

- Signature: `type ColorScheme = "light" | "dark" | null;`
- Lines: 24-24
- Exported: yes

```tsx
type ColorScheme = "light" | "dark" | null;
```

### type `ThemeName`

- Signature: `type ThemeName = "aura" | "telegram";`
- Lines: 25-25
- Exported: yes
- Summary: function:ThemeModeProvider

```tsx
type ThemeName = "aura" | "telegram";
```

### type `ThemePreference`

- Signature: `type ThemePreference = "system" | "daylight" | "light" | "dark";`
- Lines: 28-28
- Exported: yes
- Summary: summary': 'Function creating {children} theme mode provider']

```tsx
type ThemePreference = "system" | "daylight" | "light" | "dark";
```

### function `isLocalDaylight`

- Signature: `function isLocalDaylight( dayStartHour = 6, nightStartHour = 19, ): boolean`
- Lines: 31-37
- Exported: yes

```tsx
function isLocalDaylight(
  dayStartHour = 6,
  nightStartHour = 19,
): boolean {
  const h = new Date().getHours();
  return h >= dayStartHour && h < nightStartHour;
}
```

### function `ThemeModeProvider`

- Signature: `function ThemeModeProvider({ children }: { children: ReactNode })`
- Lines: 69-159
- Exported: yes

```tsx
function ThemeModeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>("system");
  /** Bump khi cần tính lại chế độ daylight (phút / foreground). */
  const [daylightTick, setDaylightTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (cancelled) return;
      const parsed = parseStoredPreference(raw);
      if (parsed) setThemePreferenceState(parsed);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setThemePreference = useCallback((p: ThemePreference) => {
    setThemePreferenceState(p);
    AsyncStorage.setItem(STORAGE_KEY, p).catch(() => {});
  }, []);

  useEffect(() => {
    if (themePreference !== "daylight") return;
    const id = setInterval(() => {
      setDaylightTick((t) => t + 1);
    }, 60_000);
    return () => clearInterval(id);
  }, [themePreference]);

  useEffect(() => {
    if (themePreference !== "daylight") return;
    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      if (next === "active") setDaylightTick((t) => t + 1);
    });
    return () => sub.remove();
  }, [themePreference]);

  const colorScheme: Exclude<ColorScheme, null> = useMemo(() => {
    if (themePreference === "light") return "light";
    if (themePreference === "dark") return "dark";
    if (themePreference === "daylight") {
      void daylightTick;
      return isLocalDaylight() ? "light" : "dark";
    }
    return systemColorScheme === "dark" ? "dark" : "light";
  }, [themePreference, systemColorScheme, daylightTick]);

  const isDark = colorScheme === "dark";

  const manualColorScheme: ColorScheme = useMemo(() => {
    if (themePreference === "light") return "light";
    if (themePreference === "dark") return "dark";
    return null;
  }, [themePreference]);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      if (scheme === null) setThemePreference("system");
      else if (scheme === "light") setThemePreference("light");
      else setThemePreference("dark");
    },
    [setThemePreference],
  );

  const toggleColorScheme = useCallback(() => {
    setThemePreference(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, setThemePreference]);

  const [themeName, setThemeName] = useState<ThemeName>("aura");

  return (
    <ThemeModeContext.Provider
      value={{
        colorScheme,
        manualColorScheme,
        isDark,
        themePreference,
        setThemePreference,
        setColorScheme,
        toggleColorScheme,
        themeName,
        setThemeName,
      }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
}
```

### function `useThemeMode`

- Signature: `function useThemeMode()`
- Lines: 161-167
- Exported: yes

```tsx
function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return context;
}
```

### interface `ThemeModeContextType`

- Signature: `interface ThemeModeContextType`
- Lines: 39-51
- Exported: no

```tsx
interface ThemeModeContextType {
  /** Luôn `light` | `dark` (đã resolve system / daylight / manual). */
  colorScheme: Exclude<ColorScheme, null>;
  /** `null` = không ép light/dark tĩnh (đang system hoặc daylight). */
  manualColorScheme: ColorScheme;
  isDark: boolean;
  themePreference: ThemePreference;
  setThemePreference: (p: ThemePreference) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}
```

### function `parseStoredPreference`

- Signature: `function parseStoredPreference(raw: string | null): ThemePreference | null`
- Lines: 57-67
- Exported: no

```tsx
function parseStoredPreference(raw: string | null): ThemePreference | null {
  if (
    raw === "system" ||
    raw === "daylight" ||
    raw === "light" ||
    raw === "dark"
  ) {
    return raw;
  }
  return null;
}
```
