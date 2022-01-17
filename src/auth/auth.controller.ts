import {Controller, Post, Body, UseGuards, Req, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {SendEmailDto} from './dto/send-email.dto';
import {VerifyCodeDto} from './dto/verify-code.dto';
import {docs} from './auth.docs';
import {LocalAuthGuard} from './guard/local-auth.guard';
import {SignUpDto} from './dto/signup.dto';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {LocalUser, JwtUser} from 'src/common/types';
import {JwtRefreshGuard} from './guard/jwt-refresh.guard';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

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
    return await this.authService.login(user.id);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('access-token')
  @docs.createAccessToken('액세스 토큰 재발급')
  async createAccessToken(@AuthUser() user: JwtUser) {
    const accessToken = await this.authService.createAccessToken(user.id);
    return {accessToken};
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  @docs.reissueRefreshToken('리프레시 토큰 갱신')
  async reissueRefreshToken(@AuthUser() user: JwtUser) {
    return await this.authService.reissueRefreshToken(user.id);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  @docs.signInWithGoogle('구글 OAuth2 로그인 flow 시작')
  async signInWithGoogle() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @docs.signInWithGoogleRedirect('구글 로그인')
  async signInWithGoogleRedirect(@AuthUser() authuser) {
    return this.authService.validateGoogle(authuser.User_id);
  }  

  @UseGuards(KakaoAuthGuard)
  @Get('kakao')
  @docs.signInWithKakao('카카오 OAuth2 로그인 flow 시작')
  async signInWithKakao() { }

  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  @docs.signInWithKakaoRedirect('카카오 로그인')
  async signInWithKakaoRedirect(@AuthUser() authuser) {
    return await this.authService.login(authuser.User_id)
  } 
}


