// src/modules/sales/dto/create-sale.dto.ts
import {
  IsUUID,
  IsDateString,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateSaleDto {
  @IsDateString() saleDate: string;
  @IsString() buyerName: string;
  @IsNumber() quantity: number;
  @IsString() unit: string; // kg, box, bag
  @IsNumber() @IsOptional() price?: number;
  @IsString() @IsOptional() document?: string;
  @IsUUID() @IsOptional() lotId?: string;
  @IsUUID() @IsOptional() classificationId?: string;
  @IsUUID() recordedById: string;
}
