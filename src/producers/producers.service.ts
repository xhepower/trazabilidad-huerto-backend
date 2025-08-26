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
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProducersService {
  
    @InjectRepository(Producer)
    private readonly producersRepository: Repository<Producer>
 
  async create(createProducerDto: CreateProducerDto) {
    try {
      const newProducer = this.producersRepository.create(createProducerDto);

      const savedProducer = await this.producersRepository.save(newProducer);
      return this.findOne(savedProducer.id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.description);
    }
  }
  async findByUserId(userId: string) {
    const producer = await this.producersRepository.findOne({
      where: { user: { id: userId } },
      relations: ['plots', 'user'],
    });
    if (!producer) {
      throw new NotFoundException(`Producer with userId ${userId} not found`);
    }
    return producer;
  }
  async findAll() {
    return this.producersRepository.find({
      relations: ['plots', 'user.profile'],
    });
  }

  async findOne(id: string) {
    const producer = await this.producersRepository.findOne({
      where: { id },
      relations: ['plots', 'user.profile'],
    });
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
