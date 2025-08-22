import { Test, TestingModule } from '@nestjs/testing';
import { PostHarvestsController } from './post-harvests.controller';
import { PostHarvestsService } from './post-harvests.service';

describe('PostHarvestsController', () => {
  let controller: PostHarvestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostHarvestsController],
      providers: [PostHarvestsService],
    }).compile();

    controller = module.get<PostHarvestsController>(PostHarvestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
