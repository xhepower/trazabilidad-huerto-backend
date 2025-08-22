import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from './entities/batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatchesService {
  @InjectRepository(Batch)
  private batchesRepository: Repository<Batch>;
  async create(createBatchDto: CreateBatchDto) {
    const newBatch = await this.batchesRepository.save(createBatchDto);
    return newBatch;
  }

  async findAll() {
    return this.batchesRepository.find();
  }

  async findOne(id: number) {
    const batch = await this.batchesRepository.findOneBy({ id });
    if (!batch) {
      throw new NotFoundException(`Batch with id ${id} not found`);
    }
    return batch;
  }

  async update(id: number, updateBatchDto: UpdateBatchDto) {
    const batch = await this.findOne(id);
    const updatedBatch = this.batchesRepository.merge(batch, updateBatchDto);
    return await this.batchesRepository.save(updatedBatch);
  }

  async remove(id: number) {
    const batch = await this.findOne(id);
    return this.batchesRepository.delete(id);
  }
}
