---
title: "User Management Login"
description: "User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login."
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
  page: "features/user-login.md"
  featureId: "user-login"
  domain: "user"
  action: "login"
  fileCount: 53
---

# User Management Login

- Overview: [emplus Docs Wiki](../index.md)
- Feature catalog: [All features](index.md)
- Reference: [Reference Index](../reference/index.md)

## Overview

Unit tests for anniversary functionality. Functionality to validate and format user input for various types of authentication and login processes. /api/auth.middleware.requireAuth JS API for the admin module. Identifies an identity from an OAuth token and pro…

## Actors & User Stories

### As Authenticated end user

- Goal: Auth login
- Benefit: Authenticate the caller, validate credentials, and establish a usable session or token.

#### Acceptance Criteria

- api/src/__tests__/anniversary.test.ts receives the request and turns it into an application-level login command. It then hands off to anniversary.ts, date.ts, types.ts.
- api/src/__tests__/app.test.ts receives the request and turns it into an application-level login command. It then hands off to app.ts, store.ts.
- api/src/__tests__/auth.test.ts receives the request and turns it into an application-level login command. It then hands off to app.ts.

## Business Flows

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/__tests__/anniversary.test.ts receives the request and turns it into an application-level login command. It then hands off to anniversary.ts, date.ts, types.ts.
- api/src/__tests__/app.test.ts receives the request and turns it into an application-level login command. It then hands off to app.ts, store.ts.
- api/src/__tests__/auth.test.ts receives the request and turns it into an application-level login command. It then hands off to app.ts.
- api/src/__tests__/love-days-utc.test.ts receives the request and turns it into an application-level login command. It then hands off to diffDays, date.ts.
- api/src/__tests__/notifications.test.ts receives the request and turns it into an application-level login command. It then hands off to app.ts, store.ts.
- api/src/__tests__/security_random.test.ts receives the request and turns it into an application-level login command. It then hands off to code.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_anniversary_test_ts["api/src/__tests__/anniversary.test.ts\nEntry point"]
  n2_app_test_ts["api/src/__tests__/app.test.ts\nEntry point"]
  n3_auth_test_ts["api/src/__tests__/auth.test.ts\nEntry point"]
  n4_love_days_utc_test_ts["api/src/__tests__/love-days-utc.test.ts\nEntry point"]
  n5_notifications_test_ts["api/src/__tests__/notifications.test.ts\nEntry point"]
  n6_security_random_test_ts["api/src/__tests__/security_random.test.ts\nEntry point"]
  caller --> n1_anniversary_test_ts
  n1_anniversary_test_ts --> n2_app_test_ts
  n2_app_test_ts --> n3_auth_test_ts
  n3_auth_test_ts --> n4_love_days_utc_test_ts
  n4_love_days_utc_test_ts --> n5_notifications_test_ts
  n5_notifications_test_ts --> n6_security_random_test_ts
  store["State / data store"]
  n6_security_random_test_ts --> store
  ext["External dependency"]
  n6_security_random_test_ts --> ext
  outcome["Auth login outcome"]
  n6_security_random_test_ts --> outcome
```

### Auth registration

Execute the module's registration use case inside authentication and access control.

#### Steps

- api/src/__tests__/anniversary.test.ts receives the request and turns it into an application-level registration command. It then hands off to anniversary.ts, date.ts, types.ts.
- api/src/__tests__/app.test.ts receives the request and turns it into an application-level registration command. It then hands off to app.ts, store.ts.
- api/src/__tests__/auth.test.ts receives the request and turns it into an application-level registration command. It then hands off to app.ts.
- api/src/__tests__/love-days-utc.test.ts receives the request and turns it into an application-level registration command. It then hands off to diffDays, date.ts.
- api/src/__tests__/notifications.test.ts receives the request and turns it into an application-level registration command. It then hands off to app.ts, store.ts.
- api/src/__tests__/security_random.test.ts receives the request and turns it into an application-level registration command. It then hands off to code.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_anniversary_test_ts["api/src/__tests__/anniversary.test.ts\nEntry point"]
  n2_app_test_ts["api/src/__tests__/app.test.ts\nEntry point"]
  n3_auth_test_ts["api/src/__tests__/auth.test.ts\nEntry point"]
  n4_love_days_utc_test_ts["api/src/__tests__/love-days-utc.test.ts\nEntry point"]
  n5_notifications_test_ts["api/src/__tests__/notifications.test.ts\nEntry point"]
  n6_security_random_test_ts["api/src/__tests__/security_random.test.ts\nEntry point"]
  caller --> n1_anniversary_test_ts
  n1_anniversary_test_ts --> n2_app_test_ts
  n2_app_test_ts --> n3_auth_test_ts
  n3_auth_test_ts --> n4_love_days_utc_test_ts
  n4_love_days_utc_test_ts --> n5_notifications_test_ts
  n5_notifications_test_ts --> n6_security_random_test_ts
  ext["External dependency"]
  n6_security_random_test_ts --> ext
  outcome["Auth registration outcome"]
  n6_security_random_test_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/modules/admin.ts receives the request and turns it into an application-level login command. It then hands off to app-env.ts, auth.ts, store.ts.
- api/src/modules/auth.ts receives the request and turns it into an application-level login command. It then hands off to app-env.ts, auth.dto.ts, auth.ts.
- api/src/modules/budget.ts receives the request and turns it into an application-level login command. It then hands off to app-env.ts, budget.dto.ts, auth.ts.
- api/src/modules/care.ts receives the request and turns it into an application-level login command. It then hands off to store.ts, User, AppError.
- api/src/modules/couples.ts receives the request and turns it into an application-level login command. It then hands off to app-env.ts, couples.dto.ts, auth.ts.
- api/src/modules/dashboard.ts receives the request and turns it into an application-level login command. It then hands off to app-env.ts, env.ts, anniversary.ts.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_admin_ts["api/src/modules/admin.ts\nEntry point"]
  n2_auth_ts["api/src/modules/auth.ts\nEntry point"]
  n3_budget_ts["api/src/modules/budget.ts\nEntry point"]
  n4_care_ts["api/src/modules/care.ts\nEntry point"]
  n5_couples_ts["api/src/modules/couples.ts\nEntry point"]
  n6_dashboard_ts["api/src/modules/dashboard.ts\nEntry point"]
  caller --> n1_admin_ts
  n1_admin_ts --> n2_auth_ts
  n2_auth_ts --> n3_budget_ts
  n3_budget_ts --> n4_care_ts
  n4_care_ts --> n5_couples_ts
  n5_couples_ts --> n6_dashboard_ts
  ext["External dependency"]
  n6_dashboard_ts --> ext
  outcome["Auth login outcome"]
  n6_dashboard_ts --> outcome
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

### Auth registration

Execute the module's registration use case inside authentication and access control.

#### Steps

- api/src/services/auth.service.ts receives the request and turns it into an application-level registration command. It then hands off to index.ts, generateNumericCode, generateTokens.
- api/src/services/budget.service.ts receives the request and turns it into an application-level registration command. It then hands off to StoreMode, mapDisplayStatusToInternal, store.ts.
- api/src/services/couple.service.ts receives the request and turns it into an application-level registration command. It then hands off to index.ts, formatDate, store.ts.
- api/src/services/crypto.ts receives the request and turns it into an application-level registration command.
- api/src/services/dependencies.ts receives the request and turns it into an application-level registration command. It then hands off to StoreMode, env.ts.
- api/src/services/mail.ts receives the request and turns it into an application-level registration command. It then hands off to StoreMode, env.ts.

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
  outcome["Auth registration outcome"]
  n6_mail_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- api/src/store/contracts.ts receives the request and turns it into an application-level login command. It then hands off to Anniversary, types.ts.
- api/src/store/in-memory-store.ts receives the request and turns it into an application-level login command. It then hands off to generateInviteCode, Anniversary, DataStore.
- api/src/store/index.ts receives the request and turns it into an application-level login command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_contracts_ts["api/src/store/contracts.ts\nEntry point"]
  n2_in_memory_store_ts["api/src/store/in-memory-store.ts\nEntry point"]
  n3_index_ts["api/src/store/index.ts\nEntry point"]
  caller --> n2_in_memory_store_ts
  caller --> n3_index_ts
  n2_in_memory_store_ts -->|"DataStore"| n1_contracts_ts
  outcome["Auth login outcome"]
  n3_index_ts --> outcome
```

### Auth login

Authenticate the caller, validate credentials, and establish a usable session or token.

#### Steps

- The user or operator enters the flow through mobile/app/(tabs)/notifications.tsx, which surfaces the login interaction.
- The user or operator enters the flow through mobile/app/(tabs)/timeline.tsx, which surfaces the login interaction.
- mobile/app/(tabs)/_layout.tsx receives the request and turns it into an application-level login command.
- mobile/app/(tabs)/care.tsx receives the request and turns it into an application-level login command.
- mobile/app/(tabs)/home.tsx receives the request and turns it into an application-level login command.
- mobile/app/(tabs)/profile.tsx receives the request and turns it into an application-level login command.

#### Flow Diagram

```mermaid
flowchart LR
  caller["Caller / upstream trigger"]
  n1_notifications_tsx["mobile/app/(tabs)/notifications.tsx\nUI surface"]
  n2_timeline_tsx["mobile/app/(tabs)/timeline.tsx\nUI surface"]
  n3__layout_tsx["mobile/app/(tabs)/_layout.tsx\nEntry point"]
  n4_care_tsx["mobile/app/(tabs)/care.tsx\nEntry point"]
  n5_home_tsx["mobile/app/(tabs)/home.tsx\nEntry point"]
  n6_profile_tsx["mobile/app/(tabs)/profile.tsx\nEntry point"]
  caller --> n1_notifications_tsx
  n1_notifications_tsx --> n2_timeline_tsx
  n2_timeline_tsx --> n3__layout_tsx
  n3__layout_tsx --> n4_care_tsx
  n4_care_tsx --> n5_home_tsx
  n5_home_tsx --> n6_profile_tsx
  store["State / data store"]
  n6_profile_tsx --> store
  ext["External dependency"]
  n6_profile_tsx --> ext
  outcome["Auth login outcome"]
  n6_profile_tsx --> outcome
```


## Basic Design

User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.

### Boundaries

- Workspaces: @emplus/api, @emplus/mobile
- Entry points (FE): mobile/src/features/auth/authScreenLayout.ts, mobile/src/features/auth/components/AuthGridScreenShell.tsx, mobile/src/features/auth/components/LoginBrandGradientTitle.tsx, mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx, api/src/__tests__/auth.test.ts, api/src/dto/auth.dto.ts, api/src/dto/live.dto.ts, api/src/middleware/auth.ts
- Entry points (BE): api/src/__tests__/auth.test.ts, api/src/dto/auth.dto.ts, api/src/dto/live.dto.ts, api/src/middleware/auth.ts, api/src/modules/admin.ts, api/src/modules/auth.ts, api/src/modules/budget.ts, api/src/modules/care.ts

### Context Diagram

```mermaid
flowchart LR
  actor_1["Authenticated end user"]
  feature_user_login["User Management Login\nFeature boundary"]
  actor_1 --> feature_user_login
  ext_1["bun"]
  feature_user_login --> ext_1
  ext_2["@hono"]
  feature_user_login --> ext_2
  ext_3["hono"]
  feature_user_login --> ext_3
  ext_4["node"]
  feature_user_login --> ext_4
  ext_5["postgres"]
  feature_user_login --> ext_5
  ext_6["zod"]
  feature_user_login --> ext_6
```

## Detail Design

- Data stores: Primary database, Session / token state
- Integrations: bun, @hono, hono, node, postgres, zod, ioredis, @faker-js, google-auth-library, jose, nodemailer, minio, @, @expo-google-fonts, expo-font, expo-router, expo-splash-screen, expo-status-bar, @expo, @react-navigation, expo-blur, expo-haptics, expo-linear-gradient, react, react-native, react-native-safe-area-context, react-native-reanimated, react-native-gesture-handler, react-native-keyboard-aware-scroll-view, expo-system-ui, expo-image, @tanstack

### Component Diagram

```mermaid
flowchart LR
  cmp_1["authScreenLayout.ts\nUI surface"]
  cmp_2["AuthGridScreenShell.tsx\nUI surface"]
  cmp_3["LoginBrandGradientTitle.tsx\nUI surface"]
  cmp_4["LoginGridAnimatedBackground.tsx\nUI surface"]
  cmp_5["auth.test.ts\nEntry point"]
  cmp_6["auth.dto.ts\nEntry point"]
  cmp_7["live.dto.ts\nEntry point"]
  cmp_8["auth.ts\nEntry point"]
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
| [mobile/src/features/auth/authScreenLayout.ts](../reference/files/mobile/src/features/auth/authScreenLayout.ts.md) | @emplus/mobile | UI surface | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/AuthGridScreenShell.tsx](../reference/files/mobile/src/features/auth/components/AuthGridScreenShell.tsx.md) | @emplus/mobile | UI surface | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/LoginBrandGradientTitle.tsx](../reference/files/mobile/src/features/auth/components/LoginBrandGradientTitle.tsx.md) | @emplus/mobile | UI surface | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx](../reference/files/mobile/src/features/auth/components/LoginGridAnimatedBackground.tsx.md) | @emplus/mobile | UI surface | Matches the login action heuristics for this feature. |
| [api/src/__tests__/auth.test.ts](../reference/files/api/src/__tests__/auth.test.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/dto/auth.dto.ts](../reference/files/api/src/dto/auth.dto.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/dto/live.dto.ts](../reference/files/api/src/dto/live.dto.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/middleware/auth.ts](../reference/files/api/src/middleware/auth.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/admin.ts](../reference/files/api/src/modules/admin.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/auth.ts](../reference/files/api/src/modules/auth.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/budget.ts](../reference/files/api/src/modules/budget.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/care.ts](../reference/files/api/src/modules/care.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/couples.ts](../reference/files/api/src/modules/couples.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/dashboard.ts](../reference/files/api/src/modules/dashboard.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/debug.ts](../reference/files/api/src/modules/debug.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/live.ts](../reference/files/api/src/modules/live.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/media.ts](../reference/files/api/src/modules/media.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/notifications.ts](../reference/files/api/src/modules/notifications.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/system.ts](../reference/files/api/src/modules/system.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/timeline.ts](../reference/files/api/src/modules/timeline.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/modules/user.ts](../reference/files/api/src/modules/user.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/oauth/verify.ts](../reference/files/api/src/oauth/verify.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/services/auth.service.ts](../reference/files/api/src/services/auth.service.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/store/in-memory-store.ts](../reference/files/api/src/store/in-memory-store.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [api/src/types.ts](../reference/files/api/src/types.ts.md) | @emplus/api | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/(tabs)/profile.tsx](../reference/files/mobile/app/tabs--7761ed0d/profile.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/index.tsx](../reference/files/mobile/app/index.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/login.tsx](../reference/files/mobile/app/login.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/profile-details/appearance.tsx](../reference/files/mobile/app/profile-details/appearance.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/profile-details/help.tsx](../reference/files/mobile/app/profile-details/help.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/profile-details/notifications.tsx](../reference/files/mobile/app/profile-details/notifications.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/profile-details/personal-info.tsx](../reference/files/mobile/app/profile-details/personal-info.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/profile-details/privacy.tsx](../reference/files/mobile/app/profile-details/privacy.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/app/reset-password.tsx](../reference/files/mobile/app/reset-password.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/api.ts](../reference/files/mobile/src/api.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/components/atoms/Input.tsx](../reference/files/mobile/src/components/atoms/Input.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/core/api/index.ts](../reference/files/mobile/src/core/api/index.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/data/repositories/auth.repository.impl.ts](../reference/files/mobile/src/data/repositories/auth.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx](../reference/files/mobile/src/features/auth/components/ForgotPasswordAuthForm.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/RegisterAuthForm.tsx](../reference/files/mobile/src/features/auth/components/RegisterAuthForm.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/RegisterTopBar.tsx](../reference/files/mobile/src/features/auth/components/RegisterTopBar.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/components/VerifyOtpForm.tsx](../reference/files/mobile/src/features/auth/components/VerifyOtpForm.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/auth/hooks/useAuthGridChrome.ts](../reference/files/mobile/src/features/auth/hooks/useAuthGridChrome.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/timeline/components/TimelineAuthGate.tsx](../reference/files/mobile/src/features/timeline/components/TimelineAuthGate.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx](../reference/files/mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/presentation/hooks/auth/useLogin.ts](../reference/files/mobile/src/presentation/hooks/auth/useLogin.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/presentation/hooks/auth/useLogout.ts](../reference/files/mobile/src/presentation/hooks/auth/useLogout.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/presentation/hooks/auth/useRegister.ts](../reference/files/mobile/src/presentation/hooks/auth/useRegister.ts.md) | @emplus/mobile | Entry point | Matches the login action heuristics for this feature. |
| [mobile/src/domain/usecases/auth/index.ts](../reference/files/mobile/src/domain/usecases/auth/index.ts.md) | @emplus/mobile | Service / use case | Matches the login action heuristics for this feature. |
| [mobile/src/features/timeline/hooks/useTimelineData.ts](../reference/files/mobile/src/features/timeline/hooks/useTimelineData.ts.md) | @emplus/mobile | Service / use case | Supports the feature as service / use case. |
| [mobile/src/presentation/hooks/auth/useAuth.ts](../reference/files/mobile/src/presentation/hooks/auth/useAuth.ts.md) | @emplus/mobile | Service / use case | Matches the login action heuristics for this feature. |
| [mobile/src/domain/repositories/auth.repository.ts](../reference/files/mobile/src/domain/repositories/auth.repository.ts.md) | @emplus/mobile | Repository / persistence | Matches the login action heuristics for this feature. |
| [mobile/src/framework/di/dependencies.ts](../reference/files/mobile/src/framework/di/dependencies.ts.md) | @emplus/mobile | Repository / persistence | Matches the login action heuristics for this feature. |