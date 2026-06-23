export type UploadPurpose = "avatar" | "medical";

export type PresignResponse = {
  uploadUrl: string;
  publicUrl: string;
  method: "PUT";
  headers: Record<string, string>;
};

export type AvatarFile = {
  uri: string;
  fileName: string;
  mimeType: string;
  blob?: Blob;
};
