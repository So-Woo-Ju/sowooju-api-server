import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Err} from './../error';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class LambdaGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const ipAddress = this.config.get('lambda').ipAddress;
    const port = this.config.get('lambda').port;
    if (
      request.headers['x-forwarded-for'] == ipAddress &&
      request.headers['x-forwarded-port'] == port
    ) {
      return true;
    }
    throw new UnauthorizedException(Err.MEDIA.NO_PERMISSION);
  }
}
