import { apiClient, ApiResponse } from "../../core/api";
import {
  TimelineModule,
  CoupleModule,
  CareModule,
  BudgetModule,
} from "../../domain/entities/schemas";
import {
  TimelineRepository,
  CoupleRepository,
  DashboardRepository,
  CareRepository,
  BudgetRepository,
} from "../../domain/repositories/modules.repository";

export class TimelineRepositoryImpl implements TimelineRepository {
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
}

export class CoupleRepositoryImpl implements CoupleRepository {
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
}

export class DashboardRepositoryImpl implements DashboardRepository {
  async getHomeData() {
    // Lưu ý: OpenAPI schemas.ts dùng DashboardHome cho response này
    const response = await apiClient.get<ApiResponse<any>>("/dashboard/home");
    // Sửa any: DashboardModule.HomeResponse nếu schema đã định nghĩa
    return response.data;
  }
}

export class CareRepositoryImpl implements CareRepository {
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
}

export class BudgetRepositoryImpl implements BudgetRepository {
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
