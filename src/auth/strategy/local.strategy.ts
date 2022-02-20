import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {Err} from './../../common/error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({usernameField: 'email', passwordField: 'password'});
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return user;
  }
}
