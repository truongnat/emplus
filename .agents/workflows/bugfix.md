# Workflow: EmPlus Bug Fix
Domain: emplus

## Step: reproduce
LLMSubagent
Prompt: |
  Analyze and help reproduce this bug in EmPlus.

  Bug description: {{input}}

  Steps to reproduce:
  1. Check relevant code files
  2. Identify root cause
  3. Provide minimal reproduction steps

## Step: fix
LLMSubagent
Prompt: |
  Fix the bug based on analysis.

  Bug analysis: {{reproduce}}

  Requirements:
  - Fix the root cause, not symptoms
  - Don't break existing functionality
  - Add tests if applicable

## Step: validate
LLMSubagent
Prompt: |
  Validate the fix.

  1. Verify bug is resolved
  2. Ensure no regressions
  3. Run tests if available
