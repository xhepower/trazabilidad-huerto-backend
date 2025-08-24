import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProducersService {
  @InjectRepository(Producer)
  private producersRepository: Repository<Producer>;
  async create(createProducerDto: CreateProducerDto) {
    try {
      const newProducer = await this.producersRepository.create(createProducerDto);
      const savedProducer = await this.producersRepository.save(newProducer);
      return this.findOne(savedProducer.id);
    } catch (error) {
      throw new BadRequestException('Error creating producer');
    }
  }
  async findByUserId(userId: string) {
    const producer = await this.producersRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!producer) {
      throw new NotFoundException(`Producer with userId ${userId} not found`);
    }
    return producer;
  }
  async findAll() {
    return this.producersRepository.find();
  }

  async findOne(id: string) {
    const producer = await this.producersRepository.findOneBy({ id });
    if (!producer) {
      throw new NotFoundException(`Producer with id ${id} not found`);
    }
    return producer;
  }

  async update(id: string, updateProducerDto: UpdateProducerDto) {
    const producer = await this.findOne(id);
    const updatedProducer = this.producersRepository.merge(
      producer,
      updateProducerDto,
    );
    return await this.producersRepository.save(updatedProducer);
  }

  async remove(id: string) {
    const producer = await this.findOne(id);
    return this.producersRepository.delete(id);
  }
}
