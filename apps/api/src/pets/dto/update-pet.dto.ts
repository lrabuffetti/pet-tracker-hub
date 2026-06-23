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

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum($Enums.PetType)
  type?: $Enums.PetType;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

  @IsOptional()
  @IsEnum($Enums.PetGender)
  gender?: $Enums.PetGender;

  @IsOptional()
  @IsUrl({ require_tld: false })
  avatarUrl?: string;
}
