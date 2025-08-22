import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { Transport } from './entities/transport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([Transport])],
  controllers: [TransportsController],
  providers: [TransportsService],
})
export class TransportsModule {}
