import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | {message: any; statusCode: number}
      | {error: string; statusCode: 400; message: string[]};

    response.status(status).json({
      code: status,
      message: err.message,
      data: null,
    });
  }
}
