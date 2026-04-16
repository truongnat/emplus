## Kubernetes production (1 VPS + k3s) — API only

Repo hiện có `deploy/k8s/` cho **local dev** (kind) và có Postgres/MinIO `emptyDir`.
Thư mục `deploy/k8s-prod/` này là bộ manifests **production/staging** cho **API** chạy trên
**1 VPS (Contabo) + k3s**, còn:

- **Database**: Supabase Postgres (external)
- **Web (Astro)**: deploy qua CDN (Cloudflare Pages/Netlify)

### 1) Chuẩn bị VPS (gợi ý tối thiểu)

- Mở inbound ports:
  - `22/tcp` (SSH, giới hạn IP nếu được)
  - `80/tcp`, `443/tcp` (Ingress)
- DNS (Namecheap):
  - `api.emplus.app` → VPS public IP
  - `api-staging.emplus.app` → VPS public IP (nếu dùng)

### 2) Cài k3s

Chạy trên VPS (Ubuntu/Debian):

```bash
curl -sfL https://get.k3s.io | sh -
sudo kubectl get nodes
```

### 3) Cài cert-manager (Let’s Encrypt)

Bạn có thể cài bằng Helm hoặc manifest upstream. Kế hoạch mặc định dùng Helm.
Sau khi cài, apply `ClusterIssuer`:

```bash
kubectl apply -f deploy/k8s-prod/cluster/clusterissuer.yaml
```

### 4) Tạo namespace + secrets

Không commit secrets vào git. Tạo secrets trực tiếp trên cluster:

```bash
kubectl -n emplus-staging create secret generic emplus-secrets \
  --from-literal=DATABASE_URL='...' \
  --from-literal=REDIS_URL='...' \
  --from-literal=DATA_ENCRYPTION_KEY='...'
```

Lưu ý:
- `DATABASE_URL` runtime nên dùng **Supabase pooler**.
- Migration nên dùng **direct connection** (trong workflow deploy sẽ chạy job migrate với biến riêng).

### 5) Deploy staging / prod

```bash
kubectl apply -k deploy/k8s-prod/overlays/staging
kubectl apply -k deploy/k8s-prod/overlays/prod
```

### 6) Migrations khi release

Migrations của API nằm ở `api/src/db/migrations/*.sql`.
Bạn chạy migration bằng Job `db-migrate` (workflow deploy sẽ apply Job rồi wait complete).

