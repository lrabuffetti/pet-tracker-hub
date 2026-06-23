import { $Enums } from '../../generated/prisma';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMedicalRecordDto {
  @IsEnum($Enums.MedicalEntryType)
  type!: $Enums.MedicalEntryType;

  @IsString()
  title!: string;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  nextDueDate?: string;

  @IsOptional()
  @IsString()
  veterinarian?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  attachmentUrl?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  weightAtTime?: number;
}
