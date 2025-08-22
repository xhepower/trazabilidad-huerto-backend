import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Crop])],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
