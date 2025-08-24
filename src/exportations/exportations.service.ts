import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExportationDto } from './dto/create-exportation.dto';
import { UpdateExportationDto } from './dto/update-exportation.dto';
import { Repository } from 'typeorm';
import { Exportation } from './entities/exportation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExportationsService {
  @InjectRepository(Exportation)
  private exportationsRepository: Repository<Exportation>;
  async create(createExportationDto: CreateExportationDto) {
    try {
      const newExportation = await this.exportationsRepository.create(
        createExportationDto,
      );
      const savedExportation =
        await this.exportationsRepository.save(newExportation);
      return this.findOne(savedExportation.id);
    } catch (error) {
      throw new BadRequestException('Error creating exportation');
    }
  }

  async findAll() {
    return this.exportationsRepository.find();
  }

  async findOne(id: string) {
    const exportation = await this.exportationsRepository.findOneBy({
      id,
    });
    if (!exportation) {
      throw new NotFoundException(`Exportation with id ${id} not found`);
    }
    return exportation;
  }

  async update(id: string, updateExportationDto: UpdateExportationDto) {
    const exportation = await this.findOne(id);
    const updatedExportation = this.exportationsRepository.merge(
      exportation,
      updateExportationDto,
    );
    return await this.exportationsRepository.save(updatedExportation);
  }

  async remove(id: string) {
    const exportation = await this.findOne(id);
    return this.exportationsRepository.delete(id);
  }
}
