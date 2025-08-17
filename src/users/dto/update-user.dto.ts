import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateProfileDto } from './update-profile.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['profile']),
) {
  profile: UpdateProfileDto;
}
