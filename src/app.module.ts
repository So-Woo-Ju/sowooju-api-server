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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, mailConfig, authConfig, googleConfig, sentryConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    MediaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
