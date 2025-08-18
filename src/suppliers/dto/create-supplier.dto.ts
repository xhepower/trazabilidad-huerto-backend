import { IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsString()
  certification: string;
}
