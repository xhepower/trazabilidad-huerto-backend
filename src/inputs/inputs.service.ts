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
import { PlantingsService } from 'src/plantings/plantings.service';
import { generateHash } from 'src/common/hash.utils';

@Injectable()
export class InputsService {
 constructor( @InjectRepository(Input)
  private inputsRepository: Repository<Input>,
private plantingService:PlantingsService){}
  async create(createInputDto: CreateInputDto) {
    try {
      const planting=await this.plantingService.findOne(createInputDto.plantingId)
      const newInput =  this.inputsRepository.create(
        createInputDto,
      );
      newInput.planting=planting
      newInput.hash=generateHash(newInput)
      const savedInput =
        await this.inputsRepository.save(newInput);
      return this.findOne(savedInput.id);
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error creating input');
    }
  }

  async findAll() {
    return this.inputsRepository.find({relations:['planting']});
  }

  async findOne(id: string) {
    const input = await this.inputsRepository.findOne({
      relations: ['planting'], where:{id}
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
