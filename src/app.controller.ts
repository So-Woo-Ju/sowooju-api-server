import {Controller, Get, HttpException, InternalServerErrorException} from '@nestjs/common';
import {AppService} from './app.service';
import {Err} from './common/error';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
