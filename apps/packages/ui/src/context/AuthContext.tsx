"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
} from "../services/auth";
import type { AuthUser, TokenStorage } from "../types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

type AuthProviderProps = {
  children: ReactNode;
  tokenStorage: TokenStorage;
  apiBaseUrl?: string;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({
  children,
  tokenStorage,
  apiBaseUrl,
}: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistTokens = useCallback(
    async (accessToken: string, refreshToken: string) => {
      await tokenStorage.setTokens(accessToken, refreshToken);
    },
    [tokenStorage],
  );

  const clearSession = useCallback(async () => {
    await tokenStorage.clearTokens();
    setUser(null);
  }, [tokenStorage]);

  const bootstrapSession = useCallback(async () => {
    const refreshToken = await tokenStorage.getRefreshToken();

    if (!refreshToken) {
      setUser(null);
      return;
    }

    try {
      const tokens = await refreshRequest(refreshToken, apiBaseUrl);
      await persistTokens(tokens.accessToken, tokens.refreshToken);
      setUser(tokens.user);
      return;
    } catch {
      await clearSession();
    }
  }, [apiBaseUrl, clearSession, persistTokens, tokenStorage]);

  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);

      const accessToken = await tokenStorage.getAccessToken();
      const refreshToken = await tokenStorage.getRefreshToken();

      if (!accessToken && !refreshToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (accessToken) {
        try {
          const currentUser = await meRequest(accessToken, apiBaseUrl);
          setUser(currentUser);
          setIsLoading(false);
          return;
        } catch {
          // Access token expired or invalid — fall through to refresh.
        }
      }

      await bootstrapSession();
      setIsLoading(false);
    };

    restoreSession();
  }, [apiBaseUrl, bootstrapSession, tokenStorage]);

  const login = useCallback(
    async (email: string, password: string) => {
      const tokens = await loginRequest(email, password, apiBaseUrl);
      await persistTokens(tokens.accessToken, tokens.refreshToken);
      setUser(tokens.user);
    },
    [apiBaseUrl, persistTokens],
  );

  const logout = useCallback(async () => {
    const accessToken = await tokenStorage.getAccessToken();

    if (accessToken) {
      try {
        await logoutRequest(accessToken, apiBaseUrl);
      } catch {
        // Clear local session even if the API call fails.
      }
    }

    await clearSession();
  }, [apiBaseUrl, clearSession, tokenStorage]);

  const getAccessToken = useCallback(async () => {
    const accessToken = await tokenStorage.getAccessToken();

    if (accessToken) {
      return accessToken;
    }

    const refreshToken = await tokenStorage.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      const tokens = await refreshRequest(refreshToken, apiBaseUrl);
      await persistTokens(tokens.accessToken, tokens.refreshToken);
      setUser(tokens.user);
      return tokens.accessToken;
    } catch {
      await clearSession();
      return null;
    }
  }, [apiBaseUrl, clearSession, persistTokens, tokenStorage]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
      getAccessToken,
    }),
    [user, isLoading, login, logout, getAccessToken],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
