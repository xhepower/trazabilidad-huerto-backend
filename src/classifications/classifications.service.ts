import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import { Repository } from 'typeorm';
import { Classification } from './entities/classification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassificationsService {
  @InjectRepository(Classification)
  private classificationsRepository: Repository<Classification>;
  async create(createClassificationDto: CreateClassificationDto) {
    try {
      const newClassification = await this.classificationsRepository.create(
        createClassificationDto,
      );
      const savedClassification =
        await this.classificationsRepository.save(newClassification);
      return this.findOne(savedClassification.id);
    } catch (error) {
      throw new BadRequestException('Error creating classification');
    }
  }

  async findAll() {
    return this.classificationsRepository.find();
  }

  async findOne(id: string) {
    const classification = await this.classificationsRepository.findOneBy({ id });
    if (!classification) {
      throw new NotFoundException(`Classification with id ${id} not found`);
    }
    return classification;
  }

  async update(id: string, updateClassificationDto: UpdateClassificationDto) {
    const classification = await this.findOne(id);
    const updatedClassification = this.classificationsRepository.merge(
      classification,
      updateClassificationDto,
    );
    return await this.classificationsRepository.save(updatedClassification);
  }

  async remove(id: string) {
    const classification = await this.findOne(id);
    return this.classificationsRepository.delete(id);
  }
}
