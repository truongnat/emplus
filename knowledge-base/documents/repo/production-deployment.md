# Production Deployment Guide — Em+ v0.1.0 (VPS + k3s + Supabase)

> Ngày tạo: 2026-04-05  
> Cập nhật: 2026-04-09 (flow 1 VPS Contabo + k3s, web Astro deploy CDN, DB Supabase staging/prod)

---

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Yêu cầu hạ tầng](#2-yêu-cầu-hạ-tầng)
3. [Triển khai API](#3-triển-khai-api)
4. [Triển khai Mobile](#4-triển-khai-mobile)
5. [Triển khai Web (Astro) landing + blog SEO](#5-triển-khai-web-astro-landing--blog-seo)
6. [Biến môi trường production](#6-biến-môi-trường-production)
7. [Database migration](#7-database-migration)
8. [CI/CD (GitHub Actions) + k3s deploy](#8-cicd-github-actions--k3s-deploy)
9. [Checklist trước khi go-live](#9-checklist-trước-khi-go-live)
10. [VPS hardening (khuyến nghị tối thiểu)](#10-vps-hardening-khuyến-nghị-tối-thiểu)
11. [Backup & restore drill (DB/Redis/Object storage)](#11-backup--restore-drill-dbredisobject-storage)
12. [Monitoring & Observability](#12-monitoring--observability)
13. [Rollback plan](#13-rollback-plan)

---

## 1. Tổng quan kiến trúc

```
┌─────────────┐     HTTPS      ┌──────────────┐
│  Mobile App │ ◄────────────► │   API (Bun)  │
│  (Expo/RN)  │                │  Port 3000   │
└─────────────┘                └──────┬───────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                  │
              ┌─────▼─────┐   ┌──────▼──────┐   ┌──────▼──────┐
              │ PostgreSQL │   │    Redis    │   │    MinIO    │
              │  (primary) │   │  (session,  │   │  (media     │
              │            │   │   OTP, WS)  │   │   uploads)  │
              └────────────┘   └─────────────┘   └─────────────┘
                    │
              ┌─────▼─────┐
              │ PostgreSQL │  (optional read replica)
              │  (replica) │
              └────────────┘
```

**Stack:** Bun 1.2+ / Hono / PostgreSQL 15 / Redis 7 / MinIO / Expo SDK 55

---

## 2. Yêu cầu hạ tầng

| Service | Minimum | Ghi chú |
|---------|---------|---------|
| **API server** | 1 vCPU, 512MB RAM | Bun single-process, stateless |
| **PostgreSQL** | 1 vCPU, 1GB RAM, 10GB disk | Managed DB khuyến nghị (Supabase, Neon, RDS) |
| **Redis** | 256MB RAM | Upstash / ElastiCache / managed Redis |
| **MinIO / S3** | Tùy lượng media | Có thể dùng AWS S3 / Cloudflare R2 thay MinIO |
| **SMTP** | — | Resend, SendGrid, AWS SES, hoặc bất kỳ SMTP provider |
| **Domain + SSL** | — | Reverse proxy (Caddy, nginx, Cloudflare Tunnel) |

### 2.1 Mô hình production khuyến nghị cho bạn (1 VPS + Supabase)

- **VPS (Contabo)**:
  - chạy **k3s** (Kubernetes lightweight) để deploy API
  - mở port: `22/tcp`, `80/tcp`, `443/tcp`
- **DB**: Supabase Postgres (tách **2 projects**: staging + production)
- **Web landing/blog (Astro)**: deploy qua CDN (Cloudflare Pages hoặc Netlify)
- **Secrets**: GitHub Actions secrets + Kubernetes Secret (không commit `.env`)

---

## 3. Triển khai API

### 3.1 Docker (khuyến nghị)

Dockerfile đã có sẵn tại `api/Dockerfile`:

```bash
# Build image
docker build -t emplus-api:v0.1.0 -f api/Dockerfile .

# Run
docker run -d \
  --name emplus-api \
  -p 3000:3000 \
  --env-file api/.env.production \
  emplus-api:v0.1.0
```

### 3.2 Cloud platforms

| Platform | Hướng dẫn |
|----------|-----------|
| **Railway** | Connect repo → set root directory `/` → Dockerfile detected auto → set env vars |
| **Fly.io** | `fly launch` từ root, dùng Dockerfile hiện tại |
| **Render** | Docker deploy, set env vars trong dashboard |
| **VPS** | Docker + Caddy reverse proxy (xem bên dưới) |

### 3.3 VPS + Caddy (ví dụ)

```bash
# Trên VPS
git clone <repo> && cd emplus

# Build + run
docker compose -f docker-compose.yml up -d   # Postgres, Redis, MinIO
docker build -t emplus-api -f api/Dockerfile .
docker run -d --name emplus-api --network host \
  --env-file api/.env.production \
  emplus-api

# Caddy reverse proxy
cat > /etc/caddy/Caddyfile << 'EOF'
api.emplus.app {
    reverse_proxy localhost:3000
}
EOF
sudo systemctl reload caddy
```

### 3.4 Kubernetes (kind/local)

Đã có manifests tại `deploy/k8s/`. Xem `deploy/k8s/README.md`.

Lưu ý: manifests hiện dùng `emptyDir` — cần chuyển sang PVC cho production.

### 3.5 Kubernetes production (k3s trên 1 VPS) — API only + Supabase

Repo đã có bộ manifests production mới tại `deploy/k8s-prod/`:

- `deploy/k8s-prod/base/`: Deployment/Service/Ingress API (không kèm Postgres/MinIO)
- `deploy/k8s-prod/overlays/staging/`: namespace `emplus-staging`, host `api-staging.emplus.app`
- `deploy/k8s-prod/overlays/prod/`: namespace `emplus-prod`, host `api.emplus.app`
- `deploy/k8s-prod/cluster/clusterissuer.yaml`: ClusterIssuer cho cert-manager

#### 3.5.1 DNS (Namecheap)

Tạo record:

- `api.emplus.app` → VPS public IP
- `api-staging.emplus.app` → VPS public IP

#### 3.5.2 Cài k3s trên VPS

```bash
curl -sfL https://get.k3s.io | sh -
sudo k3s kubectl get nodes
```

#### 3.5.3 Cài cert-manager và ClusterIssuer

- Cài cert-manager (Helm hoặc manifest upstream)
- Apply issuer mẫu (nhớ đổi email):

```bash
kubectl apply -f deploy/k8s-prod/cluster/clusterissuer.yaml
```

#### 3.5.4 Tạo secrets trên cluster (KHÔNG commit)

Staging:

```bash
kubectl -n emplus-staging create secret generic emplus-secrets \
  --from-literal=DATABASE_URL='(Supabase staging pooler URL)' \
  --from-literal=REDIS_URL='(managed redis url)' \
  --from-literal=DATA_ENCRYPTION_KEY='(openssl rand -hex 32)'
```

Prod tương tự trong namespace `emplus-prod`.

#### 3.5.5 Deploy manifests

```bash
kubectl apply -k deploy/k8s-prod/overlays/staging
kubectl apply -k deploy/k8s-prod/overlays/prod
```

---

## 4. Triển khai Mobile

### 4.1 Tạo EAS config

Repo đã có `mobile/eas.json`. Nếu cần chỉnh:

```json
{
  "cli": {
    "version": ">= 13.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "<APPLE_ID>",
        "ascAppId": "<ASC_APP_ID>",
        "appleTeamId": "ZG4LJ9HHX8"
      },
      "android": {
        "serviceAccountKeyPath": "<PATH_TO_KEY.json>"
      }
    }
  }
}
```

### 4.2 Build + Submit

```bash
cd mobile

# iOS production build
eas build --platform ios --profile production

# Android production build
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

### 4.3 Mobile environment

Cấu hình API URL cho production trong `mobile/src/core/config/`:

- `EXPO_PUBLIC_API_URL` → URL API production (vd: `https://api.emplus.app`)
- `EXPO_PUBLIC_LIVE_WS_ENABLED` → `true` nếu WebSocket sẵn sàng

### 4.4 Prebuild (native splash / icon)

Sau khi thay đổi `app.json` (icon, splash), cần prebuild:

```bash
npx expo prebuild --clean
```

---

## 5. Triển khai Web (Astro) landing + blog SEO

Web nằm ở `web/` và dùng Astro (static). Khuyến nghị deploy qua CDN (Cloudflare Pages/Netlify).

### 5.1 Build

```bash
bun run build:web
```

Output: `web/dist/`

### 5.2 Biến môi trường

Set `PUBLIC_SITE_URL` theo môi trường deploy (không có dấu `/` cuối):

- Prod: `https://emplus.app`
- Staging (nếu có web staging): `https://staging.emplus.app`

### 5.3 SEO checklist (tối thiểu)

- **robots.txt**: kiểm tra `web/public/robots.txt` trỏ sitemap đúng domain deploy.
- **Sitemap**: verify route sitemap do `@astrojs/sitemap` tạo ra.
- **RSS**: verify output của `@astrojs/rss` nếu dùng.
- Submit Google Search Console cho `emplus.app` và submit sitemap.

---

## 6. Biến môi trường production

Tạo file `api/.env.production` (KHÔNG commit file này). Mẫu đầy đủ từng biến (an toàn để commit): `api/.env.production.example`.

```bash
# === REQUIRED ===
NODE_ENV=production
DATA_STORE=postgres
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/emplus?sslmode=require
REDIS_URL=redis://:<pass>@<host>:6379
CORS_ALLOWED_ORIGINS=https://emplus.app,https://api.emplus.app

# Encryption (32-byte hex, generate: openssl rand -hex 32)
DATA_ENCRYPTION_KEY=<your-64-char-hex-key>

# === SMTP ===
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_USER=resend
MAIL_PASS=re_xxxxxxxxxxxx
MAIL_FROM=Em+ <no-reply@emplus.app>

# === Object Storage ===
# Option A: MinIO self-hosted
MINIO_ENDPOINT=https://minio.emplus.app
MINIO_ACCESS_KEY=<access-key>
MINIO_SECRET_KEY=<secret-key>
MINIO_BUCKET=emplus
MINIO_USE_SSL=true
MINIO_PUBLIC_BASE_URL=https://cdn.emplus.app

# Option B: AWS S3 / Cloudflare R2
# MINIO_ENDPOINT=https://<account>.r2.cloudflarestorage.com
# MINIO_REGION=auto

# === OAuth (nếu dùng) ===
GOOGLE_CLIENT_IDS=<ios-client-id>,<android-client-id>
APPLE_AUDIENCES=com.truongdq.emplus

# === Swagger (tắt trong production) ===
SWAGGER_ENABLED=false

# === Demo data (tắt trong production) ===
FAKE_IN_APP_NOTIFICATIONS=false
FAKE_TIMELINE_MEMORIES=false

# === Optional ===
# READ_DATABASE_URL=postgresql://<user>:<pass>@<replica-host>:5432/emplus?sslmode=require
# DEFAULT_BUDGET_AMOUNT=20000000
```

### Biến nhạy cảm — KHÔNG lưu trong Git

| Biến | Mô tả |
|------|-------|
| `DATABASE_URL` | Connection string PostgreSQL |
| `REDIS_URL` | Connection string Redis |
| `DATA_ENCRYPTION_KEY` | AES-256-GCM key (32 bytes hex) |
| `MAIL_PASS` | SMTP password |
| `MINIO_SECRET_KEY` | Object storage secret |

---

## 7. Database migration

### 6.1 Chạy migration production

```bash
# Từ thư mục root
DATABASE_URL="postgresql://..." bun run db:migrate

# Kiểm tra trạng thái
DATABASE_URL="postgresql://..." bun run db:migrate:status
```

### 6.2 Migration files

Nằm tại `api/src/db/migrations/` (001 → 017). Runner tự quản bảng `schema_migrations`.

### 6.3 Quy trình migration an toàn

1. **Backup** database trước khi migrate.
2. Chạy `db:migrate:status` để kiểm tra pending migrations.
3. Chạy `db:migrate` — mỗi file chạy trong transaction riêng.
4. Verify bằng `db:migrate:status` — tất cả phải `applied`.
5. Smoke test API health endpoint: `GET /health`.

---

## 8. CI/CD (GitHub Actions) + k3s deploy

### 8.1 CI hiện có

File: `.github/workflows/ci.yml`

- API: typecheck + test (memory store)
- Mobile: typecheck
- Web: `astro check` + `astro build` (đã thêm)

### 8.2 CD deploy API lên k3s (VPS) qua SSH

Workflow: `.github/workflows/deploy-api-k3s.yml` (manual trigger `workflow_dispatch`)

Nó sẽ:

1. Build & push image API lên GHCR.
2. SSH vào VPS để:
   - `kubectl apply -k deploy/k8s-prod/overlays/<env>`
   - set image tag cho Deployment
   - chạy Job migrate
   - rollout status

#### Secrets cần có trong GitHub

- `VPS_HOST`: public IP hoặc domain của VPS
- `VPS_USER`: user SSH (khuyến nghị non-root + sudo)
- `VPS_SSH_KEY`: private key để SSH vào VPS

#### Lưu ý quan trọng về migrations

- Runtime `DATABASE_URL` nên dùng Supabase **pooler**.
- Migrations nên dùng **direct connection**. Nếu bạn muốn tách biến migration riêng (`MIGRATION_DATABASE_URL`) thì cần chỉnh code/manifest để Job migrate dùng biến đó.

---

## 9. Checklist trước khi go-live

### Infrastructure

- [ ] VPS hardening cơ bản (UFW + SSH keys-only + disable password login + auto security updates)
- [ ] Supabase production project đã tạo + SSL/PITR phù hợp plan
- [ ] Redis production instance đã tạo
- [ ] Object storage (MinIO/S3/R2) đã tạo + bucket `emplus`
- [ ] SMTP provider đã cấu hình (Resend/SendGrid/SES)
- [ ] Domain `api.emplus.app` trỏ đúng
- [ ] SSL/TLS certificate hoạt động
- [ ] Ingress + cert-manager hoạt động trên k3s (staging trước, rồi prod)

### API

- [ ] `NODE_ENV=production` đã set
- [ ] `DATA_ENCRYPTION_KEY` đã generate và set
- [ ] `SWAGGER_ENABLED=false`
- [ ] `FAKE_IN_APP_NOTIFICATIONS=false`
- [ ] `FAKE_TIMELINE_MEMORIES=false`
- [ ] Database migration đã chạy thành công
- [ ] `GET /health` trả về 200
- [ ] CORS origins chỉ cho phép domain chính thức
- [ ] Rate limiting hoạt động trên `/v1/auth/*`

### Mobile

- [ ] `eas.json` đã tạo với profile production
- [ ] API URL production đã cấu hình
- [ ] App icon hiển thị đúng
- [ ] Splash screen hiển thị đúng (cần `npx expo prebuild --clean`)
- [ ] Push notification permission flow hoạt động
- [ ] Build production pass trên cả iOS và Android
- [ ] TestFlight / Internal Testing đã verify

### Security

- [ ] Không có secret nào trong Git
- [ ] `allowMockOAuth` chỉ bật khi `NODE_ENV=test`
- [ ] CSP + HSTS headers bật trong production
- [ ] WebSocket reject unauthenticated connections
- [ ] SQL debug logging chỉ chạy khi `NODE_ENV !== production`

---

## 10. VPS hardening (khuyến nghị tối thiểu)

Mục tiêu: giảm rủi ro bị chiếm VPS (SSH brute force, lộ password), giảm blast radius nếu có compromise.

### 10.1 Users & SSH

- Tạo user deploy (không dùng root):
  - `sudo adduser deploy`
  - `sudo usermod -aG sudo deploy`
- SSH keys-only:
  - copy public key vào `~deploy/.ssh/authorized_keys`
- Chỉnh `/etc/ssh/sshd_config` (giá trị khuyến nghị):
  - `PasswordAuthentication no`
  - `PermitRootLogin no`
  - `PubkeyAuthentication yes`
- Reload SSH:

```bash
sudo systemctl reload ssh
```

### 10.2 Firewall (UFW)

Mở đúng các cổng cần thiết:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### 10.3 Auto security updates

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 10.4 Fail2ban (tuỳ chọn nhưng khuyến nghị)

```bash
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status
```

### 10.5 K3s kubeconfig permissions

- K3s kubeconfig mặc định nằm ở `/etc/rancher/k3s/k3s.yaml` (root-only).
- Khi workflow deploy SSH, thường dùng `sudo k3s kubectl ...` để tránh copy kubeconfig ra ngoài.

---

## 11. Backup & restore drill (DB/Redis/Object storage)

Mục tiêu: có khả năng phục hồi sau lỗi migration, xóa nhầm dữ liệu, hoặc sự cố hạ tầng.

### 11.1 Supabase Postgres

- **Bật PITR** cho production (nếu plan Supabase hỗ trợ).
- **Drill hàng tháng (khuyến nghị)**:
  1. Tạo một bản restore (hoặc clone) vào môi trường staging / project tạm.
  2. Chạy smoke test API (login + 1–2 read endpoints).
  3. Ghi lại thời gian RTO/RPO đạt được.

### 11.2 Redis

Tùy mô hình:

- **Managed Redis**: bật persistence/backup theo provider (nếu có).
- **Self-host**: bật AOF/RDB và backup volume định kỳ (không khuyến nghị trên 1 VPS cho production nếu chưa có kinh nghiệm).

### 11.3 Object storage (S3/R2/MinIO)

- Nếu dùng **S3/R2**: bật versioning (nếu phù hợp) và có rule lifecycle.
- Nếu dùng **MinIO self-host**:
  - bắt buộc có PV + backup volume (rsync/duplicity/restic) sang nơi khác.

### 11.4 Backup trước khi migration “nhạy cảm”

Trước các migration có thay đổi schema lớn:

- đảm bảo có snapshot/restore point (PITR) hoặc backup logic.
- chạy migration trên **staging** trước, verify ứng dụng chạy ổn.

---

## 12. Monitoring & Observability

### Health check

```
GET /health → 200 OK
```

### Logging

- API log ra stdout (structured khi production).
- Docker: `docker logs emplus-api -f`
- K8s local: Grafana + Loki + Promtail đã có manifests (`deploy/k8s/observability/`).

### Metrics (tùy chọn)

- Prometheus scrape `/metrics` (nếu thêm middleware).
- Grafana dashboards cho response time, error rate, DB connections.

### Alerts đề xuất

| Alert | Điều kiện |
|-------|----------|
| API down | Health check fail > 2 phút |
| High error rate | 5xx > 5% trong 5 phút |
| DB connection pool | Active connections > 80% pool |
| Disk usage | > 85% |
| Redis memory | > 80% maxmemory |

---

## 13. Rollback plan

### API rollback

```bash
# Docker
docker stop emplus-api
docker run -d --name emplus-api-rollback \
  --env-file api/.env.production \
  emplus-api:<previous-tag>

# Hoặc revert code + rebuild
git revert HEAD
docker build -t emplus-api:rollback -f api/Dockerfile .
```

### Database rollback

Migration runner hiện chỉ hỗ trợ forward migration. Nếu cần rollback:

1. Restore từ backup đã tạo trước khi migrate.
2. Hoặc viết SQL revert thủ công cho migration cụ thể.

### Mobile rollback

- **OTA (Expo Updates):** Publish bản cũ qua `eas update`.
- **Store:** Submit bản cũ hoặc tạo hotfix build mới.

---

## Security verification (phạm vi tài liệu)

- **Security verification**: pass — tài liệu không thêm mã chạy production và không chứa secrets thật.
- **Risks found**: rủi ro chính nằm ở cấu hình (SSH/VPS hardening, TLS issuer email, secrets management), không nằm trong source docs.
- **Mitigation**:
  - Không commit `.env` / khóa SSH / Supabase URLs có password.
  - Tách staging/prod (Supabase projects + K8s namespaces + GitHub Environments).
  - Chạy migration có kiểm soát; ưu tiên direct connection cho migration.
- **Residual risk**: cần hardening VPS (firewall/fail2ban/updates) và backup/restore drill định kỳ.
