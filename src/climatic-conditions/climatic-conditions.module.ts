import { Module } from '@nestjs/common';
import { ClimaticConditionsService } from './climatic-conditions.service';
import { ClimaticConditionsController } from './climatic-conditions.controller';
import { ClimaticCondition } from './entities/climatic-condition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantingsModule } from 'src/plantings/plantings.module';
import { Planting } from 'src/plantings/entities/planting.entity';

@Module({
    imports:[TypeOrmModule.forFeature([ClimaticCondition,Planting]),PlantingsModule],
  controllers: [ClimaticConditionsController],
  providers: [ClimaticConditionsService],
})
export class ClimaticConditionsModule {}
