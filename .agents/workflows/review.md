# Workflow: EmPlus Code Review
Domain: emplus

## Step: review
LLMSubagent
Prompt: |
  Perform a code review for EmPlus.

  Focus areas: {{input}}

  Check for:
  - Security vulnerabilities
  - Performance issues
  - Code quality
  - Best practices
  - TypeScript correctness

  Output:
  1. Issues found (severity: high/medium/low)
  2. Suggestions for improvement
  3. Praise for good patterns

## Step: summary
LLMSubagent
Prompt: |
  Summarize the code review.

  Review: {{review}}

  Output a concise summary with action items.
