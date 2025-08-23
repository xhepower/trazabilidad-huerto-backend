// src/modules/exportations/dto/create-exportation.dto.ts
import { IsUUID, IsDateString, IsString } from 'class-validator';

export class CreateExportationDto {
  @IsUUID() lotId: string;
  @IsString() country: string;
  @IsDateString() exportDate: string;
  @IsString() documentNumber: string;
}
