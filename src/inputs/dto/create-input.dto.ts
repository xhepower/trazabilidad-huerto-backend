import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
