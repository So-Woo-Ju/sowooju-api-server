import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from './../user/user.module';
import {VerifyCode} from './entities/verify-code.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {MailSender} from './mail-sender';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from 'src/common/config/auth.config';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    TypeOrmModule.forFeature([VerifyCode]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '900s'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailSender, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
