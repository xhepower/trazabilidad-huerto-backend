import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateInterventionDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  responsible: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsUUID()
  plantingId: string;
  
}
