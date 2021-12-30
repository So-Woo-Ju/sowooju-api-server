import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {setupSwagger} from './swagger/index';
import {HttpExceptionFilter} from './httpException.filter';
import {TransformInterceptor} from './transform.interceptor';
import {API_PREFIX} from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
