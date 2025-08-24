import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { Repository } from 'typeorm';
import { Input } from './entities/input.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InputsService {
  @InjectRepository(Input)
  private inputsRepository: Repository<Input>;
  async create(createInputDto: CreateInputDto) {
    try {
      const newInput = await this.inputsRepository.create(
        createInputDto,
      );
      const savedInput =
        await this.inputsRepository.save(newInput);
      return this.findOne(savedInput.id);
    } catch (error) {
      throw new BadRequestException('Error creating input');
    }
  }

  async findAll() {
    return this.inputsRepository.find();
  }

  async findOne(id: string) {
    const input = await this.inputsRepository.findOneBy({
      id,
    });
    if (!input) {
      throw new NotFoundException(`Input with id ${id} not found`);
    }
    return input;
  }

  async update(id: string, updateInputDto: UpdateInputDto) {
    const input = await this.findOne(id);
    const updatedInput = this.inputsRepository.merge(
      input,
      updateInputDto,
    );
    return await this.inputsRepository.save(updatedInput);
  }

  async remove(id: string) {
    const input = await this.findOne(id);
    return this.inputsRepository.delete(id);
  }
}
