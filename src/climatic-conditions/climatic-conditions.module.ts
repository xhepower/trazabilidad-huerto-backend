import { Module } from '@nestjs/common';
import { ClimaticConditionsService } from './climatic-conditions.service';
import { ClimaticConditionsController } from './climatic-conditions.controller';

@Module({
  controllers: [ClimaticConditionsController],
  providers: [ClimaticConditionsService],
})
export class ClimaticConditionsModule {}
