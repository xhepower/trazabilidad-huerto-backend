import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { CreatePlotDto } from './dto/create-plot.dto';
import { UpdatePlotDto } from './dto/update-plot.dto';

@Controller('plots')
export class PlotsController {
  constructor(private readonly plotsService: PlotsService) {}

  @Post()
  create(@Body() createPlotDto: CreatePlotDto) {
    return this.plotsService.create(createPlotDto);
  }

  @Get()
  findAll() {
    return this.plotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlotDto: UpdatePlotDto) {
    return this.plotsService.update(id, updatePlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plotsService.remove(id);
  }
}
