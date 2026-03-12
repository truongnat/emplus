'use client';

import { useMemo, useState, useEffect } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Trash2, Copy, Check } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { toast } from 'sonner';

export function TokenEditor() {
  const {
    activeCategory,
    config,
    selectedToken,
    setSelectedToken,
    updateToken,
    deleteToken,
  } = useBuilderStore();

  // Local state for input value to avoid stale closure
  const [localValue, setLocalValue] = useState<string>('');
  const [description, setDescription] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const tokens = useMemo(() => {
    const categoryData = (config.tokens as any)[activeCategory];
    if (!categoryData) return {};

    // Flatten nested structures for display
    if (activeCategory === 'color') {
      const flat: Record<string, any> = {};
      
      Object.entries(categoryData).forEach(([key, value]) => {
        if (key !== 'slate' && key !== 'semantic' && key !== 'glass') {
          flat[key] = value;
        }
      });
      
      if (categoryData.slate) {
        Object.entries(categoryData.slate).forEach(([key, value]) => {
          flat[`slate.${key}`] = value;
        });
      }
      
      if (categoryData.semantic) {
        Object.entries(categoryData.semantic).forEach(([key, value]) => {
          flat[`semantic.${key}`] = value;
        });
      }
      
      if (categoryData.glass) {
        Object.entries(categoryData.glass).forEach(([key, value]) => {
          flat[`glass.${key}`] = value;
        });
      }
      
      return flat;
    }

    if (activeCategory === 'typography') {
      const flat: Record<string, any> = {};
      
      if (categoryData.fontFamily) {
        Object.entries(categoryData.fontFamily).forEach(([key, value]) => {
          flat[`fontFamily.${key}`] = value;
        });
      }
      
      if (categoryData.fontSize) {
        Object.entries(categoryData.fontSize).forEach(([key, value]) => {
          flat[`fontSize.${key}`] = value;
        });
      }
      
      if (categoryData.lineHeight) {
        Object.entries(categoryData.lineHeight).forEach(([key, value]) => {
          flat[`lineHeight.${key}`] = value;
        });
      }
      
      if (categoryData.fontWeight) {
        Object.entries(categoryData.fontWeight).forEach(([key, value]) => {
          flat[`fontWeight.${key}`] = value;
        });
      }
      
      return flat;
    }

    return categoryData;
  }, [config.tokens, activeCategory]);

  const selectedTokenData = useMemo(() => {
    if (!selectedToken) return null;
    return (tokens as any)[selectedToken];
  }, [tokens, selectedToken]);

  // Helper to extract value from token
  const getTokenValue = (token: any): string | number => {
    if (!token) return '';
    if (typeof token === 'object' && 'value' in token) {
      return token.value;
    }
    return typeof token === 'string' ? token : String(token);
  };

  // Helper to format display value for different token types
  const formatDisplayValue = (token: any): string => {
    if (!token) return '';
    
    const value = token.value ?? token;
    
    // Handle shadow objects
    if (activeCategory === 'shadow' && typeof value === 'object') {
      const { offsetX = 0, offsetY = 0, blur = 0, spread = 0, color = '' } = value;
      return `${offsetX}px ${offsetY}px ${blur}px${spread ? ` ${spread}px` : ''} ${color}`;
    }
    
    // Handle other objects
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  // Sync local state when selected token changes
  useEffect(() => {
    if (selectedTokenData) {
      const value = getTokenValue(selectedTokenData);
      setLocalValue(String(value));
      setDescription(selectedTokenData.description || '');
    }
  }, [selectedToken, selectedTokenData]);

  const handleValueChange = (newValue: string | number) => {
    if (selectedToken) {
      updateToken(selectedToken, newValue, description);
    }
  };

  const handleCopyValue = () => {
    if (selectedTokenData) {
      const value = formatDisplayValue(selectedTokenData);
      navigator.clipboard.writeText(value);
      setCopiedToken(selectedToken);
      toast.success('Copied!');
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const handleDeleteToken = () => {
    if (selectedToken) {
      deleteToken(selectedToken);
      toast.success('Token deleted');
      setLocalValue('');
      setDescription('');
    }
  };

  const handleLocalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  // Update store on blur
  const handleBlur = () => {
    if (selectedToken && localValue) {
      const numValue = Number(localValue);
      handleValueChange(isNaN(numValue) ? localValue : numValue);
    }
  };

  // Update store on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
      toast.success('Value updated');
    }
  };

  const displayValue = selectedTokenData ? formatDisplayValue(selectedTokenData) : '';

  // Shadow preview style
  const getShadowStyle = () => {
    if (activeCategory !== 'shadow' || !selectedTokenData) return {};
    const value = selectedTokenData.value ?? selectedTokenData;
    if (typeof value !== 'object') return {};
    
    const { offsetX = 0, offsetY = 0, blur = 0, spread = 0, color = '' } = value;
    return {
      boxShadow: `${offsetX}px ${offsetY}px ${blur}px${spread ? ` ${spread}px` : ''} ${color}`
    };
  };

  return (
    <Card className="border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          {selectedToken && (
            <span className="text-muted-foreground text-sm font-normal ml-2">
              / {selectedToken}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Token List */}
        <ScrollArea className="h-[300px] mb-4 rounded-md border">
          <div className="p-3 grid grid-cols-2 gap-2">
            {Object.entries(tokens).map(([key, token]: [string, any]) => {
              const tokenValue = getTokenValue(token);
              const isSelected = selectedToken === key;
              
              return (
                <Button
                  key={key}
                  variant={isSelected ? 'secondary' : 'outline'}
                  className={cn(
                    'justify-between h-12 px-3 transition-all duration-200',
                    'hover:scale-105 hover:shadow-md hover:border-primary/50',
                    'active:ring-2 active:ring-primary active:ring-offset-2',
                    isSelected && 'ring-2 ring-primary shadow-sm font-semibold'
                  )}
                  onClick={() => setSelectedToken(key)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {activeCategory === 'color' && (
                      <div
                        className="w-5 h-5 rounded border flex-shrink-0"
                        style={{ backgroundColor: String(tokenValue) }}
                      />
                    )}
                    <span className="text-sm font-medium truncate">{key}</span>
                  </div>
                  {activeCategory !== 'color' && (
                    <span className="text-xs text-muted-foreground flex-shrink-0 font-mono max-w-[60px] truncate">
                      {typeof tokenValue === 'number' 
                        ? tokenValue 
                        : String(tokenValue).substring(0, 8)}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Token Editor */}
        {selectedTokenData && (
          <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
            <div>
              <Label className="text-sm font-medium mb-2 block">Value</Label>
              {activeCategory === 'color' ? (
                <div className="space-y-3">
                  <HexColorPicker
                    color={String(localValue)}
                    onChange={(value) => {
                      setLocalValue(value);
                      handleValueChange(value);
                    }}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={localValue}
                      onChange={handleLocalValueChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      placeholder="#000000"
                      className="flex-1 font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleCopyValue}
                      className="hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                      {copiedToken === selectedToken ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ) : activeCategory === 'shadow' ? (
                <div className="space-y-3 p-4 rounded-lg bg-background border">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Offset X</Label>
                      <p className="text-sm font-mono mt-1">
                        {selectedTokenData?.value?.offsetX || 0}px
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Offset Y</Label>
                      <p className="text-sm font-mono mt-1">
                        {selectedTokenData?.value?.offsetY || 0}px
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Blur</Label>
                      <p className="text-sm font-mono mt-1">
                        {selectedTokenData?.value?.blur || 0}px
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Spread</Label>
                      <p className="text-sm font-mono mt-1">
                        {selectedTokenData?.value?.spread || 0}px
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: selectedTokenData?.value?.color }}
                      />
                      <p className="text-sm font-mono">
                        {selectedTokenData?.value?.color || 'transparent'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <Label className="text-xs text-muted-foreground">CSS Format</Label>
                    <p className="text-sm font-mono mt-1 p-2 bg-muted rounded">
                      {formatDisplayValue(selectedTokenData)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Shadow values are complex objects. Edit in <code className="bg-muted px-1 rounded">tokens.ts</code> file.
                  </p>
                </div>
              ) : activeCategory === 'space' || activeCategory === 'size' || activeCategory === 'radius' ? (
                <Input
                  type="number"
                  value={localValue}
                  onChange={handleLocalValueChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="font-mono"
                />
              ) : (
                <Input
                  value={localValue}
                  onChange={handleLocalValueChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="font-mono"
                />
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Description</Label>
              <Input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (selectedToken && localValue) {
                    const numValue = Number(localValue);
                    updateToken(selectedToken, isNaN(numValue) ? localValue : numValue, e.target.value);
                  }
                }}
                placeholder="Add description..."
              />
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteToken}
                className="hover:bg-destructive/90 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
            
            {/* Shadow Preview Box */}
            {activeCategory === 'shadow' && (
              <div className="pt-4 border-t">
                <Label className="text-sm font-medium mb-2 block">Preview</Label>
                <div 
                  className="w-full h-32 bg-background rounded-lg border transition-all"
                  style={getShadowStyle()}
                >
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Shadow Preview
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
