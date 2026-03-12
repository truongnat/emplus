import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../config/app-config';

/**
 * Utility tập trung để quản lý dữ liệu lưu trữ (Storage).
 * Sử dụng SecureStore cho dữ liệu nhạy cảm và AsyncStorage cho metadata.
 */
export const storage = {
  // --- Secure Storage (Tokens) ---
  auth: {
    getTokens: async () => {
      const raw = await SecureStore.getItemAsync(appConfig.storage.authTokens);
      return raw ? JSON.parse(raw) : null;
    },
    setTokens: (tokens: object) => 
      SecureStore.setItemAsync(appConfig.storage.authTokens, JSON.stringify(tokens)),
    clear: () => 
      SecureStore.deleteItemAsync(appConfig.storage.authTokens),
  },

  // --- Async Storage (Metadata / Settings) ---
  user: {
    getMetadata: async () => {
      const raw = await AsyncStorage.getItem(appConfig.storage.userMetadata);
      return raw ? JSON.parse(raw) : null;
    },
    setMetadata: (meta: object) => 
      AsyncStorage.setItem(appConfig.storage.userMetadata, JSON.stringify(meta)),
    clear: () => 
      AsyncStorage.removeItem(appConfig.storage.userMetadata),
  },

  /**
   * Xóa sạch toàn bộ dữ liệu phiên làm việc
   */
  clearAllSession: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(appConfig.storage.authTokens),
      AsyncStorage.removeItem(appConfig.storage.userMetadata),
    ]);
  }
};
