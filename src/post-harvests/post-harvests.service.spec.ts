import { Test, TestingModule } from '@nestjs/testing';
import { PostHarvestsService } from './post-harvests.service';

describe('PostHarvestsService', () => {
  let service: PostHarvestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostHarvestsService],
    }).compile();

    service = module.get<PostHarvestsService>(PostHarvestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
