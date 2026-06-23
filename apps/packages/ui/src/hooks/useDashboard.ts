import { useCallback, useEffect, useState } from "react";
import { getDashboardRequest } from "../services/dashboard";
import type { DashboardData } from "../types/dashboard";
import { useAuth } from "./useAuth";

type UseDashboardOptions = {
  apiBaseUrl?: string;
};

export const useDashboard = (options?: UseDashboardOptions) => {
  const { getAccessToken, isAuthenticated, isLoading: isAuthLoading } =
    useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const reload = useCallback(async () => {
    setErrorMessage("");

    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error("You must be logged in");
      }

      const dashboard = await getDashboardRequest(
        accessToken,
        options?.apiBaseUrl,
      );
      setData(dashboard);
    } catch (error) {
      setData(null);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load dashboard",
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    getAccessToken,
    isAuthenticated,
    isAuthLoading,
    options?.apiBaseUrl,
  ]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    data,
    isLoading,
    errorMessage,
    reload,
  };
};
