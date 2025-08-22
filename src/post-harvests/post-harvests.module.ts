import { Module } from '@nestjs/common';
import { PostHarvestsService } from './post-harvests.service';
import { PostHarvestsController } from './post-harvests.controller';
import { PostHarvest } from './entities/post-harvest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostHarvest])],
  controllers: [PostHarvestsController],
  providers: [PostHarvestsService],
})
export class PostHarvestsModule {}
