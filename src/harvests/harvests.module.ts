import { Module } from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { HarvestsController } from './harvests.controller';
import { Harvest } from './entities/harvest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Harvest])],
  controllers: [HarvestsController],
  providers: [HarvestsService],
})
export class HarvestsModule {}
