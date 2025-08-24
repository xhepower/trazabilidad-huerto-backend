import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalesService {
  @InjectRepository(Sale)
  private salesRepository: Repository<Sale>;
  async create(createSaleDto: CreateSaleDto) {
    try {
      const newSale =
        await this.salesRepository.create(createSaleDto);
      const savedSale = await this.salesRepository.save(newSale);
      return this.findOne(savedSale.id);
    } catch (error) {
      throw new BadRequestException('Error creating sale');
    }
  }

  async findAll() {
    return this.salesRepository.find();
  }

  async findOne(id: string) {
    const sale = await this.salesRepository.findOneBy({
      id,
    });
    if (!sale) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.findOne(id);
    const updatedSale = this.salesRepository.merge(
      sale,
      updateSaleDto,
    );
    return await this.salesRepository.save(updatedSale);
  }

  async remove(id: string) {
    const sale = await this.findOne(id);
    return this.salesRepository.delete(id);
  }
}
