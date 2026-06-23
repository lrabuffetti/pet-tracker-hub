import { Injectable, NotFoundException } from '@nestjs/common';
import type { Pet, Prisma, PrismaClient } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  private readonly db: PrismaClient;

  constructor(prisma: PrismaService) {
    this.db = prisma;
  }

  async findOwnedPetOrThrow(petId: string, userId: string): Promise<Pet> {
    const pet = await this.db.pet.findFirst({
      where: { id: petId, userId },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  create(userId: string, dto: CreatePetDto): Promise<Pet> {
    const data: Prisma.PetUncheckedCreateInput = {
      userId,
      name: dto.name.trim(),
      type: dto.type,
      birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
      avatarUrl: dto.avatarUrl,
    };

    return this.db.pet.create({ data });
  }

  findAll(userId: string): Promise<Pet[]> {
    return this.db.pet.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  findOne(userId: string, petId: string): Promise<Pet> {
    return this.findOwnedPetOrThrow(petId, userId);
  }

  async update(userId: string, petId: string, dto: UpdatePetDto): Promise<Pet> {
    await this.findOwnedPetOrThrow(petId, userId);

    const data: Prisma.PetUpdateInput = {
      name: dto.name?.trim(),
      type: dto.type,
      breed: dto.breed,
      birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
      weight: dto.weight,
      gender: dto.gender,
      avatarUrl: dto.avatarUrl,
    };

    return this.db.pet.update({
      where: { id: petId },
      data,
    });
  }

  async remove(userId: string, petId: string): Promise<{ message: string }> {
    await this.findOwnedPetOrThrow(petId, userId);

    await this.db.pet.delete({
      where: { id: petId },
    });

    return { message: 'Pet deleted' };
  }
}
