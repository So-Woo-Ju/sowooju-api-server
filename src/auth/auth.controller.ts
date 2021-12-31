import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SendEmailDto} from './dto/send-email.dto';
import {VerifyCodeDto} from './dto/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-email')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.authService.sendEmail(dto);
  }

  @Post('verify-code')
  async verifyCode(@Body() dto: VerifyCodeDto) {
    return await this.authService.verifyCode(dto);
  }
}
