import { Injectable, NotFoundException } from '@nestjs/common';
import type { MedicalRecord, Prisma, PrismaClient } from '../generated/prisma';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PetsService } from '../pets/pets.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  private readonly db: PrismaClient;

  constructor(
    prisma: PrismaService,
    private readonly petsService: PetsService,
  ) {
    this.db = prisma;
  }

  private async findOwnedRecordOrThrow(
    recordId: string,
    userId: string,
  ): Promise<MedicalRecord> {
    const record = await this.db.medicalRecord.findFirst({
      where: {
        id: recordId,
        pet: { userId },
      },
    });

    if (!record) {
      throw new NotFoundException('Medical record not found');
    }

    return record;
  }

  async create(userId: string, petId: string, dto: CreateMedicalRecordDto) {
    await this.petsService.findOwnedPetOrThrow(petId, userId);

    const data: Prisma.MedicalRecordUncheckedCreateInput = {
      petId,
      type: dto.type,
      title: dto.title.trim(),
      date: new Date(dto.date),
      notes: dto.notes,
      nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
      veterinarian: dto.veterinarian,
      attachmentUrl: dto.attachmentUrl,
      weightAtTime: dto.weightAtTime,
    };

    return this.db.medicalRecord.create({ data });
  }

  async findAll(
    userId: string,
    petId: string,
    { page, limit }: PaginationQueryDto,
  ) {
    await this.petsService.findOwnedPetOrThrow(petId, userId);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.db.medicalRecord.findMany({
        where: { petId },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      this.db.medicalRecord.count({ where: { petId } }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(userId: string, recordId: string, dto: UpdateMedicalRecordDto) {
    await this.findOwnedRecordOrThrow(recordId, userId);

    const data: Prisma.MedicalRecordUpdateInput = {
      type: dto.type,
      title: dto.title?.trim(),
      date: dto.date ? new Date(dto.date) : undefined,
      notes: dto.notes,
      nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
      veterinarian: dto.veterinarian,
      attachmentUrl: dto.attachmentUrl,
      weightAtTime: dto.weightAtTime,
    };

    return this.db.medicalRecord.update({
      where: { id: recordId },
      data,
    });
  }

  async remove(userId: string, recordId: string) {
    await this.findOwnedRecordOrThrow(recordId, userId);

    await this.db.medicalRecord.delete({
      where: { id: recordId },
    });

    return { message: 'Medical record deleted' };
  }
}
