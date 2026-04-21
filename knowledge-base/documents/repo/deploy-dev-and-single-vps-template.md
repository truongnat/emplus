# Template — Dev local & production trên một VPS

> **Mục đích**: tài liệu có thể **sao chép** cho từng dự án / môi trường bằng cách thay các placeholder `{{...}}`.  
> **Phạm vi**: dev chạy đầy đủ trên máy cá nhân; production **gom trên một VPS** (Postgres, Redis, MinIO, API, web tĩnh, reverse proxy).  
> **Tham chiếu thêm**: `knowledge-base/documents/repo/production-deployment.md` (env, checklist bảo mật, mô hình k3s + Supabase nếu bạn tách DB sau này).

---

## Cấu hình đã điền — Em+ (GitHub `truongnat`, VPS hiện tại)

Dùng làm **bản tham chiếu** cho repo Em+; phần còn lại của file vẫn dùng placeholder `{{...}}` để tái sử dụng hoặc đối chiếu.

| Mục | Giá trị |
|-----|----------|
| GitHub user | `truongnat` |
| Tên dự án / thư mục repo | `emplus` |
| URL clone (giả định repo `emplus` dưới user này) | `https://github.com/truongnat/emplus.git` |
| Web (domain) | `emplus.truongsoftware.com` |
| API (subdomain) | `emplus-api.truongsoftware.com` |
| IP VPS | `62.146.238.102` |
| User triển khai SSH | `root` (đang dùng; **không khuyến nghị** lâu dài — nên tách user `deploy` + sudo) |
| Thư mục mã nguồn trên VPS | `/root/apps/emplus` |
| Thư mục phục vụ web tĩnh (gợi ý) | `/root/apps/emplus/web-dist` (rsync từ `web/dist` sau mỗi lần build) |
| Bun (khớp CI) | `1.3.10` |

**DNS cần có** (A → `62.146.238.102`):

- `emplus.truongsoftware.com`
- `emplus-api.truongsoftware.com`
- (tuỳ chọn) `www.emplus.truongsoftware.com`

**Ví dụ Caddy** (đặt trong Caddyfile thật trên VPS, chỉnh nếu bạn dùng đường dẫn khác):

```text
emplus.truongsoftware.com {
    root * /root/apps/emplus/web-dist
    file_server
    encode gzip
}

emplus-api.truongsoftware.com {
    reverse_proxy 127.0.0.1:3000
}
```

**Lệnh nhanh trên VPS** (đã clone sẵn tại `/root/apps/emplus`):

```bash
cd /root/apps/emplus
git pull
docker compose -f docker-compose.yml up -d postgres redis minio minio-init
# … tiếp tục migrate, build API image, build web như mục 3.x bên dưới (thay đường dẫn /opt/... bằng /root/apps/emplus)
```

### Kubernetes / k3s — có bắt buộc không?

Với **luồng production trong tài liệu này** (một VPS: `docker compose` cho Postgres/Redis/MinIO + container API + reverse proxy + web tĩnh): **không cần** cài Kubernetes hay k3s.

| Tình huống | k8s / k3s |
|------------|-----------|
| Chỉ chạy stack như các bước 2–3 trong file này | **Không cần** |
| Muốn Ingress + TLS tập trung, nhiều Deployment, rollout theo cluster | **Có thể** dùng k3s (tuỳ chọn) |
| Dùng workflow `.github/workflows/deploy-api-k3s.yml` để đẩy API lên VPS | VPS đó cần **k3s** (hoặc đổi workflow sang Docker — chọn **một** hướng để tránh chồng chéo) |
| Thư mục `deploy/k8s/` + script `kind` | **Dev local** / mô phỏng, **không** bắt buộc cho VPS theo template này |

Tài liệu `production-deployment.md` vẫn mô tả thêm **lựa chọn** k3s + Supabase — đó là nhánh kiến trúc khác, không thay thế bắt buộc cho mô hình “Docker thuần trên một VPS”.

---

## Cách dùng template này

1. Tìm và thay toàn bộ `{{PLACEHOLDER}}` bằng giá trị thật của bạn (domain, IP, email, tên container, v.v.).
2. Không commit file `.env` / khóa SSH / connection string có mật khẩu lên Git.
3. Sau khi điền xong, lưu bản sao riêng (ví dụ `deploy-runbook-emplus-prod.md` ngoài repo hoặc trong wiki nội bộ) nếu chứa thông tin nhạy cảm.

---

## Bảng placeholder (điền một lần)

| Placeholder | Ví dụ | Em+ (đã điền) | Ghi chú |
|-------------|-------|----------------|---------|
| `{{PROJECT_NAME}}` | `emplus` | `emplus` | Tên dự án / prefix volume |
| `{{REPO_URL}}` | `https://github.com/org/emplus.git` | `https://github.com/truongnat/emplus.git` | URL clone |
| `{{DOMAIN}}` | `emplus.app` | `emplus.truongsoftware.com` | Domain chính (web) |
| `{{API_HOST}}` | `api.emplus.app` | `emplus-api.truongsoftware.com` | Subdomain API |
| `{{VPS_PUBLIC_IP}}` | `203.0.113.10` | `62.146.238.102` | IP VPS |
| `{{DEPLOY_USER}}` | `deploy` | `root` | User SSH (ưu tiên sau: user riêng + sudo) |
| `{{APP_ROOT}}` | `/opt/emplus/app` | `/root/apps/emplus` | Thư mục gốc clone repo trên VPS |
| `{{WEB_ROOT}}` | `/var/www/{{PROJECT_NAME}}/web` | `/root/apps/emplus/web-dist` | Thư mục phục vụ bản build `web/dist` |
| `{{BUN_VERSION}}` | `1.3.10` | `1.3.10` | Khớp với CI (`.github/workflows/ci.yml`) |

---

## Bước 1 — Dev: chạy nguyên stack trên máy local

### 1.1 Yêu cầu máy dev

| Thành phần | Phiên bản / ghi chú |
|------------|---------------------|
| Git | Bất kỳ |
| Bun | `{{BUN_VERSION}}` (khuyến nghị khớp CI) |
| Docker Desktop / Docker Engine | Để chạy `docker-compose.yml` ở root repo |

### 1.2 Clone và cài dependency

```bash
git clone {{REPO_URL}}
cd {{PROJECT_NAME}}
bun install --frozen-lockfile
```

### 1.3 Cấu hình API (local)

1. Tạo `api/.env` từ mẫu (nếu chưa có):

   ```bash
   cp api/.env.example api/.env
   ```

2. Chỉnh các biến trỏ tới service Docker local (Postgres, Redis, MinIO, Mailpit) theo `api/.env.example` và tài liệu env trong `production-deployment.md`.

### 1.4 Bật hạ tầng Docker (Postgres, Redis, MinIO, Mailpit, …)

Từ **thư mục gốc** repo:

```bash
bun run db:up
```

Hoặc tương đương:

```bash
docker compose -f docker-compose.yml up -d postgres postgres-slave redis minio minio-init mailpit
```

(Tùy nhu cầu: dev tối thiểu có thể bỏ `postgres-slave`.)

### 1.5 Migration database

```bash
bun run --cwd api db:migrate
```

### 1.6 Chạy ứng dụng dev

**Cách A — một lệnh (API + design-builder, script tự cố gắng bật Docker):**

```bash
bun run dev
```

- API: `http://localhost:3000`  
- Swagger: `http://localhost:3000/v1/docs`  
- Design builder: `http://localhost:3001`

**Cách B — chỉ API + đã tự `db:up`:**

```bash
bun run dev:local
```

**Web (Astro) — terminal riêng:**

```bash
bun run dev:web
```

**Mobile (Expo) — terminal riêng:**

```bash
bun run dev:mobile
```

### 1.7 (Tuỳ chọn) Stack Kubernetes local (`kind`)

Dùng khi muốn mô phỏng deploy giống k8s trên laptop:

```bash
bash deploy/k8s/scripts/k8s-up.sh
bash deploy/k8s/scripts/k8s-status.sh
```

Chi tiết endpoint: `deploy/k8s/README.md`.  
**Lưu ý**: manifest local dùng `emptyDir` cho Postgres/MinIO — **không** coi là mẫu persistence cho production.

### 1.8 Checklist hoàn thành bước 1

- [ ] `docker compose ps` hiển thị các service healthy (hoặc đang chạy).
- [ ] `GET http://localhost:3000/health` trả `200`.
- [ ] Web dev mở được trên cổng Astro mặc định.
- [ ] Không có secret trong Git (`git status` sạch với `.env`).

---

## Bước 2 — Production: chuẩn bị **một VPS** (mạng, OS, Docker, TLS)

### 2.1 Thông số VPS gợi ý (gom DB + MinIO + API + web)

| Tài nguyên | Tối thiểu gợi ý | Ghi chú |
|------------|-----------------|---------|
| vCPU | 2+ | Postgres + API đồng thời |
| RAM | 4 GB+ | MinIO + Redis + OS |
| Disk | 40 GB+ SSD | DB + object storage tăng theo thời gian |

### 2.2 DNS

Tạo bản ghi trỏ về `{{VPS_PUBLIC_IP}}`:

| Host | Loại | Giá trị |
|------|------|---------|
| `{{DOMAIN}}` | A | `{{VPS_PUBLIC_IP}}` |
| `www.{{DOMAIN}}` | A hoặc CNAME | Tuỳ bạn |
| `{{API_HOST}}` | A | `{{VPS_PUBLIC_IP}}` |

### 2.3 Tài khoản & SSH

1. **Khuyến nghị**: tạo user không phải root (ví dụ `deploy`), sudo, **chỉ SSH bằng key** — trùng với hardening trong `production-deployment.md`.
2. **Trường hợp Em+ hiện tại**: đang deploy bằng `root` tại `/root/apps/emplus`. Rủi ro: một lỗi typo/shell có quyền tối đa; nên lên kế hoạch chuyển sang user riêng và giới hạn quyền ghi `web-dist` + Docker socket.

### 2.4 Firewall (ví dụ UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2.5 Cài Docker + plugin Compose

Thực hiện theo hướng dẫn chính thức của distro (Ubuntu: Docker CE + `docker compose` plugin).

### 2.6 Reverse proxy + TLS (Caddy hoặc nginx)

- Terminate HTTPS tại `{{DOMAIN}}` và `{{API_HOST}}`.
- API upstream: `http://127.0.0.1:3000` (khi API bind nội bộ).
- Web static: `root` trỏ tới `{{WEB_ROOT}}` (nội dung là bản build `web/dist`).

**Ví dụ khối Caddy (chỉ minh hoạ — chỉnh đường dẫn thật):**

```text
{{DOMAIN}} {
    root * {{WEB_ROOT}}
    file_server
    encode gzip
}

{{API_HOST}} {
    reverse_proxy 127.0.0.1:3000
}
```

### 2.7 Checklist hoàn thành bước 2

- [ ] SSH chỉ key, không mở port thừa.
- [ ] DNS đã propagate (kiểm tra `dig {{API_HOST}}`).
- [ ] Caddy/nginx reload không lỗi; cert TLS hợp lệ.

---

## Bước 3 — Production: deploy **toàn bộ** trên cùng VPS

Thứ tự khuyến nghị: **data → migrate → API → build web → publish static → kiểm tra health**.

### 3.1 Lấy mã nguồn trên VPS

**Mẫu chung (placeholder):**

```bash
sudo mkdir -p /opt/{{PROJECT_NAME}}
sudo chown {{DEPLOY_USER}}:{{DEPLOY_USER}} /opt/{{PROJECT_NAME}}
cd /opt/{{PROJECT_NAME}}
git clone {{REPO_URL}} app
cd app
```

**Em+ — bạn đang dùng** (repo tại `/root/apps/emplus`):

```bash
mkdir -p /root/apps
cd /root/apps
# Nếu chưa clone:
git clone https://github.com/truongnat/emplus.git emplus
cd emplus
# Nếu đã có sẵn:
# cd /root/apps/emplus && git pull
```

### 3.2 Bật Postgres, Redis, MinIO (Docker Compose tại root)

```bash
cd {{APP_ROOT}}
docker compose -f docker-compose.yml up -d postgres redis minio minio-init
```

**Em+**: `cd /root/apps/emplus` trước lệnh `docker compose`.

(Tùy chọn: `mailpit` chỉ nên bật trên prod nếu bạn thật sự dùng nó cho email thử; thường prod dùng SMTP provider.)

**Backup volume**: đảm bảo volume Docker cho Postgres/MinIO có **kế hoạch backup** (snapshot VPS, hoặc script dump DB + sync object storage).

### 3.3 Tạo `api/.env.production` trên VPS

1. Tạo file **chỉ trên server**, không commit:

   ```bash
   nano api/.env.production
   ```

2. Điền tối thiểu các nhóm biến trong `production-deployment.md` mục **Biến môi trường production** (DATABASE_URL, REDIS_URL, MinIO, SMTP, DATA_ENCRYPTION_KEY, CORS với `https://{{DOMAIN}}`, v.v.).

### 3.4 Chạy migration (trước hoặc ngay sau lần chạy API đầu tiên)

```bash
cd {{APP_ROOT}}
# Ví dụ: export DATABASE_URL tạm hoặc dùng --env-file tùy script repo
bun install --frozen-lockfile
# Thay lệnh dưới bằng đúng workflow migrate của repo bạn:
DATABASE_URL='{{PRODUCTION_DATABASE_URL}}' bun run --cwd api db:migrate
```

**Em+**: thay `{{APP_ROOT}}` bằng `/root/apps/emplus` (không có thư mục `app` con). `{{PRODUCTION_DATABASE_URL}}` lấy từ `api/.env.production` (Postgres trên cùng VPS hoặc DB ngoài — **không** dán secret vào Git).

> **Placeholder**: `{{PRODUCTION_DATABASE_URL}}` — connection string Postgres trên chính VPS (hoặc managed DB nếu sau này tách).

### 3.5 Build & chạy API (Docker)

```bash
cd {{APP_ROOT}}
docker build -t {{PROJECT_NAME}}-api:prod -f api/Dockerfile .

docker rm -f {{PROJECT_NAME}}-api 2>/dev/null || true
docker run -d --name {{PROJECT_NAME}}-api --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file api/.env.production \
  {{PROJECT_NAME}}-api:prod
```

**Em+**: `cd /root/apps/emplus` trước các lệnh trên.

Kiểm tra:

```bash
curl -fsS http://127.0.0.1:3000/health
```

### 3.6 Build web (Astro) và publish ra `{{WEB_ROOT}}`

```bash
cd {{APP_ROOT}}
export PUBLIC_SITE_URL="https://{{DOMAIN}}"
bun install --frozen-lockfile
bun run build:web

sudo mkdir -p {{WEB_ROOT}}
sudo rsync -a --delete web/dist/ {{WEB_ROOT}}/
sudo chown -R www-data:www-data {{WEB_ROOT}}
```

(Quyền `www-data` chỉ ví dụ — khớp user process của Caddy/nginx trên máy bạn.)

**Em+**: `PUBLIC_SITE_URL=https://emplus.truongsoftware.com` và `{{WEB_ROOT}}` = `/root/apps/emplus/web-dist` (đã khớp ví dụ Caddy ở đầu file).

Reload reverse proxy sau khi copy file mới.

### 3.7 Kiểm thử nhanh sau deploy

| Kiểm tra | URL / lệnh |
|-----------|------------|
| API health | `https://{{API_HOST}}/health` |
| Web | `https://{{DOMAIN}}/` |
| TLS | Trình duyệt không cảnh báo cert |

### 3.8 (Tuỳ chọn) CI/CD từ GitHub Actions

Repo có thể tách workflow:

- **Backend (API)**: `.github/workflows/deploy-api-k3s.yml` — deploy lên **k3s** qua SSH (khác mô hình “Docker thuần trên 1 VPS” ở trên; chọn một hướng để tránh chồng chéo).
- **Web (CDN)**: `.github/workflows/deploy-web-pages.yml` — deploy Astro lên Cloudflare Pages (nếu bạn **không** host web trên VPS).

Nếu giữ **web trên VPS**, pipeline thường là: SSH → `git pull` → `bun run build:web` → `rsync` → reload Caddy.

### 3.9 Checklist hoàn thành bước 3

- [ ] Postgres/Redis/MinIO chạy ổn định, có backup.
- [ ] Migration đã chạy, không lỗi.
- [ ] API chỉ lộ qua reverse proxy (bind `127.0.0.1:3000`).
- [ ] CORS / cookie / public URL trùng `https://{{DOMAIN}}`.
- [ ] `PUBLIC_SITE_URL` khi build web khớp domain thật (ảnh hưởng sitemap/canonical).

---

## Phụ lục A — Cổng dịch vụ local (tham khảo)

Chạy `bash ./scripts/ports.sh` ở root repo sau khi bật Docker để xem bảng cổng (nếu script tồn tại trong bản clone).

---

## Phụ lục B — Rollback nhanh (API)

```bash
docker stop {{PROJECT_NAME}}-api
docker run -d --name {{PROJECT_NAME}}-api-rollback --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file api/.env.production \
  {{PROJECT_NAME}}-api:{{PREVIOUS_IMAGE_TAG}}
```

`{{PREVIOUS_IMAGE_TAG}}`: tag image trước khi release.

---

## Security verification (phạm vi tài liệu template)

- **Security verification**: pass — tài liệu hướng dẫn, không chứa secret thật; nhắc không commit `.env`.
- **Risks found**: một VPS gom DB + object storage + API là **điểm lỗi đơn**; lộ SSH hoặc volume không backup là rủi ro cao; deploy bằng **user `root`** làm tăng hậu quả nếu tài khoản bị lộ hoặc lệnh chạy nhầm.
- **Mitigation**: firewall tối thiểu, SSH keys-only, TLS đầy đủ, backup DB + MinIO, rotate key định kỳ; khi có thời gian, chuyển sang user không phải root + sudo và thư mục deploy riêng.
- **Residual risk**: cần runbook restore và giám sát disk/RAM thực tế theo workload.
