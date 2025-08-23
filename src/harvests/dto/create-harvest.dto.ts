// src/modules/harvests/dto/create-harvest.dto.ts
import {
  IsUUID,
  IsDateString,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateHarvestDto {
  @IsUUID() plantingId: string;
  @IsDateString() harvestDate: string;
  @IsNumber() quantityKg: number;
  @IsString() @IsNotEmpty() quality: string;
  @IsString() responsible: string;
  @IsString() sanitaryConditions: string;
}
