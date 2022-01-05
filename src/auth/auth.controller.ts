import {Controller, Post, Body, Request, Param, Delete, UseGuards, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SendEmailDto} from './dto/send-email.dto';
import {VerifyCodeDto} from './dto/verify-code.dto';
import {docs} from './auth.docs';
import {LocalAuthGuard} from './guard/local-auth.guard';
import {SignUpDto} from './dto/signup.dto';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {LocalUser} from 'src/common/types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-email')
  @docs.sendEmail('이메일 인증코드 전송')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.authService.sendEmail(sendEmailDto);
  }

  @Post('verify-code')
  @docs.verifyCode('인증코드 확인')
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.authService.verifyCode(verifyCodeDto);
  }

  @Post('signup')
  @docs.signup('사용자 회원가입')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signup(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @docs.login('사용자 로그인')
  async login(@AuthUser() user: LocalUser) {
    return await this.authService.login(user);
  }
}
