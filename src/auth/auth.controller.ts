import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SendEmailDto} from './dto/send-email.dto';
import {VerifyCodeDto} from './dto/verify-code.dto';
import {docs} from './auth.docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-email')
  @docs.sendEmail('회원가입 인증코드 전송')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.authService.sendEmail(dto);
  }

  @Post('verify-code')
  @docs.verifyCode('인증코드 확인')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    return await this.authService.verifyCode(dto);
  }
}
