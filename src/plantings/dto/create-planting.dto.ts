import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsString, IsUUID } from "class-validator";

export class CreatePlantingDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  plantingDate: Date;

  @ApiProperty()
  @IsString()
  seedOrigin: string;

  @ApiProperty()
  @IsString()
  seedDocument: string;

  @ApiProperty()
  @IsUUID()
  cropId: string;
}
