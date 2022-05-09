import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from './../user/user.module';
import {VerifyCode} from './entities/verify-code.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MailSender} from './mail-sender';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {LocalStrategy} from '../common/strategy/local.strategy';
import {JwtStrategy} from '../common/strategy/jwt.strategy';
import {User} from './../user/entities/user.entity';
import {JwtRefreshStrategy} from '../common/strategy/jwt-refresh.strategy';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    TypeOrmModule.forFeature([VerifyCode, User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('auth').secret,
          signOptions: config.get('auth').signOptions,
        };
      },
      imports: [ConfigModule],
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MailSender, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
