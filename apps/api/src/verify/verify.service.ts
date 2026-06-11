import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class VerifyService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyEmail({ email, code }: VerifyEmailDto) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new NotFoundException('No account found for this email');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    if (user.verificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }

    if (user.codeExpiresAt < new Date()) {
      throw new BadRequestException('Verification code has expired');
    }

    await this.prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        emailVerified: true,
        verificationCode: '',
      },
    });

    return { message: 'Email verified successfully' };
  }
}
