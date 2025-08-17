import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cultivo: string;

  @IsDateString()
  @IsNotEmpty()
  fechaSiembra: Date;

  @IsString()
  @IsNotEmpty()
  proveedorSemilla: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;
}
