import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassificationDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  description?: string;
}
