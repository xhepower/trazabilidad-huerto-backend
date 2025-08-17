import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lote } from './entities/lote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LotesService {
  @InjectRepository(Lote)
  private lotesRepository: Repository<Lote>;
  async create(createLoteDto: CreateLoteDto) {
    const newLote = await this.lotesRepository.save(createLoteDto);
    return newLote;
  }

  async findAll() {
    return this.lotesRepository.find();
  }

  async findOne(id: number) {
    const lote = await this.lotesRepository.findOneBy({ id });
    if (!lote) {
      throw new NotFoundException(`Lote with id ${id} not found`);
    }
    return lote;
  }

  async update(id: number, updateLoteDto: UpdateLoteDto) {
    const lote = await this.findOne(id);
    const updatedLote = this.lotesRepository.merge(lote, updateLoteDto);
    return await this.lotesRepository.save(updatedLote);
  }

  async remove(id: number) {
    const lote = await this.findOne(id);
    return this.lotesRepository.delete(id);
  }
}
