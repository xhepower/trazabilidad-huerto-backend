import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './env.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { SuppliersModule } from './suppliers/suppliers.module';
import { ProducersModule } from './producers/producers.module';
import { PlotsModule } from './plots/plots.module';
import { CropsModule } from './crops/crops.module';
import { PlantingsModule } from './plantings/plantings.module';
import { InterventionsModule } from './interventions/interventions.module';
import { ClimaticConditionsModule } from './climatic-conditions/climatic-conditions.module';
import { HarvestsModule } from './harvests/harvests.module';
import { LotsModule } from './lots/lots.module';
import { PostHarvestsModule } from './post-harvests/post-harvests.module';
import { ClassificationsModule } from './classifications/classifications.module';
import { TransportsModule } from './transports/transports.module';
import { CertificationsModule } from './certifications/certifications.module';
import { ExportationsModule } from './exportations/exportations.module';
import { InputsModule } from './inputs/inputs.module';
import { SalesModule } from './sales/sales.module';
import { ProfilesModule } from './users/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    SuppliersModule,
    ProducersModule,
    PlotsModule,
    CropsModule,
    PlantingsModule,
    InterventionsModule,
    ClimaticConditionsModule,
    HarvestsModule,
    LotsModule,
    PostHarvestsModule,
    ClassificationsModule,
    TransportsModule,
    CertificationsModule,
    ExportationsModule,
    InputsModule,
    SalesModule,
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
