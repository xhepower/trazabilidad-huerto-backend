import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateClimaticConditionDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsUUID()
  plantingId: string;
}

