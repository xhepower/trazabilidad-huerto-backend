import { Module } from '@nestjs/common';
import { PlantingsService } from './plantings.service';
import { PlantingsController } from './plantings.controller';
import { Planting } from './entities/planting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Planting])],
  controllers: [PlantingsController],
  providers: [PlantingsService],
})
export class PlantingsModule {}
