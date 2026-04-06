---
phase: landing-page-seo
plan: 03
type: execute
wave: 2
depends_on: ["01"]
files_modified:
  - web/package.json
  - web/velite.config.ts
  - web/content/blog/meo-giu-lua-tinh-yeu.mdx
  - web/content/blog/em-plus-gioi-thieu.mdx
  - web/src/lib/content.ts
  - web/src/components/blog/PostCard.tsx
  - web/src/components/blog/PostList.tsx
  - web/src/components/blog/TagBadge.tsx
  - web/src/components/mdx/MDXComponents.tsx
  - web/src/app/blog/page.tsx
  - web/src/app/blog/[slug]/page.tsx
  - web/src/app/feed.xml/route.ts
autonomous: true
requirements: [WEB-BLOG, WEB-MDX, WEB-CATEGORIES, WEB-TAGS, WEB-PAGINATION, WEB-RSS]

must_haves:
  truths:
    - "Blog listing page at /blog shows posts sorted by date"
    - "Individual blog posts render MDX content with proper typography"
    - "Blog posts have categories and tags displayed"
    - "Blog listing supports pagination"
    - "RSS feed is available at /feed.xml"
    - "Blog posts have SEO metadata (title, description, og:tags)"
  artifacts:
    - path: "web/velite.config.ts"
      provides: "Content schema with Zod validation for posts and pages"
      contains: "defineCollection"
    - path: "web/src/app/blog/page.tsx"
      provides: "Blog listing page with pagination"
      contains: "generateMetadata"
    - path: "web/src/app/blog/[slug]/page.tsx"
      provides: "Individual blog post page with SSG"
      contains: "generateStaticParams"
    - path: "web/src/app/feed.xml/route.ts"
      provides: "RSS feed route handler"
      contains: "application/rss+xml"
    - path: "web/src/lib/content.ts"
      provides: "Blog query helpers (filter, sort, paginate)"
      exports: ["getPublishedPosts", "getPostsByCategory", "getPaginatedPosts"]
  key_links:
    - from: "web/src/app/blog/[slug]/page.tsx"
      to: "web/.velite"
      via: "#site/content import alias"
      pattern: "from '#site/content'"
    - from: "web/velite.config.ts"
      to: "web/content/blog/"
      via: "pattern glob for MDX files"
      pattern: "blog/\\*\\*/\\*.mdx"
    - from: "web/src/app/feed.xml/route.ts"
      to: "web/src/lib/content.ts"
      via: "getPublishedPosts helper"
      pattern: "getPublishedPosts"
---

<objective>
Set up the Velite-based MDX blog system with content schema, blog listing page with pagination, individual post pages with SSG, RSS feed, and two sample blog posts. Blog posts have categories, tags, and full SEO metadata.

Purpose: Blog drives organic SEO traffic for Em+. Content marketing with relationship tips and app updates attracts couples searching for relationship advice.
Output: Working blog at `/blog` with MDX rendering, pagination, categories, tags, and RSS feed at `/feed.xml`.
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
From web/src/config/site.ts:
```typescript
export const siteConfig = {
  name: "Em+",
  url: "https://emplus.app",
  description: "...",
  locale: "vi_VN",
  language: "vi",
}
```

From web/src/lib/utils.ts:
```typescript
export function cn(...inputs: ClassValue[]): string
```

From web/tsconfig.json paths:
```json
"#site/content": ["./.velite"]
```

From web/next.config.mjs:
- VeliteWebpackPlugin already configured to run velite build
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Set up Velite content layer, content helpers, and sample blog posts</name>
  <files>
    web/package.json,
    web/velite.config.ts,
    web/content/blog/meo-giu-lua-tinh-yeu.mdx,
    web/content/blog/em-plus-gioi-thieu.mdx,
    web/src/lib/content.ts,
    web/src/components/mdx/MDXComponents.tsx
  </files>
  <read_first>
    web/package.json,
    web/next.config.mjs,
    web/tsconfig.json,
    .planning/phases/phase-landing-page-seo/RESEARCH.md
  </read_first>
  <action>
**Step 1: Add Velite and MDX dependencies** to web/package.json dependencies:
```bash
cd /Users/truongdq/tx/GitHub/emplus/web && bun add velite remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki rss
```

**Step 2: Create web/velite.config.ts:**
```typescript
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

**Step 3: Create web/.velite/index.d.ts** type declaration stub so TypeScript resolves `#site/content` before first build:
```typescript
declare module '#site/content' {
  export const posts: Array<{
    title: string
    slug: string
    description: string
    date: string
    updated?: string
    cover?: string
    category: string
    tags: string[]
    published: boolean
    author: string
    body: string
  }>
  export const pages: Array<{
    title: string
    slug: string
    description?: string
    body: string
  }>
}
```

**Step 4: Create web/src/lib/content.ts** — Blog query helpers:
```typescript
import { posts } from '#site/content'

const POSTS_PER_PAGE = 9

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(category: string) {
  return getPublishedPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter((post) => post.tags.includes(tag))
}

export function getPaginatedPosts(page: number = 1) {
  const allPosts = getPublishedPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const paginatedPosts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function getAllCategories() {
  const categories = getPublishedPosts().map((post) => post.category)
  return [...new Set(categories)]
}

export function getAllTags() {
  const tags = getPublishedPosts().flatMap((post) => post.tags)
  return [...new Set(tags)]
}
```

**Step 5: Create web/src/components/mdx/MDXComponents.tsx** — Custom MDX component mapping:
```tsx
import Image from "next/image"
import Link from "next/link"

export const mdxComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return <Link href={href} {...props}>{children}</Link>
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={400}
      className="rounded-lg"
      {...(props as any)}
    />
  ),
}
```

**Step 6: Create sample blog post web/content/blog/meo-giu-lua-tinh-yeu.mdx:**
```mdx
---
title: "5 Meo Giu Lua Tinh Yeu Luon Chay Bong"
description: "Kham pha 5 bi quyet don gian nhung hieu qua de duy tri va nuoi duong tinh yeu cua ban moi ngay."
date: "2026-04-01"
category: "Tinh yeu"
tags: ["meo hay", "tinh yeu", "cap doi"]
author: "Em+ Team"
published: true
---

## Gioi thieu

Tinh yeu can duoc cham soc moi ngay, giong nhu mot cay non can nuoc va anh sang...

## 1. Danh thoi gian chat luong cho nhau

Trong cuoc song ban ron, viec danh rieng thoi gian cho nhau la dieu vo cung quan trong...

## 2. Chia se cam xuc moi ngay

Voi tinh nang **Tam trang** tren Em+, ban co the chia se cam xuc cua minh voi doi phuong moi ngay...

## 3. Cung nhau len ke hoach tai chinh

Quan ly chi tieu chung giup ca hai hieu hon ve muc tieu tai chinh...

## 4. Luu giu ky niem dep

Su dung tinh nang **Dong thoi gian** de luu giu nhung khoanh khac dep cung nhau...

## 5. Luon ket noi du o bat cu dau

Tinh nang dong bo thoi gian thuc cua Em+ giup ban luon cam thay gan gui...

## Ket luan

Hay tai Em+ ngay hom nay de bat dau hanh trinh cham soc tinh yeu cua ban!
```

**Step 7: Create sample blog post web/content/blog/em-plus-gioi-thieu.mdx:**
```mdx
---
title: "Gioi Thieu Em+ — Ung Dung Danh Cho Cac Cap Doi"
description: "Tim hieu ve Em+, ung dung giup cac cap doi ket noi, chia se va cung nhau xay dung hanh phuc."
date: "2026-03-15"
category: "San pham"
tags: ["gioi thieu", "em plus", "tinh nang"]
author: "Em+ Team"
published: true
---

## Em+ la gi?

Em+ la ung dung quan ly moi quan he duoc thiet ke danh rieng cho cac cap doi...

## Cac tinh nang chinh

### Ket noi cap doi

Quet ma QR de lien ket tai khoan voi nguoi yeu chi trong vai giay...

### Dong thoi gian

Luu giu va chia se nhung khoanh khac dang nho cua hai ban...

### Quan ly chi tieu chung

Theo doi chi phi va ngan sach chung de tai chinh luon minh bach...

### Cham soc tam trang

Chia se cam xuc va theo doi suc khoe tinh than cung nhau...

## Tai Em+ ngay

Em+ hien co tren ca iOS va Android. Tai mien phi ngay hom nay!
```
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus/web && bun run typecheck 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/velite.config.ts` returns 0
    - `grep -q 'defineCollection' /Users/truongdq/tx/GitHub/emplus/web/velite.config.ts` returns 0
    - `grep -q 'rehypePrettyCode' /Users/truongdq/tx/GitHub/emplus/web/velite.config.ts` returns 0
    - `grep -q 'velite' /Users/truongdq/tx/GitHub/emplus/web/package.json` returns 0
    - `grep -q 'getPublishedPosts' /Users/truongdq/tx/GitHub/emplus/web/src/lib/content.ts` returns 0
    - `grep -q 'getPaginatedPosts' /Users/truongdq/tx/GitHub/emplus/web/src/lib/content.ts` returns 0
    - `grep -q 'getAllCategories' /Users/truongdq/tx/GitHub/emplus/web/src/lib/content.ts` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/content/blog/meo-giu-lua-tinh-yeu.mdx` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/content/blog/em-plus-gioi-thieu.mdx` returns 0
    - `grep -q 'category:' /Users/truongdq/tx/GitHub/emplus/web/content/blog/meo-giu-lua-tinh-yeu.mdx` returns 0
    - `grep -q 'tags:' /Users/truongdq/tx/GitHub/emplus/web/content/blog/meo-giu-lua-tinh-yeu.mdx` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/mdx/MDXComponents.tsx` returns 0
  </acceptance_criteria>
  <done>Velite config processes MDX with Zod-validated schema (title, slug, description, date, category, tags, author, published, body). Content helpers export getPublishedPosts, getPaginatedPosts, getAllCategories, getAllTags. Two sample Vietnamese blog posts exist with proper frontmatter. MDXComponents maps custom components for links and images.</done>
</task>

<task type="auto">
  <name>Task 2: Create blog listing page, blog post page, tag badges, and RSS feed</name>
  <files>
    web/src/components/blog/PostCard.tsx,
    web/src/components/blog/PostList.tsx,
    web/src/components/blog/TagBadge.tsx,
    web/src/app/blog/page.tsx,
    web/src/app/blog/[slug]/page.tsx,
    web/src/app/feed.xml/route.ts
  </files>
  <read_first>
    web/src/lib/content.ts,
    web/src/config/site.ts,
    web/src/components/mdx/MDXComponents.tsx,
    web/velite.config.ts
  </read_first>
  <action>
**Step 1: Create web/src/components/blog/TagBadge.tsx:**
```tsx
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  tag: string
  className?: string
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("text-xs", className)}>
      {tag}
    </Badge>
  )
}
```

**Step 2: Create web/src/components/blog/PostCard.tsx:**
```tsx
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TagBadge } from "./TagBadge"

interface PostCardProps {
  title: string
  description: string
  slug: string
  date: string
  category: string
  tags: string[]
}

export function PostCard({ title, description, slug, date, category, tags }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="group hover:border-primary/30 transition-colors">
      <Link href={`/blog/${slug}`}>
        <CardHeader>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <time dateTime={date}>{formattedDate}</time>
            <span className="text-primary font-medium">{category}</span>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        {tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </CardContent>
        )}
      </Link>
    </Card>
  )
}
```

**Step 3: Create web/src/components/blog/PostList.tsx:**
```tsx
import { PostCard } from "./PostCard"

interface Post {
  title: string
  description: string
  slug: string
  date: string
  category: string
  tags: string[]
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Chua co bai viet nao.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}
```

**Step 4: Create web/src/app/blog/page.tsx** — Blog listing with pagination and SEO metadata:
```tsx
import type { Metadata } from "next"
import { getPaginatedPosts, getAllCategories } from "@/lib/content"
import { PostList } from "@/components/blog/PostList"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Blog",
  description: `Bai viet ve tinh yeu, moi quan he va meo su dung ${siteConfig.name}`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Bai viet ve tinh yeu, moi quan he va meo su dung ${siteConfig.name}`,
    type: "website",
  },
}

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const { posts, totalPages, currentPage, hasNext, hasPrev } = getPaginatedPosts(page)
  const categories = getAllCategories()

  return (
    <div className="container py-12 md:py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Nhung bai viet ve tinh yeu, moi quan he va cach su dung Em+ hieu qua nhat.
        </p>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <PostList posts={posts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center gap-4" aria-label="Phan trang">
          {hasPrev && (
            <a
              href={`/blog?page=${currentPage - 1}`}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              Trang truoc
            </a>
          )}
          <span className="inline-flex items-center px-4 py-2 text-sm text-muted-foreground">
            Trang {currentPage} / {totalPages}
          </span>
          {hasNext && (
            <a
              href={`/blog?page=${currentPage + 1}`}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              Trang sau
            </a>
          )}
        </nav>
      )}
    </div>
  )
}
```

**Step 5: Create web/src/app/blog/[slug]/page.tsx** — Individual blog post with SSG and full SEO:
```tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { posts } from "#site/content"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { MDXContent } from "@/components/mdx/MDXContent"
import { TagBadge } from "@/components/blog/TagBadge"
import { siteConfig } from "@/config/site"
import Link from "next/link"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug && p.published)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : [],
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug && p.published)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lai blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span className="text-primary font-medium">{post.category}</span>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{post.author}</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXContent code={post.body} />
      </div>
    </article>
  )
}
```

**Step 6: Create web/src/components/mdx/MDXContent.tsx** — Client component to render Velite MDX body:
```tsx
"use client"

import * as runtime from "react/jsx-runtime"
import { mdxComponents } from "./MDXComponents"

interface MDXContentProps {
  code: string
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={mdxComponents} />
}
```

**Step 7: Create web/src/app/feed.xml/route.ts** — RSS feed:
```typescript
import RSS from "rss"
import { getPublishedPosts } from "@/lib/content"
import { siteConfig } from "@/config/site"

export async function GET() {
  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: "vi",
    pubDate: new Date(),
  })

  const posts = getPublishedPosts()

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      date: post.date,
      categories: [post.category, ...post.tags],
      author: post.author,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
```
  </action>
  <verify>
    <automated>cd /Users/truongdq/tx/GitHub/emplus/web && bun run typecheck 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q 'generateStaticParams' /Users/truongdq/tx/GitHub/emplus/web/src/app/blog/\\[slug\\]/page.tsx` returns 0
    - `grep -q 'generateMetadata' /Users/truongdq/tx/GitHub/emplus/web/src/app/blog/\\[slug\\]/page.tsx` returns 0
    - `grep -q '#site/content' /Users/truongdq/tx/GitHub/emplus/web/src/app/blog/\\[slug\\]/page.tsx` returns 0
    - `grep -q 'getPaginatedPosts' /Users/truongdq/tx/GitHub/emplus/web/src/app/blog/page.tsx` returns 0
    - `grep -q 'application/rss+xml' /Users/truongdq/tx/GitHub/emplus/web/src/app/feed.xml/route.ts` returns 0
    - `grep -q 'language.*vi' /Users/truongdq/tx/GitHub/emplus/web/src/app/feed.xml/route.ts` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/blog/PostCard.tsx` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/blog/PostList.tsx` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/blog/TagBadge.tsx` returns 0
    - `test -f /Users/truongdq/tx/GitHub/emplus/web/src/components/mdx/MDXContent.tsx` returns 0
    - `grep -q 'PostCard' /Users/truongdq/tx/GitHub/emplus/web/src/components/blog/PostList.tsx` returns 0
    - TypeScript typecheck passes
  </acceptance_criteria>
  <done>Blog listing at /blog shows posts sorted by date with pagination (9 per page), category badges, and tag filters. Individual post at /blog/[slug] renders MDX with prose typography, author, date, category, tags. RSS feed at /feed.xml returns valid XML with all published posts. Two sample Vietnamese blog posts render correctly.</done>
</task>

</tasks>

<verification>
1. `bun run typecheck` passes
2. `bun --bun next build` completes (Velite processes MDX content)
3. Blog listing page at `/blog` shows 2 sample posts
4. Individual post at `/blog/meo-giu-lua-tinh-yeu` renders MDX content with proper typography
5. RSS feed at `/feed.xml` returns XML with both posts
6. Blog post pages have proper OG metadata
</verification>

<success_criteria>
- Velite config defines Post and Page collections with Zod schemas
- Content helpers provide filtering, sorting, pagination functions
- Blog listing page at /blog has pagination, category badges
- Blog post page has generateStaticParams for SSG, generateMetadata for SEO
- RSS feed at /feed.xml returns valid RSS with Vietnamese language tag
- Two sample blog posts exist with proper frontmatter (title, description, date, category, tags)
- MDX rendering uses prose typography with dark mode support
</success_criteria>

<output>
After completion, create `.planning/phases/phase-landing-page-seo/03-SUMMARY.md`
</output>
