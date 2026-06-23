import { IsEnum, IsIn, IsString } from 'class-validator';

export enum UploadPurpose {
  AVATAR = 'avatar',
  MEDICAL = 'medical',
}

const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedContentType = (typeof ALLOWED_CONTENT_TYPES)[number];

export class PresignUploadDto {
  @IsEnum(UploadPurpose)
  purpose!: UploadPurpose;

  @IsIn(ALLOWED_CONTENT_TYPES)
  contentType!: AllowedContentType;

  @IsString()
  fileName!: string;
}

export { ALLOWED_CONTENT_TYPES };
