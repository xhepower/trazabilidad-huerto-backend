import { Injectable } from '@nestjs/common';
import { CreateClimaticConditionDto } from './dto/create-climatic-condition.dto';
import { UpdateClimaticConditionDto } from './dto/update-climatic-condition.dto';

@Injectable()
export class ClimaticConditionsService {
  create(createClimaticConditionDto: CreateClimaticConditionDto) {
    return 'This action adds a new climaticCondition';
  }

  findAll() {
    return `This action returns all climaticConditions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} climaticCondition`;
  }

  update(id: number, updateClimaticConditionDto: UpdateClimaticConditionDto) {
    return `This action updates a #${id} climaticCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} climaticCondition`;
  }
}
