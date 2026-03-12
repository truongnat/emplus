'use client';

import { useBuilderStore } from '@/store/builder-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Palette,
  Ruler,
  Square,
  CircleDot,
  Layers,
  Type,
  Droplets,
  Monitor,
} from 'lucide-react';
import type { TokenCategory } from '@/types/tokens';

const categories: { id: TokenCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'color', label: 'Colors', icon: <Palette className="w-4 h-4" /> },
  { id: 'space', label: 'Spacing', icon: <Ruler className="w-4 h-4" /> },
  { id: 'size', label: 'Sizing', icon: <Square className="w-4 h-4" /> },
  { id: 'radius', label: 'Radius', icon: <CircleDot className="w-4 h-4" /> },
  { id: 'zIndex', label: 'Z-Index', icon: <Layers className="w-4 h-4" /> },
  { id: 'typography', label: 'Typography', icon: <Type className="w-4 h-4" /> },
  { id: 'shadow', label: 'Shadows', icon: <Droplets className="w-4 h-4" /> },
  { id: 'breakpoint', label: 'Breakpoints', icon: <Monitor className="w-4 h-4" /> },
];

export function TokenCategoryList() {
  const { activeCategory, setActiveCategory } = useBuilderStore();

  return (
    <Card className="border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-2 h-10 transition-all duration-200',
              activeCategory === category.id 
                ? 'bg-secondary font-semibold shadow-sm' 
                : 'hover:bg-muted hover:text-foreground'
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span className="font-medium">{category.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
