/**
 * Lottie asset inventory — thay file JSON trong mobile/assets/lottie/ khi có design riêng.
 * Hiện dùng placeholder xoay nhẹ (cùng nguồn) cho mọi role; giữ tên role để map màn hình.
 */

export const lottieInventory = {
  loader: require("../../assets/lottie/loader.json"),
  empty: require("../../assets/lottie/empty.json"),
  success: require("../../assets/lottie/success.json"),
  error: require("../../assets/lottie/error.json"),
  careHeart: require("../../assets/lottie/care-heart.json"),
  /** Home hero counter — `Bird pair love and flying sky.lottie` (dotLottie → JSON, vector-only). */
  homeCounterBirdPairSky: require("../../assets/lottie/home-counter-bird-pair-sky.json"),
  /** Pairing hero — `family love.lottie` (LottieFiles) → JSON + embedded PNGs. */
  pairingFamilyLove: require("../../assets/lottie/pairing-family-love.json"),
  /** Login hero — từ dotLottie (LottieFiles), file gốc `.lottie` → JSON trong bundle. */
  loginCatLove: require("../../assets/lottie/login-cat-love.json"),
  /** Register hero — `love hearts.lottie` → JSON (LottieFiles / dotLottie-js). */
  registerLoveHearts: require("../../assets/lottie/register-love-hearts.json"),
  placeholder: require("../../assets/lottie/placeholder.json"),
  /** Verify OTP hero — `Password Authentication.lottie` → JSON + embedded PNGs. */
  verifyOtpPasswordAuth: require("../../assets/lottie/verify-otp-password-auth.json"),
} as const;

export type LottieInventoryKey = keyof typeof lottieInventory;
