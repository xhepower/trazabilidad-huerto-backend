import { Test, TestingModule } from '@nestjs/testing';
import { ExportationsService } from './exportations.service';

describe('ExportationsService', () => {
  let service: ExportationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportationsService],
    }).compile();

    service = module.get<ExportationsService>(ExportationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
