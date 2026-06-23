import { Injectable } from '@nestjs/common';
import type { Pet, PrismaClient } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MAX_ALERTS = 10;

@Injectable()
export class DashboardService {
  private readonly db: PrismaClient;

  constructor(prisma: PrismaService) {
    this.db = prisma;
  }

  async getDashboardData(userId: string) {
    const pets: Pet[] = await this.db.pet.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    const recordsWithDueDate = await this.db.medicalRecord.findMany({
      where: {
        pet: { userId },
        nextDueDate: { not: null },
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { nextDueDate: 'asc' },
    });

    const now = Date.now();

    const alerts = recordsWithDueDate
      .map((record) => {
        const nextDueDate = record.nextDueDate!;
        const daysUntilDue = Math.ceil(
          (nextDueDate.getTime() - now) / MS_PER_DAY,
        );

        return {
          id: record.id,
          petId: record.pet.id,
          petName: record.pet.name,
          petAvatarUrl: record.pet.avatarUrl,
          type: record.type,
          title: record.title,
          nextDueDate,
          isOverdue: daysUntilDue < 0,
          daysUntilDue,
        };
      })
      .slice(0, MAX_ALERTS);

    return {
      pets,
      alerts,
      hasPets: pets.length > 0,
    };
  }
}
