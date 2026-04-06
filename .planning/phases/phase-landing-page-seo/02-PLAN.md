---
phase: landing-page-seo
plan: 02
type: execute
wave: 2
depends_on: ["01"]
files_modified:
  - web/src/components/layout/Header.tsx
  - web/src/components/layout/Footer.tsx
  - web/src/components/layout/MobileNav.tsx
  - web/src/components/landing/HeroSection.tsx
  - web/src/components/landing/FeatureSection.tsx
  - web/src/components/landing/FeatureCard.tsx
  - web/src/components/landing/TestimonialSection.tsx
  - web/src/components/landing/DownloadCTA.tsx
  - web/src/app/page.tsx
  - web/src/app/layout.tsx
autonomous: true
requirements: [WEB-HERO, WEB-FEATURES, WEB-DOWNLOAD, WEB-TESTIMONIALS, WEB-RESPONSIVE, WEB-VIETNAMESE]

must_haves:
  truths:
    - "Landing page has a hero section with app name, tagline, and download buttons"
    - "Feature sections display all 7 app capabilities with icons and descriptions"
    - "Testimonial section shows social proof quotes"
    - "Download CTA section has App Store and Play Store buttons"
    - "Header has navigation links and dark mode toggle"
    - "Footer has product links, legal links, and copyright"
    - "Page is mobile-responsive (stacks on small screens, grid on large)"
    - "All text is in Vietnamese"
  artifacts:
    - path: "web/src/components/landing/HeroSection.tsx"
      provides: "Hero with tagline, description, CTA buttons"
      contains: "HeroSection"
    - path: "web/src/components/landing/FeatureSection.tsx"
      provides: "Grid of feature cards"
      contains: "FeatureSection"
    - path: "web/src/components/landing/FeatureCard.tsx"
      provides: "Individual feature card component"
      contains: "FeatureCard"
    - path: "web/src/components/landing/TestimonialSection.tsx"
      provides: "Testimonial quotes grid"
      contains: "TestimonialSection"
    - path: "web/src/components/landing/DownloadCTA.tsx"
      provides: "Download CTA with store links"
      contains: "DownloadCTA"
    - path: "web/src/components/layout/Header.tsx"
      provides: "Site header with nav and theme toggle"
      contains: "Header"
    - path: "web/src/components/layout/Footer.tsx"
      provides: "Site footer with links"
      contains: "Footer"
  key_links:
    - from: "web/src/app/page.tsx"
      to: "web/src/components/landing/HeroSection.tsx"
      via: "import and render"
      pattern: "import.*HeroSection"
    - from: "web/src/app/layout.tsx"
      to: "web/src/components/layout/Header.tsx"
      via: "import and render in body"
      pattern: "import.*Header"
    - from: "web/src/components/landing/DownloadCTA.tsx"
      to: "web/src/config/site.ts"
      via: "siteConfig.links.appStore/playStore"
      pattern: "siteConfig\\.links"
---

<objective>
Build the complete landing page with Hero, Feature showcase (all 7 Em+ capabilities), Testimonials, Download CTA, Header with navigation and dark mode toggle, and Footer. All content in Vietnamese, mobile-responsive with Tailwind, using shadcn/ui components.

Purpose: This is the primary marketing page for Em+. It must showcase the app's value proposition, features, and drive downloads.
Output: Fully rendered landing page at `/` with all sections, responsive design, and dark/light mode support.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-landing-page-seo/CONTEXT.md
@.planning/phases/phase-landing-page-seo/RESEARCH.md
@.planning/phases/phase-landing-page-seo/01-SUMMARY.md

<interfaces>
<!-- From Plan 01 outputs -->
From web/src/config/site.ts:
```typescript
export const siteConfig = {
  name: "Em+",
  description: "...",
  url: "https://emplus.app",
  ogImage: "/images/og-default.png",
  locale: "vi_VN",
  language: "vi",
  creator: "Em+ Team",
  links: { appStore: "#", playStore: "#" },
}
```

From web/src/config/navigation.ts:
```typescript
export const mainNav = [
  { title: "Trang chu", href: "/" },
  { title: "Tinh nang", href: "/#features" },
  { title: "Blog", href: "/blog" },
]
export const footerNav = {
  product: [...],
  legal: [...],
}
```

From web/src/lib/utils.ts:
```typescript
export function cn(...inputs: ClassValue[]): string
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Header, Footer, MobileNav, and wire into root layout</name>
  <files>
    web/src/components/layout/Header.tsx,
    web/src/components/layout/Footer.tsx,
    web/src/components/layout/MobileNav.tsx,
    web/src/components/layout/ThemeToggle.tsx,
    web/src/app/layout.tsx
  </files>
  <read_first>
    web/src/config/site.ts,
    web/src/config/navigation.ts,
    web/src/lib/utils.ts,
    web/src/app/layout.tsx,
    web/src/components/theme-provider.tsx
  </read_first>
  <action>
**Step 1: Create web/src/components/layout/ThemeToggle.tsx** — Client component for dark/light mode:
```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Chuyen doi giao dien"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

**Step 2: Create web/src/components/layout/MobileNav.tsx** — Client component using shadcn Sheet:
```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { mainNav } from "@/config/navigation"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetTitle className="sr-only">Menu dieu huong</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

**Step 3: Create web/src/components/layout/Header.tsx** — Server component with sticky positioning:
```tsx
import Link from "next/link"
import { Heart } from "lucide-react"
import { mainNav } from "@/config/navigation"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "./ThemeToggle"
import { MobileNav } from "./MobileNav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
```

**Step 4: Create web/src/components/layout/Footer.tsx** — Server component:
```tsx
import Link from "next/link"
import { Heart } from "lucide-react"
import { siteConfig } from "@/config/site"
import { footerNav } from "@/config/navigation"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold mb-3">San pham</h3>
            <ul className="space-y-2">
              {footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-semibold mb-3">Phap ly</h3>
            <ul className="space-y-2">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Moi quyen duoc bao luu.
        </div>
      </div>
    </footer>
  )
}
```

**Step 5: Update web/src/app/layout.tsx** — Add Header and Footer to the body:
```tsx
// Add imports:
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

// In the body, wrap children:
<Header />
<main className="flex-1">{children}</main>
<Footer />
```
Make the body use `flex flex-col min-h-screen` to push footer to bottom.
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus/web && bun run typecheck</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q 'ThemeToggle' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/Header.tsx` returns 0
    - `grep -q 'MobileNav' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/Header.tsx` returns 0
    - `grep -q 'mainNav' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/Header.tsx` returns 0
    - `grep -q 'footerNav' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/Footer.tsx` returns 0
    - `grep -q 'useTheme' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/ThemeToggle.tsx` returns 0
    - `grep -q '"use client"' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/MobileNav.tsx` returns 0
    - `grep -q 'Header' /Users/truongdq/tx/GitHub/emplus/web/src/app/layout.tsx` returns 0
    - `grep -q 'Footer' /Users/truongdq/tx/GitHub/emplus/web/src/app/layout.tsx` returns 0
    - `grep -q 'backdrop-blur' /Users/truongdq/tx/GitHub/emplus/web/src/components/layout/Header.tsx` returns 0 (glass morphism header)
  </acceptance_criteria>
  <done>Header renders with logo, nav links, theme toggle, and mobile menu. Footer renders with product links, legal links, and copyright. Both are wired into root layout.</done>
</task>

<task type="auto">
  <name>Task 2: Create landing page sections (Hero, Features, Testimonials, Download CTA) and assemble page</name>
  <files>
    web/src/components/landing/HeroSection.tsx,
    web/src/components/landing/FeatureSection.tsx,
    web/src/components/landing/FeatureCard.tsx,
    web/src/components/landing/TestimonialSection.tsx,
    web/src/components/landing/DownloadCTA.tsx,
    web/src/app/page.tsx
  </files>
  <read_first>
    web/src/config/site.ts,
    web/src/lib/utils.ts,
    .planning/phases/phase-landing-page-seo/CONTEXT.md
  </read_first>
  <action>
**Step 1: Create web/src/components/landing/HeroSection.tsx** — Full-width hero with gradient background, tagline, and CTA buttons:
```tsx
import Link from "next/link"
import { Heart, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      {/* Gradient background orbs for glass morphism feel */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span>Ung dung danh cho cac cap doi</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Cung nhau xay dung{" "}
            <span className="bg-gradient-to-r from-[var(--gradient-coral-start)] to-[var(--gradient-coral-end)] bg-clip-text text-transparent">
              hanh phuc
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={siteConfig.links.appStore}>
                Tai cho iOS
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={siteConfig.links.playStore}>
                Tai cho Android
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Create web/src/components/landing/FeatureCard.tsx:**
```tsx
import { type LucideIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient?: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, gradient, className }: FeatureCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300",
      className
    )}>
      {gradient && (
        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity", gradient)} />
      )}
      <CardHeader>
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
```

**Step 3: Create web/src/components/landing/FeatureSection.tsx** — Grid of 7 features matching CONTEXT.md requirements:
```tsx
import {
  QrCode, Camera, Wallet, HeartPulse, Radio, Bell, Palette,
} from "lucide-react"
import { FeatureCard } from "./FeatureCard"

const features = [
  {
    icon: QrCode,
    title: "Ket noi cap doi",
    description: "Quet ma QR de ket noi tai khoan voi nguoi yeu. Don gian, nhanh chong va bao mat.",
  },
  {
    icon: Camera,
    title: "Dong thoi gian & Ky niem",
    description: "Luu giu nhung khoanh khac dang nho. Nhat ky anh, dem ngay yeu thuong cung nhau.",
  },
  {
    icon: Wallet,
    title: "Quan ly chi tieu",
    description: "Theo doi chi tieu chung mot cach de dang. Ngan sach ro rang, tai chinh lanh manh.",
  },
  {
    icon: HeartPulse,
    title: "Cham soc & Tam trang",
    description: "Theo doi suc khoe cam xuc. Hieu doi phuong hon qua viec chia se tam trang moi ngay.",
  },
  {
    icon: Radio,
    title: "Dong bo thoi gian thuc",
    description: "Moi thay doi duoc cap nhat ngay lap tuc qua WebSocket. Luon ket noi, luon dong bo.",
  },
  {
    icon: Bell,
    title: "Thong bao thong minh",
    description: "Khong bao gio bo lo nhung dieu quan trong. Thong bao kip thoi ve hoat dong cua doi phuong.",
  },
  {
    icon: Palette,
    title: "Giao dien tinh te",
    description: "Hieu ung kinh mo, che do toi sang. Trai nghiem dep mat, muot ma tren moi thiet bi.",
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Moi tinh nang, mot{" "}
            <span className="text-primary">trai nghiem</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Em+ duoc thiet ke de giup cac cap doi ket noi sau sac hon, quan ly cuoc song chung de dang hon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 4: Create web/src/components/landing/TestimonialSection.tsx:**
```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Em+ giup chung minh gan nhau hon du o xa. Tinh nang dong thoi gian la thu chung minh yeu thich nhat!",
    author: "Minh & Linh",
    role: "Cap doi 2 nam",
  },
  {
    quote: "Quan ly chi tieu chung chua bao gio de dang nhu vay. Khong con cai nhau vi tien nua!",
    author: "Duc & Trang",
    role: "Cap doi 3 nam",
  },
  {
    quote: "Giao dien dep, muot ma. Moi ngay deu muon mo app len de xem tam trang cua nguoi yeu.",
    author: "Huy & Nhi",
    role: "Cap doi 1 nam",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Duoc cac cap doi{" "}
            <span className="text-primary">tin tuong</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nhung chia se tu nhung cap doi dang su dung Em+
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 5: Create web/src/components/landing/DownloadCTA.tsx:**
```tsx
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function DownloadCTA() {
  return (
    <section id="download" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      </div>

      <div className="container text-center">
        <Heart className="h-12 w-12 text-primary fill-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Bat dau hanh trinh cung nhau
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Tai Em+ ngay hom nay va kham pha cach moi de yeu thuong, chia se va gan ket.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={siteConfig.links.appStore}>
              Tai cho iOS
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={siteConfig.links.playStore}>
              Tai cho Android
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

**Step 6: Assemble web/src/app/page.tsx** — Replace placeholder with full landing page:
```tsx
import { HeroSection } from "@/components/landing/HeroSection"
import { FeatureSection } from "@/components/landing/FeatureSection"
import { TestimonialSection } from "@/components/landing/TestimonialSection"
import { DownloadCTA } from "@/components/landing/DownloadCTA"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <DownloadCTA />
    </>
  )
}
```
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus/web && bun run typecheck</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q 'HeroSection' /Users/truongdq/tx/GitHub/emplus/web/src/app/page.tsx` returns 0
    - `grep -q 'FeatureSection' /Users/truongdq/tx/GitHub/emplus/web/src/app/page.tsx` returns 0
    - `grep -q 'TestimonialSection' /Users/truongdq/tx/GitHub/emplus/web/src/app/page.tsx` returns 0
    - `grep -q 'DownloadCTA' /Users/truongdq/tx/GitHub/emplus/web/src/app/page.tsx` returns 0
    - `grep -q 'Ket noi cap doi' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns 0 (feature 1: pairing)
    - `grep -q 'Quan ly chi tieu' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns 0 (feature 3: budget)
    - `grep -q 'Cham soc' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns 0 (feature 4: care/mood)
    - `grep -q 'Dong bo thoi gian thuc' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns 0 (feature 5: live)
    - `grep -q 'Giao dien tinh te' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns 0 (feature 7: theme)
    - `grep -q 'siteConfig.links' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/DownloadCTA.tsx` returns 0
    - `grep -c 'FeatureCard' /Users/truongdq/tx/GitHub/emplus/web/src/components/landing/FeatureSection.tsx` returns at least 7
    - TypeScript typecheck passes
  </acceptance_criteria>
  <done>Landing page at / renders Hero with gradient background and CTA buttons, 7 FeatureCards in responsive grid (pairing, timeline, budget, care, live, notifications, theme), 3 testimonial cards with star ratings, and Download CTA with App Store / Play Store buttons. All text in Vietnamese. Mobile-responsive layout.</done>
</task>

</tasks>

<verification>
1. `bun run typecheck` passes
2. `bun --bun next build` completes
3. Landing page at `/` shows Hero, Features (7 cards), Testimonials (3 cards), Download CTA
4. Header has navigation links and dark mode toggle
5. Footer has product and legal links
6. Mobile nav works on small screens (Sheet component)
7. All visible text is Vietnamese
</verification>

<success_criteria>
- All 7 Em+ features displayed: pairing (QR), timeline, budget, care/mood, live sync, notifications, theme
- Hero section has gradient background effects and two CTA buttons (iOS, Android)
- Testimonial section shows 3 testimonials with 5-star ratings
- Download CTA section has store links from siteConfig
- Header is sticky with backdrop-blur (glass morphism), includes dark mode toggle
- Footer has 3-column layout with brand, product links, legal links
- Page is responsive: single column on mobile, multi-column grid on desktop
- All text content is in Vietnamese
</success_criteria>

<output>
After completion, create `.planning/phases/phase-landing-page-seo/02-SUMMARY.md`
</output>
