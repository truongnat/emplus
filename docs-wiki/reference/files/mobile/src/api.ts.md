---
title: "mobile/src/api.ts"
description: "API Functionality for User Authentication"
layout: "doc"
outline: "deep"
editLink: false
lastUpdated: false
pageClass: "docs-wiki docs-wiki--file"
docsWiki:
  schemaVersion: "1.0.0"
  kind: "file"
  project: "emplus"
  template: "detailed"
  themePreset: "clean"
  generatedAt: "2026-04-10T00:09:32.387Z"
  page: "reference/files/mobile/src/api.ts.md"
  relativePath: "mobile/src/api.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/api.ts"
  module: "mobile/src"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 22
---

# mobile/src/api.ts

- Overview: [emplus Docs Wiki](../../../../index.md)
- Summary: [SUMMARY](../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../features/index.md)
- Module: [mobile/src](../../../modules/mobile/src.md)
- Workspace: [@emplus/mobile](../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/api.ts`
- Lines: 99
- Symbols: 22

## Related Features

- [Authentication Login](../../../../features/auth-login.md) - Authentication Login captures the login workflow inside authentication. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Authentication Read / List](../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [User Management Login](../../../../features/user-login.md) - User Management Login captures the login workflow inside user management. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Search Read / List](../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Search Login](../../../../features/search-login.md) - Search Login captures the login workflow inside search. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Read / List](../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Notifications Notify](../../../../features/notification-notify.md) - Notifications Notify captures the notify workflow inside notifications. It spans 2 workspaces.
- [Notifications Login](../../../../features/notification-login.md) - Notifications Login captures the login workflow inside notifications. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Reporting Read / List](../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Search Notify](../../../../features/search-notify.md) - Search Notify captures the notify workflow inside search. It spans 2 workspaces.
- [Storage Login](../../../../features/storage-login.md) - Storage Login captures the login workflow inside storage. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Administration Read / List](../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Login](../../../../features/integration-login.md) - Integrations Login captures the login workflow inside integrations. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Integrations Notify](../../../../features/integration-notify.md) - Integrations Notify captures the notify workflow inside integrations. It spans 2 workspaces.
- [Search Create](../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Notify](../../../../features/user-notify.md) - User Management Notify captures the notify workflow inside user management. It spans 2 workspaces.
- [Administration Login](../../../../features/admin-login.md) - Administration Login captures the login workflow inside administration. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Storage Notify](../../../../features/storage-notify.md) - Storage Notify captures the notify workflow inside storage. It spans 2 workspaces.
- [User Management Create](../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Reporting Login](../../../../features/reporting-login.md) - Reporting Login captures the login workflow inside reporting. It spans 2 workspaces. Key flows include Auth login, Auth registration, Auth login.
- [Notifications Verification](../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Notify](../../../../features/admin-notify.md) - Administration Notify captures the notify workflow inside administration. It spans 2 workspaces.
- [Administration Verification](../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

API Functionality for User Authentication

### Responsibilities

- Validate login and register requests
- Handle verification of OTPs and generate invites

### Usage Notes

- To be used within the mobile application to authenticate users and perform related functions
- Note that some API endpoints may return dependencies, which must be handled by the dependent components

## Public API

- `loginWithEmail = (data: AuthModule.LoginRequest) => dependencies.auth.login.execute(data)`
- `registerWithEmail = (data: AuthModule.RegisterRequest) => dependencies.auth.register.execute(data)`
- `refreshAuthSession = (token: string) => dependencies.auth.refresh.execute(token)`
- `verifyOTP = (data: AuthModule.VerifyOtpRequest) => dependencies.auth.verifyOtp.execute(dat`
- `generateInvite = () => dependencies.couple.generateInvite.execute()`
- `joinByCode = (_token: string, code: string) => dependencies.couple.join.execute({ inviteCod`
- `getDashboard = () => dependencies.couple.getDashboard.execute()`
- `seedHappyCase = () => Promise.resolve({ seededMemories: 5, seededBudget: 10, autoP`
- `listMemories = ( _token: string, data: TimelineModule.ListQueryParams, ) => dependencies.ti`
- `getMaleSuggestions = () => dependencies.care.getMaleSuggestions.execute()`
- `getCoupleMood = () => dependencies.care.getCoupleMood.execute()`
- `putCoupleMood = (value: number) => dependencies.care.putCoupleMood.execute({ value })`
- `getBudgetSummary = () => dependencies.budget.getSummary.execute()`
- `listBudgetExpenses = ( _token: string, data: BudgetModule.ListQueryParams, ) => dependencies.budg`
- `createBudgetExpense = ( _token: string, data: BudgetModule.CreateRequest, ) => dependencies.budget`
- `createMemory = ( _token: string, data: TimelineModule.CreateRequest, ) => dependencies.time`
- `getMemoryById = (_token: string, id: string) => dependencies.timeline.getMemory.execute(id)`
- `deleteMemoryById = (_token: string, id: string) => dependencies.timeline.deleteMemory.execute(id)`
- `async function uploadTimelineMemoryPhoto( formData: FormData, options?: ApiRequestOptions, ): Promise<string>`
- `type PaginationMeta = { page: number; limit: number; totalItems: number; totalPages: number; hasNext?: boolean; };`
- `type MaleSuggestionsPayload = CareModule.MaleSuggestionsResponse;`
- `type DashboardPayload = DashboardModule.HomeResponse;`

## Symbols

### function `loginWithEmail`

- Signature: `loginWithEmail = (data: AuthModule.LoginRequest) => dependencies.auth.login.execute(data)`
- Lines: 16-17
- Exported: yes

```ts
loginWithEmail = (data: AuthModule.LoginRequest) =>
  dependencies.auth.login.execute(data)
```

### function `registerWithEmail`

- Signature: `registerWithEmail = (data: AuthModule.RegisterRequest) => dependencies.auth.register.execute(data)`
- Lines: 18-19
- Exported: yes

```ts
registerWithEmail = (data: AuthModule.RegisterRequest) =>
  dependencies.auth.register.execute(data)
```

### function `refreshAuthSession`

- Signature: `refreshAuthSession = (token: string) => dependencies.auth.refresh.execute(token)`
- Lines: 20-21
- Exported: yes

```ts
refreshAuthSession = (token: string) =>
  dependencies.auth.refresh.execute(token)
```

### function `verifyOTP`

- Signature: `verifyOTP = (data: AuthModule.VerifyOtpRequest) => dependencies.auth.verifyOtp.execute(dat`
- Lines: 22-23
- Exported: yes

```ts
verifyOTP = (data: AuthModule.VerifyOtpRequest) =>
  dependencies.auth.verifyOtp.execute(data)
```

### function `generateInvite`

- Signature: `generateInvite = () => dependencies.couple.generateInvite.execute()`
- Lines: 25-26
- Exported: yes

```ts
generateInvite = () =>
  dependencies.couple.generateInvite.execute()
```

### function `joinByCode`

- Signature: `joinByCode = (_token: string, code: string) => dependencies.couple.join.execute({ inviteCod`
- Lines: 27-28
- Exported: yes

```ts
joinByCode = (_token: string, code: string) =>
  dependencies.couple.join.execute({ inviteCode: code })
```

### function `getDashboard`

- Signature: `getDashboard = () => dependencies.couple.getDashboard.execute()`
- Lines: 29-29
- Exported: yes

```ts
getDashboard = () => dependencies.couple.getDashboard.execute()
```

### function `seedHappyCase`

- Signature: `seedHappyCase = () => Promise.resolve({ seededMemories: 5, seededBudget: 10, autoP`
- Lines: 31-36
- Exported: yes

```ts
seedHappyCase = () =>
  Promise.resolve({
    seededMemories: 5,
    seededBudget: 10,
    autoPaired: false,
  })
```

### function `listMemories`

- Signature: `listMemories = ( _token: string, data: TimelineModule.ListQueryParams, ) => dependencies.ti`
- Lines: 37-40
- Exported: yes

```ts
listMemories = (
  _token: string,
  data: TimelineModule.ListQueryParams,
) => dependencies.timeline.getMemories.execute(data)
```

### function `getMaleSuggestions`

- Signature: `getMaleSuggestions = () => dependencies.care.getMaleSuggestions.execute()`
- Lines: 41-42
- Exported: yes

```ts
getMaleSuggestions = () =>
  dependencies.care.getMaleSuggestions.execute()
```

### function `getCoupleMood`

- Signature: `getCoupleMood = () => dependencies.care.getCoupleMood.execute()`
- Lines: 43-43
- Exported: yes

```ts
getCoupleMood = () => dependencies.care.getCoupleMood.execute()
```

### function `putCoupleMood`

- Signature: `putCoupleMood = (value: number) => dependencies.care.putCoupleMood.execute({ value })`
- Lines: 44-45
- Exported: yes

```ts
putCoupleMood = (value: number) =>
  dependencies.care.putCoupleMood.execute({ value })
```

### function `getBudgetSummary`

- Signature: `getBudgetSummary = () => dependencies.budget.getSummary.execute()`
- Lines: 46-46
- Exported: yes

```ts
getBudgetSummary = () => dependencies.budget.getSummary.execute()
```

### function `listBudgetExpenses`

- Signature: `listBudgetExpenses = ( _token: string, data: BudgetModule.ListQueryParams, ) => dependencies.budg`
- Lines: 47-50
- Exported: yes

```ts
listBudgetExpenses = (
  _token: string,
  data: BudgetModule.ListQueryParams,
) => dependencies.budget.getExpenses.execute(data)
```

### function `createBudgetExpense`

- Signature: `createBudgetExpense = ( _token: string, data: BudgetModule.CreateRequest, ) => dependencies.budget`
- Lines: 51-54
- Exported: yes

```ts
createBudgetExpense = (
  _token: string,
  data: BudgetModule.CreateRequest,
) => dependencies.budget.createExpense.execute(data)
```

### function `createMemory`

- Signature: `createMemory = ( _token: string, data: TimelineModule.CreateRequest, ) => dependencies.time`
- Lines: 55-58
- Exported: yes

```ts
createMemory = (
  _token: string,
  data: TimelineModule.CreateRequest,
) => dependencies.timeline.createMemory.execute(data)
```

### function `getMemoryById`

- Signature: `getMemoryById = (_token: string, id: string) => dependencies.timeline.getMemory.execute(id)`
- Lines: 59-60
- Exported: yes

```ts
getMemoryById = (_token: string, id: string) =>
  dependencies.timeline.getMemory.execute(id)
```

### function `deleteMemoryById`

- Signature: `deleteMemoryById = (_token: string, id: string) => dependencies.timeline.deleteMemory.execute(id)`
- Lines: 61-62
- Exported: yes

```ts
deleteMemoryById = (_token: string, id: string) =>
  dependencies.timeline.deleteMemory.execute(id)
```

### function `uploadTimelineMemoryPhoto`

- Signature: `async function uploadTimelineMemoryPhoto( formData: FormData, options?: ApiRequestOptions, ): Promise<string>`
- Lines: 64-74
- Exported: yes

```ts
async function uploadTimelineMemoryPhoto(
  formData: FormData,
  options?: ApiRequestOptions,
): Promise<string> {
  const res = await apiClient.post<ApiResponse<{ url: string }>>(
    "/media/upload",
    formData,
    { ...options, timeoutMs: options?.timeoutMs ?? 120_000 },
  );
  return res.data.url;
}
```

### type `PaginationMeta`

- Signature: `type PaginationMeta = { page: number; limit: number; totalItems: number; totalPages: number; hasNext?: boolean; };`
- Lines: 89-95
- Exported: yes

```ts
type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext?: boolean;
};
```

### type `MaleSuggestionsPayload`

- Signature: `type MaleSuggestionsPayload = CareModule.MaleSuggestionsResponse;`
- Lines: 97-97
- Exported: yes

```ts
type MaleSuggestionsPayload = CareModule.MaleSuggestionsResponse;
```

### type `DashboardPayload`

- Signature: `type DashboardPayload = DashboardModule.HomeResponse;`
- Lines: 98-98
- Exported: yes

```ts
type DashboardPayload = DashboardModule.HomeResponse;
```
