# Em+ — trang marketing & blog (Astro)

Workspace tĩnh: **Astro 5**, **Tailwind CSS 3**, nội dung blog bằng **Markdown** trong `src/content/blog/` (Content Collections).

## Chạy local

```bash
# từ root monorepo
bun run dev:web
```

Hoặc trong thư mục `web/`:

```bash
bun run dev
```

## Biến môi trường

- `PUBLIC_SITE_URL` — URL canonical (không dấu `/` cuối), dùng cho RSS, sitemap và meta. Mặc định build dùng `https://emplus.app` nếu không set.

Tạo `web/.env` (không commit):

```bash
PUBLIC_SITE_URL=https://your-domain.com
```

## Lệnh hữu ích

| Lệnh (từ root) | Mô tả |
|----------------|--------|
| `bun run build:web` | Build static vào `web/dist/` |
| `bun run typecheck:web` | `astro check` |

## robots.txt

`public/robots.txt` đang trỏ sitemap tới `https://emplus.app/sitemap-index.xml`. Khi đổi domain, cập nhật cho khớp `PUBLIC_SITE_URL` / bản deploy.
