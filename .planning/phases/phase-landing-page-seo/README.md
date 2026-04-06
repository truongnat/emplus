# Phase: Landing page & blog (SEO)

**Cập nhật:** 2026-04-05  
**Trạng thái:** Đã scaffold workspace **`web/`** với stack **Astro + Markdown** (pivot so với RESEARCH/PLAN gốc dùng Next + Velite). Xem **[01-SUMMARY.md](./01-SUMMARY.md)**.

## Stack thực tế (sau pivot)

| Thành phần | Lựa chọn |
|------------|----------|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Blog / nội dung | Content Collections, file **Markdown** trong `web/src/content/blog/` |
| RSS | `@astrojs/rss` → `/rss.xml` |
| Sitemap | `@astrojs/sitemap` → `sitemap-index.xml` |
| URL canonical / RSS base | `PUBLIC_SITE_URL` (xem `web/README.md`) |

## Artifact trong phase

| File | Vai trò |
|------|---------|
| [CONTEXT.md](./CONTEXT.md) | Phạm vi sản phẩm (vẫn hợp lệ) |
| [RESEARCH.md](./RESEARCH.md) | **Lịch sử:** Next 16 + Velite — tham chiếu kiến trúc; **không** phản ánh stack hiện tại của `web/` |
| [01-PLAN.md](./01-PLAN.md) | Plan gốc (Next) — mục tiêu đã đạt phần lớn bằng Astro; chi tiết kỹ thuật khác file |
| [02-PLAN.md](./02-PLAN.md) | Landing đầy đủ — **chưa** thực thi hết; có thể port sang `.astro` + Tailwind |
| [03-PLAN.md](./03-PLAN.md) | Velite/blog — **thay thế** bởi Content Collections + `.md` (đã có bài mẫu + RSS) |
| [01-SUMMARY.md](./01-SUMMARY.md) | Kết quả thực thi wave 1 (scaffold `web/`) |

## Thứ tự đề xuất tiếp theo

1. **`02-PLAN.md`** — mở rộng `index.astro` (hero, features, testimonial, CTA, nav) theo layout hiện có.
2. **Deploy** — chỉnh `PUBLIC_SITE_URL`, `robots.txt`, kiểm tra OG ảnh nếu cần.
3. (Tuỳ chọn) **JSON-LD** Schema.org cho `SoftwareApplication` / `BlogPosting` trong layout hoặc từng trang bài.

## Routing GSD

- **`/gsd-execute-phase`** — tiếp tục wave 2 theo `02-PLAN.md` (nội dung Astro, không Velite).

## Ghi chú

- Root: `bun run dev:web` / `build:web` / `typecheck:web`.
