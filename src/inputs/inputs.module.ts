import { Module } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { InputsController } from './inputs.controller';
import { Input } from './entities/input.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planting } from 'src/plantings/entities/planting.entity';
import { PlantingsModule } from 'src/plantings/plantings.module';

@Module({
    imports:[TypeOrmModule.forFeature([Input,Planting]),PlantingsModule],
  controllers: [InputsController],
  providers: [InputsService],
})
export class InputsModule {}
