# Bun Design Builder - Hướng Dẫn Sử Dụng

## 🎯 Đã Hoàn Thành

✅ **Web Builder chạy bằng Next.js 15 + Bun**
✅ **shadcn/ui components** - Full component library
✅ **Hot reload** - Tự động reload khi code thay đổi
✅ **TypeScript** - Type safety hoàn chỉnh
✅ **Tailwind CSS** - Styling với utility classes
✅ **Zustand** - State management nhẹ và nhanh
✅ **Export functionality** - Download tokens/themes files

## 🚀 Chạy Builder

### Cách 1: Từ root project

```bash
bun run dev:builder
```

### Cách 2: Từ design-builder folder

```bash
cd design-builder
bun run dev
```

### Cách 3: Build production

```bash
bun run build:builder
bun run --cwd design-builder start
```

## 📱 Mở ứng dụng

Sau khi chạy, mở trình duyệt:
- **Development**: http://localhost:3001
- **Production**: http://localhost:3001 (sau khi build)

## 🎨 Tính Năng

### 1. Chỉnh sửa Tokens

**Categories:**
- **Colors**: Màu sắc (primary, secondary, semantic, slate, glass)
- **Spacing**: Khoảng cách (0px - 64px)
- **Sizing**: Kích thước component
- **Radius**: Bo góc (0px - pill)
- **Typography**: Font family, size, line-height, weight
- **Shadows**: Bóng đổ
- **Z-Index**: Layering
- **Breakpoints**: Responsive breakpoints

**Cách dùng:**
1. Click vào category bên trái
2. Click vào token muốn sửa
3. Dùng color picker (với màu) hoặc input (với số)
4. Xem preview bên phải

### 2. Theme Preview

**Chức năng:**
- Toggle Light/Dark mode
- Xem màu theme hiện tại
- Preview components (buttons, inputs, cards)
- Xem spacing scale
- Xem radius scale

### 3. Export

**Cách dùng:**
1. Click "Export" button trên header
2. Xem trước files tokens.ts và themes.ts
3. Copy hoặc Download từng file
4. Hoặc click "Download All" để tải cả 2 files

**Apply vào mobile app:**
```bash
# Copy files vào mobile app
cp ~/Downloads/tokens.ts mobile/src/framework/design/tokens.ts
cp ~/Downloads/themes.ts mobile/src/framework/design/themes.ts

# Rebuild mobile app
bun run dev:mobile
```

## 🛠️ Tech Stack

```json
{
  "framework": "Next.js 15",
  "runtime": "Bun",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "ui": "shadcn/ui",
  "state": "Zustand",
  "color": "react-colorful",
  "toast": "sonner"
}
```

## 📁 Cấu Trúc

```
design-builder/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── builder/            # Builder components
│   ├── page-components/        # Page components
│   ├── store/                  # Zustand store
│   ├── types/                  # TypeScript types
│   └── lib/                    # Utilities
├── components.json             # shadcn/ui config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🔧 Thêm Components Mới

### Dùng shadcn/ui CLI:

```bash
cd design-builder

# Thêm button
bunx shadcn-ui@latest add button

# Thêm dialog
bunx shadcn-ui@latest add dialog

# Thêm popover
bunx shadcn-ui@latest add popover

# Thêm scroll-area
bunx shadcn-ui@latest add scroll-area
```

### Tự tạo component:

```tsx
// src/components/ui/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("default-styles", className)}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent }
```

## 🎯 Sử Dụng Zustand Store

```typescript
import { useBuilderStore } from '@/store/builder-store';

function MyComponent() {
  // Lấy toàn bộ state
  const { 
    config,           // Full design system config
    activeCategory,   // Category đang chọn
    selectedToken,    // Token đang chọn
    isDirty,          // Có changes chưa save
    previewTheme,     // Theme đang preview
  } = useBuilderStore();

  // Lấy actions
  const { 
    setActiveCategory,  // Đổi category
    setSelectedToken,   // Đổi token
    updateToken,        // Update token value
    resetToDefaults,    // Reset về default
    setPreviewTheme,    // Đổi preview theme
  } = useBuilderStore();

  // Example usage
  const handleColorChange = (newColor: string) => {
    updateToken('color.primary', newColor);
  };

  return (
    <div>
      <p>Current theme: {previewTheme}</p>
      <button onClick={() => setPreviewTheme('dark')}>
        Dark Mode
      </button>
    </div>
  );
}
```

## 🎨 Customization

### Đổi màu primary:

Sửa trong `src/app/globals.css`:

```css
:root {
  --primary: 346.8 77.2% 49.8%;  /* Đổi màu này */
  --primary-foreground: 355.7 100% 97.3%;
}
```

### Đổi font:

Sửa trong `src/app/layout.tsx`:

```tsx
import { Inter } from "next/font/google";

// Đổi sang font khác
const myFont = Inter({ 
  subsets: ["latin"],
  weight: ["400", "700"],
});
```

### Đổi theme colors:

Sửa trong `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
    },
  },
}
```

## 📖 Troubleshooting

### Builder không chạy?

```bash
# Clear và reinstall
cd design-builder
rm -rf node_modules .next
bun install
bun run dev
```

### Lỗi TypeScript?

```bash
# Chạy typecheck
bun run typecheck:builder
```

### Lỗi styling?

```bash
# Clear cache
rm -rf .next
bun run dev
```

### Port 3001 đã được sử dụng?

Sửa trong `.env.local`:

```
PORT=3002
```

## 🚀 Deployment

### Build production:

```bash
bun run build:builder
```

### Run production server:

```bash
bun run --cwd design-builder start
```

### Docker (optional):

```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY design-builder/package.json ./
RUN bun install

COPY design-builder/ ./

RUN bun run build

EXPOSE 3001

CMD ["bun", "run", "start"]
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Bun Docs](https://bun.sh/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Built with ❤️ using Bun + Next.js + shadcn/ui**
