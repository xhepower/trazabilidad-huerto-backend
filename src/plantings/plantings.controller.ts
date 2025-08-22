import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantingsService } from './plantings.service';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';

@Controller('plantings')
export class PlantingsController {
  constructor(private readonly plantingsService: PlantingsService) {}

  @Post()
  create(@Body() createPlantingDto: CreatePlantingDto) {
    return this.plantingsService.create(createPlantingDto);
  }

  @Get()
  findAll() {
    return this.plantingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantingDto: UpdatePlantingDto) {
    return this.plantingsService.update(+id, updatePlantingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantingsService.remove(+id);
  }
}
