import { Module } from '@nestjs/common';
import { ExportationsService } from './exportations.service';
import { ExportationsController } from './exportations.controller';

@Module({
  controllers: [ExportationsController],
  providers: [ExportationsService],
})
export class ExportationsModule {}
