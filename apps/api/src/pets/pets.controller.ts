import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestUser } from '../auth/types/auth-user.type';
import type { Pet } from '../generated/prisma';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(
    @CurrentUser() user: RequestUser,
    @Body() dto: CreatePetDto,
  ): Promise<Pet> {
    return this.petsService.create(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: RequestUser): Promise<Pet[]> {
    return this.petsService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
  ): Promise<Pet> {
    return this.petsService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.petsService.remove(user.id, id);
  }
}
