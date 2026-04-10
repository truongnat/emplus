---
title: "Basic Design"
description: "Basic design and context model for emplus."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--design"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "design"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "design/basic-design.md"
---

# Basic Design

- Overview: [emplus Docs Wiki](../index.md)
- Design overview: [Design Overview](./index.md)
- Detail design: [Detail Design](./detail-design.md)
- API contracts: [API Contracts](./api-contracts.md)
- Flow catalog: [Flow Catalog](./flows.md)

## System Intent

emplus is organized around 6 main modules with 399 scanned files and 1051 documented symbols.

## Actors

- Authenticated end user
- Background worker
- External provider

## Context Diagram

```mermaid
flowchart TD
  caller["Caller / external trigger"]
  api_src_services["Services\nAuthentication and access control"]
  caller --> api_src_services
  mobile_src_components["Components\nSearch and discovery"]
  caller --> mobile_src_components
  mobile_src_data_repositories["Repositories\nAuthentication and access control"]
  caller --> mobile_src_data_repositories
  mobile_src_domain_usecases["Usecases\nAuthentication and access control"]
  caller --> mobile_src_domain_usecases
  api_src___tests__["Tests\nAuthentication and access control"]
  caller --> api_src___tests__
  store["Stateful store"]
  api_src_services --> store
```

## Primary Capabilities

### [Services](../reference/modules/api/src/services.md)

Authentication Service API

### [Components](../reference/modules/mobile/src/components.md)

AnimatedSplashScreen component

### [Repositories](../reference/modules/mobile/src/data/repositories.md)

AuthRepositoryImpl class

### [Usecases](../reference/modules/mobile/src/domain/usecases.md)

LoginUseCase class.

### [Tests](../reference/modules/api/src/__tests__.md)

Unit tests for anniversary functionality.

### [Design Builder](../reference/modules/design-builder.md)

JSON schema definition for components file
