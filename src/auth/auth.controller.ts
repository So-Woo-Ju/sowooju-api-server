import {Controller, Post, Body, Request, Param, Delete, UseGuards, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SendEmailDto} from './dto/send-email.dto';
import {VerifyCodeDto} from './dto/verify-code.dto';
import {docs} from './auth.docs';
import {LocalAuthGuard} from './guard/local-auth.guard';
import {Users} from 'src/common/decorators/user.decorator';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @docs.login('사용자 로그인')
  async login(@Users() user) {
    return await this.authService.login(user);
  }
}
