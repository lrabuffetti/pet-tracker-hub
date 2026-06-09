export const signUp = async (
  email: string,
  password: string,
  apiBaseUrl?: string,
) => {
  const apiUrl =
    apiBaseUrl ??
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.EXPO_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "API URL is not configured. Set NEXT_PUBLIC_API_URL (web) or EXPO_PUBLIC_API_URL (mobile).",
    );
  }

  let response: Response;
  try {
    response = await fetch(`${apiUrl.replace(/\/$/, "")}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(
      `Could not reach the API at ${apiUrl.replace(/\/$/, "")}. Make sure the server is running (pnpm dev).`,
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Unable to complete sign up",
    );
  }

  return data as { message: string };
};
