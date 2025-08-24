import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClassificationDto {
  @IsString()
  @IsNotEmpty()
  classificationType: string;

  @IsString()
  @IsNotEmpty()
  packaging: string;

  @IsNumber()
  @IsNotEmpty()
   quantityKg: number;


  @IsString()
  @IsOptional()
  description?: string;


}
