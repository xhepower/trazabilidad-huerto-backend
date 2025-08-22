import { Module } from '@nestjs/common';
import { PostHarvestsService } from './post-harvests.service';
import { PostHarvestsController } from './post-harvests.controller';

@Module({
  controllers: [PostHarvestsController],
  providers: [PostHarvestsService],
})
export class PostHarvestsModule {}
