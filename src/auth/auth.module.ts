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
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    TypeOrmModule.forFeature([VerifyCode]),
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
  ],
  controllers: [AuthController],
  providers: [AuthService, MailSender, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
