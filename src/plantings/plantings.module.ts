import { Module } from '@nestjs/common';
import { PlantingsService } from './plantings.service';
import { PlantingsController } from './plantings.controller';
import { Planting } from './entities/planting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from 'src/crops/entities/crop.entity';
import { CropsModule } from 'src/crops/crops.module';

@Module({
  imports: [TypeOrmModule.forFeature([Planting, Crop]),CropsModule],
  controllers: [PlantingsController],
  providers: [PlantingsService],
  exports: [PlantingsService],
})
export class PlantingsModule {}
