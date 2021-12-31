import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from './../user/user.module';
import {VerifyCode} from './entities/verify-code.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {MailSender} from './mail-sender';
import {UserService} from './../user/user.service';
import {User} from './../user/entities/user.entity';

@Module({
  imports: [UserModule, ConfigModule, TypeOrmModule.forFeature([VerifyCode, User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailSender],
})
export class AuthModule {}
