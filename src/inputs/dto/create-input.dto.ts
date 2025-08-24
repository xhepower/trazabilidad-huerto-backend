import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsDate()
  applicationDate: Date


}

  
