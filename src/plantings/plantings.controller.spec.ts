import { Test, TestingModule } from '@nestjs/testing';
import { PlantingsController } from './plantings.controller';
import { PlantingsService } from './plantings.service';

describe('PlantingsController', () => {
  let controller: PlantingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantingsController],
      providers: [PlantingsService],
    }).compile();

    controller = module.get<PlantingsController>(PlantingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
