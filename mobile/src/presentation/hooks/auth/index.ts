/**
 * Authentication Hooks
 * Centralized authentication state management
 */

export { useAuth } from "./useAuth";
export { useLogin } from "./useLogin";
export { useRegister } from "./useRegister";
export { useLogout } from "./useLogout";

// Re-export types
export type { UseLoginOptions } from "./useLogin";
export type { UseRegisterOptions } from "./useRegister";
export type { UseLogoutOptions } from "./useLogout";
