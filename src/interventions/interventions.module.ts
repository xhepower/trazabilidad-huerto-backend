import { Module } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from './entities/intervention.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planting } from 'src/plantings/entities/planting.entity';
import { PlantingsModule } from 'src/plantings/plantings.module';

@Module({
    imports:[TypeOrmModule.forFeature([Intervention,Planting]),PlantingsModule],
  controllers: [InterventionsController],
  providers: [InterventionsService],
})
export class InterventionsModule {}
