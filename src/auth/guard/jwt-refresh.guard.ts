import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from '../auth.service';
import {UserService} from './../../user/user.service';
import {Err} from './../../common/error';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  constructor(private authService: AuthService, private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;

    if (authorization === undefined) {
      throw new BadRequestException(Err.TOKEN.NOT_SEND_REFRESH_TOKEN);
    }

    const refreshToken = authorization.replace('Bearer ', '');
    const refreshTokenValidate = await this.validate(refreshToken);
    request.user = refreshTokenValidate;
    return true;
  }

  async validate(refreshToken: string) {
    try {
      const tokenVerify = await this.authService.tokenValidate(refreshToken);
      const user = await this.userService.findUserById(tokenVerify.sub);
      if (user.refreshToken === refreshToken) {
        return user;
      } else {
        throw new BadRequestException(Err.TOKEN.NO_PERMISSION);
      }
    } catch (error) {
      switch (error.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid token':
          throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);

        case 'no permission':
          throw new BadRequestException(Err.TOKEN.NO_PERMISSION);

        case 'jwt expired':
          throw new BadRequestException(Err.TOKEN.JWT_EXPIRED);

        default:
          throw new ServiceUnavailableException(Err.SERVER.UNEXPECTED_ERROR);
      }
    }
  }
}
