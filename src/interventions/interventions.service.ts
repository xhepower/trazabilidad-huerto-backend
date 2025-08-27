import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';
import { Repository } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantingsService } from 'src/plantings/plantings.service';
import { generateHash } from 'src/common/hash.utils';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>,
    private plantingService: PlantingsService,
  ) {}
  async create(createInterventionDto: CreateInterventionDto) {
    try {
      const planting = await this.plantingService.findOne(
        createInterventionDto.plantingId,
      );
      const newIntervention = await this.interventionsRepository.create(
        createInterventionDto,
      );
      newIntervention.hash = generateHash(newIntervention);
      newIntervention.planting = planting;
      const savedIntervention =
        await this.interventionsRepository.save(newIntervention);
      return this.findOne(savedIntervention.id);
    } catch (error) {
      throw new BadRequestException('Error creating intervention');
    }
  }

  async findAll() {
    return this.interventionsRepository.find({ relations: ['planting'] });
  }

  async findOne(id: string) {
    const intervention = await this.interventionsRepository.findOne({where:{id},relations:['planting']});
    if (!intervention) {
      throw new NotFoundException(`Intervention with id ${id} not found`);
    }
    return intervention;
  }

  async update(id: string, updateInterventionDto: UpdateInterventionDto) {
    const intervention = await this.findOne(id);
    const updatedIntervention = this.interventionsRepository.merge(
      intervention,
      updateInterventionDto,
    );
    return await this.interventionsRepository.save(updatedIntervention);
  }

  async remove(id: string) {
    const intervention = await this.findOne(id);
    return this.interventionsRepository.delete(id);
  }
   async findByPlantingId(plantingId: string): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { planting: { id: plantingId } },
      relations: ['planting'],
    });
  }
}
