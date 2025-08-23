// src/modules/producers/dto/create-producer.dto.ts
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateProducerDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEnum(['leaf', 'root']) type: 'leaf' | 'root';
  @IsString() @IsNotEmpty() documentId: string;
  @IsString() @IsNotEmpty() contact: string;
}
