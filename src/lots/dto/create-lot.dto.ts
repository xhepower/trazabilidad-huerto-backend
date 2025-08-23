import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  lotCode: string;
}
