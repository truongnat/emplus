import type {
  TimelineModule,
  CoupleModule,
  DashboardModule,
  CareModule,
  BudgetModule,
  Memory,
} from "../entities/schemas";

export interface TimelineRepository {
  getMemories(
    params: TimelineModule.ListQueryParams,
  ): Promise<TimelineModule.ListResponse>;
  createMemory(
    params: TimelineModule.CreateRequest,
  ): Promise<TimelineModule.CreateResponse>;
  getMemory(id: string): Promise<Memory>;
  deleteMemory(id: string): Promise<TimelineModule.DeleteResponse>;
}

export interface CoupleRepository {
  generateInvite(): Promise<CoupleModule.GenerateInviteResponse>;
  joinCouple(
    params: CoupleModule.JoinRequest,
  ): Promise<CoupleModule.JoinResponse>;
}

export interface DashboardRepository {
  getHomeData(): Promise<DashboardModule.HomeResponse>;
}

export interface CareRepository {
  saveFemaleCycle(
    params: CareModule.FemaleCycleRequest,
  ): Promise<CareModule.FemaleCycleResponse>;
  getMaleSuggestions(): Promise<CareModule.MaleSuggestionsResponse>;
  getCoupleMood(): Promise<CareModule.CoupleMoodResponse>;
  putCoupleMood(
    params: CareModule.SaveMoodRequest,
  ): Promise<CareModule.SaveMoodResponse>;
}

export interface BudgetRepository {
  getSummary(): Promise<BudgetModule.SummaryResponse>;
  getExpenses(
    params: BudgetModule.ListQueryParams,
  ): Promise<BudgetModule.ListResponse>;
  createExpense(
    params: BudgetModule.CreateRequest,
  ): Promise<BudgetModule.CreateResponse>;
}
