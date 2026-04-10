---
title: "design-builder/src/page-components/builder-page.tsx"
description: "Builders Page component"
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
  page: "reference/files/design-builder/src/page-components/builder-page.tsx.md"
  relativePath: "design-builder/src/page-components/builder-page.tsx"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/design-builder/src/page-components/builder-page.tsx"
  module: "design-builder/src/page-components"
  workspace: "design-builder"
  language: "TypeScript"
  symbolCount: 1
---

# design-builder/src/page-components/builder-page.tsx

- Overview: [emplus Docs Wiki](../../../../../index.md)
- Summary: [SUMMARY](../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../features/index.md)
- Module: [design-builder/src/page-components](../../../../modules/design-builder/src/page-components.md)
- Workspace: [@emplus/design-builder](../../../../../workspaces/design-builder.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/design-builder/src/page-components/builder-page.tsx`
- Lines: 163
- Symbols: 1

## Related Features

- [Authentication Read / List](../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Storage Read / List](../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.

## AI Summary

Builders Page component

### Responsibilities

- Uses
- use-button-builder-store

## Public API

- `function BuilderPage()`

## Symbols

### function `BuilderPage`

- Signature: `function BuilderPage()`
- Lines: 15-162
- Exported: yes

```tsx
function BuilderPage() {
  const { 
    config, 
    isDirty, 
    previewTheme, 
    setPreviewTheme, 
    resetToDefaults 
  } = useBuilderStore();
  
  const [showExport, setShowExport] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle dark mode on mount and when previewTheme changes
  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    if (previewTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [previewTheme]);

  const handleExport = () => {
    setShowExport(true);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default tokens?')) {
      resetToDefaults();
      toast.success('Reset to defaults');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn(
      "min-h-screen bg-background transition-colors duration-300"
    )}>
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Design Builder</h1>
                <p className="text-sm text-muted-foreground">EmPlus Design System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <Switch
                  checked={previewTheme === 'dark'}
                  onCheckedChange={(checked) => setPreviewTheme(checked ? 'dark' : 'light')}
                />
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Dirty Indicator */}
              {isDirty && (
                <div className="flex items-center gap-2 text-amber-500 px-3 py-2 rounded-lg bg-amber-500/10">
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="transition-all hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExport(true)}
                  className="transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleExport}
                  disabled={!isDirty}
                  className="transition-all hover:scale-105"
                >
                  Save & Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Category List */}
          <div className="col-span-3">
            <TokenCategoryList />
          </div>
          
          {/* Center - Token Editor */}
          <div className="col-span-5">
            <TokenEditor />
          </div>
          
          {/* Right - Preview */}
          <div className="col-span-4">
            <ThemePreview />
          </div>
        </div>
      </main>
      
      {/* Export Dialog */}
      {showExport && (
        <ExportDialog onClose={() => setShowExport(false)} />
      )}
      
      {/* Footer */}
      <footer className="border-t mt-auto py-4 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Version: {config.version}</span>
            <span>Last updated: {new Date(config.metadata.lastUpdated).toLocaleString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```
