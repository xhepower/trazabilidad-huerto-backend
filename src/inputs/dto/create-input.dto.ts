import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  inputType: string;

  @IsString()
  @IsNotEmpty()
  commercialName: string;

  @IsString()
  @IsNotEmpty()
  dose: string;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  applicationDate: Date;

  @ApiProperty()
  @IsUUID()
  plantingId: string;
}

  
