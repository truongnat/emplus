---
phase: landing-page-seo
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - web/package.json
  - web/next.config.mjs
  - web/tsconfig.json
  - web/tailwind.config.js
  - web/postcss.config.js
  - web/components.json
  - web/src/styles/globals.css
  - web/src/lib/utils.ts
  - web/src/config/site.ts
  - web/src/config/navigation.ts
  - web/src/app/layout.tsx
  - web/src/app/page.tsx
autonomous: true
requirements: [WEB-WORKSPACE, WEB-TAILWIND, WEB-THEME, WEB-LAYOUT]

must_haves:
  truths:
    - "web/ workspace is recognized by Bun and installs correctly"
    - "bun --bun next dev starts the dev server without errors"
    - "Landing page renders at localhost:3000 with correct fonts and theme colors"
    - "Dark mode toggle switches CSS custom properties"
  artifacts:
    - path: "web/package.json"
      provides: "Next.js workspace with all dependencies"
      contains: "next"
    - path: "web/tailwind.config.js"
      provides: "Tailwind config with Em+ brand colors"
      contains: "coral"
    - path: "web/src/styles/globals.css"
      provides: "CSS custom properties mapped from mobile palette"
      contains: "--primary"
    - path: "web/src/app/layout.tsx"
      provides: "Root layout with fonts, theme provider, metadata"
      contains: "Be_Vietnam_Pro"
    - path: "web/src/config/site.ts"
      provides: "Site metadata constants"
      contains: "siteConfig"
  key_links:
    - from: "package.json"
      to: "web/"
      via: "workspaces array"
      pattern: '"web"'
    - from: "web/tailwind.config.js"
      to: "web/src/styles/globals.css"
      via: "CSS custom properties consumed by Tailwind"
      pattern: "hsl\\(var\\(--"
    - from: "web/src/app/layout.tsx"
      to: "web/src/styles/globals.css"
      via: "import statement"
      pattern: "import.*globals"
---

<objective>
Set up the `web/` workspace in the Bun monorepo with Next.js App Router, Tailwind CSS v3, shadcn/ui, and the Em+ theme system (coral/indigo/teal palette mapped from mobile tokens). Produces a working dev environment with root layout, fonts, dark/light mode, and a placeholder landing page.

Purpose: Foundation that all subsequent plans build on. Every landing page component, blog page, and SEO feature depends on this workspace existing with correct configuration.
Output: Runnable Next.js dev server at `web/` with Em+ branding, Be Vietnam Pro font, dark mode support, and shadcn/ui ready.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-landing-page-seo/CONTEXT.md
@.planning/phases/phase-landing-page-seo/RESEARCH.md
@package.json
@design-builder/tailwind.config.js
@mobile/src/theme/tokens/palette.ts
@mobile/src/theme/tokens/semantic.ts
@mobile/src/theme/aura-colors.ts
@mobile/src/theme/typography-roles.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create web/ workspace with Next.js, Tailwind, and shadcn/ui</name>
  <files>
    package.json,
    web/package.json,
    web/next.config.mjs,
    web/tsconfig.json,
    web/tailwind.config.js,
    web/postcss.config.js,
    web/components.json,
    web/src/lib/utils.ts
  </files>
  <read_first>
    package.json,
    design-builder/package.json,
    design-builder/tailwind.config.js,
    design-builder/src/lib/utils.ts,
    .planning/phases/phase-landing-page-seo/RESEARCH.md
  </read_first>
  <action>
**Step 1: Update root package.json** — Add `"web"` to the `workspaces` array (currently `["mobile", "api", "design-builder"]`). Add scripts:
```json
"dev:web": "bun run --cwd web dev",
"build:web": "bun run --cwd web build",
"typecheck:web": "bun run --cwd web typecheck"
```

**Step 2: Create web/package.json:**
```json
{
  "name": "@emplus/web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun --bun next dev",
    "build": "bun --bun next build",
    "start": "bun --bun next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.2.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.3",
    "autoprefixer": "^10.4.21",
    "@tailwindcss/typography": "^0.5.16",
    "tailwindcss-animate": "^1.0.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.5.0",
    "lucide-react": "^0.474.0",
    "next-themes": "^0.4.6"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^22.15.0",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19.0.4"
  }
}
```

**Step 3: Create web/tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "#site/content": ["./.velite"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".velite/index.d.ts"],
  "exclude": ["node_modules"]
}
```

**Step 4: Create web/next.config.mjs:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Velite generates .velite/ at build time; webpack needs to resolve it
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

class VeliteWebpackPlugin {
  static started = false
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      const { build } = await import('velite')
      await build({ watch: dev, clean: !dev })
    })
  }
}

export default nextConfig
```

**Step 5: Create web/postcss.config.js:**
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default config
```

**Step 6: Create web/tailwind.config.js** — Model after design-builder's config but with Em+ brand colors:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        coral: {
          50: "#FFF1F2", 100: "#FFE4E6", 200: "#FECDD3", 300: "#FDA4AF",
          400: "#FF8FA3", 500: "#FF6B81", 600: "#E5556B", 700: "#CC3F55",
          800: "#B3293F", 900: "#991329",
        },
        indigo: {
          50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE", 300: "#A5B4FC",
          400: "#8E7CFF", 500: "#7B61FF", 600: "#6D4AE6", 700: "#5F33CC",
          800: "#5126B3", 900: "#431999",
        },
        teal: {
          50: "#F0FDFA", 100: "#CCFBF1", 200: "#99F6E4", 300: "#5EEAD4",
          400: "#2DD4BF", 500: "#4FD1C5", 600: "#0D9488", 700: "#0F766E",
          800: "#115E59", 900: "#134E4A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
```

**Step 7: Create web/components.json** (shadcn/ui config):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

**Step 8: Create web/src/lib/utils.ts** — Same as design-builder:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 9: Run `bun install` from repo root** to link the new workspace.

**Step 10: Install shadcn/ui components** from web/ directory:
```bash
cd web && bunx --bun shadcn@2.3.0 add button card badge separator navigation-menu sheet tabs accordion pagination breadcrumb -y
```
If shadcn CLI fails, manually create the components based on shadcn/ui source.

**Step 11: Create web/.gitignore:**
```
.next/
.velite/
node_modules/
out/
```
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus && bun install && cd web && bun run typecheck</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q '"web"' /Users/truongdq/tx/GitHub/emplus/package.json` returns 0 (web in workspaces)
    - `grep -q '"dev:web"' /Users/truongdq/tx/GitHub/emplus/package.json` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/package.json` returns 0
    - `grep -q '"next"' /Users/truongdq/tx/GitHub/emplus/web/package.json` returns 0
    - `grep -q 'coral' /Users/truongdq/tx/GitHub/emplus/web/tailwind.config.js` returns 0
    - `grep -q '#site/content' /Users/truongdq/tx/GitHub/emplus/web/tsconfig.json` returns 0
    - `grep -q 'VeliteWebpackPlugin' /Users/truongdq/tx/GitHub/emplus/web/next.config.mjs` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/lib/utils.ts` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/components.json` returns 0
  </acceptance_criteria>
  <done>web/ workspace exists with all config files, bun install succeeds, typecheck passes, shadcn/ui components installed</done>
</task>

<task type="auto">
  <name>Task 2: Create globals.css, site config, navigation config, root layout, and placeholder page</name>
  <files>
    web/src/styles/globals.css,
    web/src/config/site.ts,
    web/src/config/navigation.ts,
    web/src/app/layout.tsx,
    web/src/app/page.tsx
  </files>
  <read_first>
    mobile/src/theme/tokens/palette.ts,
    mobile/src/theme/tokens/semantic.ts,
    mobile/src/theme/aura-colors.ts,
    mobile/src/theme/typography-roles.ts,
    web/tailwind.config.js,
    web/components.json
  </read_first>
  <action>
**Step 1: Create web/src/styles/globals.css** with CSS custom properties mapped from mobile palette tokens. Values are pre-computed HSL from the mobile hex values:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand: Coral (primary) — from palette.ts coral500 #FF6B81 */
    --primary: 351 100% 71%;
    --primary-foreground: 0 0% 100%;

    /* Secondary: Indigo — from palette.ts indigo500 #7B61FF */
    --secondary: 250 100% 69%;
    --secondary-foreground: 0 0% 100%;

    /* Accent: Teal — from palette.ts teal500 #4FD1C5 */
    --accent: 174 56% 56%;
    --accent-foreground: 176 69% 18%;

    /* Destructive */
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    /* From semantic.ts lightColors */
    --background: 0 0% 100%;
    --foreground: 240 6% 10%;
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;
    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 351 100% 71%;
    --radius: 0.625rem;

    /* Aura gradient tokens */
    --gradient-coral-start: #FF8FA3;
    --gradient-coral-end: #E5556B;
    --gradient-indigo-start: #A5B4FC;
    --gradient-indigo-end: #6D4AE6;
    --gradient-teal-start: #5EEAD4;
    --gradient-teal-end: #0D9488;
  }

  .dark {
    /* From aura-colors.ts dark backgrounds */
    --background: 340 12% 9%;
    --foreground: 240 5% 96%;
    --card: 340 15% 13%;
    --card-foreground: 240 5% 96%;
    --popover: 340 15% 13%;
    --popover-foreground: 240 5% 96%;
    --muted: 340 15% 13%;
    --muted-foreground: 240 4% 46%;
    --border: 340 13% 19%;
    --input: 340 13% 19%;
    --primary: 351 100% 71%;
    --primary-foreground: 0 0% 100%;
    --secondary: 250 100% 69%;
    --secondary-foreground: 0 0% 100%;
    --accent: 174 56% 56%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 86% 97%;
    --ring: 351 100% 71%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 2: Create web/src/config/site.ts:**
```typescript
export const siteConfig = {
  name: "Em+",
  description: "Ung dung quan ly moi quan he danh cho cac cap doi. Ket noi, chia se va cung nhau xay dung hanh phuc.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://emplus.app",
  ogImage: "/images/og-default.png",
  locale: "vi_VN",
  language: "vi",
  creator: "Em+ Team",
  links: {
    appStore: "#", // TODO: Replace with real App Store link
    playStore: "#", // TODO: Replace with real Play Store link
  },
} as const

export type SiteConfig = typeof siteConfig
```

**Step 3: Create web/src/config/navigation.ts:**
```typescript
export const mainNav = [
  { title: "Trang chu", href: "/" },
  { title: "Tinh nang", href: "/#features" },
  { title: "Blog", href: "/blog" },
] as const

export const footerNav = {
  product: [
    { title: "Tinh nang", href: "/#features" },
    { title: "Tai ung dung", href: "/#download" },
    { title: "Blog", href: "/blog" },
  ],
  legal: [
    { title: "Chinh sach bao mat", href: "/privacy" },
    { title: "Dieu khoan su dung", href: "/terms" },
  ],
} as const
```

**Step 4: Create web/src/app/layout.tsx** — Root layout with Be Vietnam Pro font (via next/font/google), ThemeProvider (next-themes), and site metadata:
```tsx
import type { Metadata, Viewport } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Ung dung danh cho cac cap doi`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  robots: { index: true, follow: true },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1416" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Step 5: Create web/src/components/theme-provider.tsx** — Thin wrapper around next-themes:
```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

**Step 6: Create web/src/app/page.tsx** — Minimal placeholder that verifies theme and fonts work:
```tsx
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-primary">Em+</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Ung dung quan ly moi quan he danh cho cac cap doi
      </p>
    </main>
  )
}
```
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus/web && bun run typecheck && timeout 15 bun --bun next build 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q '\-\-primary:' /Users/truongdq/tx/GitHub/emplus/web/src/styles/globals.css` returns 0
    - `grep -q '\.dark' /Users/truongdq/tx/GitHub/emplus/web/src/styles/globals.css` returns 0
    - `grep -q 'siteConfig' /Users/truongdq/tx/GitHub/emplus/web/src/config/site.ts` returns 0
    - `grep -q 'vi_VN' /Users/truongdq/tx/GitHub/emplus/web/src/config/site.ts` returns 0
    - `grep -q 'Be_Vietnam_Pro' /Users/truongdq/tx/GitHub/emplus/web/src/app/layout.tsx` returns 0
    - `grep -q 'ThemeProvider' /Users/truongdq/tx/GitHub/emplus/web/src/app/layout.tsx` returns 0
    - `grep -q 'lang="vi"' /Users/truongdq/tx/GitHub/emplus/web/src/app/layout.tsx` returns 0
    - `grep -q 'mainNav' /Users/truongdq/tx/GitHub/emplus/web/src/config/navigation.ts` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/theme-provider.tsx` returns 0
    - TypeScript typecheck passes with zero errors
  </acceptance_criteria>
  <done>globals.css has light/dark CSS custom properties from mobile palette, site config exports siteConfig with Vietnamese metadata, root layout loads Be Vietnam Pro font and wraps children in ThemeProvider, placeholder page renders with primary color and muted-foreground text</done>
</task>

</tasks>

<verification>
1. `bun install` from repo root succeeds (web workspace linked)
2. `cd web && bun run typecheck` passes
3. `cd web && bun --bun next build` completes without errors
4. Dev server starts: `cd web && bun --bun next dev` shows page at http://localhost:3000
5. Page displays "Em+" in coral color with Be Vietnam Pro font
</verification>

<success_criteria>
- web/ workspace fully configured with Next.js 16, Tailwind v3, shadcn/ui
- Root layout loads Be Vietnam Pro font, applies theme provider
- CSS custom properties map mobile palette (coral500=#FF6B81 as --primary, indigo500=#7B61FF as --secondary, teal500=#4FD1C5 as --accent)
- Dark mode uses aura-colors.ts dark backgrounds (#1A1416, #261C20, #362A2E)
- TypeScript compiles, Next.js builds successfully
</success_criteria>

<output>
After completion, create `.planning/phases/phase-landing-page-seo/01-SUMMARY.md`
</output>
