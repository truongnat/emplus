import type { User } from "./types.ts";

export type AppEnv = {
  Variables: {
    requestId: string;
    user: User;
  };
};
