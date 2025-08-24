import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HarvestsService {
  @InjectRepository(Harvest)
  private harvestsRepository: Repository<Harvest>;
  async create(createHarvestDto: CreateHarvestDto) {
    try {
      const newHarvest = await this.harvestsRepository.create(
        createHarvestDto,
      );
      const savedHarvest =
        await this.harvestsRepository.save(newHarvest);
      return this.findOne(savedHarvest.id);
    } catch (error) {
      throw new BadRequestException('Error creating harvest');
    }
  }

  async findAll() {
    return this.harvestsRepository.find();
  }

  async findOne(id: string) {
    const harvest = await this.harvestsRepository.findOneBy({
      id,
    });
    if (!harvest) {
      throw new NotFoundException(`Harvest with id ${id} not found`);
    }
    return harvest;
  }

  async update(id: string, updateHarvestDto: UpdateHarvestDto) {
    const harvest = await this.findOne(id);
    const updatedHarvest = this.harvestsRepository.merge(
      harvest,
      updateHarvestDto,
    );
    return await this.harvestsRepository.save(updatedHarvest);
  }

  async remove(id: string) {
    const harvest = await this.findOne(id);
    return this.harvestsRepository.delete(id);
  }
}
