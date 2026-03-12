#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
CLUSTER_NAME="emplus-local"
KIND_CONFIG="$ROOT_DIR/deploy/kind/kind-config.yaml"
IMAGE_REPO="emplus-api"
IMAGE_TAG="${IMAGE_TAG:-local-$(date +%Y%m%d%H%M%S)}"
IMAGE_NAME="${IMAGE_REPO}:${IMAGE_TAG}"
IMAGE_ALIAS="${IMAGE_REPO}:local"
IMAGE_PLACEHOLDER="${IMAGE_REPO}:local"
APP_NS="emplus-local"
OBS_NS="observability"

apply_job_with_image() {
  local manifest="$1"
  local tmp_file
  tmp_file="$(mktemp)"
  sed "s|image: ${IMAGE_PLACEHOLDER}|image: ${IMAGE_NAME}|g" "$manifest" >"$tmp_file"
  kubectl apply -f "$tmp_file" >/dev/null
  rm -f "$tmp_file"
}

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

need_cmd docker
need_cmd kubectl
need_cmd kind
need_cmd helm

if ! kind get clusters | grep -qx "$CLUSTER_NAME"; then
  echo "[1/7] Creating kind cluster: $CLUSTER_NAME"
  kind create cluster --config "$KIND_CONFIG"
else
  echo "[1/7] Kind cluster already exists: $CLUSTER_NAME"
fi

kubectl config use-context "kind-$CLUSTER_NAME" >/dev/null

echo "[2/7] Building API image: $IMAGE_NAME"
docker build -f "$ROOT_DIR/api/Dockerfile" -t "$IMAGE_NAME" -t "$IMAGE_ALIAS" "$ROOT_DIR"

echo "[3/7] Loading image into kind"
kind load docker-image "$IMAGE_NAME" --name "$CLUSTER_NAME"

echo "[4/7] Deploying base application stack"
kubectl apply -k "$ROOT_DIR/deploy/k8s/base"
kubectl -n "$APP_NS" set image deployment/emplus-api api="$IMAGE_NAME" >/dev/null

# Prevent API from flapping before DB schema + seed are ready.
kubectl -n "$APP_NS" scale deployment emplus-api --replicas=0 >/dev/null

kubectl -n "$APP_NS" rollout status deployment/postgres --timeout=240s
kubectl -n "$APP_NS" rollout status deployment/redis --timeout=180s
kubectl -n "$APP_NS" rollout status deployment/minio --timeout=240s
kubectl -n "$APP_NS" rollout status deployment/mailpit --timeout=180s

echo "[5/7] Running bootstrap jobs (MinIO bucket + DB migrate + DB seed)"
for job in minio-bootstrap db-init db-seed; do
  kubectl -n "$APP_NS" delete job "$job" --ignore-not-found >/dev/null
done

kubectl apply -f "$ROOT_DIR/deploy/k8s/jobs/minio-bootstrap-job.yaml" >/dev/null
kubectl -n "$APP_NS" wait --for=condition=complete job/minio-bootstrap --timeout=240s

apply_job_with_image "$ROOT_DIR/deploy/k8s/jobs/db-init-job.yaml"
kubectl -n "$APP_NS" wait --for=condition=complete job/db-init --timeout=240s

apply_job_with_image "$ROOT_DIR/deploy/k8s/jobs/db-seed-job.yaml"
kubectl -n "$APP_NS" wait --for=condition=complete job/db-seed --timeout=240s

echo "[6/7] Starting API"
kubectl -n "$APP_NS" scale deployment emplus-api --replicas=1 >/dev/null
kubectl -n "$APP_NS" rollout status deployment/emplus-api --timeout=240s

echo "[7/7] Installing monitoring + logging stack"
kubectl get namespace "$OBS_NS" >/dev/null 2>&1 || kubectl create namespace "$OBS_NS"

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts >/dev/null 2>&1 || true
helm repo add grafana https://grafana.github.io/helm-charts >/dev/null 2>&1 || true
helm repo update >/dev/null

for attempt in 1 2; do
  if helm upgrade --install kps prometheus-community/kube-prometheus-stack \
    --namespace "$OBS_NS" \
    --values "$ROOT_DIR/deploy/k8s/observability/kube-prometheus-stack-values.yaml" \
    --wait --timeout 20m; then
    break
  fi

  if [[ "$attempt" -eq 2 ]]; then
    echo "Failed to install kube-prometheus-stack after retries." >&2
    exit 1
  fi

  echo "Retrying kube-prometheus-stack install after transient failure..."
  sleep 10
done

helm upgrade --install loki grafana/loki \
  --namespace "$OBS_NS" \
  --values "$ROOT_DIR/deploy/k8s/observability/loki-values.yaml" \
  --wait --timeout 10m

helm upgrade --install promtail grafana/promtail \
  --namespace "$OBS_NS" \
  --values "$ROOT_DIR/deploy/k8s/observability/promtail-values.yaml" \
  --wait --timeout 10m

echo ""
echo "Done. Quick endpoints:"
echo "- API image:     $IMAGE_NAME"
echo "- API health:    http://localhost:30080/health"
echo "- API swagger:   http://localhost:30080/v1/docs"
echo "- Grafana:       http://localhost:30090 (admin/admin123)"
echo "- Prometheus:    http://localhost:30091"
echo ""
echo "Useful checks:"
echo "- kubectl -n $APP_NS get pods"
echo "- kubectl -n $OBS_NS get pods"
echo "- kubectl -n $APP_NS logs deploy/emplus-api --tail=100"
