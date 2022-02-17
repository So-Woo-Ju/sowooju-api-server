import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './common/exceptions/httpException.filter';
import {TransformInterceptor} from './common/interceptors/transform.interceptor';
import {API_PREFIX, DOC_PATH} from './constants';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  Sentry.init({
    dsn: configService.get('sentry').dsn,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());


  const config = new DocumentBuilder()
    .setTitle('SoWooJu API docs')
    .setDescription('The SoWooJu API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
