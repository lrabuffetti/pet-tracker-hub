import { Platform } from "react-native";
import type { AvatarFile, PresignResponse, UploadPurpose } from "../types/upload";
import { fetchWithAuth } from "../utils/api";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type ReactNativeUploadBody = {
  uri: string;
  type: string;
  name: string;
};

const buildUploadBody = async (
  file: AvatarFile,
): Promise<Blob | ReactNativeUploadBody> => {
  if (file.blob) {
    return file.blob;
  }

  if (Platform.OS === "web") {
    return (await fetch(file.uri)).blob();
  }

  return {
    uri: file.uri,
    type: file.mimeType,
    name: file.fileName,
  };
};

export const presignUploadRequest = async (
  accessToken: string,
  purpose: UploadPurpose,
  contentType: string,
  fileName: string,
  apiBaseUrl?: string,
): Promise<PresignResponse> => {
  const data = await fetchWithAuth(
    "/uploads/presign",
    accessToken,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purpose, contentType, fileName }),
    },
    apiBaseUrl,
  );

  return data as PresignResponse;
};

export const uploadAvatarRequest = async (
  accessToken: string,
  file: AvatarFile,
  apiBaseUrl?: string,
): Promise<string> => {
  if (!ALLOWED_MIME_TYPES.has(file.mimeType)) {
    throw new Error("Only JPEG, PNG, and WebP images are supported");
  }

  const presign = await presignUploadRequest(
    accessToken,
    "avatar",
    file.mimeType,
    file.fileName,
    apiBaseUrl,
  );

  const body = await buildUploadBody(file);

  const uploadResponse = await fetch(presign.uploadUrl, {
    method: presign.method,
    headers: presign.headers,
    body: body as BodyInit,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload image");
  }

  return presign.publicUrl;
};
