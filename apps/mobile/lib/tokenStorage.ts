import * as SecureStore from "expo-secure-store";
import type { TokenStorage } from "@repo/ui/types/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const mobileTokenStorage: TokenStorage = {
  getAccessToken: async () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
  getRefreshToken: async () => SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
  setTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },
  clearTokens: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },
};
