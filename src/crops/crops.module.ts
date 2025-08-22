import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';

@Module({
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
