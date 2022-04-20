import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UserModule} from './user/user.module';
import {MediaModule} from './media/media.module';
import {AuthModule} from './auth/auth.module';
import databaseConfig from './common/config/database.config';
import mailConfig from './common/config/mail.config';
import authConfig from './common/config/auth.config';
import googleConfig from './common/config/google.config';
import sentryConfig from './common/config/sentry.config';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {LogInterceptor} from './common/interceptors/log.interceptor';
import {PrivacyReplacer} from './common/interceptors/PrivacyReplacer';
import {HttpExceptionFilter} from './common/exceptions/httpException.filter';
import {TransformInterceptor} from './common/interceptors/transform.interceptor';
import s3Confilg from './common/config/s3.confilg';
import s3BucketConfig from './common/config/s3-bucket.config';
import {BullModule} from '@nestjs/bull';
import {MediaConsumer} from './media/media.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        mailConfig,
        authConfig,
        googleConfig,
        sentryConfig,
        s3Confilg,
        s3BucketConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    MediaModule,
    AuthModule,
    BullModule.registerQueue({
      name: 'messageQueue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrivacyReplacer,
    MediaConsumer,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
