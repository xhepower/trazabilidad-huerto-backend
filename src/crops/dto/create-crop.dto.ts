import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCropDto {
  @IsString() @IsNotEmpty() plantType: string; // e.g., okra
  @IsString() @IsNotEmpty() variety: string;
@IsUUID() plotId:string

}
