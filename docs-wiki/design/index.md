---
title: "Design Overview"
description: "Design-level wiki pages for emplus."
layout: "doc"
outline:
  - 2
  - 3
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--design-index"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "design-index"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:30:54.293Z"
  page: "design/index.md"
  moduleCount: 126
---

# Design Overview

- Overview: [emplus Docs Wiki](../index.md)
- Summary: [SUMMARY](../SUMMARY.md)
- Basic design: [Basic Design](./basic-design.md)
- Detail design: [Detail Design](./detail-design.md)
- API contracts: [API Contracts](./api-contracts.md)
- Flow catalog: [Flow Catalog](./flows.md)

## What This Layer Adds

- Basic Design maps business intent, actors, main capabilities, and context-level boundaries.
- Detail Design maps runtime structure, module responsibilities, and implementation-level handoffs.
- API Contracts extracts HTTP endpoints, request fields, and response shapes from route handlers.
- Flow Catalog extracts request and business flows from folder structure, symbol names, AI file summaries, and import signals.

## Dominant Capabilities

- [Services](../reference/modules/api/src/services.md) - Authentication Service API
- [Components](../reference/modules/mobile/src/components.md) - AnimatedSplashScreen component
- [Repositories](../reference/modules/mobile/src/data/repositories.md) - AuthRepositoryImpl class
- [Usecases](../reference/modules/mobile/src/domain/usecases.md) - LoginUseCase class.
- [Tests](../reference/modules/api/src/__tests__.md) - Unit tests for anniversary functionality.
- [Design Builder](../reference/modules/design-builder.md) - JSON schema definition for components file

## Top Flows

- Auth login - Authenticate the caller, validate credentials, and establish a usable session or token.
- Search Discovery listing - Execute the module's listing use case inside search and discovery.
- Password reset - Execute the module's password reset use case inside authentication and access control.
- Password reset - Execute the module's password reset use case inside authentication and access control.
- Password reset - Execute the module's password reset use case inside authentication and access control.
- Files Storage listing - Execute the module's listing use case inside files and storage.
