import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { Type } from 'class-transformer';
import { UserRole } from '../entities/user.entity';
import { CreateProducerDto } from 'src/producers/dto/create-producer.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProducerDto)
  producer?: CreateProducerDto;
}
