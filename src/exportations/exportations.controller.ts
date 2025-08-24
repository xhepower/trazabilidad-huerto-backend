import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportationsService } from './exportations.service';
import { CreateExportationDto } from './dto/create-exportation.dto';
import { UpdateExportationDto } from './dto/update-exportation.dto';

@Controller('exportations')
export class ExportationsController {
  constructor(private readonly exportationsService: ExportationsService) {}

  @Post()
  create(@Body() createExportationDto: CreateExportationDto) {
    return this.exportationsService.create(createExportationDto);
  }

  @Get()
  findAll() {
    return this.exportationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportationDto: UpdateExportationDto) {
    return this.exportationsService.update(id, updateExportationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportationsService.remove(id);
  }
}
