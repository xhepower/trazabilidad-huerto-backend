import { PartialType } from '@nestjs/mapped-types';
import { CreatePostHarvestDto } from './create-post-harvest.dto';

export class UpdatePostHarvestDto extends PartialType(CreatePostHarvestDto) {}
