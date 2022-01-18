import {Injectable} from '@nestjs/common';
import {Strategy} from 'passport-kakao';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from '../auth.service';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(config: ConfigService, private readonly authService: AuthService) {
    super({
      clientID: config.get('kakao').kakaoKey,
      callbackURL: config.get('kakao').ip + '/api/v1/auth/kakao/redirect',
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const kakaoId = String(profile.id);
    let user = await this.authService.validateKakao(kakaoId);
    if (user === null) {
      user = await this.authService.signupWithKakao(kakaoId);
    }
    done(null, {id: user.id});
  }
}
