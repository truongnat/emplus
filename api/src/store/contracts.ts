import type { AuthProvider, Anniversary, BudgetItem, Couple, EmotionalCycle, Invite, MemoryItem, User } from "../types.ts";

export interface DataStore {
  reset?(): Promise<void>;
  getUserByToken(token: string): Promise<User | undefined>;
  consumeRefreshSession(refreshToken: string): Promise<User | undefined>;
  findUserByAuth(provider: AuthProvider, authId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  saveUser(user: User): Promise<void>;
  saveSession(accessToken: string, userId: string, ttlSeconds: number): Promise<void>;
  deleteSession(accessToken: string): Promise<void>;
  saveRefreshSession(refreshToken: string, userId: string, ttlSeconds: number): Promise<void>;
  deleteRefreshSession(refreshToken: string): Promise<void>;
  getActiveCoupleForUser(userId: string): Promise<Couple | undefined>;
  getPendingCoupleByCreator(userId: string): Promise<Couple | undefined>;
  createPendingCouple(creatorId: string): Promise<Couple>;
  issueInviteForCouple(coupleId: string, createdBy: string): Promise<Invite>;
  getInvite(code: string): Promise<Invite | undefined>;
  deleteInvite(code: string): Promise<void>;
  getCoupleById(coupleId: string): Promise<Couple | undefined>;
  userAlreadyInCouple(userId: string): Promise<boolean>;
  inviterHasOtherActiveCouple(inviterId: string, excludeCoupleId: string): Promise<boolean>;
  listMemoriesByCouple(coupleId: string, options?: {
    page?: number;
    limit?: number;
    order?: "asc" | "desc";
    tag?: string;
  }): Promise<{ items: MemoryItem[]; total: number }>;
  saveMemory(memory: MemoryItem): Promise<void>;
  listBudgetItemsByCouple(coupleId: string): Promise<BudgetItem[]>;
  getBudgetItem(id: string): Promise<BudgetItem | undefined>;
  saveBudgetItem(item: BudgetItem): Promise<void>;
  updateBudgetItem(item: BudgetItem): Promise<void>;
  deleteBudgetItem(id: string): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
  getCycleByUserId(userId: string): Promise<EmotionalCycle | undefined>;
  saveCycle(cycle: EmotionalCycle): Promise<void>;
  updateCouple(couple: Couple): Promise<void>;
  saveCouple(couple: Couple): Promise<void>;
  getHomeCache(coupleId: string): Promise<unknown | undefined>;
  setHomeCache(coupleId: string, payload: unknown, ttlSeconds: number): Promise<void>;
  saveOtp(email: string, otp: string, ttlSeconds: number): Promise<void>;
  getOtp(email: string): Promise<string | undefined>;
  deleteOtp(email: string): Promise<void>;
  incrementRateLimit(key: string, ttlSeconds: number): Promise<number>;
  getRateLimitCount(key: string): Promise<number>;
  deleteRateLimitCount(key: string): Promise<void>;
  invalidateHomeCache(coupleId: string): Promise<void>;

  // Anniversary methods
  listAnniversariesByCouple(coupleId: string): Promise<Anniversary[]>;
  getAnniversary(id: string): Promise<Anniversary | undefined>;
  saveAnniversary(anniversary: Anniversary): Promise<void>;
  updateAnniversary(anniversary: Anniversary): Promise<void>;
  deleteAnniversary(id: string): Promise<void>;

  // Admin methods
  listAllUsers?(): Promise<User[]>;
  listAllCouples?(): Promise<Couple[]>;
  countMemories?(): Promise<number>;
}
