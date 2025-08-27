import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Plot } from 'src/plots/entities/plot.entity';
import { PlotsModule } from 'src/plots/plots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Plot]), PlotsModule],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [CropsService],
})
export class CropsModule {}
