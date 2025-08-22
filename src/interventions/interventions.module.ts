import { Module } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from './entities/intervention.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Intervention])],
  controllers: [InterventionsController],
  providers: [InterventionsService],
})
export class InterventionsModule {}
