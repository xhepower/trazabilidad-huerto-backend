import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuppliersService {
  @InjectRepository(Supplier)
  private suppliersRepository: Repository<Supplier>;
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const newSupplier =
        await this.suppliersRepository.create(createSupplierDto);
      const savedSupplier = await this.suppliersRepository.save(newSupplier);
      return this.findOne(savedSupplier.id);
    } catch (error) {
      throw new BadRequestException('Error creating supplier');
    }
  }

  async findAll() {
    return this.suppliersRepository.find();
  }

  async findOne(id: string) {
    const supplier = await this.suppliersRepository.findOneBy({
      id,
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id);
    const updatedSupplier = this.suppliersRepository.merge(
      supplier,
      updateSupplierDto,
    );
    return await this.suppliersRepository.save(updatedSupplier);
  }

  async remove(id: string) {
    const supplier = await this.findOne(id);
    return this.suppliersRepository.delete(id);
  }
}
