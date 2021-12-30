import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | {message: any; code: number}
      | {error: string; message: string[]; code: number | null};
    if (err.code) {
      return response.status(status).json({
        success: false,
        statusCode: err.code,
        data: err.message,
      });
    }
    response.status(status).json({success: false, statusCode: status, data: err.message});
  }
}
