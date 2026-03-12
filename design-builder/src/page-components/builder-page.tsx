'use client';

import { useState, useEffect } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { TokenCategoryList } from '@/components/token-category-list';
import { TokenEditor } from '@/components/token-editor';
import { ThemePreview } from '@/components/theme-preview';
import { ExportDialog } from '@/components/export-dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Save, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function BuilderPage() {
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
