import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
  ExecutionContext,
  Head,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Err} from '../error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (user) {
      return user;
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
