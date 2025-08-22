import { Module } from '@nestjs/common';
import { ExportationsService } from './exportations.service';
import { ExportationsController } from './exportations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exportation } from './entities/exportation.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Exportation])],
  controllers: [ExportationsController],
  providers: [ExportationsService],
})
export class ExportationsModule {}
