# EmPlus Design Builder

Web-based visual tool for building and managing design tokens for the EmPlus mobile application.

Built with **Next.js 15**, **Bun**, and **shadcn/ui**.

![Design Builder](./docs/builder-preview.png)

## 🚀 Quick Start

### Install Dependencies

```bash
cd design-builder
bun install
```

### Run Development Server

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
bun run build
bun run start
```

## ✨ Features

### 🎨 Visual Token Editor
- **Color Tokens**: Integrated color picker with hex/rgba support
- **Numeric Tokens**: Number inputs for spacing, sizing, radius
- **Real-time Preview**: See changes instantly
- **Copy to Clipboard**: Quick copy token values

### 🌓 Theme Preview
- **Light/Dark Toggle**: Preview both themes
- **Component Showcase**: See how tokens affect UI components
- **Color Palette**: View all theme colors
- **Scale Previews**: Spacing, radius, and typography scales

### 📤 Export
- **TypeScript Files**: Generate `tokens.ts` and `themes.ts`
- **One-Click Download**: Download all files at once
- **Copy to Clipboard**: Quick copy for individual files

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State**: Zustand
- **Color Picker**: react-colorful
- **Toast**: sonner

## 📁 Project Structure

```
design-builder/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── token-category-list.tsx
│   │   ├── token-editor.tsx
│   │   ├── theme-preview.tsx
│   │   └── export-dialog.tsx
│   ├── page-components/
│   │   └── builder-page.tsx    # Main builder page
│   ├── store/
│   │   └── builder-store.ts    # Zustand state
│   ├── types/
│   │   └── tokens.ts           # TypeScript types
│   └── lib/
│       └── utils.ts            # Utilities
├── components.json             # shadcn/ui config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎯 Usage

### Edit Tokens

1. **Select Category**: Click a token category in the left sidebar
2. **Select Token**: Click a token to edit
3. **Modify Value**: Use the color picker or input field
4. **See Preview**: Changes appear in real-time

### Export Tokens

1. **Click Export**: Click the "Export" button
2. **Review Files**: Check the generated files
3. **Download**: Click "Download All" or individual files
4. **Apply to App**: Copy files to `mobile/src/framework/design/`

## 🔧 Development

### Add New UI Components

Use shadcn/ui CLI:

```bash
bunx shadcn-ui@latest add button
bunx shadcn-ui@latest add dialog
bunx shadcn-ui@latest add popover
```

### State Management

The builder uses Zustand for state management:

```typescript
import { useBuilderStore } from '@/store/builder-store';

function MyComponent() {
  const { 
    config,           // Full design system config
    activeCategory,   // Currently selected category
    selectedToken,    // Currently selected token
    isDirty,          // Has unsaved changes
    previewTheme,     // Current preview theme
    updateToken,      // Update token action
  } = useBuilderStore();
}
```

## 📝 Token Categories

- **Colors**: Brand colors, semantic colors, neutrals
- **Spacing**: 0px to 64px scale
- **Sizing**: Component heights
- **Radius**: Border radius values
- **Typography**: Font families, sizes, line heights, weights
- **Shadows**: Elevation shadows
- **Z-Index**: Layering order
- **Breakpoints**: Responsive breakpoints

## 🎨 Component Library

### shadcn/ui Components

- **Button**: Multiple variants and sizes
- **Input**: Form input with validation styles
- **Card**: Container with header, content, footer
- **Tabs**: Tabbed navigation
- **Label**: Form labels
- **Switch**: Toggle switch
- **ScrollArea**: Scrollable container
- **Sonner**: Toast notifications

### Builder Components

- **TokenCategoryList**: Category navigation
- **TokenEditor**: Token editing interface
- **ThemePreview**: Live theme preview
- **ExportDialog**: Export dialog

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

### Run Production Server

```bash
bun run start
```

### Docker (Optional)

```bash
docker build -t design-builder .
docker run -p 3001:3001 design-builder
```

## 📖 Documentation

- [Design System Docs](../docs/DESIGN_SYSTEM.md)
- [Quick Start Guide](../docs/QUICKSTART.md)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Next.js Documentation](https://nextjs.org)

## 🎯 Future Enhancements

- [ ] Import existing tokens from mobile app
- [ ] Token comparison/diff view
- [ ] Version history
- [ ] Preset themes
- [ ] Animation tokens
- [ ] Component variant editor

---

**Built with ❤️ for EmPlus**
