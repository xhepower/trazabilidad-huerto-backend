import { Test, TestingModule } from '@nestjs/testing';
import { PlantingsService } from './plantings.service';

describe('PlantingsService', () => {
  let service: PlantingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantingsService],
    }).compile();

    service = module.get<PlantingsService>(PlantingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
