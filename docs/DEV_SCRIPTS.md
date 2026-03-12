# Development Scripts - Hướng Dẫn

## 🚀 Lệnh `bun run dev` (Khuyến nghị)

Chạy **TẤT CẢ** services cùng lúc:

```bash
# Từ root project
bun run dev
```

### Services được chạy:

1. **API Server** - http://localhost:3000
   - Swagger UI: http://localhost:3000/v1/docs
   - Health check: http://localhost:3000/health

2. **Design Builder** - http://localhost:3001
   - Visual token editor
   - Theme preview
   - Export functionality

### Features:

- ✅ Auto-start Docker infrastructure (nếu có)
- ✅ Database migration tự động
- ✅ Hot reload cho cả API và Builder
- ✅ Ctrl+C để dừng tất cả services
- ✅ Color-coded logs
- ✅ Service status display

## 📋 Các Lệnh Development

### Chạy từng service:

```bash
# Chỉ chạy API
bun run dev:api

# Chỉ chạy Mobile
bun run dev:mobile

# Chỉ chạy Design Builder
bun run dev:builder
```

### Chạy nhiều services:

```bash
# API + Builder (giống bun run dev)
bun run dev

# API + Mobile (old script)
bun run dev:local

# Tất cả (nếu có script)
bun run dev:all
```

### Infrastructure:

```bash
# Start Docker services
bun run db:up

# Stop Docker services
bun run db:down

# Run migrations
bun run db:init
bun run db:seed
```

### Build & Typecheck:

```bash
# Build Design Builder
bun run build:builder

# Typecheck
bun run typecheck:mobile
bun run typecheck:builder
```

## 🔧 Script Details

### `scripts/dev.sh` (NEW)

Chạy API + Design Builder với features:

```bash
#!/usr/bin/env bash
- Khởi động Docker infrastructure
- Chạy database migration
- Start API server (port 3000)
- Start Design Builder (port 3001)
- Hiển thị service URLs
- Trap Ctrl+C để cleanup
```

### `scripts/dev-local.sh` (OLD)

Chỉ chạy API server:

```bash
#!/usr/bin/env bash
- Khởi động Docker infrastructure
- Chạy database migration
- Start API server (port 3000)
- Hiển thị ports
```

## 📊 So Sánh

| Command | API | Builder | Mobile | Docker |
|---------|-----|---------|--------|--------|
| `bun run dev` | ✅ | ✅ | ❌ | ✅ |
| `bun run dev:api` | ✅ | ❌ | ❌ | ❌ |
| `bun run dev:builder` | ❌ | ✅ | ❌ | ❌ |
| `bun run dev:mobile` | ❌ | ❌ | ✅ | ❌ |
| `bun run dev:local` | ✅ | ❌ | ✅ | ✅ |

## 🎯 Quick Start

```bash
# 1. Cài đặt dependencies
bun install

# 2. Chạy tất cả services
bun run dev

# 3. Mở trình duyệt
# API Swagger: http://localhost:3000/v1/docs
# Design Builder: http://localhost:3001

# 4. Dừng services
# Ctrl+C trong terminal
```

## 📝 Notes

- **Working directory**: Luôn chạy từ root `/Users/truongdq/tx/GitHub/emplus`
- **Ports**: API (3000), Builder (3001), Mobile (tùy Expo)
- **Hot reload**: Tự động reload khi code thay đổi
- **Environment**: Load từ `.env` files trong từng package

## ✅ Checklist

- [x] `bun run dev` chạy API + Builder
- [x] Hot reload hoạt động
- [x] Ctrl+C dừng tất cả services
- [x] Service URLs hiển thị rõ ràng
- [x] Docker infrastructure tự động
- [x] Database migration tự động

---

**Development workflow đã được khôi phục! 🚀**
