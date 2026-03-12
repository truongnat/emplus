#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="emplus-local"
DELETE_CLUSTER="${DELETE_CLUSTER:-false}"

if command -v helm >/dev/null 2>&1; then
  helm uninstall promtail -n observability >/dev/null 2>&1 || true
  helm uninstall loki -n observability >/dev/null 2>&1 || true
  helm uninstall kps -n observability >/dev/null 2>&1 || true
fi

kubectl delete namespace observability --ignore-not-found >/dev/null 2>&1 || true
kubectl delete namespace emplus-local --ignore-not-found >/dev/null 2>&1 || true

if [[ "$DELETE_CLUSTER" == "true" ]]; then
  kind delete cluster --name "$CLUSTER_NAME" >/dev/null 2>&1 || true
  echo "Deleted kind cluster: $CLUSTER_NAME"
else
  echo "Removed app/observability namespaces. Cluster kept."
  echo "Use DELETE_CLUSTER=true bash deploy/k8s/scripts/k8s-down.sh to delete cluster."
fi
