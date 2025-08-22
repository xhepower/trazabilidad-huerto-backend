import { Injectable } from '@nestjs/common';
import { CreatePlotDto } from './dto/create-plot.dto';
import { UpdatePlotDto } from './dto/update-plot.dto';

@Injectable()
export class PlotsService {
  create(createPlotDto: CreatePlotDto) {
    return 'This action adds a new plot';
  }

  findAll() {
    return `This action returns all plots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plot`;
  }

  update(id: number, updatePlotDto: UpdatePlotDto) {
    return `This action updates a #${id} plot`;
  }

  remove(id: number) {
    return `This action removes a #${id} plot`;
  }
}
