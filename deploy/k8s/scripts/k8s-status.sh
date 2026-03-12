#!/usr/bin/env bash
set -euo pipefail

echo "== Context =="
kubectl config current-context || true

echo ""
echo "== App namespace (emplus-local) =="
kubectl -n emplus-local get pods,svc,deploy,jobs 2>/dev/null || true

echo ""
echo "== Observability namespace (observability) =="
kubectl -n observability get pods,svc,deploy,daemonset,statefulset 2>/dev/null || true
