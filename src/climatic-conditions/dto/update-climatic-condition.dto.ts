import { PartialType } from '@nestjs/mapped-types';
import { CreateClimaticConditionDto } from './create-climatic-condition.dto';

export class UpdateClimaticConditionDto extends PartialType(CreateClimaticConditionDto) {}
