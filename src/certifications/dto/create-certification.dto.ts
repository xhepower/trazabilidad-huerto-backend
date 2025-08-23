// src/modules/certifications/dto/create-certification.dto.ts
import { IsUUID, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateCertificationDto {
  @IsUUID() lotId: string;
  @IsString() certificationType: string;
  @IsString() certificateNumber: string;
  @IsDateString() issueDate: string;
  @IsDateString() @IsOptional() expiryDate?: string;
  @IsString() authority: string;
}
