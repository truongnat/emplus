---
title: "design-builder/src/components/theme-preview.tsx"
description: "A function component that renders a theme preview with customizable colors and tokens."
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
  page: "reference/files/design-builder/src/components/theme-preview.tsx.md"
  relativePath: "design-builder/src/components/theme-preview.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/theme-preview.tsx"
  module: "design-builder/src/components"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/components/theme-preview.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/components](../../../../modules/design-builder/src/components.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/components/theme-preview.tsx`
- Lines: 197
- Symbols: 1

## AI Summary

A function component that renders a theme preview with customizable colors and tokens.

### Responsibilities

- To render the theme preview with the provided theme, set of tokens, and color data.
- To manage the state related to the themepreview.

## Public API

- `function ThemePreview()`

## Symbols

### function `ThemePreview`

- Signature: `function ThemePreview()`
- Lines: 13-196
- Exported: yes

```tsx
function ThemePreview() {
  const { config, previewTheme, setPreviewTheme } = useBuilderStore();

  const themeColors = useMemo(() => {
    return config.themes[previewTheme].colors;
  }, [config.themes, previewTheme]);

  const tokens = config.tokens;

  // Helper to format token value for display
  const formatTokenValue = (token: any): string => {
    if (!token) return '';
    const value = token.value ?? token;
    
    if (typeof value === 'object') {
      // Handle shadow objects
      if ('offsetX' in value || 'offsetY' in value) {
        const { offsetX = 0, offsetY = 0, blur = 0 } = value;
        return `${offsetX}px ${offsetY}px ${blur}px`;
      }
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  return (
    <div className="space-y-4">
      {/* Theme Toggle */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Theme Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={previewTheme === 'dark'}
                onCheckedChange={(checked) => setPreviewTheme(checked ? 'dark' : 'light')}
                className="transition-colors duration-200"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium capitalize px-3 py-1 rounded-full bg-secondary">
              {previewTheme}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Theme Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] rounded-md border">
            <div className="p-3 space-y-2">
              {Object.entries(themeColors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 group">
                  <div
                    className="w-8 h-8 rounded border flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize truncate">{key}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Component Preview */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Buttons */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Buttons</Label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="transition-all hover:scale-105">Primary</Button>
              <Button size="sm" variant="secondary" className="transition-all hover:scale-105">Secondary</Button>
              <Button size="sm" variant="outline" className="transition-all hover:scale-105 hover:bg-secondary">Outline</Button>
              <Button size="sm" variant="ghost" className="transition-all hover:scale-105 hover:bg-secondary">Ghost</Button>
            </div>
          </div>

          {/* Input */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Input</Label>
            <Input 
              placeholder="Enter text..." 
              className="transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Card Example */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Card</Label>
            <div
              className="p-3 rounded-lg border transition-colors hover:shadow-md"
              style={{
                backgroundColor: themeColors.background,
                borderColor: themeColors.border,
              }}
            >
              <p className="text-sm font-medium" style={{ color: themeColors.text }}>
                Card Title
              </p>
              <p className="text-xs mt-1" style={{ color: themeColors.textMuted }}>
                Card description text
              </p>
            </div>
          </div>

          {/* Spacing Scale */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Spacing</Label>
            <div className="space-y-1.5">
              {Object.entries(tokens.space).slice(0, 5).map(([key, token]: [string, any]) => (
                <div key={key} className="flex items-center gap-2 group">
                  <span className="text-xs w-10 font-mono text-muted-foreground">{key}</span>
                  <div
                    className="h-3 bg-primary rounded transition-all group-hover:opacity-80"
                    style={{ width: Math.min(token.value * 3, 120) }}
                  />
                  <span className="text-xs text-muted-foreground">{token.value}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* Radius Scale */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Radius</Label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(tokens.radius).map(([key, token]: [string, any]) => (
                <div
                  key={key}
                  className="h-16 bg-primary/20 border-2 border-primary rounded transition-transform hover:scale-105"
                  style={{ borderRadius: token.value }}
                >
                  <span className="text-xs font-mono ml-1 mt-10 block text-primary">{key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shadow Preview */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Shadows</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(tokens.shadow).map(([key, token]: [string, any]) => {
                const shadowValue = token.value ?? token;
                const displayValue = formatTokenValue(token);
                
                return (
                  <div
                    key={key}
                    className="p-3 bg-background rounded-lg border transition-all hover:scale-105"
                    style={{
                      boxShadow: shadowValue.offsetX !== undefined
                        ? `${shadowValue.offsetX}px ${shadowValue.offsetY}px ${shadowValue.blur}px ${shadowValue.color}`
                        : 'none'
                    }}
                  >
                    <p className="text-xs font-medium capitalize">{key}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{displayValue}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```
