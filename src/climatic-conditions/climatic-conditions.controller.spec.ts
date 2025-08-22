import { Test, TestingModule } from '@nestjs/testing';
import { ClimaticConditionsController } from './climatic-conditions.controller';
import { ClimaticConditionsService } from './climatic-conditions.service';

describe('ClimaticConditionsController', () => {
  let controller: ClimaticConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimaticConditionsController],
      providers: [ClimaticConditionsService],
    }).compile();

    controller = module.get<ClimaticConditionsController>(ClimaticConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
