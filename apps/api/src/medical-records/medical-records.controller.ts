import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestUser } from '../auth/types/auth-user.type';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecordsService } from './medical-records.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post('pets/:petId/medical-records')
  create(
    @CurrentUser() user: RequestUser,
    @Param('petId') petId: string,
    @Body() dto: CreateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.create(user.id, petId, dto);
  }

  @Get('pets/:petId/medical-records')
  findAll(
    @CurrentUser() user: RequestUser,
    @Param('petId') petId: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.medicalRecordsService.findAll(user.id, petId, query);
  }

  @Patch('medical-records/:id')
  update(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(user.id, id, dto);
  }

  @Delete('medical-records/:id')
  remove(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.medicalRecordsService.remove(user.id, id);
  }
}
