import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LotsService {
  @InjectRepository(Lot)
  private lotsRepository: Repository<Lot>;
  async create(createLotDto: CreateLotDto) {
    const newLot = await this.lotsRepository.save(createLotDto);
    return newLot;
  }

  async findAll() {
    return this.lotsRepository.find();
  }

  async findOne(id: number) {
    const lot = await this.lotsRepository.findOneBy({ id });
    if (!lot) {
      throw new NotFoundException(`Lot with id ${id} not found`);
    }
    return lot;
  }

  async update(id: number, updateLotDto: UpdateLotDto) {
    const lot = await this.findOne(id);
    const updatedLot = this.lotsRepository.merge(lot, updateLotDto);
    return await this.lotsRepository.save(updatedLot);
  }

  async remove(id: number) {
    const lot = await this.findOne(id);
    return this.lotsRepository.delete(id);
  }
}
