import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClimaticConditionDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsNumber()
  @IsOptional()
  humidity?: number;

  @IsDate()
  date:Date
}

