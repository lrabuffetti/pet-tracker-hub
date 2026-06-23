import { $Enums } from '../../generated/prisma';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  name!: string;

  @IsEnum($Enums.PetType)
  type!: $Enums.PetType;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  avatarUrl?: string;
}
