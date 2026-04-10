---
title: "Integrations Verification"
description: "Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--feature"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "feature"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "features/integration-verify.md"
  featureId: "integration-verify"
  domain: "integration"
  action: "verify"
  fileCount: 22
---

# Integrations Verification

- Overview: [emplus Docs Wiki](../index.md)
- Feature catalog: [All features](index.md)
- Reference: [Reference Index](../reference/index.md)

## Overview

Unit tests for anniversary functionality. Functionality to validate and format user input for various types of authentication and login processes. /api/auth.middleware.requireAuth Identifies an identity from an OAuth token and provides fallbacks in case of is…

## Actors & User Stories

### As user

- Goal: Credential validation
- Benefit: Execute the module's verification use case inside authentication and access control.

#### Acceptance Criteria

- api/src/dto/auth.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, index.ts, zod.ts.
- api/src/dto/budget.dto.ts receives the request and turns it into an application-level verification command. It then hands off to index.ts, parseWithSchema, zod.ts.
- api/src/dto/care.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, zod.ts.

## Business Flows

### Credential validation

Execute the module's verification use case inside authentication and access control.

#### Steps

- api/src/dto/auth.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, index.ts, zod.ts.
- api/src/dto/budget.dto.ts receives the request and turns it into an application-level verification command. It then hands off to index.ts, parseWithSchema, zod.ts.
- api/src/dto/care.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, zod.ts.
- api/src/dto/couples.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, zod.ts.
- api/src/dto/live.dto.ts receives the request and turns it into an application-level verification command. It then hands off to parseWithSchema, zod.ts.
- api/src/dto/notifications.dto.ts receives the request and turns it into an application-level verification command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_auth_dto_ts["api/src/dto/auth.dto.ts\nEntry point"]
  n2_budget_dto_ts["api/src/dto/budget.dto.ts\nEntry point"]
  n3_care_dto_ts["api/src/dto/care.dto.ts\nEntry point"]
  n4_couples_dto_ts["api/src/dto/couples.dto.ts\nEntry point"]
  n5_live_dto_ts["api/src/dto/live.dto.ts\nEntry point"]
  n6_notifications_dto_ts["api/src/dto/notifications.dto.ts\nEntry point"]
  caller --> n1_auth_dto_ts
  n1_auth_dto_ts --> n2_budget_dto_ts
  n2_budget_dto_ts --> n3_care_dto_ts
  n3_care_dto_ts --> n4_couples_dto_ts
  n4_couples_dto_ts --> n5_live_dto_ts
  n5_live_dto_ts --> n6_notifications_dto_ts
  ext["External dependency"]
  n6_notifications_dto_ts --> ext
  outcome["Credential validation outcome"]
  n6_notifications_dto_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/oauth/verify.ts receives the request and turns it into an application-level login command. It then hands off to StoreMode, AuthProvider, AppError.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_verify_ts["api/src/oauth/verify.ts\nEntry point"]
  caller --> n1_verify_ts
  ext["External dependency"]
  n1_verify_ts --> ext
  outcome["Auth login outcome"]
  n1_verify_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/services/auth.service.ts receives the request and turns it into an application-level login command. It then hands off to index.ts, generateNumericCode, generateTokens.
- api/src/services/budget.service.ts receives the request and turns it into an application-level login command. It then hands off to StoreMode, mapDisplayStatusToInternal, store.ts.
- api/src/services/couple.service.ts receives the request and turns it into an application-level login command. It then hands off to index.ts, formatDate, store.ts.
- api/src/services/crypto.ts receives the request and turns it into an application-level login command.
- api/src/services/dependencies.ts receives the request and turns it into an application-level login command. It then hands off to StoreMode, env.ts.
- api/src/services/mail.ts receives the request and turns it into an application-level login command. It then hands off to StoreMode, env.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_auth_service_ts["api/src/services/auth.service.ts\nEntry point"]
  n2_budget_service_ts["api/src/services/budget.service.ts\nEntry point"]
  n3_couple_service_ts["api/src/services/couple.service.ts\nEntry point"]
  n4_crypto_ts["api/src/services/crypto.ts\nEntry point"]
  n5_dependencies_ts["api/src/services/dependencies.ts\nEntry point"]
  n6_mail_ts["api/src/services/mail.ts\nEntry point"]
  caller --> n1_auth_service_ts
  caller --> n2_budget_service_ts
  caller --> n3_couple_service_ts
  caller --> n5_dependencies_ts
  n1_auth_service_ts -->|"decrypt"| n4_crypto_ts
  n1_auth_service_ts -->|"sendOtpMail"| n6_mail_ts
  store["State / data store"]
  n6_mail_ts --> store
  ext["External dependency"]
  n6_mail_ts --> ext
  outcome["Auth login outcome"]
  n6_mail_ts --> outcome
```

### Credential validation

Execute the module's verification use case inside authentication and access control.

#### Steps

- api/src/shared/code.ts receives the request and turns it into an application-level verification command.
- api/src/shared/date.ts receives the request and turns it into an application-level verification command.
- api/src/shared/token.ts receives the request and turns it into an application-level verification command. It then hands off to index.ts.
- api/src/shared/validators/index.ts receives the request and turns it into an application-level verification command.
- api/src/shared/validators/zod.ts receives the request and turns it into an application-level verification command. It then hands off to formatDate, AppError, date.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_code_ts["api/src/shared/code.ts\nEntry point"]
  n2_date_ts["api/src/shared/date.ts\nEntry point"]
  n3_token_ts["api/src/shared/token.ts\nEntry point"]
  n4_index_ts["api/src/shared/validators/index.ts\nEntry point"]
  n5_zod_ts["api/src/shared/validators/zod.ts\nEntry point"]
  caller --> n1_code_ts
  caller --> n3_token_ts
  caller --> n4_index_ts
  caller --> n5_zod_ts
  n5_zod_ts -->|"formatDate"| n2_date_ts
  ext["External dependency"]
  n4_index_ts --> ext
  outcome["Credential validation outcome"]
  n4_index_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- mobile/src/data/repositories/auth.repository.impl.ts receives the request and turns it into an application-level login command. It then hands off to ApiResponse, index.ts.
- mobile/src/data/repositories/modules.repository.impl.ts receives the request and turns it into an application-level login command. It then hands off to ApiResponse, index.ts.
- mobile/src/data/repositories/notifications.repository.impl.ts receives the request and turns it into an application-level login command. It then hands off to ApiResponse, index.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_auth_repository_impl_ts["mobile/src/data/repositories/auth.repository.impl.ts\nEntry point"]
  n2_modules_repository_impl_ts["mobile/src/data/repositories/modules.repository.impl.ts\nEntry point"]
  n3_notifications_repository_impl_ts["mobile/src/data/repositories/notifications.repository.impl.ts\nEntry point"]
  caller --> n1_auth_repository_impl_ts
  n1_auth_repository_impl_ts --> n2_modules_repository_impl_ts
  n2_modules_repository_impl_ts --> n3_notifications_repository_impl_ts
  outcome["Auth login outcome"]
  n3_notifications_repository_impl_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- mobile/src/domain/usecases/auth/index.ts coordinates the core business rules and state changes for the flow.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_index_ts["mobile/src/domain/usecases/auth/index.ts\nService / use case"]
  caller --> n1_index_ts
  outcome["Auth login outcome"]
  n1_index_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- mobile/src/features/mood/components/MoodVibeCheck.tsx receives the request and turns it into an application-level login command. It then hands off to MoodBand, mood-band.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_MoodVibeCheck_tsx["mobile/src/features/mood/components/MoodVibeCheck.tsx\nEntry point"]
  caller --> n1_MoodVibeCheck_tsx
  store["State / data store"]
  n1_MoodVibeCheck_tsx --> store
  ext["External dependency"]
  n1_MoodVibeCheck_tsx --> ext
  outcome["Auth login outcome"]
  n1_MoodVibeCheck_tsx --> outcome
```


## Basic Design

Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

### Boundaries

- Workspaces: @emplus/api, @emplus/mobile
- Entry points (FE): api/src/__tests__/validation.test.ts, api/src/dto/auth.dto.ts, api/src/dto/budget.dto.ts, api/src/dto/care.dto.ts, api/src/dto/couples.dto.ts, api/src/dto/live.dto.ts, api/src/dto/timeline.dto.ts, api/src/dto/user.dto.ts
- Entry points (BE): api/src/__tests__/validation.test.ts, api/src/dto/auth.dto.ts, api/src/dto/budget.dto.ts, api/src/dto/care.dto.ts, api/src/dto/couples.dto.ts, api/src/dto/live.dto.ts, api/src/dto/timeline.dto.ts, api/src/dto/user.dto.ts

### Context Diagram

```mermaid
flowchart LR
  actor_1["Caller"]
  feature_integration_verify["Integrations Verification\nFeature boundary"]
  actor_1 --> feature_integration_verify
  ext_1["bun"]
  feature_integration_verify --> ext_1
  ext_2["zod"]
  feature_integration_verify --> ext_2
  ext_3["hono"]
  feature_integration_verify --> ext_3
  ext_4["ioredis"]
  feature_integration_verify --> ext_4
  ext_5["google-auth-library"]
  feature_integration_verify --> ext_5
  ext_6["jose"]
  feature_integration_verify --> ext_6
```

## Detail Design

- Data stores: Session / token state, Primary database
- Integrations: bun, zod, hono, ioredis, google-auth-library, jose, node, postgres, nodemailer, minio, @, react, react-native, react-native-safe-area-context, react-native-reanimated, expo-linear-gradient, @expo, @tanstack

### Component Diagram

```mermaid
flowchart LR
  cmp_1["validation.test.ts\nEntry point"]
  cmp_2["auth.dto.ts\nEntry point"]
  cmp_3["budget.dto.ts\nEntry point"]
  cmp_4["care.dto.ts\nEntry point"]
  cmp_5["couples.dto.ts\nEntry point"]
  cmp_6["live.dto.ts\nEntry point"]
  cmp_7["timeline.dto.ts\nEntry point"]
  cmp_8["user.dto.ts\nEntry point"]
  cmp_1 --> cmp_2
  cmp_2 --> cmp_3
  cmp_3 --> cmp_4
  cmp_4 --> cmp_5
  cmp_5 --> cmp_6
  cmp_6 --> cmp_7
  cmp_7 --> cmp_8
  data_store["State / persistence"]
  cmp_8 --> data_store
```

## API Contracts

No API contracts were linked to this feature.

## Edge Cases & Error Handling

No edge cases were inferred from the clustered code.

## Related Files

| File | Workspace | Role | Why It Belongs |
| --- | --- | --- | --- |
| [api/src/__tests__/validation.test.ts](../reference/files/api/src/__tests__/validation.test.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/auth.dto.ts](../reference/files/api/src/dto/auth.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/budget.dto.ts](../reference/files/api/src/dto/budget.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/care.dto.ts](../reference/files/api/src/dto/care.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/couples.dto.ts](../reference/files/api/src/dto/couples.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/live.dto.ts](../reference/files/api/src/dto/live.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/timeline.dto.ts](../reference/files/api/src/dto/timeline.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/dto/user.dto.ts](../reference/files/api/src/dto/user.dto.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/middleware/cors.ts](../reference/files/api/src/middleware/cors.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/oauth/verify.ts](../reference/files/api/src/oauth/verify.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/services/auth.service.ts](../reference/files/api/src/services/auth.service.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/services/dependencies.ts](../reference/files/api/src/services/dependencies.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/shared/token.ts](../reference/files/api/src/shared/token.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/shared/validators/zod.ts](../reference/files/api/src/shared/validators/zod.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [api/src/utils/password.ts](../reference/files/api/src/utils/password.ts.md) | @emplus/api | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/api.ts](../reference/files/mobile/src/api.ts.md) | @emplus/mobile | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/data/repositories/auth.repository.impl.ts](../reference/files/mobile/src/data/repositories/auth.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/data/repositories/modules.repository.impl.ts](../reference/files/mobile/src/data/repositories/modules.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/domain/usecases/modules/index.ts](../reference/files/mobile/src/domain/usecases/modules/index.ts.md) | @emplus/mobile | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/features/mood/components/MoodVibeCheck.tsx](../reference/files/mobile/src/features/mood/components/MoodVibeCheck.tsx.md) | @emplus/mobile | Entry point | Matches the verification action heuristics for this feature. |
| [mobile/src/domain/usecases/auth/index.ts](../reference/files/mobile/src/domain/usecases/auth/index.ts.md) | @emplus/mobile | Service / use case | Matches the verification action heuristics for this feature. |
| [mobile/src/framework/di/dependencies.ts](../reference/files/mobile/src/framework/di/dependencies.ts.md) | @emplus/mobile | Repository / persistence | Supports the feature as repository / persistence. |