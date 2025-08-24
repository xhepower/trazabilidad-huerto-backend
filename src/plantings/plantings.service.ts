import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';
import { Repository } from 'typeorm';
import { Planting } from './entities/planting.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlantingsService {
  @InjectRepository(Planting)
  private plantingsRepository: Repository<Planting>;
  async create(createPlantingDto: CreatePlantingDto) {
    try {
      const newPlanting = await this.plantingsRepository.create(createPlantingDto);
      const savedPlanting = await this.plantingsRepository.save(newPlanting);
      return this.findOne(savedPlanting.id);
    } catch (error) {
      throw new BadRequestException('Error creating planting');
    }
  }

  async findAll() {
    return this.plantingsRepository.find();
  }

  async findOne(id: string) {
    const planting = await this.plantingsRepository.findOneBy({
      id,
    });
    if (!planting) {
      throw new NotFoundException(`Planting with id ${id} not found`);
    }
    return planting;
  }

  async update(id: string, updatePlantingDto: UpdatePlantingDto) {
    const planting = await this.findOne(id);
    const updatedPlanting = this.plantingsRepository.merge(planting, updatePlantingDto);
    return await this.plantingsRepository.save(updatedPlanting);
  }

  async remove(id: string) {
    const planting = await this.findOne(id);
    return this.plantingsRepository.delete(id);
  }
}
