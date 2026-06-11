const getApiUrl = (apiBaseUrl?: string) => {
  const apiUrl =
    apiBaseUrl ??
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.EXPO_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "API URL is not configured. Set NEXT_PUBLIC_API_URL (web) or EXPO_PUBLIC_API_URL (mobile).",
    );
  }

  return apiUrl.replace(/\/$/, "");
};

export const verifyEmail = async (
  email: string,
  code: string,
  apiBaseUrl?: string,
) => {
  const apiUrl = getApiUrl(apiBaseUrl);

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
  } catch {
    throw new Error(
      `Could not reach the API at ${apiUrl}. Make sure the server is running (pnpm dev).`,
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Unable to verify email",
    );
  }

  return data as { message: string };
};
