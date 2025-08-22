import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Lot } from './entities/lot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Lot])],
  controllers: [LotsController],
  providers: [LotsService],
})
export class LotsModule {}
