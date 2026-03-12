#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                         EMPLUS LOCAL SERVICES                             ║"
echo "╠════════════════════════════════════════════════════════════════════════════╣"
echo "║  SERVICE                  │ PORT       │ URL                              ║"
echo "╠═══════════════════════════╪═════════════╪═════════════════════════════════╣"

# Backend
echo "║  API                      │ 3000       │ http://localhost:3000           ║"
echo "║  Swagger                  │ 3000       │ http://localhost:3000/v1/docs   ║"

# Mobile
echo "║  Expo (Metro)             │ 8081       │ http://localhost:8081           ║"

# Database
echo "║  PostgreSQL               │ 5432       │ localhost:5432                  ║"
echo "║  PostgreSQL Slave         │ 5433       │ localhost:5433                  ║"
echo "║  Redis                    │ 6379       │ localhost:6379                  ║"

# Monitoring
echo "║  Grafana                  │ 3030       │ http://localhost:3030          ║"
echo "║  Loki                     │ 3100       │ http://localhost:3100           ║"

# Services
echo "║  MinIO API                │ 9000       │ http://localhost:9000          ║"
echo "║  MinIO Console            │ 9001       │ http://localhost:9001          ║"
echo "║  Mailpit SMTP             │ 1025       │ localhost:1025                  ║"
echo "║  Mailpit UI               │ 8025       │ http://localhost:8025           ║"

echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "📧 SEED ACCOUNTS (for testing)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Email:    seed.minh@emplus.local"
echo "  Password: Seed@123456"
echo ""
echo "  Email:    seed.ngoc@emplus.local"
echo "  Password: Seed@123456"
echo ""
echo "  Email:    admin@emplus.local"
echo "  Password: Admin@123456 (admin panel)"
echo ""
echo "🤖 AI WORKFLOWS (agentic-sdlc)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ai:feature \"description\"  - Implement new feature"
echo "  ai:bugfix \"description\"   - Fix a bug"
echo "  ai:review [focus]         - Review code"
echo ""
echo "🔑 API Keys / OAuth (if configured in .env)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Google Client ID:    (set in GOOGLE_CLIENT_IDS)"
echo "  Apple Audience:     (set in APPLE_AUDIENCES)"
echo ""
echo "📦 Quick Commands"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Dev (API):            bun run dev"
echo "  Dev all (inc Mobile): bun run dev:all"
echo "  Start infra:          bun run db:up"
echo "  Stop infra:           bun run db:down"
echo "  Start logging:        bun run logging:up"
echo "  Stop logging:         bun run logging:down"
echo "  Run seed:             bun run db:seed"
echo "  Show ports:           bun run ports"
echo "  AI Feature:           bun run ai:feature \"task\""
echo "  AI Bugfix:            bun run ai:bugfix \"issue\""
echo "  AI Review:            bun run ai:review [focus]"
echo ""
