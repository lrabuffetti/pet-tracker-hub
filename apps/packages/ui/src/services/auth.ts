import type { AuthTokens } from "../types/auth";
import { getApiUrl } from "../utils/getApiUrl";

const parseErrorMessage = (data: Record<string, unknown>, fallback: string) => {
  if (typeof data.message === "string") {
    return data.message;
  }

  return fallback;
};

const fetchAuth = async (
  path: string,
  options: RequestInit,
  apiBaseUrl?: string,
) => {
  const apiUrl = getApiUrl(apiBaseUrl);

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch {
    throw new Error(
      `Could not reach the API at ${apiUrl}. Make sure the server is running (pnpm dev).`,
    );
  }

  const data = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, "Request failed"));
  }

  return data;
};

export const loginRequest = async (
  email: string,
  password: string,
  apiBaseUrl?: string,
): Promise<AuthTokens> => {
  const data = await fetchAuth(
    "/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    apiBaseUrl,
  );

  return data as AuthTokens;
};

export const refreshRequest = async (
  refreshToken: string,
  apiBaseUrl?: string,
): Promise<AuthTokens> => {
  const data = await fetchAuth(
    "/auth/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
    apiBaseUrl,
  );

  return data as AuthTokens;
};

export const logoutRequest = async (
  accessToken: string,
  apiBaseUrl?: string,
): Promise<void> => {
  await fetchAuth(
    "/auth/logout",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    apiBaseUrl,
  );
};

export const meRequest = async (
  accessToken: string,
  apiBaseUrl?: string,
): Promise<AuthTokens["user"]> => {
  const data = await fetchAuth(
    "/auth/me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    apiBaseUrl,
  );

  return data as AuthTokens["user"];
};
