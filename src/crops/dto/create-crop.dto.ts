import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsString() @IsNotEmpty() plantType: string; // e.g., okra
  @IsString() @IsNotEmpty() variety: string;

}
