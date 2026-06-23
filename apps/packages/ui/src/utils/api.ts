import { getApiUrl } from "./getApiUrl";

const parseErrorMessage = (data: Record<string, unknown>, fallback: string) => {
  if (typeof data.message === "string") {
    return data.message;
  }

  if (Array.isArray(data.message)) {
    return data.message.join(", ");
  }

  return fallback;
};

export const fetchWithAuth = async (
  path: string,
  accessToken: string,
  options: RequestInit = {},
  apiBaseUrl?: string,
) => {
  const apiUrl = getApiUrl(apiBaseUrl);

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
