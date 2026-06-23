import type { DashboardData } from "../types/dashboard";
import { fetchWithAuth } from "../utils/api";

export const getDashboardRequest = async (
  accessToken: string,
  apiBaseUrl?: string,
): Promise<DashboardData> => {
  const data = await fetchWithAuth("/dashboard", accessToken, {}, apiBaseUrl);

  return data as DashboardData;
};
