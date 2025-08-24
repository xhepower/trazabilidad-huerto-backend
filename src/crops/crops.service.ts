import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CropsService {
  @InjectRepository(Crop)
  private cropsRepository: Repository<Crop>;
  async create(createCropDto: CreateCropDto) {
    try {
      const newCrop = await this.cropsRepository.create(
        createCropDto,
      );
      const savedCrop =
        await this.cropsRepository.save(newCrop);
      return this.findOne(savedCrop.id);
    } catch (error) {
      throw new BadRequestException('Error creating crop');
    }
  }

  async findAll() {
    return this.cropsRepository.find();
  }

  async findOne(id: string) {
    const crop = await this.cropsRepository.findOneBy({
      id,
    });
    if (!crop) {
      throw new NotFoundException(`Crop with id ${id} not found`);
    }
    return crop;
  }

  async update(id: string, updateCropDto: UpdateCropDto) {
    const crop = await this.findOne(id);
    const updatedCrop = this.cropsRepository.merge(
      crop,
      updateCropDto,
    );
    return await this.cropsRepository.save(updatedCrop);
  }

  async remove(id: string) {
    const crop = await this.findOne(id);
    return this.cropsRepository.delete(id);
  }
}
