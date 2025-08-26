import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['profile', 'producer']),
) {
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsOptional()
  profile: CreateProfileDto;


}
