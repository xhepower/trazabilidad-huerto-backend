import { Test, TestingModule } from '@nestjs/testing';
import { ClimaticConditionsService } from './climatic-conditions.service';

describe('ClimaticConditionsService', () => {
  let service: ClimaticConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimaticConditionsService],
    }).compile();

    service = module.get<ClimaticConditionsService>(ClimaticConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
