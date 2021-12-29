import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {setupSwagger} from './swagger/index';
import {HttpExceptionFilter} from './httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
