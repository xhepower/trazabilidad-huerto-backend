import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlotDto } from './dto/create-plot.dto';
import { UpdatePlotDto } from './dto/update-plot.dto';
import { Repository } from 'typeorm';
import { Plot } from './entities/plot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from 'src/producers/entities/producer.entity';
import { ProducersService } from 'src/producers/producers.service';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private readonly plotsRepository: Repository<Plot>,

    private readonly producerService:ProducersService
  ) {}
  

  async create(createPlotDto: CreatePlotDto) {
    try {
      const producer=await this.producerService.findOne(createPlotDto.producerId)
      const newPlot = await this.plotsRepository.create(createPlotDto);
      newPlot.producer=producer
      const savedPlot = await this.plotsRepository.save(newPlot);
      return this.findOne(savedPlot.id);
    } catch (error) {
      throw new BadRequestException('Error creating plot');
    }
  }

  async findAll() {
    return this.plotsRepository.find({ relations: ['producer', 'crops'] });
  }

  async findOne(id: string) {
    const plot = await this.plotsRepository.findOne({
      where: { id },
      relations: ['producer', 'crops'],
    });
    if (!plot) {
      throw new NotFoundException(`Plot with id ${id} not found`);
    }
    return plot;
  }

  async update(id: string, updatePlotDto: UpdatePlotDto) {
    const plot = await this.findOne(id);
    const updatedPlot = this.plotsRepository.merge(plot, updatePlotDto);
    return await this.plotsRepository.save(updatedPlot);
  }

  async remove(id: string) {
    const plot = await this.findOne(id);
    return this.plotsRepository.delete(id);
  }
}
