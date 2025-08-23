import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClimaticConditionDto {
  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsNumber()
  @IsOptional()
  humidity?: number;
}
