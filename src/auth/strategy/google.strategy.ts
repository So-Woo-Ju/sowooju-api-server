import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';
import {AuthService} from './../auth.service';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private readonly authService: AuthService) {
    super({
      clientID: config.get('google').googleClientId,
      clientSecret: config.get('google').googleSecret,
      callbackURL: config.get('google').ip + '/api/v1/auth/google/redirect',
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const googleId = profile.id;
    let user = await this.authService.validateGoogle(googleId);
    if (user === null) {
      user = await this.authService.signupWithGoogle(googleId);
    }

    done(null, {id: user.id});
  }
}
