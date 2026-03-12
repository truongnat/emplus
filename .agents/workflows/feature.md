# Workflow: EmPlus Feature Development
Domain: emplus

## Step: analyze
LLMSubagent
Prompt: |
  Analyze this feature request for EmPlus app (Next.js + Hono/Bun API + React Native/Expo).

  Feature: {{input}}

  Consider:
  - Frontend impact (web/mobile)
  - API changes needed
  - Database migrations
  - Security implications

  Output a structured analysis with:
  1. Files likely to be affected
  2. API endpoints needed
  3. Database schema changes
  4. Risk assessment (1-5)

## Step: plan
LLMSubagent
Prompt: |
  Based on the analysis, create an implementation plan.

  Analysis: {{analyze}}

  Output:
  1. Step-by-step implementation plan
  2. Test scenarios
  3. Rollback plan if needed

## Step: implement
LLMSubagent
Prompt: |
  Implement the feature for EmPlus.

  Plan: {{plan}}

  Requirements:
  - Write clean, idiomatic code
  - Follow existing patterns in the codebase
  - Add TypeScript types
  - Include error handling

  Project structure:
  - /api - Hono/Bun API
  - /web - Next.js web app
  - /mobile - React Native/Expo

## Step: validate
LLMSubagent
Prompt: |
  Validate the implementation.

  1. Run type checks: bun run typecheck (api, web)
  2. Check for security issues
  3. Verify code follows project conventions

  Output validation results.
