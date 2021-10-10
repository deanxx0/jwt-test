import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { jwtConstants } from './auth/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    }
  });

  const config = new DocumentBuilder()
    .setTitle('ts-api')
    .setDescription('ts-api server')
    .setVersion('1.0')
    .addTag('login')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ 
    origin: true,
    credentials: true,
  });
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
