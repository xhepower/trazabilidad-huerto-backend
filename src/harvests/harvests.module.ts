import { Module } from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { HarvestsController } from './harvests.controller';
import { Harvest } from './entities/harvest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planting } from 'src/plantings/entities/planting.entity';
import { PlantingsModule } from 'src/plantings/plantings.module';

@Module({
    imports:[TypeOrmModule.forFeature([Harvest,Planting]),PlantingsModule],
  controllers: [HarvestsController],
  providers: [HarvestsService],
})
export class HarvestsModule {}
