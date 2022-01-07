import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Err} from './../../common/error';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (user) {
      const {authorization} = context.switchToHttp().getRequest().headers;
      const refreshToken = authorization.replace('Bearer ', '');
      if (user.refreshToken === refreshToken) {
        delete user.refreshToken;
        return user;
      } else {
        throw new BadRequestException(Err.TOKEN.NO_PERMISSION);
      }
    }
    switch (info.toString()) {
      case 'Error: No auth token':
        throw new BadRequestException(Err.TOKEN.NOT_SEND_TOKEN);

      case 'JsonWebTokenError: invalid signature':
        throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);

      case 'TokenExpiredError: jwt expired':
        throw new BadRequestException(Err.TOKEN.JWT_EXPIRED);

      default:
        throw new ServiceUnavailableException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }
}
