import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_KEY,
      callbackURL: 'http://localhost:3000/api/v1/auth/kakao/redirect',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const kakaoId = String(profile.id);
    let user = await this.authService.validateKakao(kakaoId);
    if (user === null) {
      user = await this.authService.validateKakao(kakaoId);
    }
    done(null, { user : user.User_id });
  }
}