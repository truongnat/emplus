# Local DevOps Stack (Kubernetes)

Stack này triển khai local trên `kind`:

- Ứng dụng: `emplus-api`
- Phụ trợ: `postgres`, `redis`, `minio`, `mailpit`
- Bootstrap job: `minio-bootstrap`, `db-init`, `db-seed`
- Observability: `kube-prometheus-stack`, `loki`, `promtail`

## 1) Bring up

```bash
bash deploy/k8s/scripts/k8s-up.sh
```

## 2) Status

```bash
bash deploy/k8s/scripts/k8s-status.sh
```

## 3) Tear down

```bash
bash deploy/k8s/scripts/k8s-down.sh
# hoặc xoá luôn cluster
DELETE_CLUSTER=true bash deploy/k8s/scripts/k8s-down.sh
```

## Endpoints

- API health: `http://localhost:30080/health`
- API swagger: `http://localhost:30080/v1/docs`
- Grafana: `http://localhost:30090` (`admin` / `admin123`)
- Prometheus: `http://localhost:30091`

## Notes

- Manifest hiện dùng `emptyDir` cho Postgres/MinIO để ưu tiên vòng lặp dev nhanh, không phải persistence production.
- `READ_DATABASE_URL` đang trỏ cùng DB chính trong môi trường k8s local.
