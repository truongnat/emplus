# 01-SUMMARY — Workspace marketing (đã pivot stack)

**Ngày:** 2026-04-05  
**Kết quả:** Đã thêm workspace `web/` với **Astro 5** + **Tailwind 3** + **Markdown** (Content Collections), không dùng Next.js/Velite như `01-PLAN.md` gốc.

## Đã giao

| Hạng mục | Chi tiết |
|----------|-----------|
| Monorepo | `web` trong `package.json` workspaces; script `dev:web`, `build:web`, `typecheck:web` |
| Build | `bun run build` trong `web/` → `dist/` static; `@astrojs/sitemap` sinh `sitemap-index.xml` |
| Theme | `src/styles/global.css` — biến HSL bám palette Em+ (coral/indigo/teal), dark/light + toggle + `localStorage` |
| Layout | `src/layouts/Layout.astro` — meta SEO cơ bản, OG, canonical, header/footer |
| Blog | `src/content.config.ts` + `src/content/blog/*.md`; `/blog`, `/blog/[slug]/` |
| RSS | `/rss.xml` (`src/pages/rss.xml.ts`) |
| Pháp lý placeholder | `/privacy`, `/terms` |
| 404 | `/404.html` |
| Docs | `web/README.md` (`PUBLIC_SITE_URL`, lệnh chạy) |

## Xác minh

- `bun run build` (trong `web/`) — thành công.
- `bunx astro check` — 0 errors (sau khi thêm `@astrojs/check`).

## Ghi chú / residual

- `public/robots.txt` dùng domain mẫu `emplus.app`; cần đồng bộ với `PUBLIC_SITE_URL` khi deploy.
- Font Be Vietnam Pro load từ Google Fonts (CDN) — có thể chuyển self-host nếu cần CSP chặt.
- Nội dung landing là **khối tính năng rút gọn**; mở rộng theo tinh thần `02-PLAN.md` (hero đầy đủ, 7 feature, testimonial, CTA) là bước tiếp theo.

## Pivot so với 01-PLAN.md

- Thay Next.js bằng Astro; thay Velite/MDX bằng **Markdown + `glob` loader** trong `src/content.config.ts`.
- Cấu hình site: `astro.config.mjs` (`site` từ `PUBLIC_SITE_URL` hoặc fallback).
