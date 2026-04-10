---
title: "mobile/src/data/repositories/modules.repository.impl.ts"
description: "Provides 20 documented symbols in mobile/src/data/repositories/modules.repository.impl.ts."
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
  page: "reference/files/mobile/src/data/repositories/modules.repository.impl.ts.md"
  relativePath: "mobile/src/data/repositories/modules.repository.impl.ts"
  absolutePath: "/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/modules.repository.impl.ts"
  module: "mobile/src/data/repositories"
  workspace: "mobile"
  language: "TypeScript"
  symbolCount: 20
---

# mobile/src/data/repositories/modules.repository.impl.ts

- Overview: [emplus Docs Wiki](../../../../../../index.md)
- Summary: [SUMMARY](../../../../../../SUMMARY.md)
- Feature catalog: [All features](../../../../../../features/index.md)
- Module: [mobile/src/data/repositories](../../../../../modules/mobile/src/data/repositories.md)
- Workspace: [@emplus/mobile](../../../../../../workspaces/mobile.md)

## Snapshot

- Language: TypeScript
- Source path: `/Users/truongdq/tx/GitHub/emplus/mobile/src/data/repositories/modules.repository.impl.ts`
- Lines: 135
- Symbols: 20

## Related Features

- [Authentication Read / List](../../../../../../features/auth-list.md) - Authentication Read / List captures the read / list workflow inside authentication. It spans 3 workspaces.
- [Search Read / List](../../../../../../features/search-list.md) - Search Read / List captures the read / list workflow inside search. It spans 3 workspaces.
- [Notifications Read / List](../../../../../../features/notification-list.md) - Notifications Read / List captures the read / list workflow inside notifications. It spans 2 workspaces.
- [Storage Read / List](../../../../../../features/storage-list.md) - Storage Read / List captures the read / list workflow inside storage. It spans 4 workspaces.
- [Integrations Read / List](../../../../../../features/integration-list.md) - Integrations Read / List captures the read / list workflow inside integrations. It spans 3 workspaces.
- [User Management Read / List](../../../../../../features/user-list.md) - User Management Read / List captures the read / list workflow inside user management. It spans 3 workspaces.
- [Reporting Read / List](../../../../../../features/reporting-list.md) - Reporting Read / List captures the read / list workflow inside reporting. It spans 2 workspaces.
- [Administration Read / List](../../../../../../features/admin-list.md) - Administration Read / List captures the read / list workflow inside administration. It spans 2 workspaces.
- [Authentication Verification](../../../../../../features/auth-verify.md) - Authentication Verification captures the verification workflow inside authentication. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Search Create](../../../../../../features/search-create.md) - Search Create captures the create workflow inside search. It spans 2 workspaces.
- [User Management Create](../../../../../../features/user-create.md) - User Management Create captures the create workflow inside user management. It spans 2 workspaces.
- [Notifications Verification](../../../../../../features/notification-verify.md) - Notifications Verification captures the verification workflow inside notifications. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Storage Verification](../../../../../../features/storage-verify.md) - Storage Verification captures the verification workflow inside storage. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Administration Verification](../../../../../../features/admin-verify.md) - Administration Verification captures the verification workflow inside administration. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Integrations Verification](../../../../../../features/integration-verify.md) - Integrations Verification captures the verification workflow inside integrations. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.
- [Reporting Verification](../../../../../../features/reporting-verify.md) - Reporting Verification captures the verification workflow inside reporting. It spans 2 workspaces. Key flows include Credential validation, Auth login, Auth login.

## AI Summary

Provides 20 documented symbols in mobile/src/data/repositories/modules.repository.impl.ts.

## Public API

- `class TimelineRepositoryImpl implements TimelineRepository`
- `async getMemories(params: TimelineModule.ListQueryParams)`
- `async createMemory(params: TimelineModule.CreateRequest)`
- `async getMemory(id: string): Promise<Memory>`
- `async deleteMemory(id: string): Promise<TimelineModule.DeleteResponse>`
- `class CoupleRepositoryImpl implements CoupleRepository`
- `async generateInvite()`
- `async joinCouple(params: CoupleModule.JoinRequest)`
- `async checkPairingStatus()`
- `class DashboardRepositoryImpl implements DashboardRepository`
- `async getHomeData()`
- `class CareRepositoryImpl implements CareRepository`
- `async saveFemaleCycle(params: CareModule.FemaleCycleRequest)`
- `async getMaleSuggestions()`
- `async getCoupleMood()`
- `async putCoupleMood(params: CareModule.SaveMoodRequest)`
- `class BudgetRepositoryImpl implements BudgetRepository`
- `async getSummary()`
- `async getExpenses(params: BudgetModule.ListQueryParams)`
- `async createExpense(params: BudgetModule.CreateRequest)`

## Symbols

### class `TimelineRepositoryImpl`

- Signature: `class TimelineRepositoryImpl implements TimelineRepository`
- Lines: 18-47
- Exported: yes

```ts
class TimelineRepositoryImpl implements TimelineRepository {
  async getMemories(params: TimelineModule.ListQueryParams) {
    const query = new URLSearchParams(params as any).toString();
    const response = await apiClient.get<
      ApiResponse<TimelineModule.ListResponse>
    >(`/timeline/memories?${query}`);
    return response.data;
  }

  async createMemory(params: TimelineModule.CreateRequest) {
    const response = await apiClient.post<
      ApiResponse<TimelineModule.CreateResponse>
    >("/timeline/memories", params);
    return response.data;
  }

  async getMemory(id: string): Promise<Memory> {
    const response = await apiClient.get<ApiResponse<Memory>>(
      `/timeline/memories/${encodeURIComponent(id)}`,
    );
    return response.data;
  }

  async deleteMemory(id: string): Promise<TimelineModule.DeleteResponse> {
    const response = await apiClient.delete<
      ApiResponse<TimelineModule.DeleteResponse>
    >(`/timeline/memories/${encodeURIComponent(id)}`);
    return response.data;
  }
}
```

### method `getMemories`

- Signature: `async getMemories(params: TimelineModule.ListQueryParams)`
- Lines: 19-25
- Exported: yes

```ts
async getMemories(params: TimelineModule.ListQueryParams) {
    const query = new URLSearchParams(params as any).toString();
    const response = await apiClient.get<
      ApiResponse<TimelineModule.ListResponse>
    >(`/timeline/memories?${query}`);
    return response.data;
  }
```

### method `createMemory`

- Signature: `async createMemory(params: TimelineModule.CreateRequest)`
- Lines: 27-32
- Exported: yes

```ts
async createMemory(params: TimelineModule.CreateRequest) {
    const response = await apiClient.post<
      ApiResponse<TimelineModule.CreateResponse>
    >("/timeline/memories", params);
    return response.data;
  }
```

### method `getMemory`

- Signature: `async getMemory(id: string): Promise<Memory>`
- Lines: 34-39
- Exported: yes

```ts
async getMemory(id: string): Promise<Memory> {
    const response = await apiClient.get<ApiResponse<Memory>>(
      `/timeline/memories/${encodeURIComponent(id)}`,
    );
    return response.data;
  }
```

### method `deleteMemory`

- Signature: `async deleteMemory(id: string): Promise<TimelineModule.DeleteResponse>`
- Lines: 41-46
- Exported: yes

```ts
async deleteMemory(id: string): Promise<TimelineModule.DeleteResponse> {
    const response = await apiClient.delete<
      ApiResponse<TimelineModule.DeleteResponse>
    >(`/timeline/memories/${encodeURIComponent(id)}`);
    return response.data;
  }
```

### class `CoupleRepositoryImpl`

- Signature: `class CoupleRepositoryImpl implements CoupleRepository`
- Lines: 49-70
- Exported: yes

```ts
class CoupleRepositoryImpl implements CoupleRepository {
  async generateInvite() {
    const response = await apiClient.post<
      ApiResponse<CoupleModule.GenerateInviteResponse>
    >("/couples/generate-invite");
    return response.data;
  }

  async joinCouple(params: CoupleModule.JoinRequest) {
    const response = await apiClient.post<
      ApiResponse<CoupleModule.JoinResponse>
    >("/couples/join", params);
    return response.data;
  }

  async checkPairingStatus() {
    const response = await apiClient.get<ApiResponse<PairingStatusResponse>>(
      "/couples/status",
    );
    return response.data;
  }
}
```

### method `generateInvite`

- Signature: `async generateInvite()`
- Lines: 50-55
- Exported: yes

```ts
async generateInvite() {
    const response = await apiClient.post<
      ApiResponse<CoupleModule.GenerateInviteResponse>
    >("/couples/generate-invite");
    return response.data;
  }
```

### method `joinCouple`

- Signature: `async joinCouple(params: CoupleModule.JoinRequest)`
- Lines: 57-62
- Exported: yes

```ts
async joinCouple(params: CoupleModule.JoinRequest) {
    const response = await apiClient.post<
      ApiResponse<CoupleModule.JoinResponse>
    >("/couples/join", params);
    return response.data;
  }
```

### method `checkPairingStatus`

- Signature: `async checkPairingStatus()`
- Lines: 64-69
- Exported: yes

```ts
async checkPairingStatus() {
    const response = await apiClient.get<ApiResponse<PairingStatusResponse>>(
      "/couples/status",
    );
    return response.data;
  }
```

### class `DashboardRepositoryImpl`

- Signature: `class DashboardRepositoryImpl implements DashboardRepository`
- Lines: 72-79
- Exported: yes

```ts
class DashboardRepositoryImpl implements DashboardRepository {
  async getHomeData() {
    // Lưu ý: OpenAPI schemas.ts dùng DashboardHome cho response này
    const response = await apiClient.get<ApiResponse<any>>("/dashboard/home");
    // Sửa any: DashboardModule.HomeResponse nếu schema đã định nghĩa
    return response.data;
  }
}
```

### method `getHomeData`

- Signature: `async getHomeData()`
- Lines: 73-78
- Exported: yes

```ts
async getHomeData() {
    // Lưu ý: OpenAPI schemas.ts dùng DashboardHome cho response này
    const response = await apiClient.get<ApiResponse<any>>("/dashboard/home");
    // Sửa any: DashboardModule.HomeResponse nếu schema đã định nghĩa
    return response.data;
  }
```

### class `CareRepositoryImpl`

- Signature: `class CareRepositoryImpl implements CareRepository`
- Lines: 81-109
- Exported: yes

```ts
class CareRepositoryImpl implements CareRepository {
  async saveFemaleCycle(params: CareModule.FemaleCycleRequest) {
    const response = await apiClient.post<
      ApiResponse<CareModule.FemaleCycleResponse>
    >("/care/female-cycle", params);
    return response.data;
  }

  async getMaleSuggestions() {
    const response = await apiClient.get<
      ApiResponse<CareModule.MaleSuggestionsResponse>
    >("/care/male-suggestions");
    return response.data;
  }

  async getCoupleMood() {
    const response = await apiClient.get<
      ApiResponse<CareModule.CoupleMoodResponse>
    >("/care/mood");
    return response.data;
  }

  async putCoupleMood(params: CareModule.SaveMoodRequest) {
    const response = await apiClient.put<
      ApiResponse<CareModule.SaveMoodResponse>
    >("/care/mood", params);
    return response.data;
  }
}
```

### method `saveFemaleCycle`

- Signature: `async saveFemaleCycle(params: CareModule.FemaleCycleRequest)`
- Lines: 82-87
- Exported: yes

```ts
async saveFemaleCycle(params: CareModule.FemaleCycleRequest) {
    const response = await apiClient.post<
      ApiResponse<CareModule.FemaleCycleResponse>
    >("/care/female-cycle", params);
    return response.data;
  }
```

### method `getMaleSuggestions`

- Signature: `async getMaleSuggestions()`
- Lines: 89-94
- Exported: yes

```ts
async getMaleSuggestions() {
    const response = await apiClient.get<
      ApiResponse<CareModule.MaleSuggestionsResponse>
    >("/care/male-suggestions");
    return response.data;
  }
```

### method `getCoupleMood`

- Signature: `async getCoupleMood()`
- Lines: 96-101
- Exported: yes

```ts
async getCoupleMood() {
    const response = await apiClient.get<
      ApiResponse<CareModule.CoupleMoodResponse>
    >("/care/mood");
    return response.data;
  }
```

### method `putCoupleMood`

- Signature: `async putCoupleMood(params: CareModule.SaveMoodRequest)`
- Lines: 103-108
- Exported: yes

```ts
async putCoupleMood(params: CareModule.SaveMoodRequest) {
    const response = await apiClient.put<
      ApiResponse<CareModule.SaveMoodResponse>
    >("/care/mood", params);
    return response.data;
  }
```

### class `BudgetRepositoryImpl`

- Signature: `class BudgetRepositoryImpl implements BudgetRepository`
- Lines: 111-134
- Exported: yes

```ts
class BudgetRepositoryImpl implements BudgetRepository {
  async getSummary() {
    const response =
      await apiClient.get<ApiResponse<BudgetModule.SummaryResponse>>(
        "/budget/summary",
      );
    return response.data;
  }

  async getExpenses(params: BudgetModule.ListQueryParams) {
    const query = new URLSearchParams(params as any).toString();
    const response = await apiClient.get<
      ApiResponse<BudgetModule.ListResponse>
    >(`/budget/expenses?${query}`);
    return response.data;
  }

  async createExpense(params: BudgetModule.CreateRequest) {
    const response = await apiClient.post<
      ApiResponse<BudgetModule.CreateResponse>
    >("/budget/expenses", params);
    return response.data;
  }
}
```

### method `getSummary`

- Signature: `async getSummary()`
- Lines: 112-118
- Exported: yes

```ts
async getSummary() {
    const response =
      await apiClient.get<ApiResponse<BudgetModule.SummaryResponse>>(
        "/budget/summary",
      );
    return response.data;
  }
```

### method `getExpenses`

- Signature: `async getExpenses(params: BudgetModule.ListQueryParams)`
- Lines: 120-126
- Exported: yes

```ts
async getExpenses(params: BudgetModule.ListQueryParams) {
    const query = new URLSearchParams(params as any).toString();
    const response = await apiClient.get<
      ApiResponse<BudgetModule.ListResponse>
    >(`/budget/expenses?${query}`);
    return response.data;
  }
```

### method `createExpense`

- Signature: `async createExpense(params: BudgetModule.CreateRequest)`
- Lines: 128-133
- Exported: yes

```ts
async createExpense(params: BudgetModule.CreateRequest) {
    const response = await apiClient.post<
      ApiResponse<BudgetModule.CreateResponse>
    >("/budget/expenses", params);
    return response.data;
  }
```
