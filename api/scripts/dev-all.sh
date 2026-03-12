#!/usr/bin/env bash
set -euo pipefail

API_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ROOT_DIR="$(cd "$API_DIR/.." && pwd)"

cd "$ROOT_DIR"

if [ -f "$API_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$API_DIR/.env"
  set +a
fi

ALLOW_MOCK_OAUTH="${ALLOW_MOCK_OAUTH:-false}"
MAIL_HOST="${MAIL_HOST:-localhost}"
MAIL_FROM="${MAIL_FROM:-no-reply@emplus.local}"
MINIO_ACCESS_KEY="${MINIO_ACCESS_KEY:-minioadmin}"
MINIO_SECRET_KEY="${MINIO_SECRET_KEY:-minioadmin}"
MINIO_BUCKET="${MINIO_BUCKET:-emplus}"
MINIO_REGION="${MINIO_REGION:-us-east-1}"
MINIO_USE_SSL="${MINIO_USE_SSL:-false}"
GOOGLE_CLIENT_IDS="${GOOGLE_CLIENT_IDS:-}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-}"
APPLE_AUDIENCES="${APPLE_AUDIENCES:-}"
APPLE_AUDIENCE="${APPLE_AUDIENCE:-}"
APPLE_ISSUER="${APPLE_ISSUER:-https://appleid.apple.com}"

REQUESTED_API_PORT="${PORT:-3000}"
REQUESTED_WEB_PORT="${WEB_PORT:-3001}"

REQUESTED_DB_PORT="${EMPLUS_POSTGRES_PORT:-5432}"
REQUESTED_DB_SLAVE_PORT="${EMPLUS_POSTGRES_SLAVE_PORT:-5433}"
REQUESTED_REDIS_PORT="${EMPLUS_REDIS_PORT:-6379}"
REQUESTED_MAIL_SMTP_PORT="${EMPLUS_MAIL_SMTP_PORT:-${MAIL_PORT:-1025}}"
REQUESTED_MAIL_UI_PORT="${EMPLUS_MAIL_UI_PORT:-8025}"
REQUESTED_MINIO_API_PORT="${EMPLUS_MINIO_API_PORT:-9000}"
REQUESTED_MINIO_CONSOLE_PORT="${EMPLUS_MINIO_CONSOLE_PORT:-9001}"
REQUESTED_MOBILE_PORT="${EXPO_PORT:-8081}"

RUN_API="${RUN_API:-true}"
RUN_WEB="${RUN_WEB:-true}"
RUN_MOBILE="${RUN_MOBILE:-false}"  # Default to false - run mobile manually

is_true() {
  local value
  value="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"
  [[ "$value" == "1" || "$value" == "true" || "$value" == "yes" || "$value" == "on" ]]
}

port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

is_reserved_port() {
  local needle="$1"
  shift
  local item
  for item in "$@"; do
    if [ -n "$item" ] && [ "$item" = "$needle" ]; then
      return 0
    fi
  done

  return 1
}

pick_port() {
  local requested="$1"
  local force_fail_if_busy="$2"
  shift 2
  local port="$requested"

  if ! port_in_use "$port" && ! is_reserved_port "$port" "$@"; then
    echo "$port"
    return 0
  fi

  if is_true "$force_fail_if_busy"; then
    echo "Cổng $requested đang được sử dụng." >&2
    exit 1
  fi

  while port_in_use "$port" || is_reserved_port "$port" "$@"; do
    port=$((port + 1))
  done

  echo "$port"
}

API_PORT="$(pick_port "$REQUESTED_API_PORT" false)"
WEB_PORT="$(pick_port "$REQUESTED_WEB_PORT" false "$API_PORT")"
EMPLUS_POSTGRES_PORT="$(pick_port "$REQUESTED_DB_PORT" false "$API_PORT" "$WEB_PORT")"
EMPLUS_POSTGRES_SLAVE_PORT="$(pick_port "$REQUESTED_DB_SLAVE_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT")"
EMPLUS_REDIS_PORT="$(pick_port "$REQUESTED_REDIS_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT")"
EMPLUS_MAIL_SMTP_PORT="$(pick_port "$REQUESTED_MAIL_SMTP_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT" "$EMPLUS_REDIS_PORT")"
EMPLUS_MAIL_UI_PORT="$(pick_port "$REQUESTED_MAIL_UI_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT" "$EMPLUS_REDIS_PORT" "$EMPLUS_MAIL_SMTP_PORT")"
EMPLUS_MINIO_API_PORT="$(pick_port "$REQUESTED_MINIO_API_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT" "$EMPLUS_REDIS_PORT" "$EMPLUS_MAIL_SMTP_PORT" "$EMPLUS_MAIL_UI_PORT")"
EMPLUS_MINIO_CONSOLE_PORT="$(pick_port "$REQUESTED_MINIO_CONSOLE_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT" "$EMPLUS_REDIS_PORT" "$EMPLUS_MAIL_SMTP_PORT" "$EMPLUS_MAIL_UI_PORT" "$EMPLUS_MINIO_API_PORT")"
MOBILE_PORT="$(pick_port "$REQUESTED_MOBILE_PORT" false "$API_PORT" "$WEB_PORT" "$EMPLUS_POSTGRES_PORT" "$EMPLUS_POSTGRES_SLAVE_PORT" "$EMPLUS_REDIS_PORT" "$EMPLUS_MAIL_SMTP_PORT" "$EMPLUS_MAIL_UI_PORT" "$EMPLUS_MINIO_API_PORT" "$EMPLUS_MINIO_CONSOLE_PORT")"

DATABASE_URL="postgresql://postgres:postgres@localhost:${EMPLUS_POSTGRES_PORT}/emplus"
READ_DATABASE_URL="postgresql://postgres:postgres@localhost:${EMPLUS_POSTGRES_SLAVE_PORT}/emplus"
REDIS_URL="redis://localhost:${EMPLUS_REDIS_PORT}"
MAIL_PORT="${EMPLUS_MAIL_SMTP_PORT}"
MINIO_ENDPOINT="http://localhost:${EMPLUS_MINIO_API_PORT}"

API_BASE_URL="http://localhost:${API_PORT}"

[ -f "$API_DIR/.env" ] || cp "$API_DIR/.env.example" "$API_DIR/.env"
[ -f "$ROOT_DIR/web/.env.local" ] || cp "$ROOT_DIR/web/.env.local.example" "$ROOT_DIR/web/.env.local"
[ -f "$ROOT_DIR/mobile/.env" ] || cp "$ROOT_DIR/mobile/.env.example" "$ROOT_DIR/mobile/.env"

# Update web .env.local with correct API port
if [ -f "$ROOT_DIR/web/.env.local" ]; then
  sed -i '' "s|NEXT_PUBLIC_API_BASE=.*|NEXT_PUBLIC_API_BASE=${API_BASE_URL}/v1|" "$ROOT_DIR/web/.env.local"
fi

export EMPLUS_POSTGRES_PORT
export EMPLUS_POSTGRES_SLAVE_PORT
export EMPLUS_REDIS_PORT
export EMPLUS_MAIL_SMTP_PORT
export EMPLUS_MAIL_UI_PORT
export EMPLUS_MINIO_API_PORT
export EMPLUS_MINIO_CONSOLE_PORT
export EXPO_PORT="$MOBILE_PORT"

bun run --cwd api infra:down >/dev/null 2>&1 || true
bun run --cwd api infra:up

until docker exec emplus-postgres pg_isready -U postgres -d emplus >/dev/null 2>&1; do
  sleep 1
done

until docker exec emplus-postgres-slave pg_isready -U postgres -d emplus >/dev/null 2>&1; do
  sleep 1
done

until docker exec emplus-redis redis-cli ping >/dev/null 2>&1; do
  sleep 1
done

until curl -fsS "${MINIO_ENDPOINT}/minio/health/live" >/dev/null 2>&1; do
  sleep 1
done

# Fix migration state if needed - remove any broken migration records
docker exec emplus-postgres psql -U postgres -d emplus -c "DELETE FROM schema_migrations WHERE name = '004_add_is_admin.sql';" >/dev/null 2>&1 || true

DATABASE_URL="$DATABASE_URL" DATA_STORE=postgres bun run --cwd api db:init
DATABASE_URL="$DATABASE_URL" DATA_STORE=postgres bun run --cwd api db:seed

if [ -n "$READ_DATABASE_URL" ] && [ "$READ_DATABASE_URL" != "$DATABASE_URL" ]; then
  DATABASE_URL="$READ_DATABASE_URL" DATA_STORE=postgres bun run --cwd api db:init
  DATABASE_URL="$READ_DATABASE_URL" DATA_STORE=postgres bun run --cwd api db:seed
fi

echo ""
echo "Dịch vụ"
echo "- API: ${API_BASE_URL}"
echo "- Swagger: ${API_BASE_URL}/v1/docs"
echo "- Web: http://localhost:${WEB_PORT}"
if is_true "$RUN_MOBILE"; then
  echo "- Mobile Metro: http://localhost:${MOBILE_PORT}"
fi
echo "- Mailpit UI: http://localhost:${EMPLUS_MAIL_UI_PORT}"
echo "- MinIO API: http://localhost:${EMPLUS_MINIO_API_PORT}"
echo "- MinIO Console: http://localhost:${EMPLUS_MINIO_CONSOLE_PORT}"
echo ""

declare -a PIDS=()

cleanup() {
  if [ ${#PIDS[@]} -gt 0 ]; then
    echo "Đang dừng các tiến trình ứng dụng..."
    kill "${PIDS[@]}" 2>/dev/null || true
    wait "${PIDS[@]}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

if is_true "$RUN_API"; then
  (
    cd "$API_DIR"
    ALLOW_MOCK_OAUTH="$ALLOW_MOCK_OAUTH" \
      GOOGLE_CLIENT_IDS="$GOOGLE_CLIENT_IDS" \
      GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID" \
      APPLE_AUDIENCES="$APPLE_AUDIENCES" \
      APPLE_AUDIENCE="$APPLE_AUDIENCE" \
      APPLE_ISSUER="$APPLE_ISSUER" \
      DATA_STORE=postgres \
      DATABASE_URL="$DATABASE_URL" \
      READ_DATABASE_URL="$READ_DATABASE_URL" \
      REDIS_URL="$REDIS_URL" \
      MAIL_HOST="$MAIL_HOST" \
      MAIL_PORT="$MAIL_PORT" \
      MAIL_FROM="$MAIL_FROM" \
      MINIO_ENDPOINT="$MINIO_ENDPOINT" \
      MINIO_ACCESS_KEY="$MINIO_ACCESS_KEY" \
      MINIO_SECRET_KEY="$MINIO_SECRET_KEY" \
      MINIO_BUCKET="$MINIO_BUCKET" \
      MINIO_REGION="$MINIO_REGION" \
      MINIO_USE_SSL="$MINIO_USE_SSL" \
      PORT="$API_PORT" \
      bun run dev
  ) &
  PIDS+=("$!")
fi

if is_true "$RUN_WEB"; then
  (
    cd "$ROOT_DIR/web"
    NEXT_PUBLIC_API_BASE="${API_BASE_URL}/v1" \
      PORT="$WEB_PORT" \
      bun run dev -- --port "$WEB_PORT"
  ) &
  PIDS+=("$!")
fi

if is_true "$RUN_MOBILE"; then
  (
    cd "$ROOT_DIR/mobile"
    CI=1 \
      EXPO_NO_INTERACTIVE=1 \
      EXPO_PORT="$MOBILE_PORT" \
      EXPO_PUBLIC_API_BASE="${API_BASE_URL}/v1" \
      bun run dev -- --port "$MOBILE_PORT"
  ) &
  PIDS+=("$!")
fi

if [ ${#PIDS[@]} -eq 0 ]; then
  echo "Chưa chọn ứng dụng nào để chạy. Hãy đặt RUN_API/RUN_WEB/RUN_MOBILE=true." >&2
  exit 1
fi

while true; do
  for pid in "${PIDS[@]}"; do
    if ! kill -0 "$pid" 2>/dev/null; then
      wait "$pid"
      exit $?
    fi
  done
  sleep 1
done
