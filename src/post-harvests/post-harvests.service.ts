import { Injectable } from '@nestjs/common';
import { CreatePostHarvestDto } from './dto/create-post-harvest.dto';
import { UpdatePostHarvestDto } from './dto/update-post-harvest.dto';

@Injectable()
export class PostHarvestsService {
  create(createPostHarvestDto: CreatePostHarvestDto) {
    return 'This action adds a new postHarvest';
  }

  findAll() {
    return `This action returns all postHarvests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postHarvest`;
  }

  update(id: number, updatePostHarvestDto: UpdatePostHarvestDto) {
    return `This action updates a #${id} postHarvest`;
  }

  remove(id: number) {
    return `This action removes a #${id} postHarvest`;
  }
}
