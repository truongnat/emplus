import { dependencies } from "./framework/di/dependencies";

/**
 * Compatibility layer for legacy API calls.
 */
export const loginWithEmail = (data: any) => dependencies.auth.login.execute(data);
export const registerWithEmail = (data: any) => dependencies.auth.register.execute(data);
export const refreshAuthSession = (token: string) => dependencies.auth.refresh.execute(token);
export const verifyOTP = (data: any) => dependencies.auth.login.execute(data); 

export const generateInvite = () => dependencies.couple.generateInvite.execute();
export const joinByCode = (token: any, code: string) => dependencies.couple.join.execute({ inviteCode: code });
export const getDashboard = () => dependencies.couple.getDashboard.execute();

export const seedHappyCase = () => Promise.resolve();
export const listMemories = (token: any, data: any) => dependencies.timeline.getMemories.execute(data);
export const getMaleSuggestions = () => dependencies.care.getMaleSuggestions.execute();
export const getBudgetSummary = () => dependencies.budget.getSummary.execute();
export const listBudgetExpenses = (token: any, data: any) => dependencies.budget.getExpenses.execute(data);
export const createBudgetExpense = (token: any, data: any) => dependencies.budget.createExpense.execute(data);
export const createMemory = (token: any, data: any) => dependencies.timeline.createMemory.execute(data);

export { toDisplayError } from "./core/api/to-display-error";
export type { 
  AuthModule, TimelineModule, CoupleModule, CareModule, BudgetModule,
  User, Memory as MemoryItem, BudgetItem, BudgetSummary
} from "./domain/entities/schemas";

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext?: boolean;
};

// Fallback types
export type MaleSuggestionsPayload = any;
export type DashboardPayload = any;
