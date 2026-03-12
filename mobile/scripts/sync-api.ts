import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OPENAPI_JSON = join(import.meta.dir, "../../api/openapi.json");
const OUTPUT_FILE = join(import.meta.dir, "../src/domain/entities/schemas.ts");

async function sync() {
  console.log("🚀 Generating base schemas from OpenAPI...");

  // Ensure directory exists
  mkdirSync(join(import.meta.dir, "../src/domain/entities"), { recursive: true });

  // 1. Run openapi-typescript
  try {
    execSync(`bun x openapi-typescript ${OPENAPI_JSON} -o ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ Failed to generate schemas:", error);
    process.exit(1);
  }

  // 2. Append helper types for Modules, Request, Response, Entities
  console.log("📝 Appending helper types...");
  const content = readFileSync(OUTPUT_FILE, "utf-8");

  const helpers = `
/**
 * Helper types to access OpenAPI definitions more easily
 */

export type Schemas = components["schemas"];

/**
 * Entities (Models)
 */
export type User = Schemas["User"];
export type Couple = Schemas["Couple"];
export type Memory = Schemas["Memory"];
export type TokenPair = Schemas["TokenPair"];
export type AuthResponse = Schemas["AuthResponse"];
export type DashboardHome = Schemas["DashboardHome"];
export type Gender = Schemas["Gender"];
export type BudgetItem = Schemas["BudgetItem"];
export type BudgetSummary = Schemas["BudgetSummary"];

/**
 * API Request/Response Types Helper
 */
export type ApiPaths = keyof paths;

export type ApiResponse<P extends ApiPaths, M extends keyof paths[P]> = 
  paths[P][M] extends { responses: { 200: { content: { "application/json": infer T } } } } ? T :
  paths[P][M] extends { responses: { 201: { content: { "application/json": infer T } } } } ? T :
  unknown;

export type ApiRequest<P extends ApiPaths, M extends keyof paths[P]> = 
  paths[P][M] extends { requestBody: { content: { "application/json": infer T } } } ? T : 
  never;

export type ApiQueryParams<P extends ApiPaths, M extends keyof paths[P]> = 
  paths[P][M] extends { parameters: { query?: infer T } } ? T : 
  never;

/**
 * Module Specific Types
 */
export namespace AuthModule {
  export type RegisterRequest = ApiRequest<"/v1/auth/register", "post">;
  export type RegisterResponse = ApiResponse<"/v1/auth/register", "post">;
  
  export type LoginRequest = ApiRequest<"/v1/auth/login", "post">;
  export type LoginResponse = ApiResponse<"/v1/auth/login", "post">;
  
  export type RefreshRequest = ApiRequest<"/v1/auth/refresh", "post">;
  export type RefreshResponse = ApiResponse<"/v1/auth/refresh", "post">;
}

export namespace CoupleModule {
  export type GenerateInviteResponse = ApiResponse<"/v1/couples/generate-invite", "post">;
  
  export type JoinRequest = ApiRequest<"/v1/couples/join", "post">;
  export type JoinResponse = ApiResponse<"/v1/couples/join", "post">;
}

export namespace DashboardModule {
  export type HomeResponse = ApiResponse<"/v1/dashboard/home", "get">;
}

export namespace TimelineModule {
  export type ListQueryParams = ApiQueryParams<"/v1/timeline/memories", "get">;
  export type ListResponse = ApiResponse<"/v1/timeline/memories", "get">;
  
  export type CreateRequest = ApiRequest<"/v1/timeline/memories", "post">;
  export type CreateResponse = ApiResponse<"/v1/timeline/memories", "post">;
}

export namespace CareModule {
  export type FemaleCycleRequest = ApiRequest<"/v1/care/female-cycle", "post">;
  export type FemaleCycleResponse = ApiResponse<"/v1/care/female-cycle", "post">;
  
  export type MaleSuggestionsResponse = ApiResponse<"/v1/care/male-suggestions", "get">;
}

export namespace BudgetModule {
  export type SummaryResponse = ApiResponse<"/v1/budget/summary", "get">;
  
  export type ListQueryParams = ApiQueryParams<"/v1/budget/expenses", "get">;
  export type ListResponse = ApiResponse<"/v1/budget/expenses", "get">;
  
  export type CreateRequest = ApiRequest<"/v1/budget/expenses", "post">;
  export type CreateResponse = ApiResponse<"/v1/budget/expenses", "post">;
}
`;

  writeFileSync(OUTPUT_FILE, content + helpers);
  console.log("✅ Sync complete!");
}

sync();
