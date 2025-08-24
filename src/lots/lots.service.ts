import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Repository } from 'typeorm';
import { Lot } from './entities/lot.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LotsService {
  @InjectRepository(Lot)
  private lotsRepository: Repository<Lot>;
  async create(createLotDto: CreateLotDto) {
    try {
      const newLot = await this.lotsRepository.create(
        createLotDto,
      );
      const savedLot =
        await this.lotsRepository.save(newLot);
      return this.findOne(savedLot.id);
    } catch (error) {
      throw new BadRequestException('Error creating lot');
    }
  }

  async findAll() {
    return this.lotsRepository.find();
  }

  async findOne(id: string) {
    const lot = await this.lotsRepository.findOneBy({
      id,
    });
    if (!lot) {
      throw new NotFoundException(`Lot with id ${id} not found`);
    }
    return lot;
  }

  async update(id: string, updateLotDto: UpdateLotDto) {
    const lot = await this.findOne(id);
    const updatedLot = this.lotsRepository.merge(
      lot,
      updateLotDto,
    );
    return await this.lotsRepository.save(updatedLot);
  }

  async remove(id: string) {
    const lot = await this.findOne(id);
    return this.lotsRepository.delete(id);
  }
}
