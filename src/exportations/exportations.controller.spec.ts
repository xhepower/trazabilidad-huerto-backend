import { Test, TestingModule } from '@nestjs/testing';
import { ExportationsController } from './exportations.controller';
import { ExportationsService } from './exportations.service';

describe('ExportationsController', () => {
  let controller: ExportationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportationsController],
      providers: [ExportationsService],
    }).compile();

    controller = module.get<ExportationsController>(ExportationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
