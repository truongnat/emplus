import {
  apiClient,
  type ApiRequestOptions,
  type ApiResponse,
} from "./core/api";
import { dependencies } from "./framework/di/dependencies";
import type {
  AuthModule,
  TimelineModule,
  CoupleModule,
  CareModule,
  BudgetModule,
  DashboardModule,
} from "./domain/entities/schemas";

export const loginWithEmail = (data: AuthModule.LoginRequest) =>
  dependencies.auth.login.execute(data);
export const registerWithEmail = (data: AuthModule.RegisterRequest) =>
  dependencies.auth.register.execute(data);
export const refreshAuthSession = (token: string) =>
  dependencies.auth.refresh.execute(token);
export const verifyOTP = (data: AuthModule.VerifyOtpRequest) =>
  dependencies.auth.verifyOtp.execute(data);

export const generateInvite = () =>
  dependencies.couple.generateInvite.execute();
export const joinByCode = (_token: string, code: string) =>
  dependencies.couple.join.execute({ inviteCode: code });
export const getDashboard = () => dependencies.couple.getDashboard.execute();

export const seedHappyCase = () =>
  Promise.resolve({
    seededMemories: 5,
    seededBudget: 10,
    autoPaired: false,
  });
export const listMemories = (
  _token: string,
  data: TimelineModule.ListQueryParams,
) => dependencies.timeline.getMemories.execute(data);
export const getMaleSuggestions = () =>
  dependencies.care.getMaleSuggestions.execute();
export const getCoupleMood = () => dependencies.care.getCoupleMood.execute();
export const putCoupleMood = (value: number) =>
  dependencies.care.putCoupleMood.execute({ value });
export const getBudgetSummary = () => dependencies.budget.getSummary.execute();
export const listBudgetExpenses = (
  _token: string,
  data: BudgetModule.ListQueryParams,
) => dependencies.budget.getExpenses.execute(data);
export const createBudgetExpense = (
  _token: string,
  data: BudgetModule.CreateRequest,
) => dependencies.budget.createExpense.execute(data);
export const createMemory = (
  _token: string,
  data: TimelineModule.CreateRequest,
) => dependencies.timeline.createMemory.execute(data);
export const getMemoryById = (_token: string, id: string) =>
  dependencies.timeline.getMemory.execute(id);
export const deleteMemoryById = (_token: string, id: string) =>
  dependencies.timeline.deleteMemory.execute(id);

export async function uploadTimelineMemoryPhoto(
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

export { toDisplayError } from "./core/api/to-display-error";
export type {
  AuthModule,
  TimelineModule,
  CoupleModule,
  CareModule,
  BudgetModule,
  User,
  Memory as MemoryItem,
  BudgetItem,
  BudgetSummary,
} from "./domain/entities/schemas";

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext?: boolean;
};

export type MaleSuggestionsPayload = CareModule.MaleSuggestionsResponse;
export type DashboardPayload = DashboardModule.HomeResponse;
