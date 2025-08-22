import { Module } from '@nestjs/common';
import { PlantingsService } from './plantings.service';
import { PlantingsController } from './plantings.controller';

@Module({
  controllers: [PlantingsController],
  providers: [PlantingsService],
})
export class PlantingsModule {}
