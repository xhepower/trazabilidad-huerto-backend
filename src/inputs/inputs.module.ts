import { Module } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { InputsController } from './inputs.controller';
import { Input } from './entities/input.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Input])],
  controllers: [InputsController],
  providers: [InputsService],
})
export class InputsModule {}
