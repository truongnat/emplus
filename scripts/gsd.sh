#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GSD_HOME="${HOME}/.claude/get-shit-done"
GSD_TOOLS="${GSD_HOME}/bin/gsd-tools.cjs"
PLANNING_DIR="${REPO_ROOT}/.planning"

show_help() {
  cat <<'EOF'
Emplus GSD helper

Usage:
  bash ./scripts/gsd.sh doctor
  bash ./scripts/gsd.sh status
  bash ./scripts/gsd.sh paths
  bash ./scripts/gsd.sh guide

Commands:
  doctor   Check whether get-shit-done is installed and whether this repo has the minimum planning structure.
  status   Show planning files that already exist in this repo.
  paths    Show important local GSD workflow/template paths.
  guide    Show the recommended Emplus workflow mapping.

Notes:
  - GSD slash commands such as /gsd:plan-phase are used from Claude/Claude Code.
  - This helper does not replace those commands. It makes the local setup discoverable and repeatable.
EOF
}

doctor() {
  echo "Checking GSD installation..."
  if [ -d "${GSD_HOME}" ] && [ -f "${GSD_TOOLS}" ]; then
    echo "  OK  GSD found at ${GSD_HOME}"
  else
    echo "  MISSING  GSD not found at ${GSD_HOME}"
    echo ""
    echo "Install suggestion:"
    echo "  npx get-shit-done-cc@latest"
    exit 1
  fi

  echo "Checking repo planning structure..."
  if [ -d "${PLANNING_DIR}" ]; then
    echo "  OK  .planning/ exists"
  else
    echo "  MISSING  .planning/ does not exist"
  fi

  for file in "${PLANNING_DIR}/README.md" "${REPO_ROOT}/docs/12_release_scope_v1.md" "${REPO_ROOT}/docs/13_release_checklist_v1.md"; do
    if [ -f "${file}" ]; then
      echo "  OK  $(realpath --relative-to="${REPO_ROOT}" "${file}" 2>/dev/null || echo "${file#${REPO_ROOT}/}")"
    else
      echo "  WARN  missing ${file#${REPO_ROOT}/}"
    fi
  done

  echo ""
  echo "Recommended next step:"
  echo "  Read docs/14_gsd_workflow_integration.md"
}

status() {
  echo "Planning files in repo:"
  find "${PLANNING_DIR}" -maxdepth 2 -type f | sed "s#${REPO_ROOT}/##" | sort
}

paths() {
  cat <<EOF
Important GSD paths

Home:
  ${GSD_HOME}

Tools:
  ${GSD_TOOLS}

Useful workflows:
  ${GSD_HOME}/workflows/new-project.md
  ${GSD_HOME}/workflows/plan-phase.md
  ${GSD_HOME}/workflows/execute-phase.md
  ${GSD_HOME}/workflows/quick.md
  ${GSD_HOME}/workflows/review.md
  ${GSD_HOME}/workflows/ship.md

Useful templates:
  ${GSD_HOME}/templates/project.md
  ${GSD_HOME}/templates/roadmap.md
  ${GSD_HOME}/templates/research.md
  ${GSD_HOME}/templates/summary.md
EOF
}

guide() {
  cat <<'EOF'
Recommended GSD flow for Emplus

1. Use `/gsd:map-codebase` only when the codebase context is stale or a new teammate needs orientation.
2. Use `/gsd:quick --full` for small contained tasks inside the current release scope.
3. Use `/gsd:discuss-phase` before planning when the UX or product boundary is still fuzzy.
4. Use `/gsd:plan-phase` only after the release scope and phase boundary are explicit.
5. Use `/gsd:execute-phase` when the plan is stable and the team wants a disciplined handoff.

For Emplus right now:
  - Product boundary: docs/12_release_scope_v1.md
  - Release gates: docs/13_release_checklist_v1.md
  - UI direction: docs/10_calm_care_ui_direction.md
  - Mobile-first implementation: docs/11_mobile_calm_care_refactor.md

The safe sequence is:
  scope -> checklist -> phase discussion -> phase plan -> execution
EOF
}

case "${1:-help}" in
  doctor)
    doctor
    ;;
  status)
    status
    ;;
  paths)
    paths
    ;;
  guide)
    guide
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo "Unknown command: ${1}"
    echo ""
    show_help
    exit 1
    ;;
esac
