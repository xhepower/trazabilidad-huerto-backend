import { Module } from '@nestjs/common';
import { ClimaticConditionsService } from './climatic-conditions.service';
import { ClimaticConditionsController } from './climatic-conditions.controller';
import { ClimaticCondition } from './entities/climatic-condition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([ClimaticCondition])],
  controllers: [ClimaticConditionsController],
  providers: [ClimaticConditionsService],
})
export class ClimaticConditionsModule {}
