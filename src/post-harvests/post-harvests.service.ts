import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostHarvestDto } from './dto/create-post-harvest.dto';
import { UpdatePostHarvestDto } from './dto/update-post-harvest.dto';
import { Repository } from 'typeorm';
import { PostHarvest } from './entities/post-harvest.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostHarvestsService {
  @InjectRepository(PostHarvest)
  private postharvestsRepository: Repository<PostHarvest>;
  async create(createPostharvestDto: CreatePostHarvestDto) {
    try {
      const newPostharvest =
        await this.postharvestsRepository.create(createPostharvestDto);
      const savedPostharvest = await this.postharvestsRepository.save(newPostharvest);
      return this.findOne(savedPostharvest.id);
    } catch (error) {
      throw new BadRequestException('Error creating postharvest');
    }
  }

  async findAll() {
    return this.postharvestsRepository.find();
  }

  async findOne(id: string) {
    const postharvest = await this.postharvestsRepository.findOneBy({
      id,
    });
    if (!postharvest) {
      throw new NotFoundException(`Postharvest with id ${id} not found`);
    }
    return postharvest;
  }

  async update(id: string, updatePostharvestDto: UpdatePostHarvestDto) {
    const postharvest = await this.findOne(id);
    const updatedPostharvest = this.postharvestsRepository.merge(
      postharvest,
      updatePostharvestDto,
    );
    return await this.postharvestsRepository.save(updatedPostharvest);
  }

  async remove(id: string) {
    const postharvest = await this.findOne(id);
    return this.postharvestsRepository.delete(id);
  }
}
