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
import { PlantingsService } from 'src/plantings/plantings.service';
import { generateHash } from 'src/common/hash.utils';

@Injectable()
export class ClimaticConditionsService {
  constructor(@InjectRepository(ClimaticCondition)
  private climaticConditionsRepository: Repository<ClimaticCondition>,
  private plantingService:PlantingsService
){}
  async create(createClimaticconditionDto: CreateClimaticConditionDto) {
    try {
      const planting=await this.plantingService.findOne(createClimaticconditionDto.plantingId)
      const newClimaticcondition =
         this.climaticConditionsRepository.create(
          createClimaticconditionDto,
        );
newClimaticcondition.hash=generateHash(newClimaticcondition)
newClimaticcondition.planting=planting
      const savedClimaticcondition =
        await this.climaticConditionsRepository.save(newClimaticcondition);
      return this.findOne(savedClimaticcondition.id);
    } catch (error) {
      throw new BadRequestException('Error creating climaticcondition');
    }
  }

  async findAll() {
    return this.climaticConditionsRepository.find({
      
      relations: ['planting'],
    });
  }

  async findOne(id: string) {
    const climaticcondition = await this.climaticConditionsRepository.findOne(
      {
        where: { id },
        relations: ['planting'],
      },
    );
    if (!climaticcondition) {
      throw new NotFoundException(`Climaticcondition with id ${id} not found`);
    }
    return climaticcondition;
  }

  async update(
    id: string,
    updateClimaticconditionDto: UpdateClimaticConditionDto,
  ) {
    const climaticcondition = await this.findOne(id);
    const updatedClimaticcondition = this.climaticConditionsRepository.merge(
      climaticcondition,
      updateClimaticconditionDto,
    );
    return await this.climaticConditionsRepository.save(
      updatedClimaticcondition,
    );
  }

  async remove(id: string) {
    const climaticcondition = await this.findOne(id);
    return this.climaticConditionsRepository.delete(id);
  }
  async findByPlantingId(plantingId: string): Promise<ClimaticCondition[]> {
    return this.climaticConditionsRepository.find({
      where: { planting: { id: plantingId } },
      relations: ['planting'],
    });
  }
}
