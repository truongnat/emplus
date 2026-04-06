# Phase: Landing Page & Blog for SEO — Context

**Gathered:** 2026-04-05
**Status:** Planning complete (01–03 execute plans + RESEARCH); execution not started — see [README.md](./README.md)
**Source:** User request

<domain>
## Phase Boundary

Create a new `web/` workspace in the monorepo for a landing page website targeting SEO. The site will showcase all Em+ app features, include a blog for content marketing/SEO, and provide privacy policy & terms of service pages. Must be optimized for search engines (SSR/SSG), fast loading, and share the design language with the existing mobile app.

</domain>

<decisions>
## Implementation Decisions

### Monorepo Integration
- New workspace `web/` added to root `package.json` workspaces array
- Must integrate with existing Bun workspaces setup
- Can share dependencies from root (React 19, TypeScript, clsx, tailwind-merge)

### Tech Stack
- Next.js (App Router) for SSR/SSG — best SEO support in React ecosystem
- Tailwind CSS (already used in design-builder) for styling
- MDX for blog content (markdown with React components)
- Deployed separately from API and mobile

### Landing Page
- Hero section showcasing Em+ app (relationship management app for couples)
- Feature sections highlighting all app capabilities:
  - Pairing system (QR code couple linking)
  - Timeline & memories (photo journals, love days counter)
  - Budget management (shared expense tracking)
  - Care & mood system (emotional wellness, partner mood check)
  - Live features (real-time WebSocket sync)
  - Push notifications
  - Beautiful theme system (glass morphism, dark mode)
- App store download links (iOS + Android)
- Social proof / testimonials section
- Vietnamese language primary (matching app language)

### Blog for SEO
- MDX-based blog posts
- Categories and tags for organization
- SEO metadata (og:tags, structured data, sitemap)
- RSS feed
- Blog post listing with pagination

### Privacy & Policy Pages
- Privacy Policy page
- Terms of Service page
- Static content, easy to update via MDX or plain markdown

### SEO Requirements
- Server-side rendering / static generation for all pages
- Proper meta tags (title, description, og:image)
- Sitemap.xml auto-generation
- robots.txt
- Schema.org structured data (App, Organization, BlogPosting)
- Fast Core Web Vitals (LCP, FID, CLS)
- Mobile-responsive design

### Claude's Discretion
- Specific component library (shadcn/ui recommended given design-builder uses Radix primitives)
- Image optimization strategy
- Analytics integration
- Deployment target (Vercel recommended for Next.js)
- Blog post content (structure only, not actual content)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Monorepo Structure
- `package.json` — Root workspace config, shared deps
- `design-builder/package.json` — Existing Vite + Tailwind + Radix setup (style reference)
- `design-builder/tailwind.config.js` — Existing Tailwind config
- `docker-compose.yml` — Infrastructure context

### Theme & Design Language
- `mobile/src/theme/tokens/palette.ts` — Color palette to align with
- `mobile/src/theme/tokens/semantic.ts` — Semantic color mapping
- `mobile/src/theme/aura-colors.ts` — Aura theme colors
- `mobile/src/theme/typography-roles.ts` — Typography system

### App Features (for landing page content)
- `api/src/modules/index.ts` — All API modules (feature inventory)
- `mobile/app/(tabs)/_layout.tsx` — Tab structure (feature navigation)
- `.planning/INDEX.md` — Project structure overview

</canonical_refs>

<specifics>
## Specific Ideas

- Landing page should convey the romantic, warm aesthetic of the app (coral/indigo/teal palette, glass morphism effects)
- Vietnamese as primary language
- Blog posts about relationship tips, app updates, couple activities
- Mobile-first responsive design
- Dark/light mode toggle (matching app's theme system)

</specifics>

<deferred>
## Deferred Ideas

- Multi-language support (English, etc.) — future phase
- CMS integration for blog (start with file-based MDX)
- User authentication on web (app-only for now)
- Web-based dashboard for couples (app-only for now)

</deferred>

---

*Phase: landing-page-seo*
*Context gathered: 2026-04-05 via user request*
