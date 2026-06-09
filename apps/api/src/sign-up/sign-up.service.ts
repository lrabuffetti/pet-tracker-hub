import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';

const VERIFICATION_CODE_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class SignUpService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async signUp({ email, password }: SignUpDto) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = this.generateVerificationCode();
    const codeExpiresAt = new Date(Date.now() + VERIFICATION_CODE_TTL_MS);

    try {
      await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          verificationCode,
          codeExpiresAt,
        },
      });
    } catch {
      throw new InternalServerErrorException('Unable to create account');
    }

    await this.emailService.sendVerificationCode(
      normalizedEmail,
      verificationCode,
    );

    return {
      message: 'An email was sent with a verification code.',
    };
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
