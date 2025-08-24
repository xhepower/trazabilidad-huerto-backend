import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Repository } from 'typeorm';
import { Transport } from './entities/transport.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransportsService {
  @InjectRepository(Transport)
  private transportsRepository: Repository<Transport>;
  async create(createTransportDto: CreateTransportDto) {
    try {
      const newTransport =
        await this.transportsRepository.create(createTransportDto);
      const savedTransport = await this.transportsRepository.save(newTransport);
      return this.findOne(savedTransport.id);
    } catch (error) {
      throw new BadRequestException('Error creating transport');
    }
  }

  async findAll() {
    return this.transportsRepository.find();
  }

  async findOne(id: string) {
    const transport = await this.transportsRepository.findOneBy({
      id,
    });
    if (!transport) {
      throw new NotFoundException(`Transport with id ${id} not found`);
    }
    return transport;
  }

  async update(id: string, updateTransportDto: UpdateTransportDto) {
    const transport = await this.findOne(id);
    const updatedTransport = this.transportsRepository.merge(
      transport,
      updateTransportDto,
    );
    return await this.transportsRepository.save(updatedTransport);
  }

  async remove(id: string) {
    const transport = await this.findOne(id);
    return this.transportsRepository.delete(id);
  }
}
