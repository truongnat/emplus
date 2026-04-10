---
title: "Storage Read / List"
description: "Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces."
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
  page: "features/storage-list.md"
  featureId: "storage-list"
  domain: "storage"
  action: "list"
  fileCount: 42
---

# Storage Read / List

- Overview: [emplus Docs Wiki](../index.md)
- Feature catalog: [All features](index.md)
- Reference: [Reference Index](../reference/index.md)

## Overview

Unit tests for anniversary functionality. Environment configuration variables and functions for various StoreModes. Initialize the database connection and schema. Functionality to validate and format user input for various types of authentication and login pr…

## Actors & User Stories

- n/a
## Business Flows

No feature flows were inferred.

## Basic Design

Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.

### Boundaries

- Workspaces: @emplus/api, @emplus/design-builder, @emplus/mobile, @emplus/web
- Entry points (FE): design-builder/src/components/token-category-list.tsx, design-builder/src/page-components/builder-page.tsx, mobile/src/theme/engine.tsx, api/src/__tests__/validation.test.ts, api/src/config/env.ts, api/src/db/migrate.ts, api/src/dto/notifications.dto.ts, api/src/engines/anniversary.ts
- Entry points (BE): api/src/__tests__/validation.test.ts, api/src/config/env.ts, api/src/db/migrate.ts, api/src/dto/notifications.dto.ts, api/src/engines/anniversary.ts, api/src/engines/emotional.ts, api/src/middleware/auth.ts, api/src/middleware/rate-limit.ts

### Context Diagram

```mermaid
flowchart LR
  actor_1["Caller"]
  feature_storage_list["Storage Read / List\nFeature boundary"]
  actor_1 --> feature_storage_list
  ext_1["bun"]
  feature_storage_list --> ext_1
  ext_2["@hono"]
  feature_storage_list --> ext_2
  ext_3["hono"]
  feature_storage_list --> ext_3
  ext_4["node"]
  feature_storage_list --> ext_4
  ext_5["postgres"]
  feature_storage_list --> ext_5
  ext_6["zod"]
  feature_storage_list --> ext_6
```

## Detail Design

- Data stores: Primary database, Session / token state
- Integrations: bun, @hono, hono, node, postgres, zod, ioredis, @faker-js, nodemailer, minio, @, lucide-react, react, sonner, react-colorful, @radix-ui, *.flow, fs, path, react-native, react-native-safe-area-context, react-native-reanimated, expo-linear-gradient, @shopify, react-native-gesture-handler, @react-native-async-storage, clsx, tailwind-merge, expo-clipboard, expo-document-picker, expo-image-picker, expo-notifications, @astrojs, astro

### Component Diagram

```mermaid
flowchart LR
  cmp_1["token-category-list.tsx\nUI surface"]
  cmp_2["builder-page.tsx\nUI surface"]
  cmp_3["engine.tsx\nUI surface"]
  cmp_4["validation.test.ts\nEntry point"]
  cmp_5["env.ts\nEntry point"]
  cmp_6["migrate.ts\nEntry point"]
  cmp_7["notifications.dto.ts\nEntry point"]
  cmp_8["anniversary.ts\nEntry point"]
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
| [design-builder/src/components/token-category-list.tsx](../reference/files/design-builder/src/components/token-category-list.tsx.md) | @emplus/design-builder | UI surface | Matches the read / list action heuristics for this feature. |
| [design-builder/src/page-components/builder-page.tsx](../reference/files/design-builder/src/page-components/builder-page.tsx.md) | @emplus/design-builder | UI surface | Matches the read / list action heuristics for this feature. |
| [mobile/src/theme/engine.tsx](../reference/files/mobile/src/theme/engine.tsx.md) | @emplus/mobile | UI surface | Matches the read / list action heuristics for this feature. |
| [api/src/__tests__/validation.test.ts](../reference/files/api/src/__tests__/validation.test.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/config/env.ts](../reference/files/api/src/config/env.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/db/migrate.ts](../reference/files/api/src/db/migrate.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/dto/notifications.dto.ts](../reference/files/api/src/dto/notifications.dto.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/engines/anniversary.ts](../reference/files/api/src/engines/anniversary.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/engines/emotional.ts](../reference/files/api/src/engines/emotional.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/middleware/auth.ts](../reference/files/api/src/middleware/auth.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/middleware/rate-limit.ts](../reference/files/api/src/middleware/rate-limit.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/middleware/sanitize.ts](../reference/files/api/src/middleware/sanitize.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/modules/care.ts](../reference/files/api/src/modules/care.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/modules/demo-in-app-notifications.ts](../reference/files/api/src/modules/demo-in-app-notifications.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/modules/index.ts](../reference/files/api/src/modules/index.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/modules/live.ts](../reference/files/api/src/modules/live.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/services/budget.service.ts](../reference/files/api/src/services/budget.service.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/services/dependencies.ts](../reference/files/api/src/services/dependencies.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/services/media-storage.ts](../reference/files/api/src/services/media-storage.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/services/user.service.ts](../reference/files/api/src/services/user.service.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/shared/token.ts](../reference/files/api/src/shared/token.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/store/in-memory-store.ts](../reference/files/api/src/store/in-memory-store.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/types.ts](../reference/files/api/src/types.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [api/src/utils/http.ts](../reference/files/api/src/utils/http.ts.md) | @emplus/api | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/api.ts](../reference/files/mobile/src/api.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/components/organisms/AnimatedFlatList.tsx](../reference/files/mobile/src/components/organisms/AnimatedFlatList.tsx.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/core/api/index.ts](../reference/files/mobile/src/core/api/index.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/core/api/token-manager.ts](../reference/files/mobile/src/core/api/token-manager.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/data/repositories/auth.repository.impl.ts](../reference/files/mobile/src/data/repositories/auth.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/data/repositories/modules.repository.impl.ts](../reference/files/mobile/src/data/repositories/modules.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/data/repositories/notifications.repository.impl.ts](../reference/files/mobile/src/data/repositories/notifications.repository.impl.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/domain/usecases/modules/index.ts](../reference/files/mobile/src/domain/usecases/modules/index.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/utils/timeline-helpers.ts](../reference/files/mobile/src/utils/timeline-helpers.ts.md) | @emplus/mobile | Entry point | Matches the read / list action heuristics for this feature. |
| [mobile/src/domain/usecases/auth/index.ts](../reference/files/mobile/src/domain/usecases/auth/index.ts.md) | @emplus/mobile | Service / use case | Matches the read / list action heuristics for this feature. |
| [mobile/src/domain/usecases/base.ts](../reference/files/mobile/src/domain/usecases/base.ts.md) | @emplus/mobile | Service / use case | Supports the feature as service / use case. |
| [mobile/src/theme/theme-mode-context.tsx](../reference/files/mobile/src/theme/theme-mode-context.tsx.md) | @emplus/mobile | Service / use case | Supports the feature as service / use case. |
| [mobile/src/framework/di/dependencies.ts](../reference/files/mobile/src/framework/di/dependencies.ts.md) | @emplus/mobile | Repository / persistence | Supports the feature as repository / persistence. |
| [mobile/src/theme/theme-builder.ts](../reference/files/mobile/src/theme/theme-builder.ts.md) | @emplus/mobile | Model / contract | Supports the feature as model / contract. |
| [mobile/src/features/notifications/push-notifications-preference.ts](../reference/files/mobile/src/features/notifications/push-notifications-preference.ts.md) | @emplus/mobile | Configuration | Matches the read / list action heuristics for this feature. |
| [mobile/scripts/fix-flow-syntax.js](../reference/files/mobile/scripts/fix-flow-syntax.js.md) | @emplus/mobile | Utility | Matches the read / list action heuristics for this feature. |
| [mobile/src/utils/expo-helpers.ts](../reference/files/mobile/src/utils/expo-helpers.ts.md) | @emplus/mobile | Utility | Matches the read / list action heuristics for this feature. |
| [web/src/pages/rss.xml.ts](../reference/files/web/src/pages/rss.xml.ts.md) | @emplus/web | Utility | Matches the read / list action heuristics for this feature. |