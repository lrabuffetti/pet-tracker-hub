import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import {
  AllowedContentType,
  PresignUploadDto,
  UploadPurpose,
} from './dto/presign-upload.dto';

export type PresignResult = {
  uploadUrl: string;
  publicUrl: string;
  method: 'PUT';
  headers: Record<string, string>;
};

@Injectable()
export class UploadsService {
  private readonly driver = process.env.STORAGE_DRIVER ?? 'local';

  async presign(dto: PresignUploadDto): Promise<PresignResult> {
    const key = this.buildObjectKey(dto.purpose, dto.fileName);

    if (this.driver === 'r2') {
      return this.presignR2(key, dto.contentType);
    }

    return this.presignLocal(key, dto.contentType);
  }

  getLocalUploadDir(): string {
    return process.env.LOCAL_UPLOAD_DIR ?? './uploads';
  }

  getLocalPublicBaseUrl(): string {
    const configured = process.env.LOCAL_UPLOAD_BASE_URL?.replace(/\/$/, '');

    if (configured) {
      return configured;
    }

    const apiBaseUrl = (
      process.env.API_BASE_URL ?? 'http://localhost:3000'
    ).replace(/\/$/, '');

    return `${apiBaseUrl}/uploads`;
  }

  private buildObjectKey(purpose: UploadPurpose, fileName: string): string {
    const extension = extname(fileName).toLowerCase();
    const safeExtension = extension || this.extensionFromPurpose(purpose);

    return `${purpose}/${randomUUID()}${safeExtension}`;
  }

  private extensionFromPurpose(purpose: UploadPurpose): string {
    return purpose === UploadPurpose.AVATAR ? '.jpg' : '.jpg';
  }

  private presignLocal(
    key: string,
    contentType: AllowedContentType,
  ): PresignResult {
    const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';

    return {
      uploadUrl: `${apiBaseUrl}/uploads/object/${key}`,
      publicUrl: `${this.getLocalPublicBaseUrl()}/${key}`,
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
    };
  }

  private async presignR2(
    key: string,
    contentType: AllowedContentType,
  ): Promise<PresignResult> {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

    if (
      !accountId ||
      !accessKeyId ||
      !secretAccessKey ||
      !bucketName ||
      !publicBaseUrl
    ) {
      throw new InternalServerErrorException('R2 storage is not configured');
    }

    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 600 });

    return {
      uploadUrl,
      publicUrl: `${publicBaseUrl.replace(/\/$/, '')}/${key}`,
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
    };
  }

  validateContentType(
    contentType: string,
  ): asserts contentType is AllowedContentType {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowed.includes(contentType)) {
      throw new BadRequestException('Unsupported content type');
    }
  }
}
