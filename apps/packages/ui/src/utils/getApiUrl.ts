export const getApiUrl = (apiBaseUrl?: string) => {
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
