import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Repository } from 'typeorm';
import { Certification } from './entities/certification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CertificationsService {
  @InjectRepository(Certification)
  private certificationsRepository: Repository<Certification>;
  async create(createCertificationDto: CreateCertificationDto) {
    try {
      const newCertification =
        await this.certificationsRepository.create(createCertificationDto);
      const savedCertification = await this.certificationsRepository.save(newCertification);
      return this.findOne(savedCertification.id);
    } catch (error) {
      throw new BadRequestException('Error creating certification');
    }
  }
  
  async findAll() {
    return this.certificationsRepository.find();
  }

  async findOne(id: string) {
    const certification = await this.certificationsRepository.findOneBy({ id });
    if (!certification) {
      throw new NotFoundException(`Certification with id ${id} not found`);
    }
    return certification;
  }

  async update(id: string, updateCertificationDto: UpdateCertificationDto) {
    const certification = await this.findOne(id);
    const updatedCertification = this.certificationsRepository.merge(
      certification,
      updateCertificationDto,
    );
    return await this.certificationsRepository.save(updatedCertification);
  }

  async remove(id: string) {
    const certification = await this.findOne(id);
    return this.certificationsRepository.delete(id);
  }
}
