import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterventionDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
