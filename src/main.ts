import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );


const cs: ConfigService = new ConfigService();
if (cs.get('NODE_ENV') === 'development' || cs.get('NODE_ENV')) {
  const config = new DocumentBuilder()
    .setTitle('TRACE API')
    .setDescription('APP to trace food')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
}



  await app.listen(process.env.PORT ?? 3000);
}



bootstrap();
