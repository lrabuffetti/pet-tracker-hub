import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PresignUploadDto } from './dto/presign-upload.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('presign')
  presign(@Body() dto: PresignUploadDto) {
    return this.uploadsService.presign(dto);
  }

  @Put('object/*path')
  async uploadLocalObject(
    @Param('path') objectKey: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if ((process.env.STORAGE_DRIVER ?? 'local') !== 'local') {
      return res.status(404).end();
    }

    if (!objectKey) {
      return res.status(400).json({ message: 'Missing object key' });
    }

    const resolvedKey = (
      Array.isArray(objectKey) ? objectKey : String(objectKey).split(',')
    ).join('/');

    const contentType = req.headers['content-type'] ?? '';
    this.uploadsService.validateContentType(contentType);

    const uploadDir = this.uploadsService.getLocalUploadDir();
    const filePath = join(uploadDir, resolvedKey);

    await mkdir(dirname(filePath), { recursive: true });

    await new Promise<void>((resolve, reject) => {
      const stream = createWriteStream(filePath);
      req.pipe(stream);
      stream.on('finish', resolve);
      stream.on('error', reject);
      req.on('error', reject);
    });

    return res.status(204).end();
  }
}
