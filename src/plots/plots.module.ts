import { Module } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { PlotsController } from './plots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plot } from './entities/plot.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Plot])],
  controllers: [PlotsController],
  providers: [PlotsService],
})
export class PlotsModule {}
