// src/modules/producers/dto/create-producer.dto.ts
import { IsString, IsEnum, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ProducerType } from '../entities/producer.entity';

export class CreateProducerDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEnum(ProducerType) type: ProducerType;
  @IsString() @IsNotEmpty() documentId: string;
  @IsString() @IsNotEmpty() contact: string;

  

}
