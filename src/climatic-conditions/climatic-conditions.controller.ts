import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClimaticConditionsService } from './climatic-conditions.service';
import { CreateClimaticConditionDto } from './dto/create-climatic-condition.dto';
import { UpdateClimaticConditionDto } from './dto/update-climatic-condition.dto';

@Controller('climatic-conditions')
export class ClimaticConditionsController {
  constructor(private readonly climaticConditionsService: ClimaticConditionsService) {}

  @Post()
  create(@Body() createClimaticConditionDto: CreateClimaticConditionDto) {
    return this.climaticConditionsService.create(createClimaticConditionDto);
  }

  @Get()
  findAll() {
    return this.climaticConditionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.climaticConditionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClimaticConditionDto: UpdateClimaticConditionDto) {
    return this.climaticConditionsService.update(id, updateClimaticConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climaticConditionsService.remove(id);
  }
}
