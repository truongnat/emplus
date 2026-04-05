# Phase: Landing Page & Blog for SEO - Research

**Researched:** 2026-04-05
**Domain:** Next.js SSG/SSR landing page, MDX blog, SEO, Tailwind CSS in Bun monorepo
**Confidence:** HIGH

## Summary

This phase adds a `web/` workspace to the existing Bun monorepo to serve as a public-facing landing page and blog for the Em+ app. Next.js App Router (v16.x) is the framework choice, providing built-in SSR/SSG, metadata API for SEO, sitemap/robots.txt generation, and image optimization. The blog uses Velite + MDX for file-based content with Zod-validated frontmatter, categories, and tags. Styling uses Tailwind CSS v3 (matching design-builder) with shadcn/ui components, themed to align with the mobile app's coral/indigo/teal palette and Be Vietnam Pro typography.

The monorepo already uses Bun workspaces with three packages (api, mobile, design-builder). Adding `web/` follows the same pattern. Bun is used as the package manager; Next.js runs via `bun --bun next dev/build`. There is a known Bun workspace issue with `@types/node` resolution that requires explicitly installing TypeScript types in the web workspace's own dependencies.

**Primary recommendation:** Use Next.js 16 App Router with Velite for MDX content processing, shadcn/ui (v2.3.0 for Tailwind v3) for components, and the built-in Next.js Metadata API for all SEO (sitemap, robots, og:tags, structured data). Deploy to Vercel for zero-config Next.js hosting.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- New workspace `web/` added to root `package.json` workspaces array
- Must integrate with existing Bun workspaces setup
- Can share dependencies from root (React 19, TypeScript, clsx, tailwind-merge)
- Next.js (App Router) for SSR/SSG
- Tailwind CSS for styling
- MDX for blog content
- Deployed separately from API and mobile
- Hero section showcasing Em+ app (relationship management app for couples)
- Feature sections highlighting all app capabilities (pairing, timeline, budget, care, live, notifications, theme system)
- App store download links (iOS + Android)
- Social proof / testimonials section
- Vietnamese language primary
- MDX-based blog posts with categories, tags, pagination
- SEO metadata (og:tags, structured data, sitemap)
- RSS feed
- Privacy Policy and Terms of Service pages
- SSR/SSG for all pages
- Proper meta tags, sitemap.xml, robots.txt
- Schema.org structured data (App, Organization, BlogPosting)
- Fast Core Web Vitals
- Mobile-responsive design

### Claude's Discretion
- Specific component library (shadcn/ui recommended given design-builder uses Radix primitives)
- Image optimization strategy
- Analytics integration
- Deployment target (Vercel recommended for Next.js)
- Blog post content (structure only, not actual content)

### Deferred Ideas (OUT OF SCOPE)
- Multi-language support (English, etc.) -- future phase
- CMS integration for blog (start with file-based MDX)
- User authentication on web (app-only for now)
- Web-based dashboard for couples (app-only for now)
</user_constraints>

## Project Constraints (from CLAUDE.md)

- **MUST run impact analysis** before editing any symbol using `gitnexus_impact`
- **MUST run `gitnexus_detect_changes()`** before committing
- **MUST warn user** if impact analysis returns HIGH or CRITICAL risk
- **NEVER edit** a function/class/method without first running `gitnexus_impact`
- **NEVER rename** symbols with find-and-replace -- use `gitnexus_rename`
- **NEVER commit** without running `gitnexus_detect_changes()`
- Use `gitnexus_query` for exploring unfamiliar code
- Use `gitnexus_context` for full symbol context

**Note for this phase:** Since `web/` is a brand-new workspace with no existing symbols, GitNexus impact analysis is primarily relevant when modifying root `package.json` or any shared configuration files. New files within `web/` will not have existing callers/dependents to break.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.x | SSR/SSG framework with App Router | Best React SEO framework; built-in metadata API, sitemap, robots, image optimization |
| react | 19.2.0 | UI library (shared from root) | Already pinned in root overrides |
| react-dom | 19.2.0 | DOM rendering (shared from root) | Already pinned in root overrides |
| tailwindcss | ^3.4.17 | Utility-first CSS | Matches design-builder; v3 for compatibility with existing setup |
| velite | ^0.3.1 | MDX content processing with Zod schemas | Actively maintained Contentlayer replacement; type-safe, file-based |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | ^0.5.x | Prose styling for blog content | All MDX-rendered pages |
| tailwindcss-animate | ^1.0.7 | CSS animations | Matches design-builder |
| class-variance-authority | ^0.7.1 | Component variant system | All shadcn/ui components |
| clsx | 2.1.1 | Conditional class merging (shared from root) | All components |
| tailwind-merge | 3.5.0 | Tailwind class dedup (shared from root) | All components via `cn()` |
| lucide-react | ^0.474.0 | Icon set | Matches design-builder |
| rehype-pretty-code | ^0.14.x | Shiki-based syntax highlighting | Blog code blocks |
| shiki | ^1.x | Syntax highlighter engine | Required by rehype-pretty-code |
| remark-gfm | ^4.x | GitHub Flavored Markdown | Tables, strikethrough in blog posts |
| rehype-slug | ^6.x | Heading ID generation | Blog post anchor links |
| rehype-autolink-headings | ^7.x | Clickable heading anchors | Blog post navigation |
| rss | ^1.2.2 | RSS feed generation | `/feed.xml` route handler |
| postcss | ^8.5.x | CSS processing | Tailwind pipeline |
| autoprefixer | ^10.4.x | CSS vendor prefixes | Tailwind pipeline |

### shadcn/ui (CLI-installed, not npm)
Use `bunx --bun shadcn@2.3.0` for Tailwind v3 compatibility. Components are copied into the project, not installed as dependencies. Key components needed:
- Button, Card, Badge, Separator (landing page)
- NavigationMenu (header)
- Sheet (mobile nav)
- Tabs (feature showcase)
- Accordion (FAQ)
- Input, Textarea (contact/newsletter)
- Pagination (blog listing)
- Breadcrumb (blog navigation)
- ThemeProvider + Toggle (dark/light mode)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Velite | next-mdx-remote | next-mdx-remote requires more manual frontmatter parsing; no Zod validation; no automatic type generation |
| Velite | @next/mdx | No frontmatter support out of box; limited to page-per-file routing; no content layer abstraction |
| Velite | Contentlayer | Abandoned since mid-2023; does not support Next.js 14+; not viable |
| shadcn/ui | Radix + custom | shadcn already uses Radix; provides pre-built accessible patterns; matches design-builder's existing Radix setup |
| Tailwind v3 | Tailwind v4 | design-builder uses v3; switching would require migrating existing config; shadcn@2.3.0 targets v3 |

**Installation:**
```bash
# From web/ workspace directory
bun add next@latest react react-dom
bun add tailwindcss@^3.4 postcss autoprefixer @tailwindcss/typography tailwindcss-animate
bun add velite remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki
bun add class-variance-authority lucide-react rss
bun add -d typescript @types/node @types/react @types/react-dom

# shadcn/ui initialization (run from web/ directory)
bunx --bun shadcn@2.3.0 init
```

## Architecture Patterns

### Recommended Project Structure
```
web/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.js        # Extends shared preset
├── postcss.config.js
├── velite.config.ts           # Content schema definitions
├── components.json            # shadcn/ui config
├── content/
│   ├── blog/                  # MDX blog posts
│   │   ├── relationship-tips-for-couples.mdx
│   │   └── em-plus-update-v2.mdx
│   ├── pages/                 # Static MDX pages
│   │   ├── privacy-policy.mdx
│   │   └── terms-of-service.mdx
│   └── authors/               # Author metadata (YAML)
├── public/
│   ├── images/                # Landing page assets, app screenshots
│   ├── og/                    # Open Graph images
│   └── static/                # Velite-processed assets
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: fonts, theme, analytics
│   │   ├── page.tsx           # Landing page (SSG)
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing with pagination (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Blog post (SSG via generateStaticParams)
│   │   ├── privacy/
│   │   │   └── page.tsx       # Privacy policy (SSG)
│   │   ├── terms/
│   │   │   └── page.tsx       # Terms of service (SSG)
│   │   ├── feed.xml/
│   │   │   └── route.ts       # RSS feed route handler
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── robots.ts          # Robots.txt generation
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (CLI-installed)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeatureSection.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── DownloadCTA.tsx
│   │   │   └── AppScreenshot.tsx
│   │   ├── blog/
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostList.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── TagBadge.tsx
│   │   │   └── TableOfContents.tsx
│   │   └── mdx/
│   │       └── MDXComponents.tsx  # Custom MDX component mapping
│   ├── lib/
│   │   ├── utils.ts           # cn() helper (same as design-builder)
│   │   ├── content.ts         # Blog query helpers (filter, sort, paginate)
│   │   └── seo.ts             # Structured data generators
│   ├── config/
│   │   ├── site.ts            # Site metadata (title, description, URL)
│   │   └── navigation.ts     # Nav links
│   └── styles/
│       └── globals.css        # Tailwind imports + CSS custom properties
└── .velite/                   # Generated content (gitignored)
```

### Pattern 1: Velite Content Layer with Zod Schema
**What:** Define blog post schema with Zod validation, generate typed content at build time
**When to use:** All MDX content processing
**Example:**
```typescript
// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    title: s.string().max(120),
    slug: s.slug('blog'),
    description: s.string().max(300),
    date: s.isodate(),
    updated: s.isodate().optional(),
    cover: s.image().optional(),
    category: s.string(),
    tags: s.array(s.string()).default([]),
    published: s.boolean().default(true),
    author: s.string().default('Em+ Team'),
    body: s.mdx(),
  }),
})

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('pages'),
    description: s.string().optional(),
    body: s.mdx(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark-dimmed' }],
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
})
```

### Pattern 2: Next.js Built-in Metadata API for SEO
**What:** Use Next.js file conventions and generateMetadata for all SEO concerns
**When to use:** Every page and layout
**Example:**
```typescript
// src/app/blog/[slug]/page.tsx
import { posts } from '#site/content'  // Velite alias
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return posts
    .filter(p => p.published)
    .map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: post.cover ? [{ url: post.cover }] : [],
    },
  }
}
```

### Pattern 3: Sitemap and Robots via File Convention
**What:** Use Next.js sitemap.ts and robots.ts file conventions instead of third-party packages
**When to use:** SEO setup
**Example:**
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { posts } from '#site/content'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = posts
    .filter(p => p.published)
    .map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updated || post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteConfig.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    ...blogEntries,
  ]
}

// src/app/robots.ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

### Pattern 4: Theme Alignment with Mobile Token System
**What:** Map mobile palette tokens to Tailwind CSS custom properties for design consistency
**When to use:** globals.css theme setup
**Example:**
```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Mapped from mobile/src/theme/tokens/palette.ts */
    /* Brand: Coral (primary) */
    --primary: 353 100% 71%;          /* coral500: #FF6B81 */
    --primary-foreground: 0 0% 100%;

    /* Secondary: Indigo */
    --secondary: 255 100% 69%;        /* indigo500: #7B61FF */
    --secondary-foreground: 0 0% 100%;

    /* Accent: Teal */
    --accent: 174 43% 55%;            /* teal500: #4FD1C5 */
    --accent-foreground: 0 0% 100%;

    /* From mobile semantic.ts lightColors */
    --background: 0 0% 100%;          /* white */
    --foreground: 240 6% 10%;         /* zinc900: #18181B */
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --muted: 240 5% 96%;              /* zinc100: #F4F4F5 */
    --muted-foreground: 240 4% 46%;   /* zinc500: #71717A */
    --border: 240 6% 90%;             /* zinc200: #E4E4E7 */
    --input: 240 6% 90%;
    --ring: 353 100% 71%;             /* coral500 */
    --radius: 0.625rem;               /* 10px, matching mobile radius.md */

    /* Aura special colors */
    --aura-coral-gradient-start: #FF8FA3;
    --aura-coral-gradient-end: #E5556B;
    --aura-indigo-gradient-start: #A5B4FC;
    --aura-indigo-gradient-end: #6D4AE6;
    --aura-teal-gradient-start: #5EEAD4;
    --aura-teal-gradient-end: #0D9488;
  }

  .dark {
    /* Mapped from mobile aura-colors.ts dark backgrounds */
    --background: 340 12% 9%;         /* darkBg: #1A1416 */
    --foreground: 240 5% 96%;         /* zinc50: #FAFAFA */
    --card: 340 15% 13%;              /* darkSurf: #261C20 */
    --card-foreground: 240 5% 96%;
    --muted: 340 15% 13%;
    --muted-foreground: 240 4% 46%;
    --border: 340 13% 19%;            /* darkBord: #362A2E */
    --input: 340 13% 19%;
    --primary: 353 100% 71%;
    --primary-foreground: 0 0% 100%;
    --secondary: 255 100% 69%;
    --secondary-foreground: 0 0% 100%;
    --accent: 174 43% 55%;
    --accent-foreground: 0 0% 100%;
    --ring: 353 100% 71%;
  }
}
```

### Pattern 5: RSS Feed via Route Handler
**What:** Generate RSS XML using a Next.js route handler at `/feed.xml`
**When to use:** Blog RSS feed
**Example:**
```typescript
// src/app/feed.xml/route.ts
import RSS from 'rss'
import { posts } from '#site/content'
import { siteConfig } from '@/config/site'

export async function GET() {
  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: 'vi',
  })

  posts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${siteConfig.url}/blog/${post.slug}`,
        date: post.date,
        categories: [post.category, ...post.tags],
      })
    })

  return new Response(feed.xml({ indent: true }), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
```

### Pattern 6: Structured Data (JSON-LD)
**What:** Schema.org structured data for rich search results
**When to use:** Landing page (SoftwareApplication), blog posts (BlogPosting), organization
**Example:**
```typescript
// src/lib/seo.ts
import { siteConfig } from '@/config/site'

export function generateAppStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Em+',
    description: siteConfig.description,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
    author: { '@type': 'Organization', name: 'Em+', url: siteConfig.url },
  }
}

export function generateBlogPostStructuredData(post: {
  title: string; description: string; date: string;
  updated?: string; slug: string; author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Em+', url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }
}

// Usage in layout/page:
// <script type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
// />
```

### Anti-Patterns to Avoid
- **Do NOT use `next-sitemap` package:** Next.js 16 has built-in sitemap.ts and robots.ts file conventions. No external package needed.
- **Do NOT use Contentlayer:** Abandoned since mid-2023, does not support Next.js 14+.
- **Do NOT use Tailwind v4 in web/:** design-builder uses v3; mixing versions causes config incompatibility. Keep v3 until the whole monorepo migrates.
- **Do NOT use `getStaticProps`/`getServerSideProps`:** These are Pages Router APIs. Use `generateStaticParams` + `generateMetadata` in App Router.
- **Do NOT put `"use client"` on page components:** Landing page and blog pages should be Server Components for SEO. Only interactive elements (mobile nav, theme toggle, carousels) need client directives.
- **Do NOT inline large images as base64:** Use `next/image` with proper `width`, `height`, and `priority` props.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | Next.js `sitemap.ts` file convention | Built-in, typed, cached, auto-discovered by crawlers |
| Robots.txt | Static file or custom handler | Next.js `robots.ts` file convention | Typed, dynamic, co-located with app |
| MDX processing | Custom remark/rehype pipeline | Velite with schema validation | Type-safe, Zod-validated, auto-generates TypeScript types |
| Image optimization | Manual resizing/format conversion | `next/image` component | Automatic WebP/AVIF, lazy loading, blur placeholders, CLS prevention |
| RSS feed XML | Manual XML string building | `rss` npm package | Handles XML escaping, spec compliance, multiple formats |
| Syntax highlighting | highlight.js or custom | `rehype-pretty-code` + Shiki | VS Code-quality highlighting, build-time, zero client JS |
| Component variants | Manual className logic | `class-variance-authority` | Type-safe variants, composable, matches design-builder pattern |
| Font loading | Manual `@font-face` | `next/font/google` | Self-hosted, zero layout shift, automatic subsetting |
| Dark mode toggle | Custom localStorage logic | `next-themes` (used by shadcn) | SSR-safe, no flash, system preference detection |
| Accessible UI primitives | Custom focus/keyboard handling | shadcn/ui (Radix primitives) | WCAG compliant, tested, matches design-builder |

**Key insight:** Next.js 16 App Router has absorbed most SEO tooling that previously required third-party packages. The Metadata API, file conventions (sitemap.ts, robots.ts, opengraph-image.tsx), and `generateStaticParams` cover the vast majority of SEO needs natively.

## Common Pitfalls

### Pitfall 1: Bun Workspace TypeScript Resolution
**What goes wrong:** Next.js fails to start with "required TypeScript packages not installed" even though TypeScript is in the root
**Why it happens:** Bun uses isolated dependency resolution in workspaces. Next.js looks for `@types/node` in the nearest `node_modules/`, not the hoisted root
**How to avoid:** Explicitly add `typescript` and `@types/node` to `web/package.json` devDependencies, not just root
**Warning signs:** Error at `bun --bun next dev` startup about missing TypeScript packages

### Pitfall 2: Velite Build Timing with Next.js
**What goes wrong:** Content not found at build time; `.velite/` directory empty
**Why it happens:** Velite needs to run before or alongside Next.js build. The `next.config.mjs` approach triggers Velite lazily
**How to avoid:** Use the top-level import approach in `next.config.mjs` to start Velite before Next.js compiles pages. Add `.velite/` to `.gitignore` and tsconfig paths
**Warning signs:** Import errors for `#site/content`, empty blog pages

### Pitfall 3: CSS Custom Properties HSL Format
**What goes wrong:** Colors don't render; shadcn components appear unstyled
**Why it happens:** shadcn/ui expects CSS custom properties in HSL format WITHOUT the `hsl()` wrapper (e.g., `--primary: 353 100% 71%` not `--primary: hsl(353, 100%, 71%)`)
**How to avoid:** Follow the exact format from design-builder's `globals.css`. The Tailwind config uses `hsl(var(--primary))` to compose the final value
**Warning signs:** White/transparent backgrounds, missing colors on shadcn components

### Pitfall 4: Static Generation vs Server Rendering Confusion
**What goes wrong:** Pages that should be static are server-rendered on every request, slow TTFB
**Why it happens:** Using dynamic APIs (cookies, headers, searchParams) in pages that could be fully static
**How to avoid:** Blog posts and landing page should use `generateStaticParams` for full SSG. Only use dynamic rendering for search/filter pages. Add `export const dynamic = 'force-static'` where appropriate
**Warning signs:** Long TTFB on blog post pages, high server load

### Pitfall 5: Mobile Palette Hex-to-HSL Conversion Errors
**What goes wrong:** Web theme colors don't match mobile app colors despite using "same" palette
**Why it happens:** Manual hex-to-HSL conversion is error-prone; mobile uses hex values directly while web needs HSL for Tailwind/shadcn
**How to avoid:** Create a build-time script or constant mapping that converts the canonical hex values from palette.ts to HSL. Document the conversion. Test visually side-by-side
**Warning signs:** Colors look "off" compared to mobile app screenshots

### Pitfall 6: MDX Content Not Included in Sitemap
**What goes wrong:** Blog posts missing from sitemap.xml; Google not indexing new content
**Why it happens:** Sitemap.ts imports content at build time; if Velite hasn't processed content before sitemap generation, the list is empty
**How to avoid:** Ensure Velite build runs before Next.js static generation. The `next.config.mjs` integration handles this automatically
**Warning signs:** `/sitemap.xml` shows only static pages, no blog entries

### Pitfall 7: `next/image` Without Width/Height Causes CLS
**What goes wrong:** Cumulative Layout Shift (CLS) score tanks; images cause page jumps
**Why it happens:** Not providing `width` and `height` (or using `fill` with a sized container) to `next/image`
**How to avoid:** Always specify `width`/`height` for static images. Use `fill` + `sizes` for responsive images within positioned containers. Set `priority` on above-the-fold hero images
**Warning signs:** Google PageSpeed Insights CLS score > 0.1

### Pitfall 8: shadcn CLI in Bun Monorepo
**What goes wrong:** `shadcn init` or `shadcn add` fails with workspace dependency errors
**Why it happens:** shadcn CLI may not correctly resolve workspace dependencies in Bun monorepos
**How to avoid:** Run `bunx --bun shadcn@2.3.0 init` from within the `web/` directory (not root). If it fails, manually copy component files from shadcn docs -- they are just files, not a library
**Warning signs:** "workspace dependency not found" errors during `shadcn init`

## Code Examples

Verified patterns from official sources:

### Next.js Config for Bun Monorepo with Velite
```typescript
// web/next.config.mjs
// Source: https://velite.js.org/guide/with-nextjs + https://bun.com/docs/guides/ecosystem/nextjs

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const m = await import('velite')
  await m.build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  // Transpile workspace packages if shared
  transpilePackages: [],
  // Image domains for external images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

### Tailwind Config with Shared Preset
```javascript
// web/tailwind.config.js
// Extends design-builder's pattern with brand-specific Em+ colors

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include velite-generated content
    './content/**/*.{md,mdx}',
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
      // Same color system as design-builder, but with Em+ brand values
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Em+ specific extended palette
        coral: {
          50: "#FFF1F2", 100: "#FFE4E6", 200: "#FECDD3",
          300: "#FDA4AF", 400: "#FF8FA3", 500: "#FF6B81",
          600: "#E5556B", 700: "#CC3F55", 800: "#B3293F", 900: "#991329",
        },
        indigo: {
          50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE",
          300: "#A5B4FC", 400: "#8E7CFF", 500: "#7B61FF",
          600: "#6D4AE6", 700: "#5F33CC", 800: "#5126B3", 900: "#431999",
        },
        teal: {
          50: "#F0FDFA", 100: "#CCFBF1", 200: "#99F6E4",
          300: "#5EEAD4", 400: "#2DD4BF", 500: "#4FD1C5",
          600: "#0D9488", 700: "#0F766E", 800: "#115E59", 900: "#134E4A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam-pro)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
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

### Font Loading with next/font
```typescript
// src/app/layout.tsx
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Be_Vietnam_Pro, Roboto_Mono } from 'next/font/google'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${robotoMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Blog Pagination Helper
```typescript
// src/lib/content.ts
import { posts } from '#site/content'

const POSTS_PER_PAGE = 12

export function getPublishedPosts() {
  return posts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPaginatedPosts(page: number) {
  const allPosts = getPublishedPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  return {
    posts: allPosts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function getPostsByCategory(category: string) {
  return getPublishedPosts().filter(p => p.category === category)
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter(p => p.tags.includes(tag))
}

export function getAllCategories() {
  const cats = new Set(getPublishedPosts().map(p => p.category))
  return Array.from(cats).sort()
}

export function getAllTags() {
  const tags = new Set(getPublishedPosts().flatMap(p => p.tags))
  return Array.from(tags).sort()
}
```

### Monorepo package.json Integration
```jsonc
// Root package.json addition:
{
  "workspaces": ["mobile", "api", "design-builder", "web"]
}

// web/package.json:
{
  "name": "@emplus/web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "bun --bun next dev",
    "build": "bun --bun next build",
    "start": "bun --bun next start",
    "typecheck": "tsc --noEmit"
  }
}
```

### tsconfig.json with Velite Path Alias
```jsonc
// web/tsconfig.json
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
    "paths": {
      "@/*": ["./src/*"],
      "#site/content": ["./.velite"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".velite/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-sitemap` package | Built-in `sitemap.ts` file convention | Next.js 13.3+ (2023) | No third-party dependency for sitemap/robots |
| `getStaticProps` / `getServerSideProps` | `generateStaticParams` + Server Components | Next.js 13+ App Router (2023) | Simpler data fetching, better composition |
| Contentlayer for MDX | Velite | 2024 (Contentlayer abandoned) | Active maintenance, Zod schema, better DX |
| `next-seo` package | Built-in Metadata API | Next.js 13.2+ (2023) | Native metadata, typed, no dependency |
| `@next/bundle-analyzer` | `experimental.optimizePackageImports` | Next.js 15+ | Automatic tree shaking of known packages |
| Manual `@font-face` | `next/font/google` self-hosting | Next.js 13+ | Zero CLS, automatic subsetting, no Google requests |

**Deprecated/outdated:**
- **Contentlayer:** Last updated mid-2023; does not support Next.js 14+. Use Velite instead.
- **next-sitemap:** Unnecessary for most cases; Next.js built-in file conventions are simpler and typed.
- **next-seo:** Unnecessary; Next.js Metadata API covers all use cases natively.
- **Pages Router patterns (getStaticProps):** Still work but are legacy. App Router is the recommended path.

## Open Questions

1. **Vercel vs Self-hosted Deployment**
   - What we know: Vercel is the zero-config option for Next.js with best SSG/ISR support. The project already has Docker + K8s infrastructure for the API.
   - What's unclear: Whether the team wants Vercel (paid for custom domains, analytics) or self-hosted via Docker (more infrastructure work, standalone output mode)
   - Recommendation: Start with Vercel for fastest launch. The `next build` output works anywhere, so migration is straightforward.

2. **Domain Strategy**
   - What we know: The web needs a public domain for SEO (e.g., `emplus.vn` or `emplus.app`)
   - What's unclear: Domain name, DNS configuration, whether blog will be on subdomain (`blog.emplus.vn`) or path (`emplus.vn/blog`)
   - Recommendation: Use path-based routing (`/blog`) in the same Next.js app for maximum SEO link equity.

3. **Analytics Provider**
   - What we know: Claude's discretion area. Need to track page views, Core Web Vitals, and user behavior.
   - What's unclear: Budget, privacy preferences (GDPR-like compliance for Vietnamese users)
   - Recommendation: Vercel Analytics (if Vercel-hosted) or Plausible/Umami for privacy-friendly self-hosted analytics. Avoid Google Analytics for Vietnamese romantic app audience (privacy-conscious users).

4. **App Store Links Availability**
   - What we know: Landing page needs iOS + Android download links
   - What's unclear: Whether the app is already published to stores, or if links should be placeholder/waitlist
   - Recommendation: Use placeholder sections with "Coming Soon" / email signup if not yet published. Structure the component to accept store URLs as props.

## Environment Availability

> Note: Bun and Node.js are not available in the current research sandbox. Versions are based on project files and web research.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Bun | Package manager & runtime | Yes (project uses it) | ~1.3.x (per bun-types in lockfile) | -- |
| Node.js | Next.js runtime | Yes (required by Next.js) | 18+ required | -- |
| Docker | Not required for web/ | Yes (existing in project) | Per docker-compose.yml | Vercel deployment |
| PostgreSQL | Not required for web/ | N/A | -- | -- |

**Missing dependencies with no fallback:**
- None. The web workspace is self-contained and only needs Bun (for install) and Node.js (for Next.js runtime).

**Missing dependencies with fallback:**
- None identified.

## Sources

### Primary (HIGH confidence)
- [Next.js official docs - Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - sitemap.ts file convention
- [Next.js official docs - Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - robots.ts file convention
- [Next.js official docs - Fonts](https://nextjs.org/docs/app/getting-started/fonts) - next/font self-hosting
- [Next.js official docs - Image](https://nextjs.org/docs/app/getting-started/images) - next/image optimization
- [Velite official docs](https://velite.js.org/guide/with-nextjs) - Next.js integration
- [Velite GitHub](https://github.com/zce/velite) - v0.3.1, 755 stars, active maintenance
- [shadcn/ui installation - Next.js](https://ui.shadcn.com/docs/installation/next) - setup guide
- [shadcn/ui monorepo guide](https://ui.shadcn.com/docs/monorepo) - monorepo configuration
- [Bun ecosystem - Next.js](https://bun.com/docs/guides/ecosystem/nextjs) - `bun --bun next dev`

### Secondary (MEDIUM confidence)
- [Bun + Next.js workspace issue #25014](https://github.com/oven-sh/bun/issues/25014) - @types/node resolution workaround (open issue, Feb 2026)
- [Bun Compatibility in 2026](https://www.alexcloudstar.com/blog/bun-compatibility-2026-npm-nodejs-nextjs/) - runtime compatibility overview
- [Next.js 16 SEO Guide](https://jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16) - Next.js 16 specific SEO patterns
- [Velite blog template](https://github.com/jolbol1/nextjs-velite-blog-template) - reference implementation with Next.js + Velite + shadcn
- [rehype-pretty-code](https://rehype-pretty.pages.dev/) - Shiki-based syntax highlighting

### Tertiary (LOW confidence)
- Next.js 16.2.x exact version (from npm search, not verified against registry directly due to sandbox limitations)
- shadcn/ui exact compatibility matrix with Bun 1.3.x (based on community reports, not official testing)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Next.js App Router + Velite + shadcn/ui is well-documented and widely used
- Architecture: HIGH - Project structure follows established Next.js App Router conventions; theme mapping verified against actual palette.ts values
- Pitfalls: HIGH - Bun workspace issue is documented in open GitHub issue; Velite timing is documented in official docs; shadcn HSL format is well-known
- SEO patterns: HIGH - All based on Next.js built-in Metadata API, verified in official documentation
- Theme alignment: MEDIUM - HSL conversions from hex palette are straightforward but manual; need visual verification

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (30 days - Next.js and Velite are stable; Bun workspace issues may resolve sooner)
