#!/usr/bin/env bash
set -euo pipefail

API_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$API_DIR"

REQUESTED_PORT="${PORT:-3000}"

port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

choose_port() {
  local port="$REQUESTED_PORT"

  if ! port_in_use "$port"; then
    echo "$port"
    return 0
  fi

  if [ -n "${PORT:-}" ]; then
    echo "Cổng API đã chọn ($port) đang được sử dụng. Hãy chọn cổng khác bằng biến PORT." >&2
    exit 1
  fi

  while port_in_use "$port"; do
    port=$((port + 1))
  done

  echo "$port"
}

RUN_PORT="$(choose_port)"
if [ "$RUN_PORT" != "$REQUESTED_PORT" ]; then
  echo "Cổng $REQUESTED_PORT đang bận. API sẽ khởi động ở cổng $RUN_PORT."
fi

exec env PORT="$RUN_PORT" bun --watch src/index.ts
