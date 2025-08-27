import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateHash } from 'src/common/hash.utils';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';
import { Repository } from 'typeorm';
import { Planting } from './entities/planting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CropsService } from 'src/crops/crops.service';

@Injectable()
export class PlantingsService {
  constructor(
    @InjectRepository(Planting)
    private plantingsRepository: Repository<Planting>,
    private cropService: CropsService,
  ) {}

  async create(createPlantingDto: CreatePlantingDto) {
    try {
      const crop = await this.cropService.findOne(createPlantingDto.cropId);
      const newPlanting = this.plantingsRepository.create(createPlantingDto);
      newPlanting.crop = crop;
       newPlanting.hash = generateHash(newPlanting);
      const savedPlanting = await this.plantingsRepository.save(newPlanting);
      return this.findOne(savedPlanting.id);
    } catch (error) {
      throw new BadRequestException('Error creating planting');
    }
  }

  async findAll() {
    return this.plantingsRepository.find({
      relations: [
        'crop',
        'inputs',
        'interventions',
        'climaticConditions',
        'harvests',
      ],
    });
  }

  async findOne(id: string) {
    const planting = await this.plantingsRepository.findOne({
      where: { id },
      relations: [
        'crop',
        'inputs',
        'interventions',
        'climaticConditions',
        'harvests',
      ],
    });
    if (!planting) {
      throw new NotFoundException(`Planting with id ${id} not found`);
    }
    return planting;
  }

  async update(id: string, updatePlantingDto: UpdatePlantingDto) {
    const planting = await this.findOne(id);
    const updatedPlanting = this.plantingsRepository.merge(
      planting,
      updatePlantingDto,
    );
    return await this.plantingsRepository.save(updatedPlanting);
  }

  async remove(id: string) {
    const planting = await this.findOne(id);
    return this.plantingsRepository.delete(id);
  }

  async getPlantingHistory(cropId: string): Promise<Planting[]> {
    return this.plantingsRepository.find({
      where: { crop: { id: cropId } },
      relations: ['inputs', 'interventions', 'climaticConditions', 'harvests'],
      order: { plantingDate: 'DESC' },
    });
  }

  
}
