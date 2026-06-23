import { Platform } from "react-native";

export const resolveUploadUrl = (
  url: string | null | undefined,
  apiBaseUrl?: string,
): string | null => {
  if (!url) {
    return null;
  }

  if (!apiBaseUrl || Platform.OS === "web") {
    return url;
  }

  try {
    const uploadUrl = new URL(url);
    const apiUrl = new URL(apiBaseUrl);

    if (
      uploadUrl.hostname === "localhost" ||
      uploadUrl.hostname === "127.0.0.1"
    ) {
      uploadUrl.hostname = apiUrl.hostname;
      uploadUrl.port = apiUrl.port;
      uploadUrl.protocol = apiUrl.protocol;
      return uploadUrl.toString();
    }

    return url;
  } catch {
    return url;
  }
};
