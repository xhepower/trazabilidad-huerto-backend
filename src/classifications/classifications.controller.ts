import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';

@Controller('classifications')
export class ClassificationsController {
  constructor(private readonly classificationsService: ClassificationsService) {}

  @Post()
  create(@Body() createClassificationDto: CreateClassificationDto) {
    return this.classificationsService.create(createClassificationDto);
  }

  @Get()
  findAll() {
    return this.classificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassificationDto: UpdateClassificationDto) {
    return this.classificationsService.update(+id, updateClassificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classificationsService.remove(+id);
  }
}
