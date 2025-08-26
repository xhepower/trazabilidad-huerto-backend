import { Module } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { PlotsController } from './plots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plot } from './entities/plot.entity';
import { ProducersModule } from 'src/producers/producers.module';
import { Producer } from 'src/producers/entities/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot,Producer]), ProducersModule],
  controllers: [PlotsController],
  providers: [PlotsService],
  exports: [PlotsService],
})
export class PlotsModule {}
