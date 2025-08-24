import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClimaticConditionDto } from './dto/create-climatic-condition.dto';
import { UpdateClimaticConditionDto } from './dto/update-climatic-condition.dto';
import { Repository } from 'typeorm';
import { ClimaticCondition } from './entities/climatic-condition.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClimaticConditionsService {
  @InjectRepository(ClimaticCondition)
  private climaticconditionsRepository: Repository<ClimaticCondition>;
  async create(createClimaticconditionDto: CreateClimaticConditionDto) {
    try {
      const newClimaticcondition = await this.climaticconditionsRepository.create(
        createClimaticconditionDto,
      );
      const savedClimaticcondition =
        await this.climaticconditionsRepository.save(newClimaticcondition);
      return this.findOne(savedClimaticcondition.id);
    } catch (error) {
      throw new BadRequestException('Error creating climaticcondition');
    }
  }

  async findAll() {
    return this.climaticconditionsRepository.find();
  }

  async findOne(id: string) {
    const climaticcondition = await this.climaticconditionsRepository.findOneBy({ id });
    if (!climaticcondition) {
      throw new NotFoundException(`Climaticcondition with id ${id} not found`);
    }
    return climaticcondition;
  }

  async update(id: string, updateClimaticconditionDto: UpdateClimaticConditionDto) {
    const climaticcondition = await this.findOne(id);
    const updatedClimaticcondition = this.climaticconditionsRepository.merge(
      climaticcondition,
      updateClimaticconditionDto,
    );
    return await this.climaticconditionsRepository.save(updatedClimaticcondition);
  }

  async remove(id: string) {
    const climaticcondition = await this.findOne(id);
    return this.climaticconditionsRepository.delete(id);
  }
}
