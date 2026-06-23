import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthTokens,
  AuthUser,
  JwtPayload,
  RequestUser,
} from './types/auth-user.type';

const DEFAULT_REFRESH_EXPIRES_IN = '24h';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private getRefreshExpiresMs(): number {
    const raw =
      process.env.REFRESH_TOKEN_EXPIRES_IN ?? DEFAULT_REFRESH_EXPIRES_IN;
    const match = raw.match(/^(\d+)([hm])$/);

    if (!match) {
      return 24 * 60 * 60 * 1000;
    }

    const value = Number(match[1]);
    const unit = match[2];

    if (unit === 'h') {
      return value * 60 * 60 * 1000;
    }

    return value * 60 * 1000;
  }

  private toAuthUser(user: {
    id: string;
    email: string;
    name: string | null;
    lastName: string | null;
  }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
  }

  async createSession(userId: string): Promise<AuthTokens> {
    const refreshSecret = randomBytes(32).toString('hex');
    const refreshHash = await bcrypt.hash(refreshSecret, 10);
    const expiresAt = new Date(Date.now() + this.getRefreshExpiresMs());

    const session = await this.prisma.session.create({
      data: {
        userId,
        refreshHash,
        expiresAt,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
      },
    });

    const refreshToken = `${session.id}.${refreshSecret}`;
    const accessToken = this.signAccessToken(userId, session.id);

    return {
      accessToken,
      refreshToken,
      user: this.toAuthUser(session.user),
    };
  }

  signAccessToken(userId: string, sessionId: string): string {
    return this.jwtService.sign({ sub: userId, sessionId });
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const dotIndex = refreshToken.indexOf('.');

    if (dotIndex === -1) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const sessionId = refreshToken.slice(0, dotIndex);
    const refreshSecret = refreshToken.slice(dotIndex + 1);

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
      },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired');
    }

    const refreshValid = await bcrypt.compare(
      refreshSecret,
      session.refreshHash,
    );

    if (!refreshValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newRefreshSecret = randomBytes(32).toString('hex');
    const newRefreshHash = await bcrypt.hash(newRefreshSecret, 10);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshHash: newRefreshHash },
    });

    const newRefreshToken = `${session.id}.${newRefreshSecret}`;
    const accessToken = this.signAccessToken(session.userId, session.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: this.toAuthUser(session.user),
    };
  }

  async logout(sessionId: string): Promise<void> {
    await this.prisma.session.deleteMany({
      where: { id: sessionId },
    });
  }

  async validateJwtPayload(payload: JwtPayload): Promise<RequestUser> {
    const session = await this.prisma.session.findUnique({
      where: { id: payload.sessionId },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...this.toAuthUser(user),
      sessionId: payload.sessionId,
    };
  }

  getMe(user: RequestUser): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
  }
}
