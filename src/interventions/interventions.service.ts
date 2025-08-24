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

@Injectable()
export class InterventionsService {
  @InjectRepository(Intervention)
  private interventionsRepository: Repository<Intervention>;
  async create(createInterventionDto: CreateInterventionDto) {
    try {
      const newIntervention = await this.interventionsRepository.create(createInterventionDto);
      const savedIntervention = await this.interventionsRepository.save(newIntervention);
      return this.findOne(savedIntervention.id);
    } catch (error) {
      throw new BadRequestException('Error creating intervention');
    }
  }

  async findAll() {
    return this.interventionsRepository.find();
  }

  async findOne(id: string) {
    const intervention = await this.interventionsRepository.findOneBy({
      id,
    });
    if (!intervention) {
      throw new NotFoundException(`Intervention with id ${id} not found`);
    }
    return intervention;
  }

  async update(id: string, updateInterventionDto: UpdateInterventionDto) {
    const intervention = await this.findOne(id);
    const updatedIntervention = this.interventionsRepository.merge(intervention, updateInterventionDto);
    return await this.interventionsRepository.save(updatedIntervention);
  }

  async remove(id: string) {
    const intervention = await this.findOne(id);
    return this.interventionsRepository.delete(id);
  }
}
