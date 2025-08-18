import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  @InjectRepository(Supplier)
  private suppliersRepository: Repository<Supplier>;
  async create(createSupplierDto: CreateSupplierDto) {
    const newSupplier = await this.suppliersRepository.save(createSupplierDto);
    return newSupplier;
  }

  async findAll() {
    return this.suppliersRepository.find();
  }

  async findOne(id: number) {
    const supplier = await this.suppliersRepository.findOneBy({ id });
    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id);
    const updatedSupplier = this.suppliersRepository.merge(supplier, updateSupplierDto);
    return await this.suppliersRepository.save(updatedSupplier);
  }

  async remove(id: number) {
    const supplier = await this.findOne(id);
    return this.suppliersRepository.delete(id);
  }
}
