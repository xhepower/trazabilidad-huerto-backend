import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateProfileDto } from "src/users/dto/create-profile.dto";

export class CreatePlotDto {
  @IsString()
  @IsNotEmpty()
  gpsLocation: string;
  @IsNumber()
  @IsNotEmpty()
  areaHectares: number;

  @IsUUID()
  producerId:string
}
