#!/bin/bash
# EmPlus AI Workflow Runner using agentic-sdlc

AGENTIC_SDLC="/Users/truongdq/Documents/GitHub/agentic-sdlc/target/debug/agentic-sdlc"
WORKFLOW_DIR="$(cd "$(dirname "$0")/../.agents/workflows" && pwd)"

show_help() {
  echo "EmPlus AI Workflow Runner"
  echo ""
  echo "Usage: ./ai-workflow.sh <command> [args]"
  echo ""
  echo "Commands:"
  echo "  feature <description>    - Implement a new feature"
  echo "  bugfix <description>   - Fix a bug"
  echo "  review [focus]         - Review code changes"
  echo "  help                   - Show this help"
  echo ""
  echo "Examples:"
  echo "  ./ai-workflow.sh feature \"Add dark mode support\""
  echo "  ./ai-workflow.sh bugfix \"Login redirect issue\""
  echo "  ./ai-workflow.sh review \"mobile app performance\""
}

run_workflow() {
  local workflow=$1
  local task=$2
  local workflow_file="${WORKFLOW_DIR}/${workflow}.md"

  if [ ! -f "$workflow_file" ]; then
    echo "Error: Workflow '$workflow' not found at $workflow_file"
    exit 1
  fi

  echo "Running $workflow workflow..."
  echo "Task: $task"
  echo ""

  cd "$(dirname "$0")/.." || exit 1

  "$AGENTIC_SDLC" workflow "$workflow_file" --task "$task" --domain "emplus"
}

case "${1:-help}" in
  feature)
    if [ -z "$2" ]; then
      echo "Error: Please provide a feature description"
      echo "Usage: $0 feature \"Add dark mode support\""
      exit 1
    fi
    run_workflow "feature" "$2"
    ;;
  bugfix)
    if [ -z "$2" ]; then
      echo "Error: Please provide a bug description"
      echo "Usage: $0 bugfix \"Login redirect issue\""
      exit 1
    fi
    run_workflow "bugfix" "$2"
    ;;
  review)
    run_workflow "review" "${2:-general}"
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    show_help
    exit 1
    ;;
esac
